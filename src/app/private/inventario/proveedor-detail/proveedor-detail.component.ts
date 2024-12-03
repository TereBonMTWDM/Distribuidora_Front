import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { firstValueFrom } from 'rxjs';
import { Proveedor } from 'src/app/models/proveedor';
import { AppPrimeModule } from 'src/app/modules/prime-ng/prime-ng.module';
import { ProveedoresService } from 'src/app/services/proveedores.service';

@Component({
  selector: 'app-proveedor-detail',
  standalone: true,
  imports: [AppPrimeModule],
  templateUrl: './proveedor-detail.component.html',
  styleUrl: './proveedor-detail.component.scss'
})
export class ProveedorDetailComponent {
  @Input() proveedor: Proveedor;
  @Output() onReturn = new EventEmitter<{}>();

  formulario: FormGroup = new FormGroup({
    nombre: new FormControl(''),
    descripcion: new FormControl(''),
    notas: new FormControl('')
  });


  constructor(
    private proveedorSvc: ProveedoresService
    , private messageService: MessageService, private confirmationService: ConfirmationService
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (!!changes.proveedor && !!changes.proveedor.currentValue) {
      this.proveedor = changes.proveedor.currentValue;
      console.log('prov detail: ', this.proveedor);

      if (this.proveedor.id) {
        this.formulario = new FormGroup({
          nombre: new FormControl(this.proveedor.nombre),
          descripcion: new FormControl(this.proveedor.descripcion),
          notas: new FormControl(this.proveedor.notas)
        });
      }

    }
    else {
      this.formulario = new FormGroup({
        nombre: new FormControl(''),
        descripcion: new FormControl(''),
        notas: new FormControl('')
      });

    }

  }


  async onSave(form: NgForm) {
    let result: any;
    if (this.formulario.valid) {
      const obj = this.formulario.value;
      console.log('>>>obj: ', obj);

      this.proveedor = {
        id: this.proveedor?.id,
        nombre: obj.nombre,
        descripcion: obj.descripcion,
        notas: obj.notas
      }

      console.log('ªªª prov a guardar: ', this.proveedor);
      

      result = await firstValueFrom(this.proveedorSvc.Save(this.proveedor));

      this.onReturn.emit(result);
    }

  }









}
