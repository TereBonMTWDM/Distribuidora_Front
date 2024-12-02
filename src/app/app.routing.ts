import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './cmp/layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './cmp/layouts/auth/auth-layout.component';

export const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'bienvenida',
        pathMatch: 'full',
    }, {
        path: '',
        component: AdminLayoutComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./cmp/dashboard/dashboard.module').then(m => m.DashboardModule)
            }
            , {
                path: '',
                loadChildren: () => import('./private/private.module').then(m => m.PrivateModule)
            }
            , {
                path: 'inventario',
                loadChildren: () => import('./private/inventario/inventario.module').then(m => m.InventarioModule)
            }
,
            // , {
            //     path: 'cobranza',
            //     loadChildren: () => import('./private/cobranza/cobranza.module').then(m => m.CobranzaModule)
            // }, 
            // {
            //     path: 'components',
            //     loadChildren: () => import('./cmp/components/components.module').then(m => m.ComponentsModule)
            // }, {
            //     path: 'forms',
            //     loadChildren: () => import('./cmp/forms/forms.module').then(m => m.Forms)
            // }, {
            //     path: 'tables',
            //     loadChildren: () => import('./cmp/tables/tables.module').then(m => m.TablesModule)
            // }, {
            //     path: 'maps',
            //     loadChildren: () => import('./cmp/maps/maps.module').then(m => m.MapsModule)
            // }, {
            //     path: 'widgets',
            //     loadChildren: () => import('./cmp/widgets/widgets.module').then(m => m.WidgetsModule)
            // }, {
            //     path: 'charts',
            //     loadChildren: () => import('./cmp/charts/charts.module').then(m => m.ChartsModule)
            // }, {
            //     path: 'calendar',
            //     loadChildren: () => import('./cmp/calendar/calendar.module').then(m => m.CalendarModule)
            // }, {
            //     path: '',
            //     loadChildren: () => import('./cmp/userpage/user.module').then(m => m.UserModule)
            // }, {
            //     path: '',
            //     loadChildren: () => import('./cmp/timeline/timeline.module').then(m => m.TimelineModule)
            // }
        ]
    }, {
        path: '',
        component: AuthLayoutComponent,
        children: [{
            path: 'pages',
            loadChildren: () => import('./cmp/pages/pages.module').then(m => m.PagesModule)
        }]
    }
];
