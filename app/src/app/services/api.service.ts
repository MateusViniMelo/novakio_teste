import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Texto } from '../Texto';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  public getHello(): Observable<any> {
    return this.http.get(environment.apiHost + '/data-atual');
  }
  public getDataAtual(): Observable<any> {
    return this.http.get(`${environment.apiHost}/data-atual`)
  }

  setTexto(texto: Texto): Observable<Texto> {
    return this.http.post<Texto>(`${environment.apiHost}/texto`, texto)
  }

  getTextos(): Observable<Texto[]> {
    return this.http.get<Texto[]>(`${environment.apiHost}/texto`)
  }
  updateTexto(texto: Texto): Observable<Texto> {
    const payload = {
      texto: texto.texto
    }
    return this.http.put<Texto>(`${environment.apiHost}/texto/${texto.id}`, payload)
  }
  deleteTexto(id: number){
    return this.http.delete(`${environment.apiHost}/texto/${id}`)
  }

}
