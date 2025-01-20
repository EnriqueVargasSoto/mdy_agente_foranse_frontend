import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiServiceService } from 'src/app/services/api-service/api-service.service';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss']
})
export class ToolsComponent implements OnInit{

  highlightedColumn: number | null = null;
  herramientas: any[] = [];
  propietarios: any[] = [
    {
      titulo: 'Compañia',
      valor: 1
    },
    {
      titulo: 'Tercero',
      valor: 2
    }
  ];

  loading: boolean = true;

  searchForm: FormGroup;

  current_page: number = 1;
  from: number = 0;
  last_page: number = 0;
  links: any[] = [];
  next_page_url: any;
  per_page: string = '5';
  prev_page_url: string = '';
  to: number = 0;
  total: number = 0;

  constructor(private apiService: ApiServiceService, private http: HttpClient, private fb: FormBuilder){
    this.searchForm = this.fb.group({
      search: [''],
    });
  }

  ngOnInit(): void {
      this.listarHerramientas('http://10.200.40.71:8000/api/herramientas?page=1');

      this.searchForm.get('search')?.valueChanges
      .pipe(
        //debounceTime(300), // Retraso de 300ms
        //distinctUntilChanged() // Ignora valores repetidos
      )
      .subscribe((value: string) => {
        if (value.length > 3 || value.length == 0) {
          this.listarHerramientas('http://10.200.40.71:8000/api/herramientas?page=1');
        }
      });
  }

  highlightColumn(colIndex: number): void {
    this.highlightedColumn = colIndex;
  }

  clearHighlight(): void {
    this.highlightedColumn = null;
  }

  listarHerramientas(url: string){
    this.loading= true;

    let newUrl: string = url;

    let texto = this.searchForm.get('search')?.value;
    console.log('la busqued es: ', texto.toUpperCase());
    if (texto != '') {
      newUrl += '&search='+texto.toUpperCase();
    }

    this.http.get(newUrl).subscribe((response:any) => {
      this.herramientas = response.data.data;
      console.log(response);

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

  updateTipo(data: any, tipo: number): void {
    // Encuentra el elemento por ID y actualiza su tipo
    const herramienta = this.herramientas.find(h => h.id === data.id);
    if (herramienta) {
      herramienta.tipo = tipo;
      console.log(`Actualizado el tipo de la herramienta con ID ${data.id} a ${tipo}`);
      // Aquí puedes enviar la actualización al servidor si es necesario
      this.actualizarEnServidor(data, tipo);
    }
  }

  actualizarEnServidor(herramienta: any, tipo: number): void {
    // Lógica para actualizar en el servidor
    console.log(`Enviando al servidor: ID ${herramienta.id}, Tipo ${tipo}`);
    // Implementa tu servicio HTTP aquí

    const data = {
      titulo: herramienta.titulo,
      tipo: tipo
    }

    this.apiService.consulta('herramientas/'+herramienta.id, 'put',data ).then((resp) => {
      console.log('respuesta: ', resp);
    })
  }

  actualizaPropietario(herramienta: any, propietario: string){
    console.log('herramienta: ', herramienta);
    this.apiService.consulta('herramientas/'+herramienta.id, 'put',herramienta ).then((resp) => {
      console.log('respuesta: ', resp);
    })
  }

  sumaTiempo(detalle: any[]){
    let sum = 0;
    detalle.forEach(element => {
      sum += element.duration
    });

    const hours = Math.floor(sum / 3600);
    const minutes = Math.floor((sum % 3600) / 60);
    return `${hours}h ${minutes}min`;
  }
}
