import { Injectable } from "@angular/core";
import { Cliente } from "../common/interfaces/cliente.interface";

@Injectable({
    providedIn: 'root',
})
export class CrudService {

    inserirCliente(cliente: Cliente) : void {
        localStorage.setItem(cliente.id.toString(), JSON.stringify(cliente));
    }

    listarClientes() : Cliente[] {
        let lista: Cliente[];
        for(let i=0; i<=localStorage.length; i++) {
            lista.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
        }
        return lista;
    }

    obterCliente(id: number) : Cliente {
        return JSON.parse(localStorage.getItem(id.toString()));
    }

    alterarCliente(id: number, clienteAlterado: Cliente) : void {
        localStorage.setItem(id.toString(), JSON.stringify(clienteAlterado));
    }

    excluirCliente(id: number) : void {
        localStorage.removeItem(id.toString());
    }
}
