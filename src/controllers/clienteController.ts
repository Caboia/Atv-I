import Cliente from "../../models/cliente";
import * as clienteService from "../../services/clienteService";

function criarCliente(args: {
  nome: string;
  email: string;
  genero: string;
}): void {
  const { nome, email, genero } = args;
  const novoCliente = new Cliente(0, nome, email, genero);
  clienteService.createCliente(novoCliente);
  console.log("Cliente criado com sucesso.");
}

function listarClientes() {
  const clientes = clienteService.listClientes();
  if (clientes.length === 0) {
    console.log("Nenhum cliente encontrado.");
  } else {
    clientes.forEach((cliente) => {
      console.log(
        `ID: ${cliente.id}, Nome: ${cliente.nome}, Email: ${cliente.email}, Gênero: ${cliente.genero}`
      );
    });
  }
}
function listarClientesGen(args: { genero: string }) {
  const { genero } = args;
  const clientes = clienteService.listClientes();

  const clientesFiltrados = clientes.filter((cliente) => cliente.genero === genero);

  if (clientesFiltrados.length === 0) {
    console.log(`Nenhum cliente encontrado com o gênero ${genero}.`);
  } else {
    clientesFiltrados.forEach((cliente) => {
      console.log(
        `ID: ${cliente.id}, Nome: ${cliente.nome}, Email: ${cliente.email}, Gênero: ${cliente.genero}`
      );
    });
  }
}


function buscarClientePorId(args: { id: number }): void {
  const { id } = args;
  const cliente = clienteService.findClienteById(id);
  if (cliente) {
    console.log(
      `Cliente encontrado - ID: ${cliente.id}, Nome: ${cliente.nome}, Email: ${cliente.email}, Gênero: ${cliente.genero}`
    );
  } else {
    console.log("Cliente não encontrado.");
  }
}

function atualizarCliente(args: {
  id: number;
  nome: string;
  email: string;
  genero: string;
}): void {
  const { id, nome, email, genero } = args;
  const clienteAtualizado = new Cliente(id, nome, email, genero);
  const atualizacaoComSucesso = clienteService.updateCliente(
    id,
    clienteAtualizado
  );
  if (atualizacaoComSucesso) {
    console.log("Cliente atualizado com sucesso.");
  } else {
    console.log("Cliente não encontrado. Atualização não realizada.");
  }
}

function excluirCliente(args: { id: number }): void {
  const { id } = args;
  const exclusaoComSucesso = clienteService.deleteCliente(id);
  if (exclusaoComSucesso) {
    console.log("Cliente excluído com sucesso.");
  } else {
    console.log("Cliente não encontrado. Exclusão não realizada.");
  }
}

export {
  criarCliente,
  listarClientes,
  buscarClientePorId,
  atualizarCliente,
  excluirCliente,
};
