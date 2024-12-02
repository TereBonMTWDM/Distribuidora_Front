import { Component, Input, input, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProdProveedor } from 'src/app/models/prod-proveedor';
import { Producto } from 'src/app/models/producto';
import { TipoProducto } from 'src/app/models/tipoProducto';
import { AppPrimeModule } from 'src/app/modules/prime-ng/prime-ng.module';
import { ProdProveedorService } from 'src/app/services/prod-proveedor.service';
import { ProductosService } from 'src/app/services/productos.service';
import { TipoProductoService } from 'src/app/services/tipo-producto.service';

@Component({
  selector: 'app-producto-detail',
  standalone: true,
  imports: [AppPrimeModule],
  templateUrl: './producto-detail.component.html',
  styleUrl: './producto-detail.component.scss'
})
export class ProductoDetailComponent implements OnInit {
  @Input() producto: Producto;
  // productos: Producto[];
  tipoProducto: TipoProducto;
  tiposProductos: TipoProducto[];
  proveedores: ProdProveedor[];
  detalleShowEdit: boolean = false;

  formulario: FormGroup = new FormGroup({
    clave: new FormControl(''),
    nombre: new FormControl(''),
    tipoProducto: new FormControl('')

  });


  constructor(
    private productoSvc: ProductosService, private tiposProductosSvc: TipoProductoService, private prodProvSvc: ProdProveedorService
    , private messageService: MessageService, private confirmationService: ConfirmationService
  ) { 
   
  }

  ngOnChanges(changes: SimpleChanges){
    if (!!changes.producto && !!changes.producto.currentValue) {
      this.producto = changes.producto.currentValue;
      console.log('producto detail: ', this.producto);

      if(this.producto.id){
        this.getProducto();
        
      }
      else{
        this.formulario = new FormGroup({
          clave: new FormControl(''),
          nombre: new FormControl(''),
          tipoProducto: new FormControl('')
      
        });

      }
      
    }

  }

  ngOnInit(): void {
    this.LoadTiposProductos();
  }

  getProducto(){
    this.tipoProducto = this.tiposProductos.find(x => x.id === Number(this.producto.idTipoProducto));
    
    this.formulario = new FormGroup({
      clave: new FormControl(this.producto.clave),
      nombre: new FormControl(this.producto.nombre),
      tipoProducto: new FormControl(this.producto.tipoProducto)
    });

    this.LoadProdProv(this.producto.clave, this.producto.idTipoProducto);
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


  async LoadTiposProductos() {
    this.tiposProductosSvc.GetProductos().subscribe((result: any) => {
      if (result.complete) {
        this.tiposProductos = result.data;
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al intentar obtener los productos. Error:' + result.errors, life: 7000 });
      }
    });
  }

  onSave(form: NgForm){

  }

  selectTipo(event: any) {
    console.log(event);

    if (event.value != null) {
      this.tipoProducto = event.value;
    }
  }

  // OpenDialog(item?: ProdProveedor){
  //   this.producto = item;

  //   this.detalleShowEdit = true;
  // }

  onDialog(event: any)
  {
    console.log('event: ', event);
    

  }

  Delete(item: ProdProveedor){
    console.log('item a eliminar: ', item);

    this.confirmationService.confirm({
      message: '¿Estás seguro de eliminar la asignación del Proveedor con el Producto <strong>' + item.nombreProveedor +
        '</strong>?',
      header: 'Eliminar producto',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productoSvc.Delete(item.id).subscribe((res: any) => {
          if (res.complete) {
            this.proveedores = this.proveedores.filter((val) => val.id !== item.id);
            this.producto = {};
            this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Registro eliminado', life: 3000 });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al intentar eliminar el registro. Error:' + res.errors, life: 7000 });
          }
        }, error => {
          this.messageService.add({ severity: 'error', summary: 'Error DELETE', detail: error.message, life: 7000 });
        }, () => { });
      }

    });
    

  }



}
