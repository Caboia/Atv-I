import Cliente from "../models/cliente";

const clientes: Cliente[] = [];

function createCliente(cliente: Cliente): void {
  if (clientes.some((c) => c.email === cliente.email)) {
    console.log("Erro: E-mail já cadastrado.");
    return;
  }

  cliente.id = clientes.length + 1;

  clientes.push(cliente);
  console.log("Cliente criado com sucesso.");
  console.log(clientes);
}

function listClientes(): Cliente[] {
  return clientes;
}

function findClienteById(clienteId: number): Cliente | null {
  const cliente = clientes.find((c) => c.id === clienteId);
  return cliente || null;
}

function updateCliente(clienteId: number, novosDetalhes: Cliente): boolean {
  const index = clientes.findIndex((c) => c.id === clienteId);

  if (index === -1) {
    console.log("Erro: Cliente não encontrado.");
    return false;
  }

  clientes[index] = { ...clientes[index], ...novosDetalhes };
  console.log("Cliente atualizado com sucesso.");
  return true;
}

function deleteCliente(clienteId: number): boolean {
  const index = clientes.findIndex((c) => c.id === clienteId);

  if (index === -1) {
    console.log("Erro: Cliente não encontrado.");
    return false;
  }

  clientes.splice(index, 1);
  console.log("Cliente excluído com sucesso.");
  return true;
}

export {
  createCliente,
  listClientes,
  findClienteById,
  updateCliente,
  deleteCliente,
};
