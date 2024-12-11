import { Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HeaderComponent,  } from '../header/header.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-siderbar',
  templateUrl: './siderbar.component.html',
  styleUrls: ['./siderbar.component.scss']
})
export class SiderbarComponent {

  @Input() collapsed: BehaviorSubject<boolean> | undefined;

  constructor(private router: Router){}

  goToRoute(route: string): void {
    this.router.navigate([route]);
  }
}
