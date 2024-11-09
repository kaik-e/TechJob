describe('Teste de Adição de Projeto', () => {
  let username;
  const password = 'senhaSegura123';
  const email = `usuario${Date.now()}@example.com`;
  const cpf = '12345678901';

  beforeEach(() => {
    username = `usuario_${Date.now()}`;

    cy.visit('/registrar/');
    cy.get('select[name="user_type"]').select('freelancer');
    cy.get('input[name="username"]').type(username);
    cy.get('input[name="password"]').type(password);
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="cpf"]').type(cpf);
    cy.get('form').submit();
    cy.url().should('include', '/home');
  });

  it('Não deve permitir adicionar um projeto sem título, descrição ou filtro', () => {
    cy.visit('/adicionar-projeto/');

    cy.get('input[name="titulo"]').clear();
    cy.get('textarea[name="descricao"]').clear();
    cy.get('select[name="filtro"]').select('');

    cy.get('form').submit();

    cy.url().should('not.include', '/home');
  });

  it('Deve redirecionar para a tela inicial após adicionar título, descrição e filtro', () => {
    cy.visit('/adicionar-projeto/');

    cy.get('input[name="titulo"]').type('Título do Projeto');
    cy.get('textarea[name="descricao"]').type('Descrição do projeto');
    cy.get('select[name="filtro"]').select('frontend');

    cy.get('form').submit();
    
    cy.url().should('include', '/home');
  });
});
