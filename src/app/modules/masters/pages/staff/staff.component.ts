import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Drawer, Modal } from 'flowbite';
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

  tiemposCaptura: number[] = [0,3,9,15,30]


  constructor(private http: HttpClient){

  }

  async ngOnInit() {
    const persona = localStorage.getItem('persona');
    this.persona = JSON.parse(persona!);

    this.nivel = this.persona.in_Nivel -1;
    this.area = this.persona.in_AreaId;

    await this.listPersonas('http://18.189.173.243/api/personas?page=1');


  }

   listPersonas(url: string) {

    this.loading= true;

    this.http.get(url+'&nivel='+this.nivel+'&area='+this.area).subscribe((response:any) => {
      this.personas = response.data.data;

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
}
