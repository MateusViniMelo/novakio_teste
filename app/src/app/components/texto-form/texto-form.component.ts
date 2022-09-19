import { Component, OnInit, EventEmitter,Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Texto } from 'src/app/Texto';
@Component({
  selector: 'app-texto-form',
  templateUrl: './texto-form.component.html',
  styleUrls: ['./texto-form.component.scss']
})
export class TextoFormComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<Texto>();
  textoForm: FormGroup
  constructor() { }

  ngOnInit(): void {

    this.textoForm = new FormGroup({
      id: new FormControl(''),
      texto: new FormControl('',[Validators.required,Validators.minLength(8)]),
    },{updateOn: "blur"})
  }

  get texto(){
    return this.textoForm.get('texto')
  }

  submit(){
    if(!this.textoForm.invalid){
     
      this.onSubmit.emit(this.textoForm.value)
      
    }
  }

}
