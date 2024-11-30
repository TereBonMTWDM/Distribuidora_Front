import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Result } from '../models/result';
import { Nota } from '../models/nota';
import { AuthService } from './auth.service';
import { NotaCalendario } from '../models/fechaCalendario';
import { Notificacion } from '../models/notificacion';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {
  apiCobranza: string = environment.api.Cobranza + 'Mensaje/';
  
  constructor(
    private http: HttpClient
    , private authSvc: AuthService

  ) { 
  }

  GetNotasMensajes(idCobranza: number) : Observable<Result>{
    return this.http.get<Result>(`${this.apiCobranza}GetMensajes/${idCobranza}`).pipe(
      map(res => res as Result),
    );
  }


  // GetNotasCalendarizadas() : Observable<Result>{
  //   return this.http.get<Result>(`${this.apiCobranza}GetNotasCalendario`).pipe(
  //     map(res => res as Result),
  //   );
  // }

  GetNotasCalendarizadas(): Observable<NotaCalendario[]> {
    return this.http.get<Result>(`${this.apiCobranza}GetNotasCalendario`).pipe(
      map(res => {
        return res.data.map(item => ({
          descripcion: item.descripcion,
          fechaCalendario: new Date(item.fechaCalendario),
          idCobranza: item.idCobranza
          // idRamo: item.idRamo
        }));
      })
    );
  }


  SaveNota(nota: Nota) : Observable<Result>{
    let u = this.authSvc.getUserData();
    nota.usuario = u.displayName;

    return this.http.post<Result>(`${this.apiCobranza}SaveNota`, nota).pipe(
      map(res => res as Result)
    );
  }


  GetNotificacionesSinEnviar(): Observable<any> {
    return this.http.get<Result>(`${this.apiCobranza}GetNotificacionesNoEnviadas`).pipe(
      map(res => res as Result)
    );
  }
}
