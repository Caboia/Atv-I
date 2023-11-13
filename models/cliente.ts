class Cliente {
  id: number;
  nome: string;
  email: string;
  genero: string;

  constructor(id: number, nome: string, email: string, genero: string) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.genero = genero;
  }
}

export default Cliente;
