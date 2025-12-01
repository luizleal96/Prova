const fornecedorService = require('./fornecedor.services');

test('deve retornar todos os fornecedores', () => {
    const fornecedores = fornecedorService.getAll();
    expect(fornecedores).toBeDefined();
    expect(Array.isArray(fornecedores)).toBe(true);
});

test('deve adicionar um novo fornecedor', () => {
    const novoFornecedor = { nome: 'Fornecedor Teste', id: 1 };
    fornecedorService.add(novoFornecedor);
    const fornecedores = fornecedorService.getAll();
    expect(fornecedores).toContainEqual(novoFornecedor);
});