import { Component } from '@angular/core';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss']
})
export class ToolsComponent {

  highlightedColumn: number | null = null;

  highlightColumn(colIndex: number): void {
    this.highlightedColumn = colIndex;
  }

  clearHighlight(): void {
    this.highlightedColumn = null;
  }
}
