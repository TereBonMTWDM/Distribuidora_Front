import { Routes } from '@angular/router';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

export const PrivateRoutes: Routes = [
  {
    path: '',
    children: [{
      path: 'bienvenida', component: BienvenidaComponent, canActivate: [AuthGuard] }
    ]
  }
];