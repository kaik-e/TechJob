describe('Teste de Adicionar e Visualizar Avaliação No Perfil', () => {
    const timestamp = Date.now();
    const username = `usuario${timestamp}`;
    const password = 'senhaSegura123';
    const email = `usuario${timestamp}@example.com`;
    const cpf = '12345678901';
    const comentarioVazio = '';
    const comentarioComEspacos = '     ';
    const comentarioValido = 'Ótimo trabalho, muito dedicado e competente!';

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

    it('Deve mostrar mensagem de erro se avaliação não for digitada e depois permitir avaliação válida', () => {
        cy.get('.profile-pic').first().click();
        cy.url().should('include', '/perfil');
        
        cy.contains('Adicionar Avaliação').click();
        cy.url().should('include', '/adicionar-avaliacao');

        cy.get('#avaliacao-form button[type="submit"]').click();
        cy.wait(500);
        
        cy.get('#message-container').should('exist');

        cy.get('textarea[name="comment"]').type(comentarioComEspacos);
        cy.get('#avaliacao-form button[type="submit"]').click();
        cy.wait(500);
        
        cy.contains('Por favor, digite uma avaliação.').should('be.visible');

        cy.get('textarea[name="comment"]').clear().type(comentarioValido);
        cy.get('#avaliacao-form button[type="submit"]').click();
        
        cy.contains('Avaliação enviada com sucesso!').should('be.visible');
        cy.contains('Voltar para o Perfil').click();
        cy.url().should('include', '/perfil');
        
        cy.scrollTo('bottom');
        cy.contains(comentarioValido).should('be.visible');
    });
});

