import Cliente from "../../models/cliente";
import * as clienteService from "../../services/clienteService";
import * as produtoService from "../../services/produtoService";


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

function listarTopClientes(): string[] {
  const clientes = clienteService.listClientes();

  const clientesOrdenados = clientes.sort(
    (a, b) => b.historicoCompras.length - a.historicoCompras.length
  );

  const topClientesNomes = clientesOrdenados.slice(0, 10).map(cliente => cliente.nome);

  return topClientesNomes;
}

function listarBottomClientes(): string[] {
  const clientes = clienteService.listClientes();

  const clientesOrdenados = clientes.sort(
    (a, b) => a.historicoCompras.length - b.historicoCompras.length
  );

  const bottomClientesNomes = clientesOrdenados.slice(0, 10).map(cliente => cliente.nome);

  return bottomClientesNomes;
}

function consumirProduto(clienteId: number, produtoId: number, quantidade: number, precoUnitario: number): boolean {
  const cliente = clienteService.findClienteById(clienteId);
  const produto = produtoService.findProdutoById(produtoId);

  if (!cliente || !produto) {
    console.log("Erro: Cliente ou produto não encontrado.");
    return false;
  }

  const totalGasto = quantidade * precoUnitario;

  const sucessoConsumo = clienteService.consumirProduto(clienteId, produtoId, quantidade, totalGasto);

  if (sucessoConsumo) {
    console.log(`Produto '${produto.nome}' consumido por ${cliente.nome}. Total gasto: R$ ${totalGasto.toFixed(2)}.`);
  } else {
    console.log("Erro ao consumir o produto.");
  }

  return sucessoConsumo;
}

function listarTopClientesGasto(): string[] {
  const clientes = clienteService.listClientes();

  const clientesOrdenados = clientes.sort(
    (a, b) => {
      const totalGastoA = a.historicoCompras.reduce((total, compra) => total + compra.totalGasto, 0);
      const totalGastoB = b.historicoCompras.reduce((total, compra) => total + compra.totalGasto, 0);

      return totalGastoB - totalGastoA;
    }
  );

  const topClientesNomes = clientesOrdenados.slice(0, 10).map(cliente => `${cliente.nome} (R$ ${cliente.historicoCompras.reduce((total, compra) => total + compra.totalGasto, 0).toFixed(2)})`);

  return topClientesNomes;
}

function listarProdutosMaisConsumidos(): void {
  const clientes = clienteService.listClientes();

  const todasCompras = clientes.flatMap(cliente => cliente.historicoCompras);

  const produtosConsumidos = new Map<number, number>();

  todasCompras.forEach(compra => {
    const { produto } = compra;
    if (produto) {
      const quantidadeConsumida = produtosConsumidos.get(produto.id) || 0;
      produtosConsumidos.set(produto.id, quantidadeConsumida + compra.quantidade);
    }
  });

  const produtosOrdenados = Array.from(produtosConsumidos.entries())
    .sort(([, quantidadeA], [, quantidadeB]) => quantidadeB - quantidadeA);

  console.log("Produtos mais consumidos:");
  produtosOrdenados.forEach(([produtoId, quantidade]) => {
    const produto = produtoService.findProdutoById(produtoId);
    if (produto) {
      console.log(`Produto: ${produto.nome}, Quantidade Consumida: ${quantidade}`);
    }
  });
}

function listarProdutosMaisConsumidosPorGenero(args: { genero: string }): void {
  const { genero } = args;
  const produtos = produtoService.listProdutos();

  const produtosFiltrados = produtos.filter((produto) => {
    const totalConsumidoPorGenero = clienteService.getTotalConsumidoPorGenero(produto.id, genero);
    return totalConsumidoPorGenero > 0;
  });

  if (produtosFiltrados.length === 0) {
    console.log(`Nenhum produto consumido encontrado para o gênero ${genero}.`);
  } else {
    produtosFiltrados.forEach((produto) => {
      const totalConsumidoPorGenero = clienteService.getTotalConsumidoPorGenero(produto.id, genero);
      console.log(
        `ID: ${produto.id}, Nome: ${produto.nome}, Descrição: ${produto.descricao}, Preço: R$ ${produto.preco.toFixed(2)}, Total consumido por ${genero}: R$ ${totalConsumidoPorGenero.toFixed(2)}`
      );
    });
  }
}

export {
  criarCliente,
  listarProdutosMaisConsumidos,
  consumirProduto,
  listarClientes,
  buscarClientePorId,
  listarTopClientes,
  listarProdutosMaisConsumidosPorGenero,
  listarTopClientesGasto,
  listarBottomClientes,
  listarClientesGen,
  atualizarCliente,
  excluirCliente,
};
