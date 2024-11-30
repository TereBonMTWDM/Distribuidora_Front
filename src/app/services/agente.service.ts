import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Result } from '../models/result';
import { Agente } from '../models/agente';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AgenteService {
  apiCobranza: string = environment.api.Cobranza + 'Agente/';

  constructor(private http: HttpClient , private authSvc: AuthService) { }

  GetAgentes() : Observable<any>{
    return this.http.get<Result>(`${this.apiCobranza}GetAgentes`).pipe(
      map(res => res as Result)
    );
  }

  SaveAgente(item: Agente) : Observable<Result>{
    let u = this.authSvc.getUserData();

    if(item.nombre?.trim()){
      let agente = {
        id: item.id,
        nombre: item.nombre,
        esInverser: false,
        usuario: u.displayName
      }

      if(item.id === undefined){ // Save:
        return this.http.post<Result>(`${this.apiCobranza}SaveAgente`, agente).pipe(
          map(res => res as Result)
        );
      }
      else{
        //Update:
        return this.http.put<Result>(`${this.apiCobranza}UpdateAgente`, agente).pipe(
          map(res => res as Result)
        );
      }

    }
  }

  DeleteAgente(idAgente: number) : Observable<Result>{
    let u = this.authSvc.getUserData();
    
    return this.http.delete<Result>(`${this.apiCobranza}DeleteAgente/${idAgente}/${u.displayName}`).pipe(
      map(res => res as Result)
    );
  }
}
