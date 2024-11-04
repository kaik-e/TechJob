describe('Teste de Adição de Projeto', () => {
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

  it('Não deve permitir adicionar um projeto sem título ou descrição', () => {
    cy.visit('/adicionar_projeto/');

    cy.get('textarea[name="descricao"]').clear();
    cy.get('form').submit();
    cy.get('.alert').should('contain', 'Por favor, preencha todos os campos.');

    cy.get('input[name="titulo"]').clear().type('Título do Projeto');
    cy.get('form').submit();
    cy.get('.alert').should('contain', 'Por favor, preencha todos os campos.');

    cy.get('input[name="titulo"]').clear();
    cy.get('textarea[name="descricao"]').clear().type('Descrição do projeto');
    cy.get('form').submit();
    cy.get('.alert').should('contain', 'Por favor, preencha todos os campos.');

    cy.get('input[name="titulo"]').type('Título do Projeto');
    cy.get('textarea[name="descricao"]').type('Descrição do projeto');
    cy.get('form').submit();
    cy.url().should('include', '/home');
  });
});