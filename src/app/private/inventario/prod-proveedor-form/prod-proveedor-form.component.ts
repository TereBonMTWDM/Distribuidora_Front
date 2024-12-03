import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { firstValueFrom } from 'rxjs';
import { ProdProveedor } from 'src/app/models/prod-proveedor';
import { Producto } from 'src/app/models/producto';
import { Proveedor } from 'src/app/models/proveedor';
import { AppPrimeModule } from 'src/app/modules/prime-ng/prime-ng.module';
import { ProdProveedorService } from 'src/app/services/prod-proveedor.service';
import { ProveedoresService } from 'src/app/services/proveedores.service';

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
  @Input() prodProveedor: ProdProveedor;
  @Output() onReturn = new EventEmitter<{}>();
  proveedor: Proveedor;
  proveedores: Proveedor[] = [];

  formulario: FormGroup = new FormGroup({
    // id: new FormControl(''),
    proveedor: new FormControl(''),
    claveProveedor: new FormControl(''),
    costo: new FormControl('')

  });

  constructor(
    private prodProveedorSvc: ProdProveedorService, private proveedorSvc: ProveedoresService
    , private messageService: MessageService, private confirmationService: ConfirmationService
  ) { }


  ngOnChanges(changes: SimpleChanges) {
    if (!!changes.producto && !!changes.producto.currentValue) {
      this.producto = changes.producto.currentValue;
      console.log('producto detail: ', this.producto);

      // this.LoadProdProveedores(this.producto.clave, this.producto.idTipoProducto);
    }

    if (!!changes.prodProveedor && !!changes.prodProveedor.currentValue) {
      this.prodProveedor = changes.prodProveedor.currentValue;
      console.log('proveedor detail: ', this.prodProveedor);

      if (this.prodProveedor.id) {
        this.getProveedor();
      }

    }
    else {
      this.formulario = new FormGroup({
        // id: new FormControl(''),
        proveedor: new FormControl(''),
        claveProveedor: new FormControl(''),
        costo: new FormControl('')
      });
    }
  }

  ngOnInit(): void {
    this.formulario.reset();

    //this.LoadProdProveedores(this.prodProveedor?.claveProducto, this.prodProveedor?.idTipoProducto);
    this.LoadProveedores();
  }

  async onSave(form: NgForm) {
    let result: any;

    if (this.formulario.valid) {
      const obj = this.formulario.value;
      console.log('>>>obj: ', obj);
      console.log('>>>prodProveedor-antes: ', this.prodProveedor);

      if (this.prodProveedor === undefined) {
        this.prodProveedor = {
          id: 0,
          idProducto: this.producto.id,
          
          idProveedor: obj.proveedor.id,
          claveProveedor: obj.claveProveedor,
          costo: obj.costo,
          notas: '' //obj.notas
        }

      }
      else {
        //Obj Update
        this.prodProveedor = {
          id: this.prodProveedor?.id,
          idProducto: this.prodProveedor.id,// porque es el id de la tabla
          idProveedor: obj.proveedor.id,
          claveProveedor: obj.claveProveedor,
          costo: obj.costo,
          notas: '' //obj.notas
        }
      }

      console.log('>>>prodProveedor: ', this.prodProveedor);

      result = await firstValueFrom(this.prodProveedorSvc.Save(this.prodProveedor));
      console.log('>>>result', result);


      if (result.complete) {
        this.prodProveedor = result.data;

        this.onReturn.emit(result);
      }

    }

  }


  getProveedor() {
    this.proveedor = this.proveedores.find(x => x.id === Number(this.prodProveedor.idProveedor));


    this.formulario = new FormGroup({
      // id: new FormControl(this.prodProveedor.id),
      //nombreProveedor: new FormControl(this.prodProveedor.nombreProveedor),
      proveedor: new FormControl(this.proveedor),
      claveProveedor: new FormControl(this.prodProveedor.claveProveedor),
      costo: new FormControl(this.prodProveedor.costo)
    });
  }

  LoadProdProveedores(clave: string, tipo: number) {
    this.prodProveedorSvc.GetProveedorByProducto(clave, tipo).subscribe((result: any) => {
      if (result.complete) {
        this.prodProveedor = result.data.map((item: any) => ({
          id: item.id,
          idProducto: item.IdProducto,
          idProveedor: item.IdProveedor,
          clave: item.claveProveedor,
          costo: item.costo,
          notas: item.notas
        }));
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al intentar obtener los registros. Error:' + result.errors, life: 7000 });
      }
    });
  }

  LoadProveedores() {
    this.proveedorSvc.GetProveedores().subscribe((result: any) => {
      if (result.complete) {
        this.proveedores = result.data.map((item: any) => ({
          id: item.id,
          nombre: item.nombre,
          descripcion: item.descripcion,
          notas: item.notas,
          totalCompras: item.totalCompras
        }));

        if (this.prodProveedor?.nombreProveedor) {
          this.proveedor = this.proveedores.find(p => p.nombre === this.prodProveedor.nombreProveedor) || null;
        }
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al intentar obtener los registros. Error:' + result.errors, life: 7000 });
      }
    });
  }



  selectProveedor(event: any) {
    // console.log(event);
    if (event.value) {
      this.proveedor = this.proveedores.find(p => p.id === event.value.id) || null;
    } else {
      this.proveedor = null;
    }
    // console.log('Proveedor seleccionado:', this.proveedor);


    // if (event.value != null) {
    //   this.proveedor = event.value;
    // }
  }

}
