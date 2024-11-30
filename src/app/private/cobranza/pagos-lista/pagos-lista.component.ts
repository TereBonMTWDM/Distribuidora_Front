import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cobranza } from 'src/app/models/cobranza';
import { Pago } from 'src/app/models/pagos';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { AppPrimeModule } from 'src/app/modules/prime-ng/prime-ng.module';
import { PagosService } from 'src/app/services/pagos.service';
import { ReglasNegocioComponent } from '../reglas-negocio/reglas-negocio.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CobranzaService } from 'src/app/services/cobranza.service';

@Component({
  selector: 'app-pagos-lista',
  standalone: true,
  imports: [AppPrimeModule,  MaterialModule, ReglasNegocioComponent],
  templateUrl: './pagos-lista.component.html',
  styleUrl: './pagos-lista.component.scss',
  providers: [MessageService, ConfirmationService]
})
export class PagosListaComponent {
  idCobranza: number;
  pagos!: Pago[];
  cobranza!: Cobranza;
  proxPago: string;
  isDisabledAplicar: boolean = true;
  isEnableDesaplicar: boolean = false;

  constructor(
    private route: ActivatedRoute
    , private pagoSvc: PagosService, private cobranzaSvc: CobranzaService
    , private messageService: MessageService, private confirmationService: ConfirmationService
    , private router: Router
  ){
    this.route.params.subscribe((params: Cobranza) =>{ 
      this.idCobranza = params.id;
      this.cobranza = params;

      // if(this.cobranza.numPoliza === undefined){ // CHANGE por Num Pólia: asegurado
      //   this.LoadPoliza(this.idCobranza);//trae de la BD porque viene de Calendario
      // }
        this.LoadPoliza(this.idCobranza);//trae de la BD porque viene de Calendario
    });
  }

  ngOnInit(): void {
    // this.LoadProgrPagos();
  }

  LoadProgrPagos(){
    this.pagoSvc.GetProgramacionPagos(this.idCobranza).subscribe((result: any) => {
      if(result.complete){
        this.pagos = result.data;
  
        //validar si el Próximo Pago ya tiene Montos de Primas capturadas:
        const proximoPago = this.pagos.find(p => p.fechaVencimiento == this.cobranza.fechaProxPago);
  
        if (proximoPago.primaNeta === null || proximoPago.primaTotal === null) {
          //no tiene Montos capturados
          // this.messageService.add({severity:'error', summary: 'Error', detail:'No hay montos de Primas capturadas para este periodo. Primero renueva la Póliza.', life: 7000 });
          this.isDisabledAplicar = true;
        }
        else {
          this.isDisabledAplicar = false;
        }
  
        this.isEnableDesaplicar = this.pagos[0]["usuario"] == '' ? true : false;

      } else {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Error al intentar obtener los Pagos Programados. Error:' + result.errors, life: 7000});
      }
    });
  }

  
  async LoadPoliza(idcobranza: number) {
    this.cobranzaSvc.GetCobranzaById(idcobranza).subscribe((result: any) => {
      if(result.complete){
        this.cobranza = result.data[0];
        this.LoadProgrPagos();
      } else{
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Error al intentar obtener la Cobranza. Error:' + result.errors, life: 7000});
      }
    });
  }

  async AplicarSiguientePago() {
    this.confirmationService.confirm({
      message: '¿Estás seguro de aplicar el pago al cliente <strong>' + this.cobranza.asegurado + '</strong> por <strong>' + this.cobranza.primaNeta
        + ' </strong> para su siguiente pago parcial o total?',
      header: 'Aplicar pago',
      icon: 'pi pi-question-circle',
      accept: () => {
        this.pagoSvc.AplicarPago(this.cobranza.id).subscribe(async (result: any) => {
          if (result.complete) {
            await this.LoadPoliza(this.cobranza.id); // pra actualizar cabecera
            this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Pago aplicado', life: 3000 });
          }
          else {
            this.messageService.add({
              severity: 'error', summary: 'Error', detail: 'Error al intentar aplicar el pago. Error:' + result.errors, life: 7000
            });
          }
        }, error => {
          this.messageService.add({ severity: 'error', summary: 'Error APLY', detail: error.message, life: 7000 });
          console.log(error);
        }, () => {
        });

      }
    });
  }

  DesaplicarSiguientePago() {
    this.confirmationService.confirm({
      message: '¿Estás seguro de des-aplicar el último pago del cliente <strong>' + this.cobranza.asegurado + '</strong>?',
      header: 'Aplicar pago',
      icon: 'pi pi-question-circle',
      accept: () => {
        this.pagoSvc.DesaplicarPago(this.cobranza.id).subscribe((result: any) => {
          if (result.complete) {
            this.LoadProgrPagos();
            this.LoadPoliza(this.cobranza.id); // pra actualizar cabecera
            this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Pago des-aplicado', life: 3000 });
          }
          else {
            this.messageService.add({
              severity: 'error', summary: 'Error'
              , detail: 'Error al intentar aplicar el pago. Error:' + result.errors, life: 3000
            });
          }
        }, error => {
          this.messageService.add({ severity: 'error', summary: 'Error UNAPLY', detail: error.message, life: 7000 });
          console.log(error);
        }, () => {
        });

      }
    });
  }

  //Show Reglas de Negocio
  reglasNegocioVisible: boolean = false;
  tipoRegla: string;
  showDialog() {
      this.tipoRegla = "ListaProgrmacionPagos";
      this.reglasNegocioVisible = true;
  }


  toBack() {
    this.router.navigate(['/cobranza/lista-polizas-vida']);
  }
}
