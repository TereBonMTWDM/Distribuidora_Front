import { Component, ElementRef, OnInit, QueryList, viewChild, ViewChildren } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

//Services:
import { EstaticosService } from 'src/app/services/estaticos.service';
import { CobranzaService } from 'src/app/services/cobranza.service';

//Models:
import { Cobranza } from 'src/app/models/cobranza';

import { AppPrimeModule } from 'src/app/modules/prime-ng/prime-ng.module';
import { MasInfoPolizaComponent } from '../mas-info-poliza/mas-info-poliza.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { Router } from '@angular/router';
import { PagosService } from 'src/app/services/pagos.service';
import { CalendarioCobranzaComponent } from '../calendario-cobranza/calendario-cobranza.component';
import { ReglasNegocioComponent } from '../reglas-negocio/reglas-negocio.component';
import { PdfPolizaComponent } from '../pdf-poliza/pdf-poliza.component';

@Component({
  selector: 'app-lista-polizas',
  standalone: true,
  imports: [AppPrimeModule, NgxExtendedPdfViewerModule
    , MasInfoPolizaComponent, CalendarioCobranzaComponent, ReglasNegocioComponent
    , PdfPolizaComponent
  ],
  templateUrl: './lista-polizas.component.html',
  // styleUrl: './lista-polizas.component.scss'
  styles: [
    `:host ::ng-deep .p-dialog .product-image {
        width: 150px;
        margin: 0 auto 2rem auto;
        display: block;
    }`
  ],
  providers: [MessageService, ConfirmationService]
})
export class ListaPolizasComponent {
  @ViewChildren('itemCobranza') itemCobranza!: QueryList<ElementRef>;
  productDialog: boolean = false;
  polizas!: Cobranza[];
  poliza!: Cobranza;
  selectedProducts!: Cobranza[] | null;
  submitted: boolean = false;
  statusesCobro!: any[];
  companias!: any[];
  searchValue: string | undefined;
  titlePopupPDF: string;

  constructor(
    private estaticosSvc: EstaticosService
    , private cobranzaSvc: CobranzaService, private pagoSvc: PagosService
    , private messageService: MessageService, private confirmationService: ConfirmationService
    , private router: Router
  ) { }

  ngOnInit() {
    this.LoadPolizas();
    this.LoadCompanias();
    this.LoadTiposMensajes(); // que son los últimos mensajes enviados

  }

  async LoadPolizas() {
    this.cobranzaSvc.GetCobranzaActiva(1).subscribe((result: any) => {
      if(result.complete){
        this.polizas = result.data;
      } else{
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Error al intentar obtener la Cobranza. Error:' + result.errors, life: 7000});
      }
    });
  }

  async LoadCompanias() {
    this.estaticosSvc.GetCompanias().subscribe((result: any) => {
      this.companias = result;
    });
  }

  async LoadTiposMensajes() {
    this.estaticosSvc.GetTiposMensajes().subscribe((result: any) => {
      this.statusesCobro = result;
    });
  }

  async LoadPolizasPasivas() {
    this.cobranzaSvc.GetCobranzaPasiva(1).subscribe((result: any) => {
      if(result.complete){
        this.polizas = result.data;
      } else{
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Error al intentar obtener la Cobranza. Error:' + result.errors, life: 7000});
      }
    });

  }

  openNew() {
    this.poliza = {};
    this.submitted = false;
    this.productDialog = true;
  }

  editProduct(product: Cobranza) {
    this.poliza = { ...product };
    this.productDialog = true;
  }

  // aplicarPago(item: Cobranza) {
  //   this.confirmationService.confirm({
  //     message: '¿Estás seguro de aplicar el pago al cliente <strong>' + item.asegurado + '</strong> parar su siguiente pago parcial o total?',
  //     header: 'Aplicar pago',
  //     icon: 'pi pi-question-circle',
  //     accept: () => {
  //       this.pagoSvc.AplicarPago(item.id).subscribe((result: any) => {
  //         if (result.complete) {
  //           //this.polizas = this.polizas.filter((val) => val.id !== item.id);//  ésto quita del listado la póliza aplicada
  //           this.LoadPolizas();
  //           this.poliza = {};
  //           this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Pago aplicado', life: 3000 });
  //         }
  //         else {
  //           this.messageService.add({
  //             severity: 'error', summary: 'Error'
  //             , detail: 'Error al intentar aplicar el pago. Error:' + result.errors, life: 3000
  //           });
  //         }
  //       }, error => {
  //         this.messageService.add({ severity: 'error', summary: 'Error APLY', detail: error.message, life: 3000 });
  //         // console.log(error);
  //       }, () => {
  //       });
  //     }
  //   });
  // }

  CancelarCobranza(item: Cobranza) {
    this.confirmationService.confirm({
      message: '¿Estás seguro de cancelar la cobranza para el cliente <strong>' + item.asegurado +
        '</strong>?, esta acción cambiará al estatus <strong>Cancelado</strong>.',
      header: 'Cancelar cobranza',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.cobranzaSvc.CancelarClobranza(item.id).subscribe((res: any) => {
          if(res.complete){
            this.polizas = this.polizas.filter((val) => val.id !== item.id);
            this.poliza = {};
            this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Cobranza cancelada', life: 3000 });
          } else {
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'Error al intentar cancelar la Póliza. Error:' + res.errors, life: 7000});
          }
        }, error => {
          this.messageService.add({ severity: 'error', summary: 'Error CANCEL', detail: error.message, life: 7000 });
        }, () =>{});
      }

    });
  }



  ClonarCobranza(item: Cobranza) {
    this.confirmationService.confirm({
      message: '¿Estás seguro de clonar la información de esta Cobranza: <strong>' + item.asegurado +
        '</strong>?, se creará un nuevo registro.',
      header: 'Clonar cobranza',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.cobranzaSvc.ClonarClobranza(item.id).subscribe((result: any) => {
          if (result.complete) {
            this.poliza = result.data;
            this.polizas.push(this.poliza);
            this.polizas = [...this.polizas];
            this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Cobranza clonada', life: 3000 });

            setTimeout(() => this.ChangeStyleItem(), 0);  // Aplicar estilo después de actualizar el DOM; con esto me aseguro de que la tabla "dinámica" se actualiza antes de que le meta el estilo
          }
          else {
            this.messageService.add({
              severity: 'error', summary: 'Error', detail: 'Error al intentar clonar la Cobranza. Error:' + result.errors, life: 7000
            });
          }
        }, error => {
          this.messageService.add({ severity: 'error', summary: 'Error CLON', detail: error.message, life: 7000 });
          console.log(error);
        }, () => {
        });
      }
    });
  }

  clear(table: Table) {
    table.clear();
    this.searchValue = ''
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;

    // if (this.poliza.id.toString()?.trim()) { // aquí era NAME
    //   if (this.poliza.id) {
    //     this.poliza[this.findIndexById(this.poliza.id.toString())] = this.poliza;
    //     //   this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
    //   } else {
    //     this.poliza.id = this.createId();
    //     // this.product.image = 'product-placeholder.svg';
    //     this.polizas.push(this.poliza);
    //     //   this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
    //   }

    //   this.polizas = [...this.polizas];
    //   this.productDialog = false;
    //   this.poliza = {};
    // }
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.polizas.length; i++) {
      if (this.polizas[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  getSeverityEstatusCobro(status: string) {
    switch (status) {
      case 'Día 1 previo a vencimiento':
      case 'Día 15 previo a vencimiento':
        return 'success';

      case 'Día 25 previo a vencimiento':
        return 'warning';

      case 'Día del pago':
      case 'Día 33 en prórroga':
      case 'Día 43 en prórroga':
      case 'Día 60 en prórroga':
        return 'danger';

      default:
        return 'secondary';

      // case 'Cancelado':
      // case 'Cobrado':
      //   return 'secondary';

      // case 'Inicial':
      // case '2da llamada':
      // case 'Prórroga inicial':
      // case 'Prórroga 2da llamada':
      //   return 'success';

      // case '3er llamada':
      // case 'Prórroga 3er llamada':
      //   return 'warning';

      // case 'Día de pago':
      // case 'Prórroga día de pago':
      //   return 'danger';

      // case 'Cancelado':
      // case 'Cobrado':
      //   return 'secondary';
    }
  }



  getLogoCompania(compania: string) {
    switch (compania) {
      case 'GNP':
        return '/assets/images/companias/gnp-seguros.png';
      case 'HDI':
        return '/assets/images/companias/hdi_logo.png';
      case 'QUÁLITAS':
        return '/assets/images/companias/qualitas_logo.png';
    }
  }


  showOverlay(event: Event, overlayPanel: any) {
    overlayPanel.show(event);
  }

  hideOverlay(overlayPanel: any) {
    overlayPanel.hide();
  }



  //dialog PDF
  pdfVisible: boolean = false;
  showPdfDialog(item: Cobranza) {
    this.poliza = item;
    this.titlePopupPDF = "PDF Póliza - " + this.poliza.numPoliza;
    this.pdfVisible = true;
  }
  //end dialog PDF


  goNotas(poliza: Cobranza) {
    this.router.navigate(['/cobranza/notas-poliza', poliza])
  }

  goPagos(poliza: Cobranza) {
    this.router.navigate(['/cobranza/pagos-lista', poliza])
  }



  //Show Reglas de Negocio
  reglasNegocioVisible: boolean = false;
  tipoRegla: string;
  showDialog() {
    this.tipoRegla = "ListaPoliza";
    this.reglasNegocioVisible = true;
  }



  //Filtro cobranza Activa/Pasiva
  alcanceCobranza: any[] = [{ label: 'Cobranza Activa', value: 'activa' }, { label: 'Otras', value: 'otras' }];
  alcanceCobranzaValue: string = 'activa'; // por default

  onOptionClickCobranzaActiva(event: any) {
    if (event.index == 0) {
      this.LoadPolizas();
    }
    else {
      this.LoadPolizasPasivas();

    }
  }


  ChangeStyleItem() {
    // Verifica que haya filas y accede a la última
    const ultimaFila = this.itemCobranza.last;

    if (ultimaFila) {
      // Cambiar el estilo del último <tr>
      ultimaFila.nativeElement.style.backgroundColor = 'yellow';  // Cambiar el fondo a amarillo
      ultimaFila.nativeElement.style.fontWeight = 'bold';  // Cambiar el peso de la fuente a negrita
    }
  }

}
