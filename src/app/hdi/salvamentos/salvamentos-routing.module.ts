import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestSalvamentosComponent } from './test-salvamentos/test-salvamentos.component';
import { VisorSalvamentosComponent } from './visor-salvamentos/visor-salvamentos.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'test-salvamentos', component: TestSalvamentosComponent },
      { path: 'visor-salvamentos', component: VisorSalvamentosComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalvamentosRoutingModule { }
