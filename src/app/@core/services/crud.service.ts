import { Injectable } from "@angular/core";
import { Cliente } from "../common/interfaces/cliente.interface";

@Injectable({
    providedIn: 'root',
})
export class CrudService {
    /**
     * Insere um cliente no localStorage, usando seu id como chave
     * @param cliente - interface com os dados do cliente
     */
    inserirCliente(cliente: Cliente) : void {
        localStorage.setItem(cliente.id.toString(), JSON.stringify(cliente));
    }

    /**
     * Cria uma lista com todos os clientes do localStorage
     * @returns lista de clientes ordenada
     */
    listarClientes() : Cliente[] {
        const lista: Cliente[] = [];
        
        for(let i=0; i<localStorage.length; i++) {
            lista.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
        }

        return this.ordenaLista(lista);
    }

    /**
     * Ordena uma lista de clientes pelo id do cliente, em ordem crescente
     * @param lista - lista de clientes
     * @returns lista ordenada
     */
    ordenaLista(lista: Cliente[]) : Cliente[] {
        return lista.sort(function compare(a: Cliente, b: Cliente) {
            if (a.id < b.id) return -1;
            if (a.id > b.id) return 1;
            return 0;
        });
    }

    /**
     * Recupera um cliente do localStorage pelo seu id, que também é usado como chave
     * @param id - id do cliente desejado
     * @returns cliente recuperado
     */
    obterCliente(id: number) : Cliente {
        return JSON.parse(localStorage.getItem(id.toString()));
    }
    
    /**
     * Remove um cliente do localStorage
     * @param id - id/chave do cliente a ser removido
     */
    excluirCliente(id: number) : void {
        localStorage.removeItem(id.toString());
    }
}
