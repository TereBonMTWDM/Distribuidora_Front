import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

//import * as moment from 'moment';

@Pipe({
  name: 'relativeDate', //'moment',
  standalone: true
})
export class MomentPipe implements PipeTransform {

  constructor(private datePipe: DatePipe) {}

  transform(value: Date | string | number): string {
    if (!value) return '';
    
    const date = new Date(value);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHrs = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHrs / 24);

    if (diffDays > 0) {
      return diffDays === 1 ? 'hace 1 día' : `hace ${diffDays} días`;
    } else if (diffHrs > 0) {
      return diffHrs === 1 ? 'hace 1 hora' : `hace ${diffHrs} horas`;
    } else if (diffMin > 0) {
      return diffMin === 1 ? 'hace 1 minuto' : `hace ${diffMin} minutos`;
    } else {
      return diffSec === 1 ? 'hace 1 segundo' : `hace ${diffSec} segundos`;
    }
  }
  // transform(value: Date | string | number): string {
  //   if (!value) return '';
    
  //   const date = new Date(value);
  //   const now = new Date();
  //   const diffMs = now.getTime() - date.getTime();
  //   const diffSec = Math.floor(diffMs / 1000);
  //   const diffMin = Math.floor(diffSec / 60);
  //   const diffHrs = Math.floor(diffMin / 60);
  //   const diffDays = Math.floor(diffHrs / 24);
    
  //   if (diffDays > 0) {
  //     return diffDays === 1 ? 'hace 1 día' : `hace ${diffDays} días`;
  //   } else if (diffHrs > 0) {
  //     return diffHrs === 1 ? 'hace 1 hora' : `hace ${diffHrs} horas`;
  //   } else if (diffMin > 0) {
  //     return diffMin === 1 ? 'hace 1 minuto' : `hace ${diffMin} minutos`;
  //   } else {
  //     return diffSec === 1 ? 'hace 1 segundo' : `hace ${diffSec} segundos`;
  //   }
  // }


  // transform(value: string, format: string = 'YYYY-MM-DD'): string {
  //   return moment(value).format(format)
  // }

}
