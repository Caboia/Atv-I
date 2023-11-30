import Produto from "./produto";

interface Compra {
  produto: Produto;
  quantidade: number;
  totalGasto: number; 
}

class Cliente {
  id: number;
  nome: string;
  email: string;
  genero: string;
  historicoCompras!: Compra[];

  constructor(id: number, nome: string, email: string, genero: string) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.genero = genero;
  }
}

export default Cliente;
