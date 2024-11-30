import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Cobranza } from 'src/app/models/cobranza';

import { AppPrimeModule } from 'src/app/modules/prime-ng/prime-ng.module';

@Component({
  selector: 'app-mas-info-poliza',
  standalone: true,
  imports: [AppPrimeModule],
  templateUrl: './mas-info-poliza.component.html',
  styleUrl: './mas-info-poliza.component.scss'
})
export class MasInfoPolizaComponent implements OnInit{
  @Input('datosPoliza') poliza: Cobranza;
  constructor(){
    
  }
  // ngOnChanges(changes: SimpleChanges) {
  //   console.log('>>>', changes)
  //   if (!!changes.poliza && !!changes.poliza.currentValue) {
  //     this.poliza = changes.poliza.currentValue;

  //   }
  // }

  ngOnInit(): void {
    // console.log('\x1b[42m%s\x1b[0m', 'Hello src\app\private\cobranza\mas-info-poliza\mas-info-poliza.component.ts:27', this.poliza);
  }
 
  
  getSeverityEstatusPlan(status: string) {
    switch (status) {
      case 'VIGENTE':
        return 'success';
      case 'POR VENCER':
        return 'warning';
      case 'VENCIDO':
        return 'danger';
    }
  }


getLogoMoneda(moneda: string) {
  switch (moneda) {
    case 'Nacional':
      return '/assets/images/mexico_flag.png';
    case 'Dólares':
      return '/assets/images/eeuu_flag.png';
  }
}



}
