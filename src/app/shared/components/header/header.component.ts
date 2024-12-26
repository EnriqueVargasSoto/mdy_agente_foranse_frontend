import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

import { Dropdown } from 'flowbite';
import type { DropdownOptions, DropdownInterface } from 'flowbite';
import type { InstanceOptions } from 'flowbite';

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

  desplegar(){
    // set the dropdown menu element
    const $targetEl: HTMLElement = document.getElementById('dropdown')!;

    // set the element that trigger the dropdown menu on click
    const $triggerEl: HTMLElement = document.getElementById('user-menu-button')!;

    // options with default values
    const options: DropdownOptions = {
        placement: 'bottom',
        triggerType: 'click',
        offsetSkidding: 0,
        offsetDistance: 10,
        delay: 300,
        onHide: () => {
            console.log('dropdown has been hidden');
        },
        onShow: () => {
            console.log('dropdown has been shown');
        },
        onToggle: () => {
            console.log('dropdown has been toggled');
        },
    };

    // instance options object
    const instanceOptions: InstanceOptions = {
      id: 'dropdownMenu',
      override: true
    };

    /*
    * targetEl: required
    * triggerEl: required
    * options: optional
    * instanceOptions: optional
    */
    const dropdown: DropdownInterface = new Dropdown(
        $targetEl,
        $triggerEl,
        options,
        instanceOptions
    );

    // show the dropdown
    dropdown.show();
  }

}
