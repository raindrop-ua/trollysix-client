describe('SSR smoke', () => {
  it('renders home page', () => {
    cy.request('/').its('status').should('eq', 200);

    cy.visit('/');
    cy.location('pathname').should('eq', '/');
    cy.contains('a', 'TrollySix').should('be.visible');
    cy.contains('h1', 'Ultimate Schedule').should('be.visible');
  });

  it('renders schedule page', () => {
    cy.request('/schedule').its('status').should('eq', 200);

    cy.visit('/schedule');
    cy.location('pathname').should('eq', '/schedule');
    cy.contains('h1', 'Schedule').should('be.visible');
  });

  it('redirects unknown route to 404 page', () => {
    cy.request({
      url: '/some-route-that-does-not-exist',
      failOnStatusCode: false,
    })
      .its('status')
      .should('eq', 200);

    cy.visit('/some-route-that-does-not-exist');
    cy.location('pathname').should('eq', '/404');
    cy.contains('h1', 'Page not found').should('be.visible');
  });
});
