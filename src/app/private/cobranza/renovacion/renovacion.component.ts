import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { MontosPrimas } from 'src/app/models/montos';
import { Renovacion } from 'src/app/models/renovacion';
import { AppPrimeModule } from 'src/app/modules/prime-ng/prime-ng.module';
import { MontosPrimasService } from 'src/app/services/montos-primas.service';
import { RenovacionService } from 'src/app/services/renovacion.service';

@Component({
  selector: 'app-renovacion',
  standalone: true,
  imports: [AppPrimeModule],
  templateUrl: './renovacion.component.html',
  styleUrl: './renovacion.component.scss',
  providers: [MessageService]
})
export class RenovacionComponent {
  renovaciones!: Renovacion[];
  renovacion!: Renovacion;
  montos!: MontosPrimas;

  //editar:
  clonedItems: { [s: string]: Renovacion; } = {};


  isRowDisabled(item: any): boolean {
    // Lógica para determinar si la fila debe estar deshabilitada
    // Por ejemplo, si item.activo es false, deshabilita la fila
    return item.esRenovado;
  }

  constructor(
    private renovacionSvc: RenovacionService
    , private montosSvc: MontosPrimasService
    , private messageService: MessageService
  ) { }


  ngOnInit(): void {
    this.LoadRenovaciones();
  }

  async LoadRenovaciones() {
    this.renovacionSvc.GetRenovaciones().subscribe((result: any) => {
      if(result.complete){
        this.renovaciones = result.data;
      } else {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Error al intentar obtener las Renovaciones. Error:' + result.errors, life: 7000});
      }
    });
  }

  async SaveMontos(item: Renovacion) {
    let montos: MontosPrimas = {
      idCobranza: item.idCobranza,
      fechaInicioPeriodo: item.fechaVencimiento,
      primaTotal: item.primaTotal,
      primaNeta: item.primaNeta
    }

    this.montosSvc.SaveMontos(montos).subscribe((res: any) => {
      if (res.complete) {
        this.montos = res.data;
        item.esRenovado = true;        
        this.renovaciones[this.findIndexById(item.idCobranza.toString())] = item;

        this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Registro guardado' });
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al intentar guardar los montos. Error:' + res.errors, life: 7000 });
      }

    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Error SAVE', detail: error.message, life: 7000 });
    });
  }



  //Editar desde Table
  onRowEditInit(item: Renovacion) {
    this.clonedItems[item.idCobranza] = { ...item };
  }

  onRowEditSave(item: Renovacion) {
    this.SaveMontos(item);
  }

  onRowEditCancel(item: Renovacion, index: number) {
    this.renovacion[index] = this.clonedItems[item.idCobranza];
    delete this.clonedItems[item.idCobranza];
  }
  // END //Editar desde Table




  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.renovaciones.length; i++) {
        if (this.renovaciones[i].idCobranza.toString() === id) {
            index = i;
            break;
        }
    }

    return index;
}




}
