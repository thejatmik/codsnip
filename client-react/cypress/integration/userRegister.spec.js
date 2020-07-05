describe("user register", () => {
	it("user open register page", () => {
		cy.visit("http://localhost:3000");
		cy.get('[data-testid="top-to-register"]').click();
		cy.contains("Register");
		cy.get('[data-testid="nameInput"]').type("lele");
		cy.get('[data-testid="passInput"]').type("leleyeye");
		cy.get('[data-testid="verifyInput"]').type("leleyeye");
		cy.get('[data-testid="submitRegister"]').click();
	});
});
