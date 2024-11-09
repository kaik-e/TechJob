describe('Teste de Adicionar Skill', () => {
    const timestamp = Date.now();
    const username = `usuario${timestamp}`;
    const password = 'senhaSegura123';
    const email = `usuario${timestamp}@example.com`;
    const cpf = '12345678901';
    const newSkill = 'Nova Skill';
    const emptySkill = '';

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

    it('Deve não adicionar skill vazia e depois adicionar uma skill válida', () => {
        cy.get('.profile-pic').eq(0).click();
        cy.url().should('include', '/perfil');
        
        cy.contains('Editar Perfil').click();
        cy.url().should('include', '/editar-perfil');
        cy.contains('Editar Skills').click();

        cy.get('form > [type="text"]').clear();
        cy.get('form > button').click();

        cy.wait(1000);  
        
        cy.contains('Skill não pode ser vazia').should('be.visible');

        cy.get('form > [type="text"]').clear().type(newSkill);
        cy.get('form > button').click();

        cy.wait(1000);  

        cy.contains('Skill adicionada com sucesso!').should('be.visible');
        
        cy.contains('Voltar para o Editar Perfil').click();
        cy.url().should('include', '/editar-perfil');
        
        cy.contains('Voltar ao Perfil').click();
        cy.url().should('include', '/perfil');
        
        cy.get('.skills-list').should('contain', newSkill);
    });
});
