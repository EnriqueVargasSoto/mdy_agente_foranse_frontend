import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { BehaviorSubject, Subscription } from 'rxjs';

export type Theme = 'dark' | 'light';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'agente_foraneo';

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    initFlowbite();
  }

}
