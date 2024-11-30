import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import PerfectScrollbar from 'perfect-scrollbar';
import { PagosService } from 'src/app/services/pagos.service';
import { FechaCalendario, NotaCalendario } from 'src/app/models/fechaCalendario';
import { ReglasNegocioComponent } from '../reglas-negocio/reglas-negocio.component';
import { AppPrimeModule } from 'src/app/modules/prime-ng/prime-ng.module';

import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, PrimeNGConfig } from 'primeng/api';
import { Subscription } from 'rxjs';
import { MensajesService } from 'src/app/services/mensajes.service';


declare const $: any;

export interface EventosObject {
  title: string;
  start: Date;
  className: string;
}

@Component({
  selector: 'app-calendario-cobranza',
  standalone: true,
  imports: [AppPrimeModule, ReglasNegocioComponent],
  templateUrl: './calendario-cobranza.component.html',
  styleUrl: './calendario-cobranza.component.scss'
})
export class CalendarioCobranzaComponent implements OnInit {
  calendario!: FechaCalendario[];
  originalArray: FechaCalendario[] = [];
  notasCalendario: NotaCalendario[] = [];
  transformedArray: any;

  constructor(
    private pagosSvc: PagosService, private mensajesSvc: MensajesService
    , public translate: TranslateService, private config: PrimeNGConfig // Transtale PrimeNg
  ) {
   
  }

  changeLang(lang: string) {
  }


  ngOnInit(): void {
    this.LoadCalendario();
  }

  async LoadCalendario(): Promise<void> {
    this.originalArray = await this.pagosSvc.GetFechasCalendario().toPromise();
    this.transformedArray = this.originalArray.map(item => this.transformObject(item));

    this.notasCalendario = await this.mensajesSvc.GetNotasCalendarizadas().toPromise();
    const transformedArrayNotas = this.notasCalendario.map(item => this.transformObjectNotaCalendario(item));

    this.transformedArray = [...this.transformedArray, ...transformedArrayNotas];

    this.ViewCalendario(); 
  }


  ViewCalendario(): void {
    //Calendario widget:
    const $calendar = $('#fullCalendar');

    const today = new Date();
    const y = today.getFullYear();
    const m = today.getMonth();
    const d = today.getDate();

    $calendar.fullCalendar({
      viewRender: function (view: any, element: any) {
        // We make sure that we activate the perfect scrollbar when the view isn't on Month
        if (view.name != 'month') {
          var elem = $(element).find('.fc-scroller')[0];
          let ps = new PerfectScrollbar(elem);
        }
      },
      header: {
        left: 'title',
        center: 'month, agendaWeek, agendaDay',
        right: 'prev, next, today'
      },
      defaultDate: today,
      selectable: true,
      selectHelper: true,
      views: {
        month: { // name of view
          titleFormat: 'MMMM YYYY'
          // other view-specific options here
        },
        week: {
          titleFormat: ' MMMM D YYYY'
        },
        day: {
          titleFormat: 'D MMM, YYYY'
        }
      },

      select: function(start: any, end: any) {
        console.log('>>> ', start, end);
        

        // on select we show the Sweet Alert modal with an input
        swal.fire({
            title: 'Create an Event',
            html: '<div class="form-group">' +
                    '<input class="form-control" placeholder="Event Title" id="input-field">' +
                '</div>',
            showCancelButton: true,
            customClass:{
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger',
            },
            buttonsStyling: false
        }).then(function(result: any) {

            let eventData;
            const event_title = $('#input-field').val();

            if (event_title) {
                eventData = {
                    title: event_title,
                    start: start,
                    end: end
                };
                $calendar.fullCalendar('renderEvent', eventData, true); // stick? = true
            }

            $calendar.fullCalendar('unselect');

        });
    },

      editable: true,
      eventLimit: true, // allow "more" link when too many events

      // color classes: [ event-blue | event-azure | event-green | event-orange | event-red ]
      events: this.transformedArray

    })
  }



  //Show Reglas de Negocio
  reglasNegocioVisible: boolean = false;
  tipoRegla: string;
  showDialog() {
    this.tipoRegla = "CalendarioCobranza";
    this.reglasNegocioVisible = true;
  }




  transformObject(item: FechaCalendario): any {
    console.log('>>> item FECHA: ', item);
    
    return {
      title: item.asegurado || 'No Title',
      start: item.fechaVencimiento || new Date(),
      className: 'event-rose', //item.idRamo.toString() || "0"
      url: `~/#/cobranza/pagos-lista;id=${item.idCobranza}`
      // url: `~/#/cobranza/pagos-lista;id=6`
    };
  }

  transformObjectNotaCalendario(item: NotaCalendario): any {
    return {
      title: item.descripcion || 'No Title',
      start: item.fechaCalendario || new Date(),
      className: 'event-red', //item.idRamo.toString() || "0"
      // url: 'https://www.creative-tim.com/'
      //url: 'http://localhost:4200/#/cobranza/notas-poliza;id=6;asegurado=ELIZARRARAS%20CENDEJAS%20BENJAMIN;numTelefono=null;correoelectronico=null;numPoliza=115993297;inicioPoliza=2024-08-20T00:00:00;terminoPoliza=2030-08-19T00:00:00;plan=PROFESIONAL;agente=EUGENIA;primaTotal=2608.77;primaNeta=2551.36;psfp=1304.38;ultimoMsj=;tipoPoliza=Inicial;periodicidad=%5Bobject%20Object%5D;estatusCobro=%5Bobject%20Object%5D;compania=%5Bobject%20Object%5D;estatusPlan=Vigente;moneda=Dólares;conducto=%5Bobject%20Object%5D;pagoProgramado=null;fechaProxPago=0001-01-01T00:00:00;usuario='
      url: `~/#/cobranza/notas-poliza;id=${item.idCobranza}`
    };
  }

 


  
}

