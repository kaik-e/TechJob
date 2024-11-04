describe('Teste de Visualização do Perfil', () => {
    const timestamp = Date.now();
    const username = `usuario${timestamp}`;
    const password = 'senhaSegura123';
    const email = `usuario${timestamp}@example.com`;
    const cpf = '12345678901';

    beforeEach(() => {
        cy.visit('/register/');
        cy.get('select[name="user_type"]').select('freelancer');
        cy.get('input[name="username"]').type(username);
        cy.get('input[name="password"]').type(password);
        cy.get('input[name="email"]').type(email);
        cy.get('input[name="cpf"]').type(cpf);
        cy.get('form').submit();
        cy.url().should('include', '/home');
    });

    it('Deve permitir ao usuário visualizar seu perfil', () => {
        cy.get('a > .profile-pic').should('be.visible').click();
        cy.url().should('include', '/perfil');
        cy.get('h2').should('contain', username);
    });
});
