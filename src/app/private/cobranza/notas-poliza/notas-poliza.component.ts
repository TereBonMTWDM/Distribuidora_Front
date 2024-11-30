import { Component, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppPrimeModule } from 'src/app/modules/prime-ng/prime-ng.module';
import { NotaDetalleComponent } from '../nota-detalle/nota-detalle.component';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { Cobranza } from 'src/app/models/cobranza';
import { MensajesService } from 'src/app/services/mensajes.service';
import { Mensaje } from 'src/app/models/mensaje';
import { param } from 'jquery';
import { ReglasNegocioComponent } from '../reglas-negocio/reglas-negocio.component';
import { CobranzaService } from 'src/app/services/cobranza.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-notas-poliza',
  standalone: true,
  imports: [AppPrimeModule, NotaDetalleComponent, MaterialModule, ReglasNegocioComponent],
  templateUrl: './notas-poliza.component.html',
  styleUrl: './notas-poliza.component.scss',
  providers: [MessageService]
})
export class NotasPolizaComponent {
  idCobranza: number;
  mensajes: Mensaje;
  notaDialogVisible: boolean;
  iconoMsj: string;
  totalMsjs: number;
  cobranza: Cobranza;

  constructor(
      private msjSvc: MensajesService, private cobranzaSvc: CobranzaService
    , private messageService: MessageService
    , private router: Router
    , private route: ActivatedRoute
  ){
    this.route.params.subscribe((params: Cobranza) =>{ 
      this.idCobranza = params.id;
      this.cobranza = params;
      if(this.cobranza.numPoliza === undefined){
        this.LoadPoliza(this.idCobranza);//trae de la BD porque viene de Calendario
      }
    });
  }

  ngOnInit() {
    this.LoadNotasMensajes();
  }

  async LoadNotasMensajes() {
    this.msjSvc.GetNotasMensajes(this.idCobranza).subscribe((result: any) => {
      if(result.complete){
        if(result.data.length > 0){
          this.mensajes = result.data;
          this.totalMsjs = result.total;
        } else{
          this.totalMsjs = 0;
        }
      } else {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Error al intentar obtener la Notas y Mensajes. Error:' + result.errors, life: 7000});
      }
    });
  }


  async LoadPoliza(idcobranza: number) {
    this.cobranzaSvc.GetCobranzaById(idcobranza).subscribe((result: any) => {
      if(result.complete){
        this.cobranza = result.data[0];
      } else{
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Error al intentar obtener la Cobranza. Error:' + result.errors, life: 7000});
      }
    });
  }




  toBack() {
    this.router.navigate(['/cobranza/lista-polizas-vida']);
  }

  //dialog Nota
  addNota() {
      this.notaDialogVisible = true;
  }
  //end dialog Nota

  onDialogReturn(item: any){
    this.notaDialogVisible = false;

    this.LoadNotasMensajes();
  }

  getSeverityTipoNota(tipo: number){
    switch(tipo){
      case 0:
        return 'warning';
      case 1:
        return 'info'; // para correo
    }
  }

  getSeverityTipoNotaBadgeClass(tipo: number){
    switch(tipo){
      case 0:
        return 'badge-warning';
      case 1:
        return 'badge-info'; // para correo; falta el de Whats, si es necesario
    }
  }


    //Show Reglas de Negocio
    reglasNegocioVisible: boolean = false;
    tipoRegla: string;
    showDialog() {
        this.tipoRegla = "NotasPoliza";
        this.reglasNegocioVisible = true;
    }
  


}
