import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cobranza } from '../models/cobranza';
import { Observable } from 'rxjs';
import { Result } from '../models/result';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class CobranzaService {
  apiCobranza: string = environment.api.Cobranza + 'Cobranza';

  constructor(private http: HttpClient, private authSvc: AuthService) { }

  GetCobranzaActiva(idRamo: number) : Observable<any>{
    return this.http.get<Result>(`${this.apiCobranza}?idRamo=${idRamo}`).pipe(
      map(res => res as Result),
    );
  }

  GetCobranzaPasiva(idRamo: number) : Observable<any>{
    let ramo = {
      idRamo: idRamo.toString()
    };

    //return this.http.get<Result>(`${this.apiCobranza}?idRamo=${ramo}`).pipe(
    return this.http.get<Result>(`${this.apiCobranza}?idRamo=1&esActiva=0`).pipe(
      map(res => res as Result),
    );
  }


  GetCobranzaById(idCobranza: number) : Observable<any>{
    return this.http.get<Result>(`${this.apiCobranza}?idCobranza=${idCobranza}`).pipe(
      map(res => res as Result),
    );
  }


  ClonarClobranza(idCobranza: number) : Observable<any>{
    let u = this.authSvc.getUserData();

    return this.http.get<Result>(`${this.apiCobranza}/ClonarCobranza/${idCobranza}?usuario=${u.displayName}`).pipe(
      map(res => res as Result),
    );
  }


  CancelarClobranza(idCobranza: number) : Observable<any>{
    let u = this.authSvc.getUserData();

    return this.http.delete<Result>(`${this.apiCobranza}/CancelarCobranza/${idCobranza}?usuario=${u.displayName}`).pipe(
      map(res => res as Result),
    );
  }
}
