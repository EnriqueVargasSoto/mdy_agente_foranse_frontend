import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

export type Theme = 'dark' | 'light';

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input() collapsed: BehaviorSubject<boolean> | undefined;
  @Input() theme: BehaviorSubject<Theme> = new BehaviorSubject<Theme>('light');

  @Output() buttonClickToggleCollapsed = new EventEmitter<void>();
  @Output() buttonClickToggleTheme = new EventEmitter<void>();

  constructor(private authService: AuthService, private router: Router){}

  toggleCollapsed() {
    this.buttonClickToggleCollapsed.emit();
  }

  toggleTheme() {
    this.buttonClickToggleTheme.emit();
  }

  logout(){
    this.authService.logout();
    return this.router.navigate(['/auth/login']);
  }


}
