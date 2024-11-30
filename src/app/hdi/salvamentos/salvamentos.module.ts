import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalvamentosRoutingModule } from './salvamentos-routing.module';
import { TestSalvamentosComponent } from './test-salvamentos/test-salvamentos.component';
import { VisorSalvamentosComponent } from './visor-salvamentos/visor-salvamentos.component';


@NgModule({
  declarations: [
    TestSalvamentosComponent,
    VisorSalvamentosComponent
  ],
  imports: [
    CommonModule,
    SalvamentosRoutingModule
  ]
})
export class SalvamentosModule { }
