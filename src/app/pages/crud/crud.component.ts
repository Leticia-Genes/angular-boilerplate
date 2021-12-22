import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente } from 'src/app/@core/common/interfaces/cliente.interface';
import { CrudService } from 'src/app/@core/services/crud.service';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent {
  public form: FormGroup;
  private id: number;

  constructor(private fb: FormBuilder, private service: CrudService) {
    this.id = 0;

    this.form = this.fb.group({
      nome: ['', Validators.compose([
        Validators.required
      ])],
      email: ['', Validators.compose([
        Validators.required,
        Validators.email
      ])],
      telefone: ['', Validators.compose([
        Validators.required,
        Validators.minLength(14),
        Validators.maxLength(15)
      ])],
      status: ['', Validators.compose([
        Validators.required
      ])]
    });
  }

  validaInput(event: FocusEvent, id: string) : void {
    if(<HTMLSelectElement>event.relatedTarget) {
      const erros = this.form.controls[id].errors;

      if(erros && Object.keys(erros)[0] != "required") {
        alert("Insira um " + id + " válido!");
      }
    }
  }

  mascara() : void {
    let value: string = (<HTMLSelectElement>document.getElementById("telefone")).value;

    value = value.replace(/\D/g,""); //Remove tudo o que não é dígito
    value = value.replace(/^(\d{2})(\d)/g,"($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
    value = value.replace(/(\d)(\d{4})$/,"$1-$2"); //Coloca hífen entre o quarto e o quinto dígitos

    (<HTMLSelectElement>document.getElementById("telefone")).value = value;
  }

  cadastrar() : void {
    const cliente: Cliente = {
      "id": this.id++,
      "nome": this.form.controls['nome'].value,
      "email": this.form.controls['email'].value,
      "telefone": this.form.controls['telefone'].value,
      "status": this.form.controls['status'].value
    };

    this.service.inserirCliente(cliente);
  }
}
