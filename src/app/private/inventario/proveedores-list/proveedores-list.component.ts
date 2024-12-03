import { Component, OnInit } from '@angular/core';
import { AppPrimeModule } from '../../../modules/prime-ng/prime-ng.module';
import { Proveedor } from '../../../models/proveedor';
import { ProveedoresService } from '../../../services/proveedores.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProveedorDetailComponent } from '../proveedor-detail/proveedor-detail.component';

@Component({
  selector: 'app-proveedores-list',
  standalone: true,
  imports: [AppPrimeModule, ProveedorDetailComponent],
  templateUrl: './proveedores-list.component.html',
  styleUrl: './proveedores-list.component.scss',
  providers: [MessageService, ConfirmationService]
})
export class ProveedoresListComponent implements OnInit{
  proveedor: Proveedor;
  proveedores: Proveedor[] = [];
  detalleShow: boolean = false;

  constructor(
    private proveedorSvc: ProveedoresService
    , private messageService: MessageService, private confirmationService: ConfirmationService
  ) { }


  ngOnInit(): void {
    this.LoadProveedores();
  }

  async LoadProveedores() {
    this.proveedorSvc.GetProveedores().subscribe((result: any) => {
      if (result.complete) {
        this.proveedores = result.data;
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al intentar obtener los proveedores. Error:' + result.errors, life: 7000 });
      }
    });
  }


  OpenDialog(item?: Proveedor){
    this.proveedor = item;

    this.detalleShow = true;
  }


  onDialog(event: any)
  {
    this.detalleShow = false;
    if (event.complete) {
      // if(this.proveedor === undefined){
      //   this.proveedores.push(event.data);
      // }
      // else{
      //   this.proveedores = [...this.proveedores];
      // }

      this.LoadProveedores();

      this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: event.message, life: 7000 });
      
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al intentar guardar el proveedor. Error:' + event.errors, life: 7000 });
    }
    

  }


  Delete(item: Proveedor){
    console.log('item a eliminar: ', item);

    this.confirmationService.confirm({
      message: '¿Estás seguro de eliminar el proveedor <strong>' + item.nombre +
        '</strong>?',
      header: 'Eliminar proveedor',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.proveedorSvc.Delete(item.id).subscribe((res: any) => {
          if (res.complete) {
            this.proveedores = this.proveedores.filter((val) => val.id !== item.id);
            this.proveedor = {};
            this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Registro eliminado', life: 7000 });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al intentar eliminar el proveedor. Error:' + res.errors, life: 7000 });
          }
        }, error => {
          this.messageService.add({ severity: 'error', summary: 'Error DELETE', detail: error.message, life: 7000 });
        }, () => { });
      }

    });
    

  }

}
