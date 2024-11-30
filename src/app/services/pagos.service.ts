import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Result } from '../models/result';
import { FechaCalendario } from '../models/fechaCalendario';
import { AuthService } from './auth.service';

export interface EventData {
  title: string;
  start: Date;
  end?: Date;
  allDay?: boolean;
  className?: string;
  url?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PagosService {
  apiCobranza: string = environment.api.Cobranza + 'Pago/';
  usuario: string;

  constructor(private http: HttpClient, private authSvc: AuthService) { }


  GetProgramacionPagos(idCobranza: number) : Observable<any>{
    return this.http.get<Result>(`${this.apiCobranza}GetProgramacionPagos?idCobranza=${idCobranza}`).pipe(
      map(res => res as Result)
    );
  }

  GetFechasCalendario(): Observable<FechaCalendario[]> {
    return this.http.get<Result>(`${this.apiCobranza}GetFechasCalendario`).pipe(
      map(res => {
        return res.data.map(item => ({
          asegurado: item.asegurado,
          fechaVencimiento: new Date(item.fechaVencimiento),
          idRamo: item.idRamo,
          idCobranza: item.idCobranza
        }));
      })
    );
  }


  AplicarPago(idCobranza: number) : Observable<any>{
    let u = this.authSvc.getUserData();
    this.usuario = u.displayName;

    return this.http.put<Result>(`${this.apiCobranza}AplicarPago/${idCobranza}?usuario=${this.usuario}`,null).pipe(
      map(res => res as Result)
    );
  }

  DesaplicarPago(idCobranza: number) : Observable<any>{
    let u = this.authSvc.getUserData();
    this.usuario = u.displayName;

    return this.http.put<Result>(`${this.apiCobranza}DesaplicarPago/${idCobranza}?usuario=${this.usuario}`,null).pipe(
      map(res => res as Result)
    );
  }



  getEvents(): Observable<EventData[]> {
    // Simula una llamada a un servidor con un retraso de 2 segundos
    return of([
      { title: 'All Day Event', start: new Date(), className: 'event-default' },
      { title: 'Repeating Event', start: new Date(2024, 6, 3, 6, 0), className: 'event-rose' },
      { title: 'Meeting', start: new Date(2024, 6, 4, 10, 30), className: 'event-green' },
      { title: 'Lunch', start: new Date(2024, 6, 5, 12, 0), end: new Date(2024, 6, 5, 14, 0), className: 'event-red' }
      // Agrega más eventos según sea necesario
    ]).pipe(delay(2000));
  }
}
