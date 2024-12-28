/// <reference types="cypress" />
import exercicioPage from "../support/page_objects/exercicio.page"; // Atualizado para o caminho correto
import { faker } from "@faker-js/faker";

let dadosLogin;

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    before(() => {
        // Carregar dados de login do arquivo perfil.json
        cy.fixture('perfil').then(perfil => {
            dadosLogin = perfil;
        });
    });

    beforeEach(() => {
        cy.login(dadosLogin.usuario, dadosLogin.senha); // Use o comando customizado
    });

    it('Deve adicionar produto ao carrinho e finalizar compra', () => {
        // Buscar o produto
        exercicioPage.buscarProduto('Ingrid Running Jacket');

        // Adicionar o produto 1 ao carrinho
        exercicioPage.addProdutoCarrinho('M', 'Red', 2);
        cy.get('.woocommerce-message > .button').click();
        //Adicionar o produto 2 ao carrinho
        exercicioPage.buscarProduto('Eos V-Neck Hoodie');
        exercicioPage.addProdutoCarrinho('M', 'Blue', 2);
        cy.get('.woocommerce-message > .button').click();


        // Ir para a página de checkout
        cy.get('.checkout-button').click();

        // Preencher o formulário de checkout usando o método da classe
        exercicioPage.preencherFormulario({
            nome: faker.person.firstName(),
            sobrenome: faker.person.lastName(),
            pais: 'Brasil',
            endereco: 'Apartamento',
            cidade: faker.location.city(),
            estado: 'Minas Gerais',
            cep: '32907-000',
            telefone:'31 996622840',
            email: faker.internet.email(),
            senha: faker.internet.password(),
        });

        // Aceitar os termos e finalizar o pedido
        cy.get('#terms').click();
        cy.get('#place_order').click();

        // Validar que o pedido foi finalizado com sucesso
        cy.get('.page-title').should('exist');
    });
});
