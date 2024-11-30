import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MessageService } from 'primeng/api';
import { Cobranza } from 'src/app/models/cobranza';
import { Nota } from 'src/app/models/nota';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { AppPrimeModule } from 'src/app/modules/prime-ng/prime-ng.module';
import { MensajesService } from 'src/app/services/mensajes.service';
import { NotasService } from 'src/app/services/notas.service';

interface Medio { value: string; viewValue: string; }
@Component({
  selector: 'app-nota-detalle',
  standalone: true,
  imports: [AppPrimeModule, MaterialModule, MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule],
  templateUrl: './nota-detalle.component.html',
  styleUrl: './nota-detalle.component.scss',
  providers: [MessageService]
})
export class NotaDetalleComponent {
  @Input('esVisible') esVisible: boolean;
  @Input('idCobranza') idCobranza: number;
  @Output('onReturn') DetalleEvent = new EventEmitter<{}>();
  @Output() visibleEmit = new EventEmitter<boolean>();

  descripcion: string;
  nota: Nota;
  esCalendarizada: boolean = false;
  fechaCalendario: Date | undefined;

  today = new Date();



  constructor(
    private msjSvc: MensajesService
    , private messageService: MessageService
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (!!changes.idCobranza && !!changes.idCobranza.currentValue) {
      this.idCobranza = changes.idCobranza.currentValue;
    }
  }


  
  SaveNota(form: NgForm) {
    this.nota  = {
      descripcion: this.descripcion,
      idCobranza: this.idCobranza,
      fechaCalendario: (this.esCalendarizada ? this.fechaCalendario : null)
    }

    try {
      this.msjSvc.SaveNota(this.nota).subscribe((result: any) => {
        if(result.complete){
          this.nota = result;
          this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Nota guardada', life: 3000 });
          this.DetalleEvent.emit(this.nota);
        }
        else{
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'Error al intentar guardar la nota. Error:' + result.errors, life: 7000});
        }
      });
    }
    catch (ex) {
      console.log(ex);
    }

    form.reset();
    this.hideDialog();
  }


  hideDialog() {
    this.esVisible = false;
    this.visibleEmit.emit(this.esVisible);
  }
}
