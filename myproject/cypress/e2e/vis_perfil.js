describe('Teste de Visualização de Perfil', () => {
    const timestamp = Date.now();
    const username = `usuario${timestamp}`;
    const password = 'senhaSegura123';
    const email = `usuario${timestamp}@example.com`;
    const cpf = '12345678901';

    before(() => {
        cy.visit('/registrar/');
        cy.get('select[name="user_type"]').select('freelancer');
        cy.get('input[name="username"]').type(username);
        cy.get('input[name="password"]').type(password);
        cy.get('input[name="email"]').type(email);
        cy.get('input[name="cpf"]').type(cpf);
        cy.get('form').submit();

        cy.url().should('include', '/home');
    });

    it('Deve permitir ao usuário acessar o perfil de outro usuário e depois acessar o seu próprio perfil', () => {
        cy.get('.project-item').first().find('.profile-pic').click();
        cy.url().should('include', '/perfil');

        cy.get('h2').should('not.contain', username); 

        cy.get('a > .profile-pic').click(); 
        cy.url().should('include', '/perfil');
        cy.get('h2').should('contain', username); 
    });
});

