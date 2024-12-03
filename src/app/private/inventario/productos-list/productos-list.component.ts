import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Producto } from 'src/app/models/producto';
import { TipoProducto } from 'src/app/models/tipoProducto';
import { AppPrimeModule } from 'src/app/modules/prime-ng/prime-ng.module';
import { ProductosService } from 'src/app/services/productos.service';
import { TipoProductoService } from 'src/app/services/tipo-producto.service';
import { ProductoDetailComponent } from '../producto-detail/producto-detail.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productos-list',
  standalone: true,
  imports: [AppPrimeModule, ProductoDetailComponent], 
  templateUrl: './productos-list.component.html',
  styleUrl: './productos-list.component.scss',
  providers: [MessageService, ConfirmationService]
})
export class ProductosListComponent implements OnInit {
  productos: Producto[] = [];
  producto: Producto;
  tiposProductos: TipoProducto[];
  tipoProducto: TipoProducto;
  searchValue: string;
  detalleShow: boolean = false;
  isData: boolean = true;

  constructor(
    private productoSvc: ProductosService, private tiposProductosSvc: TipoProductoService
    , private messageService: MessageService, private confirmationService: ConfirmationService
    , private router: Router
  ) { }

  ngOnInit(): void {
    this.LoadProductos(); //'elec001', 1 ejemplo para inicilizar
    this.LoadTiposProductos();
  }

  async LoadProductos(claveProducto?: string, tipo?: number ) {
    this.productoSvc.GetProductos(claveProducto, tipo).subscribe((result: any) => {
      // console.log('prods: ', result);

      if (result.complete) {
        this.productos = result.data;
        // if(this.productos.length = 0){
        //   this.isData = true;
        // }
        // else{
        //   this.isData = false;
        // }
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al intentar obtener los productos. Error:' + result.errors, life: 7000 });
      }
    });
  }

  async LoadTiposProductos() {
    this.tiposProductosSvc.GetProductos().subscribe((result: any) => {
      // console.log('tipos: ', result);

      if (result.complete) {
        this.tiposProductos = result.data;
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al intentar obtener los productos. Error:' + result.errors, life: 7000 });
      }
    });
  }

  goProveedores(item: Producto){
    console.log('>>> prod: ', item);

    this.router.navigate(['/inventario/proveedor-producto'], {
      queryParams: { clave: item.clave, 
        tipo: item.idTipoProducto }
    });
    
    // this.router.navigate(['/inventario/proveedor-producto/', item.id])
  }

  selectTipo(event: any) {
    console.log(event);

    if (event.value != null) {
      this.tipoProducto = event.value;
    }
  }

  onBlurSearch(event: FocusEvent): void {
    this.searchValue = (event.target as HTMLInputElement).value;
  }

  Buscar(){
    console.log('texto: ', this.searchValue);
    
    this.LoadProductos(this.searchValue, this.tipoProducto.id);
  }

  OpenDialog(item?: Producto){
    this.producto = item;

    this.detalleShow = true;
  }

  onDialog(event: any)
  {
    console.log('event: ', event);

    this.detalleShow = false;
    if (event.complete) {
      this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: event.message, life: 7000 });
      this.LoadProductos(event.data.clave, event.data.idTipoProducto);
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al intentar guardar el producto. Error:' + event.errors, life: 7000 });
    }
    

  }

  Delete(item: Producto){
    console.log('item a eliminar: ', item);

    this.confirmationService.confirm({
      message: '¿Estás seguro de eliminar el producto <strong>' + item.nombre +
        '</strong>?',
      header: 'Eliminar producto',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productoSvc.Delete(item.id).subscribe((res: any) => {
          if (res.complete) {
            this.productos = this.productos.filter((val) => val.id !== item.id);
            this.producto = {};
            this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Registro eliminado', life: 7000 });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al intentar eliminar el producto. Error:' + res.errors, life: 7000 });
          }
        }, error => {
          this.messageService.add({ severity: 'error', summary: 'Error DELETE', detail: error.message, life: 7000 });
        }, () => { });
      }

    });
    

  }




}
