import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Result } from '../models/result';
import { ProdProveedor } from '../models/prod-proveedor';

@Injectable({
  providedIn: 'root'
})
export class ProdProveedorService {

  
  api: string = environment.api.Inventario + 'ProductoProveedor/';

  constructor(private http: HttpClient , private authSvc: AuthService) { }

  GetProveedorByProducto(claveProducto?: string, tipo?: number) : Observable<any>{
    let params = new HttpParams();
    
    if (claveProducto) {
        params = params.set('clave', claveProducto);
    }
    if (tipo !== undefined) {
        params = params.set('tipo', tipo.toString());
    }

    return this.http.get<Result>(`${this.api}Get`, {params}).pipe(
      map(res => res as Result)
    );
  }

  Save(item: ProdProveedor) : Observable<Result>{
    if(item.nombreProveedor){
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
