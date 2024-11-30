import { Component, OnInit } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';
import { AuthService } from '../services/auth.service';
import { MenusByRolService } from '../services/menus-by-rol.service';

declare const $: any;

//Metadata
export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    icontype: string;
    collapse?: string;
    children?: ChildrenItems[];
}

export interface ChildrenItems {
    path: string;
    title: string;
    ab: string;
    type?: string;
}

//Menu Items
export const ROUTES: RouteInfo[] = [
    {
        path: '/cobranza',
        title: 'Cobranza Vida',
        type: 'sub',
        icontype: 'settings_accessibility', //attach_money',
        collapse: 'cobranza',
        children: [
            {path: 'lista-polizas-vida', title: 'Lista de Pólizas', ab:'L'},
            {path: 'calendario', title: 'Calendario', ab:'C'},
            {path: 'calendario', title: 'Gráficos', ab:'G'}
        ]
    },
    {
        path: '/cobranza',
        title: 'Cobranza Autos',
        type: 'sub',
        icontype: 'directions_car',
        collapse: 'cobranza-autos',
        children: [
            {path: 'lista-polizas', title: 'Lista de Pólizas', ab:'L'},
            // {path: 'calendario', title: 'Calendario', ab:'C'}
        ]
    },
    {
        path: '/perdidas-totales',
        title: '================',
        type: 'link',
        icontype: 'dashboard'
    
    },
    {
        path: '/dashboard',
        title: 'Dashboard',
        type: 'link',
        icontype: 'dashboard'
    },
    
    {
        path: '/components',
        title: 'Components',
        type: 'sub',
        icontype: 'apps',
        collapse: 'components',
        children: [
            {path: 'buttons', title: 'Buttons', ab:'B'},
            {path: 'grid', title: 'Grid System', ab:'GS'},
            {path: 'panels', title: 'Panels', ab:'P'},
            {path: 'sweet-alert', title: 'Sweet Alert', ab:'SA'},
            {path: 'notifications', title: 'Notifications', ab:'N'},
            {path: 'icons', title: 'Icons', ab:'I'},
            {path: 'typography', title: 'Typography', ab:'T'}
        ]
    }
    ,{
        path: '/forms',
        title: 'Forms',
        type: 'sub',
        icontype: 'content_paste',
        collapse: 'forms',
        children: [
            {path: 'regular', title: 'Regular Forms', ab:'RF'},
            {path: 'extended', title: 'Extended Forms', ab:'EF'},
            {path: 'validation', title: 'Validation Forms', ab:'VF'},
            {path: 'wizard', title: 'Wizard', ab:'W'},
             //{path: 'masterPage', title: 'Master Page', ab:'W'}
        ]
    }
    ,{
        path: '/tables',
        title: 'Tables',
        type: 'sub',
        icontype: 'grid_on',
        collapse: 'tables',
        children: [
            {path: 'regular', title: 'Regular Tables', ab:'RT'},
            {path: 'extended', title: 'Extended Tables', ab:'ET'},
            {path: 'datatables.net', title: 'Datatables.net', ab:'DT'}
        ]
    },{
        path: '/maps',
        title: 'Maps',
        type: 'sub',
        icontype: 'place',
        collapse: 'maps',
        children: [
            {path: 'google', title: 'Google Maps', ab:'GM'},
            {path: 'fullscreen', title: 'Full Screen Map', ab:'FSM'},
            {path: 'vector', title: 'Vector Map', ab:'VM'}
        ]
    },{
        path: '/widgets',
        title: 'Widgets',
        type: 'link',
        icontype: 'widgets'

    },{
        path: '/charts',
        title: 'Charts',
        type: 'link',
        icontype: 'timeline'

    },{
        path: '/calendar',
        title: 'Calendar',
        type: 'link',
        icontype: 'date_range'
    },{
        path: '/pages',
        title: 'Pages',
        type: 'sub',
        icontype: 'image',
        collapse: 'pages',
        children: [
            {path: 'pricing', title: 'Pricing', ab:'P'},
            {path: 'timeline', title: 'Timeline Page', ab:'TP'},
            {path: 'login', title: 'Login Page', ab:'LP'},
            {path: 'register', title: 'Register Page', ab:'RP'},
            {path: 'lock', title: 'Lock Screen Page', ab:'LSP'},
            {path: 'user', title: 'User Page', ab:'UP'}
        ]
    }
];
@Component({
    selector: 'app-sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ps: any;
    isLogued = false;
    user: any;

    constructor(
        private autSvc: AuthService
        , public menuSvc: MenusByRolService
    ){

    }

    ngOnInit() {
        this.user = this.autSvc.getUserData();

        if(this.user){
            this.isLogued = true;
        }

        // this.menuItems = ROUTES.filter(menuItem => menuItem); // éste muestra el menú estático; el de abajo muestra lo que viene en el Json
        this.menuSvc.getMenus(this.user.email).subscribe((result: any) => {
            this.menuItems = result;
        });


        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
            this.ps = new PerfectScrollbar(elemSidebar);
        }
    }




    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };

   
    updatePS(): void  {
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            this.ps.update();
        }
    }
    isMac(): boolean {
        let bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    }

    
    async onLogout() {
        console.log('===onLogout');
        try{
            await this.autSvc.SignOut();
            this.isLogued = false;
        }
        catch(err){
            console.log(err);
        }
    }

   
}
