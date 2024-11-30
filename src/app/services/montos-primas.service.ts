import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { map, Observable } from 'rxjs';
import { Result } from '../models/result';
import { MontosPrimas } from '../models/montos';

@Injectable({
  providedIn: 'root'
})
export class MontosPrimasService {
  apiCobranza: string = environment.api.Cobranza + 'MontosPrimas/';

  constructor(private http: HttpClient , private authSvc: AuthService) { }

  SaveMontos(item: MontosPrimas) : Observable<Result>{
    let u = this.authSvc.getUserData();
    let montos = {
      idcobranza: item.idCobranza,
      fechaInicioPeriodo: new Date(item.fechaInicioPeriodo),
      //fechaInicioPeriodo: item.fechaInicioPeriodo,
      primaTotal: item.primaTotal,
      primaNeta: item.primaNeta,
      usuario: u.displayName
    }

    return this.http.post<Result>(`${this.apiCobranza}SaveMontosPrimas`, montos).pipe(
      map(res => res as Result)
    );
  }

}
