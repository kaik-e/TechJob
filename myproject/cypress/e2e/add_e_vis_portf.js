describe('Teste de Adicionar e Visualizar Portfólio No Perfil', () => {
    const timestamp = Date.now();
    const username = `usuario${timestamp}`;
    const password = 'senhaSegura123';
    const email = `usuario${timestamp}@example.com`;
    const cpf = '12345678901';
    const portfolioTitle = 'Meu Primeiro Portfólio';
    const portfolioDescription = 'Este é o meu primeiro portfólio de exemplo.';
    const emptyTitle = '';
    const emptyDescription = '';

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

    it('Deve não adicionar portfólio vazio e depois adicionar um portfólio válido e visualizá-lo', () => {
        cy.get('.profile-pic').eq(0).click();
        cy.url().should('include', '/perfil');
        
        cy.contains('Editar Perfil').click();
        cy.url().should('include', '/editar-perfil');
        cy.contains('Adicionar Portfólio').click();
        cy.url().should('include', '/adicionar-portfolio');
        
        cy.get('input[name="title"]').clear().type(' ');
        cy.get('textarea[name="description"]').clear().type(' ');
        cy.get('button[type="submit"]').click();

        cy.contains('Por favor, preencha todos os campos corretamente.').should('be.visible');
        
        cy.get('input[name="title"]').clear().type('Portfólio Válido');
        cy.get('textarea[name="description"]').clear().type('Descrição válida');
        cy.get('button[type="submit"]').click();
        
        cy.contains('Portfólio adicionado com sucesso!').should('be.visible'); 

        cy.contains('Voltar para o Editar Perfil').click();
        cy.url().should('include', '/editar-perfil');
        
        cy.contains('Voltar ao Perfil').click();
        cy.url().should('include', '/perfil');
        
        cy.contains('Portfólio').click();
        cy.url().should('include', '/portfolio');
    });
});
