/// <reference types="cypress" />

import exercicioPage from "../support/page_objects/exercicio.page";
import { faker } from "@faker-js/faker";

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
  /*  
      Cenário:
      Como cliente 
      Quero acessar a Loja EBAC 
      Para fazer um pedido de 4 produtos 
      Fazendo a escolha dos produtos
      Adicionando ao carrinho
      Preenchendo todas opções no checkout
      E validando minha compra ao final 
  */

  const dadosCliente = {
    nome: faker.person.firstName(),
    sobrenome: faker.person.lastName(),
    pais: 'Brasil',
    endereco: 'Apartamento',
    cidade: faker.location.city(),
    estado: 'Minas Gerais',
    cep: '32907-000',
    telefone: '+55 (31) 996628240',
    email: faker.internet.email(),
    senha: faker.internet.password(),
  };
  beforeEach(() => {
    cy.visit('minha-conta')
    cy.get('#reg_email').type(faker.internet.email())
    cy.get('#reg_password').type(faker.internet.password())
    cy.get(':nth-child(4) > .button').click()
});


  beforeEach(() => {
    exercicioPage.visitarUrl(); // URL definida em `exercicioPage`
  });

  it('Deve adicionar produtos ao carrinho e finalizar compra', () => {
    // Adicionando produto ao carrinho
    exercicioPage.buscarProduto('Ingrid Running Jacket');
    exercicioPage.addProdutoCarrinho('M', 'Red', 2);

    // Navegando para o checkout
    cy.get('.woocommerce-message > .button').click();
    cy.get('.checkout-button').click();

    // Preenchendo o formulário de checkout
    preencherFormulario(dadosCliente);

    // Finalizando o pedido
    cy.get('#terms').click();
    cy.get('#place_order').click();

    // Validando a confirmação do pedido
    cy.get('.page-title').should('exist');
  });

  // Função auxiliar para preencher o formulário
  function preencherFormulario(cliente) {
    cy.get('#billing_first_name').type(cliente.nome);
    cy.get('#billing_last_name').type(cliente.sobrenome);
    cy.get('#select2-billing_country-container').click();
    cy.get('.select2-search__field').type(cliente.pais).type('{enter}');
    cy.get('#billing_address_1').type(cliente.endereco);
    cy.get('#billing_city').type(cliente.cidade);
    cy.get('#select2-billing_state-container').click();
    cy.get('.select2-search__field').type(cliente.estado).type('{enter}');
    cy.get('#billing_postcode').type(cliente.cep, { force: true });
    cy.get('#billing_phone').clear().type(cliente.telefone);

   // cy.get('#billing_email').type(cliente.email);
    //cy.get(':nth-child(4) > .button').click()
   // cy.get('#place_order').click()
  }
});
