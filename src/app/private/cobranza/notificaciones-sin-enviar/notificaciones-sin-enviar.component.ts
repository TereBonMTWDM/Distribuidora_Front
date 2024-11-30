import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Notificacion } from 'src/app/models/notificacion';
import { AppPrimeModule } from 'src/app/modules/prime-ng/prime-ng.module';
import { MensajesService } from 'src/app/services/mensajes.service';

@Component({
  selector: 'app-notificaciones-sin-enviar',
  standalone: true,
  imports: [AppPrimeModule],
  templateUrl: './notificaciones-sin-enviar.component.html',
  styleUrl: './notificaciones-sin-enviar.component.scss',
  providers: [MessageService]
})
export class NotificacionesSinEnviarComponent {
  notificaciones!: Notificacion[];


  constructor(
    private msjSvc: MensajesService
    , private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.LoadNotificaciones();
  }

  async LoadNotificaciones() {
    this.msjSvc.GetNotificacionesSinEnviar().subscribe((result: any) => {
      if(result.complete){
        this.notificaciones = result.data;
      } else {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Error al intentar obtener las notificaciones. Error:' + result.errors, life: 7000});
      }
    });
  }


}
