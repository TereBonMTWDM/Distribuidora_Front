import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Result } from '../models/result';
import { Proveedor } from 'src/app/models/proveedor';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  api: string = environment.api.Inventario + 'Proveedor/';

  constructor(private http: HttpClient , private authSvc: AuthService) { }

  GetProveedores() : Observable<any>{
    return this.http.get<Result>(`${this.api}GetProveedores`).pipe(
      map(res => res as Result)
    );
  }

  Save(item: Proveedor) : Observable<Result>{
    if(item.nombre?.trim()){
      if(item.id === undefined){ 
        // Save:
        return this.http.post<Result>(`${this.api}Save`, item).pipe(
          map(res => res as Result)
        );
      }
      else{
        //Update:
        return this.http.put<Result>(`${this.api}Update`, item).pipe(
          map(res => res as Result)
        );
      }

    }
  }

  Delete(id: number) : Observable<Result>{
    return this.http.delete<Result>(`${this.api}Delete?id=${id}`).pipe(
      map(res => res as Result)
    );
  }
}
