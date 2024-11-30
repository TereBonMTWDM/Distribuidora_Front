import { Component, Input, input, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Producto } from 'src/app/models/producto';
import { TipoProducto } from 'src/app/models/tipoProducto';
import { AppPrimeModule } from 'src/app/modules/prime-ng/prime-ng.module';
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
  tiposProductos: TipoProducto[];

  formulario: FormGroup = new FormGroup({
    claveProducto: new FormControl(''),
    numTelefono: new FormControl(''),
    nombreProducto: new FormControl(''),
    tipoProducto: new FormControl('')

  });


  constructor(
    private productoSvc: ProductosService, private tiposProductosSvc: TipoProductoService
    , private messageService: MessageService, private confirmationService: ConfirmationService
  ) { }

  ngOnChanges(changes: SimpleChanges){
    if (!!changes.producto && !!changes.producto.currentValue) {
      this.producto = changes.producto.currentValue;
      console.log('producto detail: ', this.producto);
      
    }

  }

  ngOnInit(): void {
    this.LoadTiposProductos();
  }

  async LoadTiposProductos() {
    this.tiposProductosSvc.GetProductos().subscribe((result: any) => {
      console.log('tipos: ', result);

      if (result.complete) {
        this.tiposProductos = result.data;
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al intentar obtener los productos. Error:' + result.errors, life: 7000 });
      }
    });
  }

  onSave(form: NgForm){

  }

  selectTipo(item: any){
    
  }
}
