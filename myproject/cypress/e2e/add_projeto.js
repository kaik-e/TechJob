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

    cy.get('form').invoke('prop', 'noValidate', true);

    cy.get('.add-project-button > .add-project-text').click();

    cy.wait(500);

    cy.contains('Por favor, preencha todos os campos e selecione um filtro.').should('be.visible');
    cy.url().should('not.include', '/home');
  });

  it('Deve permitir adicionar um projeto e voltar para a home ao clicar no botão "Voltar para a Home"', () => {
    cy.visit('/adicionar-projeto/');

    cy.get('input[name="titulo"]').type('Título do Projeto');
    cy.get('textarea[name="descricao"]').type('Descrição do projeto');
    cy.get('select[name="filtro"]').select('frontend');

    cy.get('form').invoke('prop', 'noValidate', true);

    cy.get('.add-project-button > .add-project-text').click();

    cy.contains('Projeto adicionado com sucesso!').should('be.visible');

    cy.wait(2000);

    cy.get('a.text-blue-500').should('be.visible').click();

    cy.url().should('include', '/home');
  });
});
