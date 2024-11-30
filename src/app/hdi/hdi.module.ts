import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HdiRoutingModule } from './hdi-routing.module';
import { HdiTestComponent } from './hdi-test/hdi-test.component';
import { SalvamentosModule } from './salvamentos/salvamentos.module';


@NgModule({
  declarations: [
    HdiTestComponent
  ],
  imports: [
    CommonModule,
    HdiRoutingModule,
    SalvamentosModule,
  ]
})
export class HdiModule { }
