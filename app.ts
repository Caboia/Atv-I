import {
  criarCliente,
  listarClientes,
  buscarClientePorId,
  atualizarCliente,
  excluirCliente,
} from "./src/controllers/clienteController";

import * as readline from "readline";
import {
  atualizarProduto,
  buscarProdutoPorId,
  criarProduto,
  excluirProduto,
  listarProdutos,
} from "./src/controllers/produtoController";
import { parse } from "yargs";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function main() {
  while (true) {
    const opcao = await exibirMenu();

    switch (opcao) {
      case "1":
        await criarNovoCliente();
        break;
      case "2":
        listarClientes();
        break;
      case "3":
        await buscarCliPorId();
        break;
      case "4":
        await updateCliente();
        break;
      case "5":
        await deleteCliente();
        break;
      case "6":
        await criarNovoProduto();
        break;
      case "7":
        listarProdutos();
        break;
      case "8":
        await buscarProPorId();
        break;
      case "9":
        await updateProd();
        break;
      case "10":
        await deleteProd();
        break;
      case "11":
        console.log("Saindo do programa.");
        process.exit(0);
      default:
        console.log("Opção inválida. Por favor, escolha uma opção válida.");
    }
  }
}

async function exibirMenu() {
  return new Promise<string>((resolve) => {
    rl.question(
      "\n1. Criar um novo cliente" +
        "\n2. Listar clientes" +
        "\n3. Buscar cliente por ID" +
        "\n4. Atualizar cliente" +
        "\n5. Excluir cliente" +
        "\n6. Criar novo produto" +
        "\n7. Listar produtos" +
        "\n8. Buscar produto por ID" +
        "\n9. Atualizar produto" +
        "\n10. Excluir produto" +
        "\n11. Sair\nEscolha uma opção: ",

      (opcao) => {
        resolve(opcao);
      }
    );
  });
}

async function criarNovoCliente() {
  const nome = await obterEntrada("Digite o nome do cliente: ");
  const email = await obterEntrada("Digite o e-mail do cliente: ");
  const genero = await obterEntrada("Digite o gênero do cliente: ");

  criarCliente({ nome, email, genero });
}

async function buscarCliPorId() {
  const id = await obterEntrada("Digite o ID do cliente a ser buscado: ");
  buscarClientePorId({ id: parseInt(id) });
}

async function updateCliente() {
  const id = await obterEntrada("Digite o ID do cliente a ser atualizado: ");
  const nome = await obterEntrada("Digite o novo nome: ");
  const email = await obterEntrada("Digite o novo e-mail: ");
  const genero = await obterEntrada("Digite o novo gênero: ");

  atualizarCliente({
    id: parseInt(id),
    nome,
    email,
    genero,
  });
}

async function deleteCliente() {
  const id = await obterEntrada("Digite o ID do cliente a ser excluído: ");
  excluirCliente({ id: parseInt(id) });
}

async function criarNovoProduto() {
  const nome = await obterEntrada("Digite o nome do produto: ");
  const descricao = await obterEntrada("Descreva o novo produto: ");
  const preco = parseFloat(await obterEntrada("Qual o preço do novo produto?"));

  criarProduto({ nome, descricao, preco });
}

async function buscarProPorId() {
  const id = await obterEntrada("Digite o ID do produto a ser buscado: ");
  buscarProdutoPorId({ id: parseInt(id) });
}

async function updateProd() {
  const id = await obterEntrada("Digite o ID do produto a ser atualizado: ");
  const nome = await obterEntrada("Digite o nome atualizado: ");
  const descricao = await obterEntrada("Digite a nova descrição do produto: ");
  const preco = parseFloat(
    await obterEntrada("Digite o novo preço do produto: ")
  );
  atualizarProduto({ id: parseInt(id), nome, descricao, preco });
}

async function deleteProd() {
  const id = await obterEntrada("Digite o ID do produto a ser excluido: ");
  excluirProduto({ id: parseInt(id) });
}

async function obterEntrada(pergunta: string): Promise<string> {
  return new Promise<string>((resolve) => {
    rl.question(pergunta, (resposta) => {
      resolve(resposta);
    });
  });
}

main();
