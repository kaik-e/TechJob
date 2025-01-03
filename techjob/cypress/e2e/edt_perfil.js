describe('Teste de Editar o Perfil', () => {
    const timestamp = Date.now();
    const username = `usuario${timestamp}`;
    const password = 'senhaSegura123';
    const email = `usuario${timestamp}@example.com`;
    const cpf = '12345678901';
    const newUsername = `usuarioEditado${timestamp}`;
    const newDescription = 'Descrição editada com sucesso';
    const newProfilePicture = 'foto.jpeg';

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

    it('Deve testar as validações ao editar o perfil', () => {
        cy.get('.profile-pic').eq(0).should('be.visible').click();
        cy.url().should('include', '/perfil');
        cy.contains('Editar Perfil').should('be.visible').click();

        cy.get('input[name="username"]').clear();
        cy.get('textarea[name="description"]').clear();

        cy.get('.edit-profile-btn').click();

        cy.contains('Voltar para o perfil').should('be.visible').click();
        cy.wait(2000);
        cy.contains('Editar Perfil').should('be.visible').click();

        cy.contains('Editar Perfil').should('be.visible').click();

        cy.get('input[name="username"]').clear().type(newUsername);
        cy.get('textarea[name="description"]').clear().type(newDescription);
        cy.get('input[name="profile_picture"]').attachFile(newProfilePicture);

        cy.get('.edit-profile-btn').click();

        cy.contains('Perfil atualizado com sucesso!', { timeout: 10000 }).should('be.visible');

        cy.get('h2').should('contain', newUsername);
        cy.get('p').should('contain', newDescription);
        cy.get('.prfl-pic img').should('have.attr', 'src').and('include', 'foto_');
    });
});
