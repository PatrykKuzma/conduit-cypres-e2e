import faker from 'faker';

describe('E2E Tests using Cypress', () => {
  it('should visit the Conduit website, click Sign up link, fill out the registration form, and publish an article, logout', () => {
    
    // Ustawienie szerokości i wysokości ekranu na 1200x800
    cy.viewport(1200, 800);
    
    // Odwiedź stronę Conduit
    cy.visit('https://conduit.mate.academy/')

    // Kliknij w link "Sign up"
    cy.get('a.nav-link').contains('Sign up').click()

    // Wypełnij pola formularza rejestracji
    const username = faker.internet.userName().replace(/\W/g, ''); // Generuj losową nazwę użytkownika
    const email = faker.internet.email(); // Generuj losowy adres email
    const password = faker.internet.password(); // Generuj losowe hasło

    cy.get('input[placeholder="Username"]').type(username)
    cy.get('input[placeholder="Email"]').type(email)
    cy.get('input[placeholder="Password"]').type(password)
    cy.get('button[type="submit"]').click()

    // Asercja, że po rejestracji wyświetla się odpowiedni tekst
    cy.contains('No articles are here... yet.').should('be.visible')

    // Kliknij w link "New Article"
    cy.get('a.nav-link').contains('New Article').click()

    // Wypełnij pola formularza dodawania artykułu
    const articleTitle = faker.lorem.words(2); // Generuj losowy tytuł artykułu
    const articleDescription = faker.lorem.words(2); // Generuj losowy opis artykułu
    const articleContent = faker.lorem.paragraphs(1); // Generuj losową treść artykułu

    cy.get('input[placeholder="Article Title"]').type(articleTitle)
    cy.get('input[placeholder="What\'s this article about?"]').type(articleDescription)
    cy.get('textarea[placeholder="Write your article (in markdown)"]').type(articleContent)
    cy.get('input[placeholder="Enter tags"]').type('test, cypress, automation')

    // Kliknij przycisk "Publish Article"
    cy.get('button[type="button"]').contains('Publish Article').click()

    // Asercja, że artykuł został opublikowany poprawnie
    cy.contains('Edit Article').should('be.visible')

    // Dodaj komentarz
    const commentContent = faker.lorem.sentence(); // Generuj losową treść komentarza
    cy.get('textarea[placeholder="Write a comment..."]').type(commentContent)
    cy.get('button[type="submit"]').contains('Post Comment').click()
   
    // Asercja, że komentarz został dodany poprawnie
    cy.contains(commentContent).should('be.visible')

    // Kliknij w link "Settings"
    cy.get('a.nav-link').contains('Settings').click()

    // Asercja, że wyświetlają się ustawienia profilu
    cy.contains('Your Settings').should('be.visible')

    // Kliknij w link "Logout"
    cy.contains('Or click here to logout.').click()

    // Asercja, że wyświetla się "Global Feed"
    cy.contains('Global Feed').should('be.visible')

  })
})
