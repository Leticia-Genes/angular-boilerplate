import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente } from 'src/app/@core/common/interfaces/cliente.interface';
import { CrudService } from 'src/app/@core/services/crud.service';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit {
  private id: number;
  public clientes: Cliente[];
  public form: FormGroup;

  constructor(private fb: FormBuilder, private service: CrudService) {
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

  /**
   * Inicia a lista de clientes que popula a tabela
   * Atualiza o valor do id automático de cadastro de acordo com o id do último cliente da lista
   */
  ngOnInit() : void {
    this.clientes = this.service.listarClientes();

    const length: number = this.clientes.length;
    if(length === 0) {
      this.id = 0;
    } else {
      this.id = this.clientes[length - 1].id + 1;
    }
  }

  /**
   * 
   * @param event - evento 
   * @param id 
   */
  validaInput(id: string) : void {
    const erros = this.form.controls[id].errors;

    if(erros && Object.keys(erros)[0] != "required") {
      document.getElementById("aviso_" + id).style.display = "flex";
    } else {
      document.getElementById("aviso_" + id).style.display = "none";
    }
  }

  /**
   * Refatora o input do telefone em tempo real
   */
  mascara() : void {
    let value: string = (<HTMLSelectElement>document.getElementById("telefone")).value;

    value = value.replace(/\D/g,"");                    //Remove tudo o que não é dígito
    value = value.replace(/^(\d{2})(\d)/g,"($1) $2");   //Coloca parênteses em volta dos dois primeiros dígitos
    value = value.replace(/(\d)(\d{4})$/,"$1-$2");      //Coloca hífen entre o quarto e o quinto últimos dígitos

    (<HTMLSelectElement>document.getElementById("telefone")).value = value;
  }

  /**
   * Pega o id automático e os valores do formulário e envia para o service salvar o cliente
   */
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
