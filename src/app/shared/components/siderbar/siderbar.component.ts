import { AfterViewInit, Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HeaderComponent,  } from '../header/header.component';
import { Router } from '@angular/router';
declare const window: any; // Para acceder al objeto de Flowbite
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-siderbar',
  templateUrl: './siderbar.component.html',
  styleUrls: ['./siderbar.component.scss']
})
export class SiderbarComponent implements AfterViewInit{

  @Input() collapsed: BehaviorSubject<boolean> | undefined;

  expanded: boolean = false; // Controla el estado del dropdown
  menus = [
    {
      title: 'Maestros',
      icon: '<svg '+
              'class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" '+
              'aria-hidden="true" xmlns="http://www.w3.org/2000/svg" '+
              'width="20" '+
              'height="20" '+
              'fill="currentColor" '+
              'viewBox="0 0 20 20" '+
              '>'+
              '<path d="M12.013 6.175 7.006 9.369l5.007 3.194-5.007 3.193L2 12.545l5.006-3.193L2 6.175l5.006-3.194 5.007 3.194ZM6.981 17.806l5.006-3.193 5.006 3.193L11.987 21l-5.006-3.194Z"/>'+
              '<path d="m12.013 12.545 5.006-3.194-5.006-3.176 4.98-3.194L22 6.175l-5.007 3.194L22 12.562l-5.007 3.194-4.98-3.211Z"/>'+
            '</svg>', // Reemplaza con el ícono que necesitas
      submenu: [
        { title: 'Trabajadores', route: '/maestras/staff' },
        { title: 'Herramientas Productivas', route: '/maestras/tools' },
      ],
    },
    /* {
      title: 'Capturas',
      icon: 'path-to-icon-ventas',
      route: '/screens'
    }, */
  ];

  collapsedMenu: { [key: string]: boolean } = {};


  constructor(private router: Router, private sanitizer: DomSanitizer){}

  ngAfterViewInit(): void {
    // Inicializar los dropdowns después de que la vista se haya renderizado
    if (window && window.Flowbite) {
      window.Flowbite.initDropdowns();
    }
  }

  goToRoute(route: string): void {
    this.router.navigate([route]);
  }

  toggleCollapseExpanded(title: string) {
    this.collapsedMenu[title] = !this.collapsedMenu[title];
  }

  isCollapsedExpanded(title: string): boolean {
    return this.collapsedMenu[title] === true;
  }

  getSanitizedSvg(svg: string) {
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }


}
