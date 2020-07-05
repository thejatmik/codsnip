describe("user login", () => {
	it("user open login page", () => {
		cy.visit("http://localhost:3000");
		cy.get('[data-testid="top-to-login"]').click();

		cy.contains("Login");
		cy.get('[data-testid="nameInput"]').type("lele");
		cy.get('[data-testid="passInput"]').type("leleyeye");
		cy.get('[data-testid="submitLogin"]').click();
	});
});
