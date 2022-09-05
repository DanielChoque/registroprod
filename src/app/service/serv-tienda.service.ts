import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { DatosIniciales, Precio, Producto, ServidorRespuesta, Unidad } from '../model/modelos';

@Injectable({
  providedIn: 'root'
})
export class ServTiendaService { 
  private setURL: string;
  //public URL = 'http://10.1.43.253:8000/'
  public URL = 'http://10.1.10.111:8000/'

  constructor(
    //private httpClient: HttpClient
    private http: HttpClient
  ) { 
    this.setURL = this.URL+'api/1.0/unidad/'
  }
  
  public findAll(): Observable<Unidad[]> {
    return this.http.get<Unidad[]>(this.setURL);
  }

  public findAllProduct(): Observable<Producto[]> {
    this.setURL = this.URL+'api/1.0/producto/'
    return this.http.get<Producto[]>(this.setURL);
  } 
  
  public findAllPrecio(): Observable<Precio[]> {
    this.setURL = this.URL+'api/1.0/precio/'
    return this.http.get<Precio[]>(this.setURL);
  }

  public findAllDatosIniciales(): Observable<DatosIniciales> {
    this.setURL = this.URL+'api/1.0/datos_ini/'
    return this.http.get<DatosIniciales>(this.setURL);
  }

  public editarPrecio(precio:Precio): Observable<ServidorRespuesta> {
    this.setURL = this.URL+'api/1.0/precio_edit/'
    return this.http.post<ServidorRespuesta>(this.setURL,precio);
  }
  public agregarPrecio(precio:Precio): Observable<ServidorRespuesta> {
    this.setURL = this.URL+'api/1.0/precio_add/'
    return this.http.post<ServidorRespuesta>(this.setURL,precio);
  }
  public getcsvGenerar(): Observable<ServidorRespuesta> {
    this.setURL = this.URL+'api/1.0/csv_file/'
    return this.http.get<ServidorRespuesta>(this.setURL);
  }
}
