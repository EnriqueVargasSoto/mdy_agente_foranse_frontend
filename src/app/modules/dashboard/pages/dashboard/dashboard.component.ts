import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  horas: any[] = [];

  constructor(private http: HttpClient){

  }

  ngOnInit(): void {
    this.listHOras();
  }

  listHOras(){
    this.http.get('http://10.200.40.71:8000/api/screens').subscribe((resp: any) => {
      this.horas = resp.data;
      console.log(this.horas[0]);
    });
  }
}
