Cypress.Commands.add('login', (usuario, senha) => {
    cy.visit('/minha-conta'); // Adicione a URL para a página de login
    cy.get('#username').type(usuario);
    cy.get('#password').type(senha, { log: false });
    cy.get('.woocommerce-form > .button').click();
});
