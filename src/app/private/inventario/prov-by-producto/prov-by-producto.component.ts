import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProdProveedor } from 'src/app/models/prod-proveedor';
import { Producto } from 'src/app/models/producto';
import { AppPrimeModule } from 'src/app/modules/prime-ng/prime-ng.module';
import { ProdProveedorService } from 'src/app/services/prod-proveedor.service';
import { ProdProveedorFormComponent } from '../prod-proveedor-form/prod-proveedor-form.component';
import { NgForm } from '@angular/forms';
import { ProductosService } from 'src/app/services/productos.service';

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
  producto: Producto;
  prodProveedores: ProdProveedor[];
  prodProveedor: ProdProveedor;
  detalleShow: boolean = false;

  constructor(private route: ActivatedRoute
    , private productoSvc: ProductosService, private prodProvSvc: ProdProveedorService
    , private messageService: MessageService, private confirmationService: ConfirmationService
    , private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.clave = params['clave'];
      this.tipo = params['tipo'];
    });
    this.LoadProducto(this.clave, this.tipo)
    this.LoadProdProv(this.clave, this.tipo)

  }

  async LoadProducto(claveProducto?: string, tipo?: number ) {
    this.productoSvc.GetProductos(claveProducto, tipo).subscribe((result: any) => {
      // console.log('prods: ', result);

      if (result.complete) {
        this.producto = result.data[0];
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al intentar obtener el producto. Error:' + result.errors, life: 7000 });
      }
    });
  }

  async LoadProdProv(claveProducto?: string, tipo?: number ) {
    this.prodProvSvc.GetProveedorByProducto(claveProducto, tipo).subscribe((result: any) => {
      if (result.complete) {
        this.prodProveedores = result.data;
        console.log('prod-prov: ', this.prodProveedores);
        
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al intentar obtener los proveedores por producto. Error:' + result.errors, life: 7000 });
      }
    });
  }

  OpenDialog(item?: ProdProveedor){
    this.prodProveedor = item;

    this.detalleShow = true;
  }


  Delete(item: ProdProveedor){
    this.confirmationService.confirm({
      message: '¿Estás seguro de eliminar el proveedor para este producto <strong>' + item.nombreProducto +
        '</strong>?',
      header: 'Eliminar proveedor',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.prodProvSvc.Delete(item.id).subscribe((res: any) => {
          if (res.complete) {
            this.prodProveedores = this.prodProveedores.filter((val) => val.id !== item.id);
            this.prodProveedor = {};
            this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Registro eliminado', life: 7000 });
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
      this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: event.message, life: 7000 });
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al intentar guardar el proveedor. Error:' + event.errors, life: 7000 });
    }

    this.LoadProdProv(this.clave, this.tipo)
  }

}
