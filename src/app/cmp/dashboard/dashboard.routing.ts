import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { MasterPageComponent } from './master-page/master-page.component';

export const DashboardRoutes: Routes = [
    {

      path: '',
      children: [ 
        {path: 'dashboard', component: DashboardComponent},
        //{path: 'masterPage', component: MasterPageComponent}
  ]
}
];
