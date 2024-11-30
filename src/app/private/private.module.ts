import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PrivateRoutes } from './private.routing';
import { CobranzaModule } from './cobranza/cobranza.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(PrivateRoutes)
    // CobranzaModule,
  ]
})
export class PrivateModule { }
