import fornecedorService from "../services/fornecedor.services.js";

const validateId = (id) => {
    const num = Number(id);
    return Number.isInteger(num) && num > 0;
};

async function createfornecedorController(req, res) {
    const { cnpj, nome, email } = req.body || {};
    if (!cnpj || !nome) {
        return res.status(400).json({ error: "Cnpj e Nome são obrigatórios" });
    }

    try {
        const fornecedor = await fornecedorService.createfornecedorService({ cnpj, nome, email });
        return res.status(201).json(fornecedor);
    } catch (error) {
        return res.status(500).json({ error: error?.message ?? "Erro ao criar fornecedor" });
    }
}

async function findAllfornecedorController(req, res) {
    try {
        const fornecedors = await fornecedorService.findAllfornecedorService();
        return res.status(200).json(fornecedors);
    } catch (error) {
        return res.status(500).json({ error: error?.message ?? "Erro ao listar fornecedores" });
    }
}

async function findfornecedorByIdController(req, res) {
    const { id } = req.params;
    if (!validateId(id)) {
        return res.status(400).json({ error: "ID inválido" });
    }

    try {
        const fornecedor = await fornecedorService.findfornecedorByIdService(id);
        if (!fornecedor) return res.status(404).json({ error: "fornecedor não encontrado" });
        return res.status(200).json(fornecedor);
    } catch (error) {
        return res.status(500).json({ error: error?.message ?? "Erro ao buscar fornecedor" });
    }
}

async function updatefornecedorController(req, res) {
    const { id } = req.params;
    const fornecedorData = req.body || {};

    if (!validateId(id)) {
        return res.status(400).json({ error: "ID inválido" });
    }
    if (Object.keys(fornecedorData).length === 0) {
        return res.status(400).json({ error: "Nenhum dado para atualizar" });
    }

    try {
        const updated = await fornecedorService.updatefornecedorService(id, fornecedorData);
        if (!updated) return res.status(404).json({ error: "fornecedor não encontrado" });
        return res.status(200).json(updated);
    } catch (error) {
        return res.status(500).json({ error: error?.message ?? "Erro ao atualizar fornecedor" });
    }
}

async function deletefornecedorController(req, res) {
    const { id } = req.params;
    if (!validateId(id)) {
        return res.status(400).json({ error: "ID inválido" });
    }

    try {
        const removed = await fornecedorService.deletefornecedorService(id);
        if (!removed) return res.status(404).json({ error: "fornecedor não encontrado" });
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ error: error?.message ?? "Erro ao remover fornecedor" });
    }
}

export default {
    createfornecedorController,
    findAllfornecedorController,
    findfornecedorByIdController,
    updatefornecedorController,
    deletefornecedorController
};
