import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HdiTestComponent } from './hdi-test/hdi-test.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'hdi-test', component: HdiTestComponent }
      , {
        path: 'salvamentos',
        loadChildren: () => import('./salvamentos/salvamentos.module').then(m => m.SalvamentosModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HdiRoutingModule { }
