import Produto from "../../models/produto";
import * as produtoService from "../../services/produtoService";

function criarProduto(args: {
  nome: string;
  descricao: string;
  preco: number;
}): void {
  const { nome, descricao, preco } = args;
  const novoProduto = new Produto(0, nome, descricao, preco);
  produtoService.createProduto(novoProduto);
}

function listarProdutos(): void {
  const produtos = produtoService.listProdutos();
  if (produtos.length === 0) {
    console.log("Nenhum produto encontrado.");
  } else {
    produtos.forEach((produto) => {
      console.log(
        `ID: ${produto.id}, Nome: ${produto.nome}, Descrição: ${produto.descricao}, Preço: ${produto.preco}`
      );
    });
  }
}

function buscarProdutoPorId(args: { id: number }): void {
  const { id } = args;
  const produto = produtoService.findProdutoById(id);
  if (produto) {
    console.log(
      `Produto encontrado - ID: ${produto.id}, Nome: ${produto.nome}, Descrição: ${produto.descricao}, Preço: ${produto.preco}`
    );
  } else {
    console.log("Produto não encontrado.");
  }
}

function atualizarProduto(args: {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
}): void {
  const { id, nome, descricao, preco } = args;
  const produtoAtualizado = new Produto(id, nome, descricao, preco);
  const atualizacaoComSucesso = produtoService.updateProduto(
    id,
    produtoAtualizado
  );
  if (atualizacaoComSucesso) {
    console.log("Produto atualizado com sucesso.");
  } else {
    console.log("Produto não encontrado. Atualização não realizada.");
  }
}

function excluirProduto(args: { id: number }): void {
  const { id } = args;
  const exclusaoComSucesso = produtoService.deleteProduto(id);
  if (exclusaoComSucesso) {
    console.log("Produto excluído com sucesso.");
  } else {
    console.log("Produto não encontrado. Exclusão não realizada.");
  }
}

export {
  criarProduto,
  listarProdutos,
  buscarProdutoPorId,
  atualizarProduto,
  excluirProduto,
};
