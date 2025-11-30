import { run, get, all } from "../config/database.js";

/**
 * Cria um novo fornecedor
 * @param {Object} fornecedorData - { login, email, senha, foto }
 * @returns {Promise<Object>} fornecedor criado (sem senha)
 */
export async function createfornecedorRepository(fornecedorData) {
    const { login, email = null, senha, foto = null } = fornecedorData;

    const result = await run(
        `INSERT INTO fornecedor (login, email, senha, foto) VALUES (?, ?, ?, ?)`,
        [login, email, senha, foto]
    );

    // retorna o registro criado sem a senha
    return await get(
        `SELECT id, login, email, foto FROM fornecedor WHERE id = ?`,
        [result.lastID]
    );
}

/**
 * Retorna todos os fornecedors (sem senha)
 * @returns {Promise<Array>}
 */
export async function findAllfornecedorRepository() {
    return await all(`SELECT id, login, email, foto FROM fornecedor`);
}

/**
 * Retorna fornecedor por ID (sem senha)
 * @param {number} id
 * @returns {Promise<Object|null>}
 */
export async function findfornecedorByIdRepository(id) {
    return await get(
        `SELECT id, cnpj, email, nome FROM fornecedor WHERE id = ?`,
        [id]
    );
}

/**
 * Atualiza fornecedor por ID
 * @param {number} id
 * @param {Object} fornecedorData - { login, email, senha, foto } (campos opcionais)
 * @returns {Promise<Object|null>} Registro atualizado (sem senha) ou null se não encontrado
 */
export async function updatefornecedorRepository(id, fornecedorData) {
    // busca existente (inclui senha caso precise manter)
    const existing = await get(`SELECT * FROM fornecedor WHERE id = ?`, [id]);
    if (!existing) return null;

    const email = fornecedorData.email ?? existing.email;
    const nome = fornecedorData.nome ?? existing.nome;
    const cnpj = fornecedorData.cnpj ?? existing.cnpj;

    const result = await run(
        `UPDATE fornecedor SET cnpj = ?, email = ?, nome = ? WHERE id = ?`,
        [cnpj, email, nome, id]
    );

    if (result.changes === 0) return null;

    return await get(`SELECT id, email, nome, FROM fornecedor WHERE id = ?`, [id]);
}

/**
 * Remove fornecedor por ID
 * @param {number} id
 * @returns {Promise<boolean>} true se removido, false se não encontrado
 */
export async function deletefornecedorRepository(id) {
    const result = await run(`DELETE FROM fornecedor WHERE id = ?`, [id]);
    return result.changes > 0;
}

export default {
    createfornecedorRepository,
    findAllfornecedorRepository,
    findfornecedorByIdRepository,
    updatefornecedorRepository,
    deletefornecedorRepository
};
