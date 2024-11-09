describe('Teste Da Navbar', () => {
  let username1, username2;
  const password = 'senhaSegura123';
  const cpf1 = '12345678901';
  const cpf2 = '09876543210';
  const email1 = `usuario${Date.now()}@example.com`;
  const email2 = `usuario${Date.now() + 1}@example.com`;
  const tituloProjeto = 'Projeto Teste';

  beforeEach(() => {
      // Registra o primeiro usuário e adiciona um projeto
      username1 = `usuario_${Date.now()}`;
      cy.visit('/registrar/');
      cy.get('select[name="user_type"]').select('freelancer');
      cy.get('input[name="username"]').type(username1);
      cy.get('input[name="password"]').type(password);
      cy.get('input[name="email"]').type(email1);
      cy.get('input[name="cpf"]').type(cpf1);
      cy.get('form').submit();
      cy.url().should('include', '/home');

      // Adiciona um projeto
      cy.contains('Adicionar Projeto').click();
      cy.get('input[name="titulo"]').type(tituloProjeto);
      cy.get('textarea[name="descricao"]').type('Descrição do projeto teste.');
      cy.get('form').submit();
      cy.contains('Projeto criado com sucesso!').should('be.visible');
      cy.get('a[href="/logout"]').click();

      // Registra o segundo usuário
      username2 = `usuario_${Date.now() + 2}`;
      cy.visit('/registrar/');
      cy.get('select[name="user_type"]').select('cliente');
      cy.get('input[name="username"]').type(username2);
      cy.get('input[name="password"]').type(password);
      cy.get('input[name="email"]').type(email2);
      cy.get('input[name="cpf"]').type(cpf2);
      cy.get('form').submit();
      cy.url().should('include', '/home');
  });

  it('Deve buscar e exibir usuários e projetos corretamente na navbar', () => {
      cy.get('#search-input').type(username1);
      cy.wait(500); // Aguarda um pouco para simular a resposta do AJAX
      cy.get('#search-results').should('contain', username1);

      cy.get('#search-input').clear().type(tituloProjeto);
      cy.wait(500);
      cy.get('#search-results').should('contain', tituloProjeto);
  });
});
