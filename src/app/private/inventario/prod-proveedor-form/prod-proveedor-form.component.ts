import { Component, Input, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProdProveedor } from 'src/app/models/prod-proveedor';
import { Producto } from 'src/app/models/producto';
import { Proveedor } from 'src/app/models/proveedor';
import { AppPrimeModule } from 'src/app/modules/prime-ng/prime-ng.module';
import { ProdProveedorService } from 'src/app/services/prod-proveedor.service';

@Component({
  selector: 'app-prod-proveedor-form',
  standalone: true,
  imports: [AppPrimeModule],
  templateUrl: './prod-proveedor-form.component.html',
  styleUrl: './prod-proveedor-form.component.scss',
  providers: [MessageService, ConfirmationService]
})
export class ProdProveedorFormComponent {
  @Input() producto: Producto;
  @Input() proveedor: ProdProveedor;

  formulario: FormGroup = new FormGroup({
    id: new FormControl(''),
    nombre: new FormControl(''),
    clave: new FormControl(''),
    costo: new FormControl('')

  });

  constructor(
    private ProdProveedorSvc: ProdProveedorService
    , private messageService: MessageService, private confirmationService: ConfirmationService
  ) { }


  ngOnChanges(changes: SimpleChanges) {
    if (!!changes.proveedor && !!changes.proveedor.currentValue) {
      this.proveedor = changes.producto.currentValue;
      console.log('proveedor detail: ', this.proveedor);

      if (this.proveedor.id) {
        this.getProveedor();

      }
      else {
        this.formulario = new FormGroup({
          id: new FormControl(''),
          nombre: new FormControl(''),
          clave: new FormControl(''),
          costo: new FormControl('')
        });
      }
    }
  }

  ngOnInit(): void {
    this.LoadProveedores();
  }

  async onSave(form: NgForm){
    if(this.formulario.valid){
      const obj = this.formulario.value;
      console.log('>>>obj: ', obj);

      this.proveedor = {
        id: obj.id,
        claveProducto: this.producto.clave,


        nombreProveedor: this.proveedor.claveProducto;

        


      }
      
    }

  }


  getProveedor() {
    this.formulario = new FormGroup({
      id: new FormControl(this.proveedor.id),
      nombre: new FormControl(this.proveedor.nombreProveedor),
      clave: new FormControl(this.proveedor.claveProveeor),
      costo: new FormControl(this.proveedor.costo)
    });
  }

  LoadProveedores(){

  }

  
}
