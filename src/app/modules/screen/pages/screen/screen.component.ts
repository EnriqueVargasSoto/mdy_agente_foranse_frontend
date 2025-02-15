import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Datum, Screen } from '../../interfaces/interfaces';
import { Datepicker, DatepickerInterface, DatepickerOptions, InstanceOptions, Modal } from 'flowbite';
//import { Datepicker } from 'flowbite-datepicker';


//import { Datepicker } from 'flowbite-datepicker';



@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.scss']
})
export class ScreenComponent implements OnInit{

  horas: any[] = [];
  loading: boolean = false;

  screenModal: Screen = {};

  paises: any[] = [];
  segmentos: any[] = [];
  centros: any[] = [];
  campanas: any[] = [];
  personas: any[] = [];

  stringFecha: string = '';

  centro: string = '';
  segmento: string = '';
  campana: string = '';

  fechaString: string = '';

  in_PersonaId: string='';

  nombrePersona = '';

  constructor(private http: HttpClient, private datePipe: DatePipe){

  }

  ngOnInit(): void {
    const fecha = new Date();
    this.fechaString = this.datePipe.transform(fecha, 'dd/MM/yyyy') || '';
    this.abrirCalendario();
    this.cargarCentros();
  }

  cargarCentros(){
    const centros = localStorage.getItem('centros');
    this.centros = JSON.parse(centros!);
  }


  listHOras(date: string){

    this.horas = [];

    this.http.get('http://18.189.173.243/api/screens?date='+date+'&in_PersonaId='+this.in_PersonaId).subscribe((resp: any) => {
      if (resp.data.length > 0) {
        this.horas = resp.data;
        this.loading= false;
      } else {
        this.loading= false;
        this.openModalNotification('popup-modal');
      }



    });
  }

  openModal(screen: any){
    this.screenModal = screen;

    const $targetEl = document.getElementById('extralarge-modal-image');

    const modal = new Modal($targetEl/*, options, instanceOptions*/);

    modal.show();
  }

  closeModal(){

    const $targetEl = document.getElementById('extralarge-modal-image');

    const modal = new Modal($targetEl/*, options, instanceOptions*/);

    modal.hide();
  }

  obtenerScreen(){
    // set the target element of the input field

    this.loading = true;

    const $datepickerEl = document.getElementById('datepicker-autohide') as HTMLInputElement;

    const dateValue = $datepickerEl!.value;

    this.listHOras(dateValue);
  }

  listarSegmentos(event: Event){
    this.segmentos = [];
    this.campanas = [];
    this.personas = [];
    const selectElement = event.target as HTMLSelectElement;
    const centroId = selectElement.value;
    this.centro = centroId;
    this.http.get('http://18.189.173.243/api/segmentos').subscribe((resp: any) => {
      this.segmentos = resp.data;
    });
  }

  listarCampanas(event: Event): void {
    this.campanas = [];
    this.personas = [];
    const selectElement = event.target as HTMLSelectElement;
    const segmento = selectElement.value;
    this.segmento = segmento;
    this.http.get('http://18.189.173.243/api/campanas?in_CentroId='+this.centro+'&in_SegmentoId='+this.segmento).subscribe((resp: any) => {
      this.campanas = resp.data;
    });
  }

  listarPersonas(event: Event): void {
    this.personas = [];
    const selectElement = event.target as HTMLSelectElement;
    const campana = selectElement.value;
    this.campana = campana;
    this.http.get('http://18.189.173.243/api/personas-campana?in_CentroId='+this.centro+'&in_SegmentoId='+this.segmento+'&in_CamapanaId='+this.campana+'&in_Nivel=2&in_AreaId=15').subscribe((resp: any) => {
      this.personas = resp.data;
    });
  }

  selectPersona(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const persona = selectElement.value;
    this.in_PersonaId = persona;
    // Busca la persona seleccionada por id
   const selectedPersona = this.personas.find(persona => persona.id.toString() === this.in_PersonaId);
   console.log(selectedPersona);
   this.nombrePersona = selectedPersona.vc_Nombres+' '+selectedPersona.vc_ApePaterno+' '+selectedPersona.vc_ApeMaterno
  }

  abrirCalendario(){
    const $datepickerEl: HTMLInputElement = document.getElementById('datepicker-autohide') as HTMLInputElement;

    // optional options with default values and callback functions
    const options: DatepickerOptions = {
      defaultDatepickerId: 'datepicker-autohide',
      autohide: true,
      format: 'dd/mm/yyyy',
      maxDate: null,
      minDate: null,
      orientation: 'bottom',
      buttons: false,
      autoSelectToday: 0,
      title: null,
      rangePicker: false,
      onShow: () => {},
      onHide: () => {},
    };

    // instance options object
    const instanceOptions: InstanceOptions = {
    id: 'datepicker-custom-example',
    override: true
    };

    /*
    * $datepickerEl: required
    * options: optional
    * instanceOptions: optional
    */
    const datepicker: DatepickerInterface = new Datepicker(
      $datepickerEl,
      options,
      instanceOptions
    );

    datepicker.init();
  }

  formateoHora(timestamp: string){

    if (timestamp) {
      const date = new Date(timestamp);

    // Extraer los componentes
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const seconds = date.getSeconds().toString().padStart(2, '0');

      // Crear el string con formato HH:mm:ss
      const formattedTime = `${hours}:${minutes}:${seconds}`;

      return formattedTime;
    }
    return '-'

  }

  openModalNotification(idModal: string){
    // set the modal menu element
    const $targetEl = document.getElementById(idModal);
    const modal = new Modal($targetEl);



    // show the modal
    modal.show();
  }

  closeModalNotification(idModal: string){
    // set the modal menu element
    const $targetEl = document.getElementById(idModal);
    const modal = new Modal($targetEl);

    // show the modal
    modal.hide();
  }
}
