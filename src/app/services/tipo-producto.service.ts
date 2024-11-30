import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Result } from '../models/result';
import { TipoProducto } from '../models/tipoProducto';

@Injectable({
  providedIn: 'root'
})
export class TipoProductoService {

  api: string = environment.api.Inventario + 'TipoProducto/';

  constructor(private http: HttpClient , private authSvc: AuthService) { }

  GetProductos() : Observable<any>{
    return this.http.get<Result>(`${this.api}GetTipos`).pipe(
      map(res => res as Result)
    );
  }

  


}
