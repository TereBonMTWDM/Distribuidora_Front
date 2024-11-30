import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
//import { MaterialModule } from 'src/app/app.module';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CobranzaRoutingModule } from './cobranza.routing';
import { RouterModule } from '@angular/router';

import { ListaPolizasComponent } from './lista-polizas/lista-polizas.component';
import { MasInfoPolizaComponent } from './mas-info-poliza/mas-info-poliza.component';
import { MomentPipe } from 'src/app/moment.pipe';


//Traslate of PrimeNg
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { HttpClient } from "@angular/common/http";

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json')
}


@NgModule({
  declarations: [
    // ListaPolizasComponent
    // MasInfoPolizaComponent
    // MomentPipe
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(CobranzaRoutingModule),
    
    MaterialModule,
    ReactiveFormsModule
    ,  TranslateModule.forRoot({
      defaultLanguage: 'es',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    })
    
  ],
  providers: [DatePipe]
})
export class CobranzaModule { }
