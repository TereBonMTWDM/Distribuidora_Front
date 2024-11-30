import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Agente } from 'src/app/models/agente';
import { AppPrimeModule } from 'src/app/modules/prime-ng/prime-ng.module';
import { AgenteService } from 'src/app/services/agente.service';

@Component({
  selector: 'app-agente-lista',
  standalone: true,
  imports: [AppPrimeModule],
  templateUrl: './agente-lista.component.html',
  styleUrl: './agente-lista.component.scss',
  providers: [MessageService, ConfirmationService]
})
export class AgenteListaComponent {
  @ViewChildren('itemAgente') itemAgente!: QueryList<ElementRef>;
  agentes!: Agente[];
  agente: Agente;

  //editar:
  clonedProducts: { [s: string]: Agente; } = {};


  constructor(
    private agenteSvc: AgenteService
    , private messageService: MessageService, private confirmationService: ConfirmationService
  ) { }


  ngOnInit(): void {
    this.LoadAgentes();
  }


  async LoadAgentes() {
    this.agenteSvc.GetAgentes().subscribe((result: any) => {
      if(result.complete){
        this.agentes = result.data;
      } else {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Error al intentar obtener los Agentes. Error:' + result.errors, life: 7000});
      }
    });
  }

  AddAgente() {
    // this.agentes.unshift({ nombre: "" });
    this.agentes.push({nombre: ""})
    setTimeout(() => this.ChangeStyleItem(), 0);  // Aplicar estilo después de actualizar el DOM; con esto me aseguro de que la tabla "dinámica" se actualiza antes de que le meta el estilo

  }

  async SaveAgente(item: Agente){
    this.agenteSvc.SaveAgente(item).subscribe((result: any) => {
      if(result.complete){
        this.agente = result.data;
        delete this.clonedProducts[item.id];
        this.messageService.add({severity:'success', summary: 'Exitoso', detail:'Registro guardado'});
      } else{
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Error al intentar guardar el Agente. Error:' + result.errors, life: 7000});
      }
    });
  }

  //Editar desde Table
  onRowEditInit(agente: Agente) {
    // this.clonedProducts[agente.id] = { ...agente };    
  }

  onRowEditSave(agente: Agente) {
    if (agente.nombre != '') {//Validar que el nombre no se repita
      this.SaveAgente(agente);
        // delete this.clonedProducts[agente.id];
        // this.messageService.add({severity:'success', summary: 'Exitoso', detail:'Registro guardado'});
    }
    else {
      this.messageService.add({severity:'error', summary: 'Error', detail:'El nombre no puede estar vacío'});
        //this.messageService.add({severity:'error', summary: 'Error', detail:'El agente ya existe'});
    }
  }

  onRowEditCancel(agente: Agente, index: number) {
    this.agente[index] = this.clonedProducts[agente.id];
    delete this.clonedProducts[agente.id];
  }
  // END //Editar desde Table

  DeleteAgente(item: Agente){
    this.confirmationService.confirm({
      message: '¿Estás seguro de eliminar al Agente <strong>' + item.nombre + '</strong>?</strong>',
      header: 'Eliminar Agente',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.agenteSvc.DeleteAgente(item.id).subscribe((res: any) =>{
          if(res.complete){
            this.agentes = this.agentes.filter((val) => val.id !== item.id);
            this.agente = {};
            this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Agente eliminado', life: 3000 });
          } else{
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'Error al intentar aplicar el pago. Error:' + res.errors, life: 7000});
          }
        }, error => {
          this.messageService.add({ severity: 'error', summary: 'Error DEL', detail: error.message, life: 7000 });
        }, () =>{});
      }
    });
  }



  ChangeStyleItem(){
     // Verifica que haya filas y accede a la última
     const ultimaFila = this.itemAgente.last;

     if (ultimaFila) {
       // Cambiar el estilo del último <tr>
       ultimaFila.nativeElement.style.backgroundColor = 'yellow';  // Cambiar el fondo a amarillo
       ultimaFila.nativeElement.style.fontWeight = 'bold';  // Cambiar el peso de la fuente a negrita
     }
  }

}
