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
  public isAtivo: boolean = false;
  public isInativo: boolean = false;

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
        Validators.minLength(13),
        Validators.maxLength(14)
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
   * Verifica se o conteúdo de um input é válido (ignorando o required)
   * @param id - identificação do elemento de input a ser validado
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

    (<HTMLSelectElement>document.getElementById("telefone")).value = value;
  }

  /**
   * Chama a função de inserção com o id automático e depois o incrementa, caso seja o botão de cadastrar
   * Caso seja o botão de alterar, chama a função com o id passado pelo value do botão
   */
  acao() : void {
    if(document.getElementById("botaoCadastrar")) {
      this.inserir(this.id);
      this.id++;
    }
    else {
      this.inserir(parseInt(document.getElementById("botaoAlterar").getAttribute("value")));
    }
  }

  /**
   * Pega os valores do formulário e o id recebido, e envia para o service salvar o cliente
   * @param id - id do cliente a ser cadastrado ou alterado
   */
  inserir(id: number) : void {
    const cliente: Cliente = {
      "id": id,
      "nome": this.form.controls['nome'].value,
      "email": this.form.controls['email'].value,
      "telefone": this.form.controls['telefone'].value,
      "status": this.form.controls['status'].value
    };

    this.service.inserirCliente(cliente);
    location.reload();
  }

  /**
   * Altera os elementos da tela e insere as informações do cliente nos inputs
   * @param cliente - interface com as informações do cliente a ser alterado
   */
  editar(cliente: Cliente) : void {
    this.alteraTela(cliente.id.toString());

    document.getElementById("titulo").textContent = "Edição de cliente";
    this.form.controls['nome'].setValue(cliente.nome);
    this.form.controls['email'].setValue(cliente.email);
    this.form.controls['telefone'].setValue(cliente.telefone);
    this.form.controls['status'].setValue( cliente.status);
  }

  /**
   * Altera os atributos do botão de cadastro para alteração e torna o botão de calcelamento visível
   * Passa o id do cliente como atributo value do botão de alteração
   * @param id - id do cliente a ser alterado
   */
  alteraTela(id: string) : void {
    const botao: HTMLElement = document.getElementById("botaoCadastrar");
    if(botao) {
      botao.textContent = "Alterar";
      botao.setAttribute("value", id);
      botao.setAttribute("id", "botaoAlterar");
      document.getElementById("botaoCancelar").style.display = "flex";
    }
  }

  /**
   * Recarrega a página
   */
  cancelar() : void {
    location.reload();
  }

  /**
   * Chama o service para deletar o cliente do localStorage usando seu id e recarrega a página
   * @param id - id do cliente a ser excluído
   */
  excluir(id: number) : void {
    this.service.excluirCliente(id);
    location.reload();
  } 

  /**
   * Faz a transformação do status em valor booleano para a representação em string
   * @param status - valor booleano do status do cliente
   * @returns string com o status ativo ou inativo
   */
  pegaStatus(status: boolean) : string {
    return status ? "ativo" : "inativo";
  }
}
