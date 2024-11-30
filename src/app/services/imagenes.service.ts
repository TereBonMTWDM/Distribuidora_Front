import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { Imagen } from '../models/imagen';
import { Result } from '../models/result';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagenesService {
  apiCobranza: string = environment.api.Cobranza + 'Imagen/';
  constructor(
    private http: HttpClient
    , private authSvc: AuthService
  ) { }

  SaveImagen(item: Imagen){
    let u = this.authSvc.getUserData();

    let imagen = {
      idCobranza: item.idCobranza,
      imagenBase64: item.imagenBase64,
      usuario: u.displayName
    }

    return this.http.post<Result>(`${this.apiCobranza}SavePoliza`, imagen).pipe(
      map(res => res as Result)
    );
  }


  GetPdfoliza(idCobranza: number) : Observable<Result>{
    return this.http.get<Result>(`${this.apiCobranza}GetImagen/${idCobranza}`).pipe(
      map(res => res as Result),
    );
  }



}
