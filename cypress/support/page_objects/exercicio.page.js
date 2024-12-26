
class Exerciciopage{

    visitarUrl(){
       cy.visit('produtos')
    }

    buscarProduto(nomeProduto){
        cy.get('[name="s"]').eq(1).type(nomeProduto)
        cy.get('.button-search').eq(1).click()  
    }

    buscarProdutoLista(nomeProduto){
        cy.get('.product-block'). last()
        .click()
        cy.get('#tab-title-description > a').should('exist')
        



    }

    visitarProduto(nomeProduto){
  

        const urlFomatada = nomeProduto.replace(/ /g, '-')
        cy.visit(`produtos/${urlFomatada}`)


    }

    addProdutoCarrinho(tamanho,cor,quantidade){
        cy.get('.button-variable-item-'+ tamanho).click().click()
        cy.get('.button-variable-item-'+ cor).click()
        cy.get('.input-text').clear().type(quantidade)
        cy.get('.single_add_to_cart_button').click()
}       

}
export default new Exerciciopage()
