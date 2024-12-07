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

  $theme = new BehaviorSubject<Theme>('light');

  $collapsed = new BehaviorSubject<boolean>(false);

  private themeSubscription: Subscription | undefined = undefined;




  isMenuOpen = true;

  highlightedColumn: number | null = null;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    initFlowbite();
    if (
      localStorage.getItem('color-theme') === 'dark' ||
      (!('color-theme' in localStorage) &&
        'matchMedia' in window &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      this.setTheme('dark');
      document.documentElement.classList.add('dark');
    } else {
      this.setTheme('light');
      document.documentElement.classList.remove('dark');
    }

    this.themeSubscription = this.$theme
      .asObservable()
      .subscribe((theme) => {
        localStorage.setItem('color-theme', theme);
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      });
  }

  setTheme(theme: Theme) {
    this.$theme.next(theme);
  }

  toggleTheme() {
    const theme = this.$theme.getValue();
    this.setTheme(theme === 'dark' ? 'light' : 'dark');
  }

  setCollapsed(collapsed: boolean) {
    this.$collapsed.next(collapsed);
  }

  toggleCollapsed() {
    const collapsed = this.$collapsed.getValue();
    this.setCollapsed(!collapsed);
    this.isMenuOpen = !this.isMenuOpen;
  }

  //}

  highlightColumn(colIndex: number): void {
    this.highlightedColumn = colIndex;
  }

  clearHighlight(): void {
    this.highlightedColumn = null;
  }
}
