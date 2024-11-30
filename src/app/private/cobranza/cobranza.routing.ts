import { Routes } from '@angular/router';
import { ListaPolizasComponent } from './lista-polizas/lista-polizas.component';
import { NotasPolizaComponent } from './notas-poliza/notas-poliza.component';
import { PagosListaComponent } from './pagos-lista/pagos-lista.component';
import { CalendarioCobranzaComponent } from './calendario-cobranza/calendario-cobranza.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AgenteListaComponent } from './agente-lista/agente-lista.component';
import { RenovacionComponent } from './renovacion/renovacion.component';
import { NotificacionesSinEnviarComponent } from './notificaciones-sin-enviar/notificaciones-sin-enviar.component';

export const CobranzaRoutingModule: Routes = [
  {
    path: '',
    children: [
      { path: 'lista-polizas-vida', component: ListaPolizasComponent, canActivate: [AuthGuard] },
      { path: 'agentes', component: AgenteListaComponent, canActivate: [AuthGuard] },
      { path: 'renovacion', component: RenovacionComponent, canActivate: [AuthGuard] },
      { path: 'notas-poliza', component: NotasPolizaComponent, canActivate: [AuthGuard] },
      { path: 'pagos-lista', component: PagosListaComponent, canActivate: [AuthGuard] },
      { path: 'calendario', component: CalendarioCobranzaComponent, canActivate: [AuthGuard] },
      { path: 'notificaciones-sin-enviar', component: NotificacionesSinEnviarComponent, canActivate: [AuthGuard] },
    ]
  }
];