import { Component } from '@angular/core';
import { AppPrimeModule } from 'src/app/modules/prime-ng/prime-ng.module';

interface Calendario{
  ene: string;
  feb: string;
  mar: string;
  abr: string;
  may: string;
  jun: string;
  jul: string;
  ago: string;
  sep: string;
  oct: string;
  nov: string;
  dic: string;
}

@Component({
  selector: 'app-calendario-anual',
  standalone: true,
  imports: [AppPrimeModule],
  templateUrl: './calendario-anual.component.html',
  styleUrl: './calendario-anual.component.scss'
})
export class CalendarioAnualComponent {
  // calendario!: Calendario[];

  constructor() {}

  calendario: Calendario[] =
  [
    {
      ene: "12",
      feb: "12",
      mar: '12',
      abr: '12R',
      may: '12',
      jun: '12',
      jul: "12",
      ago: "12",
      sep: '12',
      oct: '12',
      nov: '12',
      dic: '12'
    }

  ];

  

 
}
