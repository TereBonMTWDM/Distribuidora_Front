import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AppPrimeModule } from 'src/app/modules/prime-ng/prime-ng.module';
import { AuthService } from 'src/app/services/auth.service';

declare var $: any;

@Component({
    selector: 'app-login-cmp',
    templateUrl: './login.component.html',
    standalone: true,
    imports: [AppPrimeModule],
    providers: [MessageService]
})

export class LoginComponent implements OnInit, OnDestroy {
    test: Date = new Date();
    private toggleButton: any;
    private sidebarVisible: boolean;
    private nativeElement: Node;

    constructor(
        private element: ElementRef
        , public authSvc: AuthService
        , private messageService: MessageService
    ) {
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
    }

    ngOnInit() {
        var navbar : HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
        const body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');
        body.classList.add('off-canvas-sidebar');
        const card = document.getElementsByClassName('card')[0];
        setTimeout(function() {
            // after 1000 ms we add the class animated to the login/register card
            card.classList.remove('card-hidden');
        }, 700);
    }


    AuthLogin(){
        this.authSvc.AuthLogin().then(()=> {
            let u = this.authSvc.getUserData();

            if(u === null){
                this.messageService.add({ 
                    severity: 'error'
                    , summary: 'Sin acceso'
                    , detail: 'Lo sentimos, sólo usuarios autorizados tienen acceso al sistema. Asegúrate de ingresar con la cuenta correcta.'
                    , life: 7000 }); 
            }
        });
    }



    sidebarToggle() {
        var toggleButton = this.toggleButton;
        var body = document.getElementsByTagName('body')[0];
        var sidebar = document.getElementsByClassName('navbar-collapse')[0];
        if (this.sidebarVisible == false) {
            setTimeout(function() {
                toggleButton.classList.add('toggled');
            }, 500);
            body.classList.add('nav-open');
            this.sidebarVisible = true;
        } else {
            this.toggleButton.classList.remove('toggled');
            this.sidebarVisible = false;
            body.classList.remove('nav-open');
        }
    }
    ngOnDestroy(){
      const body = document.getElementsByTagName('body')[0];
      body.classList.remove('login-page');
      body.classList.remove('off-canvas-sidebar');
    }
}