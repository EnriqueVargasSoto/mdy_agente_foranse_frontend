import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Drawer, Dropdown, Modal } from 'flowbite';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { ApiServiceService } from 'src/app/services/api-service/api-service.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit{

  highlightedColumn: number | null = null;

  personas: any[] = [];

  current_page: number = 1;
  from: number = 0;
  last_page: number = 0;
  links: any[] = [];
  next_page_url: any;
  per_page: string = '5';
  prev_page_url: string = '';
  to: number = 0;
  total: number = 0;

  loading: boolean = true;

  isDrawerOpen = false;

  nivel: number = 0;
  area: number = 0;

  persona: any;

  tiemposCaptura: number[] = [0,3,9,15,30,60]

  checkPrincipal: boolean = false;

  centros: any[] = [];

  segmentos: any[] = [];

  areas: any[] = [];

  campanas: any[] = [];

  centro: number = 0;
  segmento: number = 0;
  campana: number = 0;

  searchForm: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder){
    this.searchForm = this.fb.group({
      search: [''],
    });
  }

  async ngOnInit() {
    const persona = localStorage.getItem('persona');
    this.persona = JSON.parse(persona!);
    this.listarAreas();

    this.nivel = this.persona.in_Nivel -1;
    this.area = this.persona.in_AreaId;

    await this.listPersonas('http://10.200.40.71:8000/api/personas?page=1');

    this.inicializaDropdown();
    this.listCentros();
    this.listarSegmento();


    this.searchForm.get('search')?.valueChanges
      .pipe(
        //debounceTime(300), // Retraso de 300ms
        //distinctUntilChanged() // Ignora valores repetidos
      )
      .subscribe((value: string) => {
        if (value.length > 3 || value.length == 0) {
          this.listPersonas('http://10.200.40.71:8000/api/personas?page=1');
        }
      });

  }

  listPersonas(url: string) {

    this.loading= true;

    let newUrl: string = url+'&nivel='+this.nivel+'&area='+this.area;
    console.log('este es mi centro', this.centro);
    if (this.centro != 0) {
      newUrl += '&centro='+this.centro;
    }

    if (this.segmento != 0) {
      newUrl += '&segmento='+this.segmento;
    }

    if (this.centro != 0 && this.segmento != 0) {
      this.listarCampanas();
    }

    if (this.campana != 0) {
      newUrl += '&campana='+this.campana;
    }

    let texto = this.searchForm.get('search')?.value;
    console.log('la busqued es: ', texto.toUpperCase());
    if (texto != '') {
      newUrl += '&search='+texto.toUpperCase();
    }

    this.http.get(newUrl).subscribe((response:any) => {
      this.personas = response.data.data;

      this.personas = this.personas.map(persona => ({
        ...persona,  // Copia los datos existentes
        selected: false  // Agrega el atributo 'selected'
      }));

      this.current_page = response.data.current_page;
      this.from = response.data.from;
      this.last_page = response.data.last_page;
      this.links = response.data.links;
      console.log('links: ', this.links);
      this.next_page_url = response.data.next_page_url;
      this.per_page = response.data.per_page;
      this.prev_page_url = response.data.prev_page_url;
      this.to = response.data.to;
      this.total = response.data.total;

      this.loading = false;

    });
  }

  highlightColumn(colIndex: number): void {
    this.highlightedColumn = colIndex;
  }

  clearHighlight(): void {
    this.highlightedColumn = null;
  }

  clickDrawer(){
    const $modalElement: HTMLElement = document.querySelector('#extralarge-modal')!;

    const modal = new Modal($modalElement);
    this.isDrawerOpen = true;
    // show the drawer
    modal.show();
  }

  closeClickDrawer(){
    const $modalElement: HTMLElement = document.querySelector('#extralarge-modal')!;
    const modal = new Modal($modalElement);
    this.isDrawerOpen = false;
    // show the drawer
    modal.hide();
  }

  actualizaTiempoCaptura(in_PersonaId: number, tiempo: number){
    const datos = {
      "in_PersonaId" : in_PersonaId,
      "intervalo" : tiempo
    }
    console.log('datos', datos);
    this.http.post('http://18.189.173.243/api/frecuencias', datos).subscribe((resp:any) =>{
      this.ngOnInit();
    });
  }

  checkMasivo(){
    console.log(this.checkPrincipal);

    if (this.checkPrincipal) {
      this.personas.forEach(element => {
        element.selected = true;
      });
    } else {
      this.personas.forEach(element => {
        element.selected = false;
      });
    }

  }

  actualizaTiempoMasivo(tiempo: number){

    this.personas.forEach((element) => {
      if (element.selected) {
        const datos = {
          "in_PersonaId" : element.id,
          "intervalo" : tiempo
        }
        console.log('datos', datos);
        this.http.post('http://18.189.173.243/api/frecuencias', datos).subscribe((resp:any) =>{


        });
      };
      });

      this.ngOnInit();
      this.checkPrincipal = false
  }

  inicializaDropdown(){
    // set the dropdown menu element
    const $targetEl = document.getElementById('actionsDropdown');
    // set the element that trigger the dropdown menu on click
    const $triggerEl = document.getElementById('actionsDropdownButton');

    // options with default values
    const options:any = {
      placement: 'bottom',
      triggerType: 'click',
      offsetSkidding: 0,
      offsetDistance: 10,
      delay: 300,
      ignoreClickOutsideClass: false,
      onHide: () => {
          console.log('dropdown has been hidden');
      },
      onShow: () => {
          console.log('dropdown has been shown');
      },
      onToggle: () => {
          console.log('dropdown has been toggled');
      },
    };

    // instance options object
    const instanceOptions = {
    id: 'dropdownMenu',
    override: true
    };

    const dropdown = new Dropdown($targetEl, $triggerEl, options, instanceOptions);
    //dropdown.show();
  }

  listCentros(){

    const centros = localStorage.getItem('centros');
    this.centros = JSON.parse(centros!);

  }

  listarSegmento(){
    this.http.get('http://18.189.173.243/api/segmentos').subscribe((resp: any) => {
      this.segmentos = resp.data;
    });
  }

  listarAreas(){
    this.http.get('http://10.200.40.71:8000/api/areas').subscribe((resp: any) => {
      this.areas = resp.data;
    });
  }

  listarCampanas(){
    this.http.get('http://10.200.40.71:8000/api/campanas?in_CentroId='+this.centro+'&in_SegmentoId='+this.segmento).subscribe((resp: any) => {
      this.campanas = resp.data;
    });
  }
}
