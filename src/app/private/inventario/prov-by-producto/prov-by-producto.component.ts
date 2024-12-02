import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProdProveedor } from 'src/app/models/prod-proveedor';
import { Producto } from 'src/app/models/producto';
import { AppPrimeModule } from 'src/app/modules/prime-ng/prime-ng.module';
import { ProdProveedorService } from 'src/app/services/prod-proveedor.service';
import { ProdProveedorFormComponent } from '../prod-proveedor-form/prod-proveedor-form.component';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-prov-by-producto',
  standalone: true,
  imports: [AppPrimeModule, ProdProveedorFormComponent],
  templateUrl: './prov-by-producto.component.html',
  styleUrl: './prov-by-producto.component.scss',
  providers: [MessageService, ConfirmationService]

})
export class ProvByProductoComponent implements OnInit {
  clave: string | null = null;
  tipo: number | null = null;
  proveedores: ProdProveedor[];
  proveedor: ProdProveedor;
  detalleShow: boolean = false;

  constructor(private route: ActivatedRoute
    , private prodProvSvc: ProdProveedorService
    , private messageService: MessageService, private confirmationService: ConfirmationService
    , private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.clave = params['clave'];
      this.tipo = params['tipo'];
    });

    this.LoadProdProv(this.clave, this.tipo)

  }

  async LoadProdProv(claveProducto?: string, tipo?: number ) {
    this.prodProvSvc.GetProveedorByProducto(claveProducto, tipo).subscribe((result: any) => {
      if (result.complete) {
        this.proveedores = result.data;
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al intentar obtener los proveedores por producto. Error:' + result.errors, life: 7000 });
      }
    });
  }

  OpenDialog(item?: ProdProveedor){
    this.proveedor = item;

    this.detalleShow = true;
  }


  Delete(item: ProdProveedor){
    this.confirmationService.confirm({
      message: '¿Estás seguro de eliminar el proveedor para este producto <strong>' + item.nombreProveedor +
        '</strong>?',
      header: 'Eliminar proveedor',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.prodProvSvc.Delete(item.id).subscribe((res: any) => {
          if (res.complete) {
            this.proveedores = this.proveedores.filter((val) => val.id !== item.id);
            this.proveedor = {};
            this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Registro eliminado', life: 3000 });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al intentar eliminar el proveedor del producto. Error:' + res.errors, life: 7000 });
          }
        }, error => {
          this.messageService.add({ severity: 'error', summary: 'Error DELETE', detail: error.message, life: 7000 });
        }, () => { });
      }

    });
    

  }

  async onSave(form: NgForm){

  }


  toBack() {
    this.router.navigate(['/inventario/lista-productos']);
  }

  onDialog(event: any) {
    console.log('>>>on dialog', event);
    
    this.detalleShow = false;
    if (event.complete) {
      this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: event.message, life: 3000 });
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al intentar guardar el proveedor. Error:' + event.errors, life: 7000 });
    }

    this.LoadProdProv(this.clave, this.tipo)
  }

}
