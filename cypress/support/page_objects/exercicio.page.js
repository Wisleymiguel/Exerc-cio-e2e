class Exerciciopage {

    visitarUrl() {
        cy.visit('produtos');
    }

    buscarProduto(nomeProduto) {
        cy.get('[name="s"]').eq(1).type(nomeProduto);
        cy.get('.button-search').eq(1).click();
    }

    buscarProdutoLista(nomeProduto) {
        cy.get('.product-block').last().click();
        cy.get('#tab-title-description > a').should('exist');
    }

    visitarProduto(nomeProduto) {
        const urlFormatada = nomeProduto.replace(/ /g, '-');
        cy.visit(`produtos/${urlFormatada}`);
    }

    addProdutoCarrinho(tamanho, cor, quantidade) {
        cy.get(`.button-variable-item-${tamanho}`).click();
        cy.get(`.button-variable-item-${cor}`).click();
        cy.get('.input-text').clear().type(quantidade);
        cy.get('.single_add_to_cart_button').click();
    }

    preencherFormulario(cliente) {
        cy.get('#billing_first_name').clear().type(cliente.nome);
        cy.get('#billing_last_name').clear().type(cliente.sobrenome);
        cy.get('#select2-billing_country-container').click();
        cy.get('.select2-search__field').type(cliente.pais).type('{enter}');
        cy.get('#billing_address_1').clear().type(cliente.endereco);
        cy.get('#billing_city').clear().type(cliente.cidade);
        cy.get('#select2-billing_state-container').click();
        cy.get('.select2-search__field').type(cliente.estado).type('{enter}');
        cy.get('#billing_postcode').clear().type(cliente.cep, { force: true });
        cy.get('#billing_phone').clear().clear().type(cliente.telefone,{force:true });
       
       
    }
}

export default new Exerciciopage();
