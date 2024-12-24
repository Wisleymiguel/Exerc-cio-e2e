/// <reference types="cypress" />

import exercicioPage from "../support/exercicio.page";
import { faker, Faker, fakerEN_HK } from "@faker-js/faker";
context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
  /*  Como cliente 
      Quero acessar a Loja EBAC 
      Para fazer um pedido de 4 produtos 
      Fazendo a escolha dos produtos
      Adicionando ao carrinho
      Preenchendo todas opções no checkout
      E validando minha compra ao final */

  beforeEach(() => {
      exercicioPage.visitarUrl()
  });

  it('Deve adicionar produto ao carrinho', () => {
    exercicioPage.buscarProduto('Stellar Solar Jacket')
    exercicioPage.addProdutoCarrinho('M','Red',4 )
    cy.get('.woocommerce-message').should('contain','Stellar Solar Jacket')
    cy.get('.woocommerce-message > .button').click()
    cy.get('.checkout-button').click()
//Preenchendo todas opções no checkout
    cy.get('#billing_first_name').type(faker.person.firstName())
    cy.get('#billing_last_name').type(faker.person.lastName())
    cy.get('#select2-billing_country-container').type('Brasil').click()

    cy.get('#billing_address_1').type('Apartamento')
    cy.get('#billing_city').type(faker.location.city())
    cy.get('#select2-billing_state-container').type(faker.location.city())
    cy.get('.select2-search__field')
    cy.get('#billing_postcode').type('32907-000', { force: true })
    cy.get('#billing_phone').type('+55 (31) 996628240')
    cy.get('#billing_email').type(faker.internet.email())
    cy.get('#createaccount').click()
    cy.get('#account_password').type(faker.phone.number())
    cy.get('#terms').click()
    cy.get('#place_order').click()
    cy.get('.page-title').should('exist')



  });


})