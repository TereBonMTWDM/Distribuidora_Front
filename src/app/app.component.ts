import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { LoadingService } from './services/loading.service';

@Component({
    selector: 'app-my-app',
    templateUrl: './app.component.html'
})

export class AppComponent implements OnInit, AfterViewInit {
  private _router: Subscription;

  constructor( 
    private router: Router
    , public loadingService: LoadingService
   ) {
  }

    ngOnInit() {
      this.loadingService.setLoading(false);

      this._router = this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
        const body = document.getElementsByTagName('body')[0];
        const modalBackdrop = document.getElementsByClassName('modal-backdrop')[0];
        if (body.classList.contains('modal-open')) {
          body.classList.remove('modal-open');
          modalBackdrop.remove();
        }
      });
    }

    ngAfterViewInit(): void {
      this.loadingService.setLoading(false);
  }
}
