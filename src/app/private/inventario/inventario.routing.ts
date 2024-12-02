import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ProductosListComponent } from './productos-list/productos-list.component';
import { ProductoDetailComponent } from './producto-detail/producto-detail.component';
import { ProvByProductoComponent } from './prov-by-producto/prov-by-producto.component';

export const InventarioRoutingModule: Routes = [
    {
      path: '',
      children: [
        { path: 'lista-productos', component: ProductosListComponent, canActivate: [AuthGuard] },
        { path: 'detalle-producto', component: ProductoDetailComponent, canActivate: [AuthGuard] },
        // { path: 'proveedor-producto/:id', component: ProvByProductoComponent }, // , canActivate: [AuthGuard]
        { path: 'proveedor-producto', component: ProvByProductoComponent }, // , canActivate: [AuthGuard]
      ]
    }
  ];