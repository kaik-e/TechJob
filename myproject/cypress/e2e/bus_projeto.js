describe('Teste de Buscar Projeto', () => {
  let username;
  const password = 'senhaSegura123';
  const email = `usuario${Date.now()}@example.com`;
  const cpf = '12345678901';
  let tituloProjeto;

  beforeEach(() => {
    username = `usuario_${Date.now()}`;
    tituloProjeto = `Título do Projeto ${Date.now()}`;

    cy.visit('/registrar/');
    cy.get('select[name="user_type"]').select('freelancer');
    cy.get('input[name="username"]').type(username);
    cy.get('input[name="password"]').type(password);
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="cpf"]').type(cpf);
    cy.get('form').submit();
    cy.url().should('include', '/home');

    cy.visit('/adicionar-projeto/');
    cy.get('input[name="titulo"]').type(tituloProjeto);
    cy.get('textarea[name="descricao"]').type('Descrição do projeto');
    cy.get('select[name="filtro"]').select('frontend');
    cy.get('form').invoke('prop', 'noValidate', true);
    cy.get('.add-project-button > .add-project-text').click();
    cy.contains('Projeto adicionado com sucesso!').should('be.visible');
    cy.wait(2000);
    cy.get('a.text-blue-500').should('be.visible').click();
    cy.url().should('include', '/home');
  });

  it('Deve pesquisar e navegar para a página de detalhes do projeto após adicionar', () => {
    cy.scrollTo(0, 0);
    cy.get('.header').should('not.have.class', 'hidden');
    cy.get('#home-search-input')
      .should('be.visible')
      .should('not.be.disabled')
      .click({ force: true })
      .type(tituloProjeto, { force: true });
    cy.wait(500);
    cy.get('#home-search-results').should('contain', tituloProjeto);

    cy.get('#home-search-results')
      .contains(tituloProjeto)
      .click({ force: true });  

    cy.url().should('include', `/projeto/`);
    cy.get('.projeto-titulo').should('contain.text', tituloProjeto);
  });
});
