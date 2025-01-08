import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service/api-service.service';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss']
})
export class ToolsComponent implements OnInit{

  highlightedColumn: number | null = null;
  herramientas: any[] = [];

  constructor(private apiService: ApiServiceService){}

  ngOnInit(): void {
      this.listarHErramientas();
  }

  highlightColumn(colIndex: number): void {
    this.highlightedColumn = colIndex;
  }

  clearHighlight(): void {
    this.highlightedColumn = null;
  }

  listarHErramientas(){
    this.apiService.consulta('herramientas', 'get').then((resp) => {
      this.herramientas = resp.data;
      console.log(resp);
    });
  }

  updateTipo(id: number, tipo: number): void {
    // Encuentra el elemento por ID y actualiza su tipo
    const herramienta = this.herramientas.find(h => h.id === id);
    if (herramienta) {
      herramienta.tipo = tipo;
      console.log(`Actualizado el tipo de la herramienta con ID ${id} a ${tipo}`);
      // Aquí puedes enviar la actualización al servidor si es necesario
      this.actualizarEnServidor(id, tipo);
    }
  }

  actualizarEnServidor(id: number, tipo: number): void {
    // Lógica para actualizar en el servidor
    console.log(`Enviando al servidor: ID ${id}, Tipo ${tipo}`);
    // Implementa tu servicio HTTP aquí
  }
}
