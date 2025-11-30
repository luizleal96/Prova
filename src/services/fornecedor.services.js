import fornecedorRepository from "../repositories/fornecedor.repository.js";

async function createfornecedorService(fornecedorData) {
    const fornecedor = await fornecedorRepository.createfornecedorRepository(fornecedorData);
    if (!fornecedor) throw new Error("Erro ao criar novo fornecedor!");
    return fornecedor;
}

async function findAllfornecedorService() {
    return await fornecedorRepository.findAllfornecedorRepository();
}

async function findfornecedorByIdService(id) {
    // retorna objeto ou null (não lança exceção) — controlador decide o status HTTP
    return await fornecedorRepository.findfornecedorByIdRepository(id);
}

async function updatefornecedorService(id, fornecedorData) {
    // repository já retorna null se não existir
    const fornecedorAtualizado = await fornecedorRepository.updatefornecedorRepository(id, fornecedorData);
    return fornecedorAtualizado;
}

async function deletefornecedorService(id) {
    // retorna true se removido, false se não encontrado
    const removed = await fornecedorRepository.deletefornecedorRepository(id);
    return removed;
}

export default {
    createfornecedorService,
    findAllfornecedorService,
    findfornecedorByIdService,
    updatefornecedorService,
    deletefornecedorService
};
