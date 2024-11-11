describe('Teste de Visualização Detalhes De Um Projeto', () => {
    const timestamp = Date.now();
    const username = `usuario${timestamp}`;
    const password = 'senhaSegura123';
    const email = `usuario${timestamp}@example.com`;
    const cpf = '12345678901';

    beforeEach(() => {
        cy.visit('/registrar/');
        cy.get('select[name="user_type"]').select('freelancer');
        cy.get('input[name="username"]').type(username);
        cy.get('input[name="password"]').type(password);
        cy.get('input[name="email"]').type(email);
        cy.get('input[name="cpf"]').type(cpf);
        cy.get('form').submit();
        cy.url().should('include', '/home');
    });

    it('Deve clicar em "Ver mais" de um projeto e acessar seus detalhes', () => {
        cy.get('.projects-grid')
            .find('.project-item')
            .first()
            .find('.view-more-link')
            .click();
        
        cy.url().should('include', '/projeto/');
        cy.get('.projeto-titulo').should('be.visible');
    });
});
