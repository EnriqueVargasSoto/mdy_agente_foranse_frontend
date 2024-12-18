import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Modal } from 'flowbite';
import { Datum, Screen } from '../../interfaces/interfaces';



@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.scss']
})
export class ScreenComponent implements OnInit{

  horas: any[] = [];
  loading: boolean = true;
  inicioDate: string='';
  finDate: string='';

  fecha: any;

  startDate: Date = new Date();
  endDate: Date = new Date();

  formattedDate: string='';

  screenModal: Screen = {};// | undefined;
  //url: Screen = new Screen;

  paises: any[] = [];
  segmentos: any[] = [];
  centros: any[] = [];
  campanas: any[] = [];

  constructor(private http: HttpClient, private datePipe: DatePipe){
    const date = new Date('12/01/2024'); // Fecha original
    this.formattedDate = this.datePipe.transform(date, 'yyyy-MM-dd')!; // Conver
  }

  ngOnInit(): void {
    this.fecha = new Date();
    this.inicioDate = this.datePipe.transform(this.fecha, 'MM/dd/yyyy') || '';
    console.log(this.inicioDate);
    this.finDate = this.datePipe.transform(this.fecha, 'MM/dd/yyyy') || '';
    //this.listHOras(this.inicioDate, this.finDate);

    this.cargarPaises();
    this.cargarSegmentos();
    this.cargarCentros();
    this.cargarCampanas();

  }

  cargarPaises(){
    const paises = localStorage.getItem('paises');
    this.paises = JSON.parse(paises!);
  }

  cargarSegmentos(){
    const segmentos = localStorage.getItem('segmentos');
    this.segmentos = JSON.parse(segmentos!);
  }

  cargarCentros(){
    const centros = localStorage.getItem('centros');
    this.centros = JSON.parse(centros!);
  }

  cargarCampanas(){
    const campanas = localStorage.getItem('campana');
    this.campanas = JSON.parse(campanas!);
  }

  listHOras(fechaInicio: string, fechaFin: string){
    this.loading= true;
    console.log('asdfasd', this.startDate);
    this.http.get('http://10.200.40.71:8000/api/screens?inicio='+fechaInicio+'&fin='+fechaFin,).subscribe((resp: any) => {
      this.horas = resp.data;
      console.log(this.horas);
      this.loading= false;
    });
  }

  onDateChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    console.log('Fecha seleccionada:', input.value);
  }

  openModal(screen: any){
    this.screenModal = screen;
    console.log(this.screenModal);
    // set the modal menu element
    const $targetEl = document.getElementById('extralarge-modal-image');

    const modal = new Modal($targetEl/*, options, instanceOptions*/);

    // show the modal
    modal.show();
  }

  closeModal(){
    // set the modal menu element
    const $targetEl = document.getElementById('extralarge-modal-image');

    const modal = new Modal($targetEl/*, options, instanceOptions*/);

    // show the modal
    modal.hide();
  }
}
