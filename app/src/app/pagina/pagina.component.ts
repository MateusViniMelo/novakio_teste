import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Texto } from '../Texto';
import { Alerta } from '../Alerta';
@Component({
  selector: 'app-pagina',
  templateUrl: './pagina.component.html',
  styleUrls: ['./pagina.component.scss']
})
export class PaginaComponent implements OnInit {

  public apiGreeting = '';
  dataAtual:string = ""
  
  alerta: Alerta
  textos: Texto[] = []
  textoEdit!: Texto
  textoFormEdit: FormGroup
  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.apiService.getDataAtual().pipe(
      catchError((err) => {
        this.apiGreeting = 'Falha na comunicação com o servidor.';
        return [];
      })
    ).subscribe((response) => {
      if (response) {
        
        this.dataAtual = response.dataAtual
       
      }
    });
    this.apiService.getTextos().subscribe((textos) =>{

      textos.map((texto) => {
        texto["is_updating"] = false
      })

      this.textos = textos
    })
    
    
  }

   async createHandler(texto: Texto){
    
    await this.apiService.setTexto(texto).pipe(
      catchError((error)=>{
        
        this.alerta = {
          acao: "criarTexto",
          tipo: 'danger',
          menssagem: 'Ops! Erro de conexão com o servidor'
        }
        return [];
      })
    ).subscribe((response) =>{
      response["is_updating"] = false
      this.textos.push(response)
    })
      
    
  }

  async removeHandler(id:number){
    await this.apiService.deleteTexto(id).subscribe(()=>{
      const index = this.textos.findIndex(o => o.id == id)

      this.textos.splice(index,1)
    })
  }
  editHandler(texto: Texto){
    if(this.textoEdit && this.textoEdit.id != texto.id){
      const index = this.textos.findIndex(o => o.id == this.textoEdit.id)
      this.textos[index].is_updating = false
    }
    const index = this.textos.findIndex(o => o.id == texto.id)
    this.textos[index].is_updating = !this.textos[index].is_updating 
    this.textoEdit = this.textos[index]
    
    if(this.textoEdit.is_updating == true){
      this.textoFormEdit = new FormGroup({
        id: new FormControl(this.textoEdit.id),
        texto: new FormControl(this.textoEdit.texto,[Validators.required,Validators.minLength(8)]),
      })
    }
  }

  get texto(){
    return this.textoFormEdit.get('texto')
  }

  submitEdit(){
    if(!this.textoFormEdit.invalid){
     
      
      this.apiService.updateTexto(this.textoFormEdit.value).subscribe(()=>{
        this.alerta = {
          acao: "editarTexto",
          tipo: "success",
          menssagem: "Texto foi editado com sucesso"
        }
      })
    }

    
    
  }

}
