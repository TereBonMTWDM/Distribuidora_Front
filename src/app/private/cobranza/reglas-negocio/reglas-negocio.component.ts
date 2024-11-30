import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { AppPrimeModule } from 'src/app/modules/prime-ng/prime-ng.module';

@Component({
  selector: 'app-reglas-negocio',
  standalone: true,
  imports: [AppPrimeModule],
  templateUrl: './reglas-negocio.component.html',
  styleUrl: './reglas-negocio.component.scss'
})
export class ReglasNegocioComponent{
  @Input('esVisible') esVisible: boolean;
  @Input('tipoRegla') tipoRegla: string;
  @Output() visibleEmit = new EventEmitter<boolean>();

  ngOnChanges(changes: SimpleChanges) {
    if (!!changes.tipoRegla && !!changes.tipoRegla.currentValue) {
      this.tipoRegla = changes.tipoRegla.currentValue;
    }
  }
  
  hideDialog() {
    this.esVisible = false;
    this.visibleEmit.emit(this.esVisible);
  }
}
