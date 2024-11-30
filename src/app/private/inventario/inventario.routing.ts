import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ProductosListComponent } from './productos-list/productos-list.component';

export const InventarioRoutingModule: Routes = [
    {
      path: '',
      children: [
        { path: 'lista-productos', component: ProductosListComponent, canActivate: [AuthGuard] },
        
      ]
    }
  ];