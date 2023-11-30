import {
  criarCliente,
  listarClientes,
  buscarClientePorId,
  atualizarCliente,
  excluirCliente,
  consumirProduto,
  listarTopClientes,
  listarBottomClientes,
  listarTopClientesGasto,
  listarClientesGen,
  listarProdutosMaisConsumidos,
  listarProdutosMaisConsumidosPorGenero,
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
import { findProdutoById } from "./services/produtoService";

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
        await consumirProd();
        break;
      case "12":
        listarMaisClientes();
        break;
      case "13":
        listarMenosClientes();
        break;
      case "14":
        listarTopValor();
        break;
      case "15":
        listarClientesPorGenero();
        break;
      case "16":
        listarProdutosMaisConsumidos();
        break;
      case "17":
        listarProdPorGenero();
        break
      case "18":
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
        "\n11. Consumir produto" +
        "\n12. Listar os clientes que mais consumiram" +
        "\n13. Listar os clientes que menos consumiram" +
        "\n14. Listar os clientes que mais consumiram em valor" +
        "\n15. Listar os clientes por gênero" +
        "\n16. Listar os produtos mais consumidos" +
        "\n17. Listar os produtos mais consumidos por gênero" +
        "\n18. Sair\nEscolha uma opção: ",
        
        
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
    
    async function listarClientesPorGenero() {
      const genero = await obterEntrada(
        "Digite o gênero dos clientes a serem listados: "
      );
      listarClientesGen({ genero });
    
      await new Promise(resolve => setTimeout(resolve, 1000));
    
      main();
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

async function listarProdPorGenero() {
  const genero = await obterEntrada(
    "Digite o gênero para listar os produtos mais consumidos: "
  );
  listarProdutosMaisConsumidosPorGenero({ genero });

  await new Promise(resolve => setTimeout(resolve, 1000));
    
      main();
}

async function consumirProd() {
  const clienteId = parseInt(await obterEntrada("Digite o ID do cliente: "));
  const produtoId = parseInt(await obterEntrada("Digite o ID do produto: "));
  const quantidade = parseInt(await obterEntrada("Digite a quantidade: "));

  const produto = findProdutoById(produtoId);

  if (!produto) {
    console.log("Erro: Produto não encontrado.");
    return;
  }


  const sucessoConsumo = await consumirProduto(
    clienteId,
    produtoId,
    quantidade,
    produto.preco
  );

  if (sucessoConsumo) {
    console.log(`Produto consumido com sucesso.`);
  } else {
    console.log("Erro ao consumir o produto.");
  }
}


async function listarTopValor() {
  const topClientesGasto = listarTopClientesGasto();
  console.log("Top 10 clientes que mais consumiram em valor de reais:");
  console.log(topClientesGasto.join("\n"));
}

async function listarMaisClientes() {
  const topClientes = listarTopClientes();
  console.log("Os 10 clientes que mais consumiram:");
  console.log(topClientes.join(", "));
}

async function listarMenosClientes() {
  const bottomClientes = listarBottomClientes();
  console.log("Os 10 clientes que menos consumiram:");
  console.log(bottomClientes.join(", "));
}

main();
