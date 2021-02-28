describe('Party Horn Tests', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/Part2-Cypress/index.html');
  });

  it('First Test', () => {
    expect(true).to.equal(true);
  });

  it("Slider changes when volume input changes", () => {
    cy.get('#volume-number').clear().type('75');
    cy.get('#volume-slider').then(function($el) {
      expect($el).to.have.value(75);
    });
  });

  it("Volume input changes when slider changes", () => {
    cy.get("#volume-slider").invoke("val", 33).trigger("input");
    cy.get("#volume-number").then(function($el) {
      expect($el).to.have.value(33);
    });
  });

  it("Volume of <audio> element changes when slider changes", () => {
    cy.get("#volume-slider").invoke("val", 33).trigger("input");
    cy.get("#horn-sound").then(function($el) {
      expect($el).to.have.prop("volume", 0.33);
    });
  });

  it("Image changes when party horn radio button is selected", () => {
    cy.get("#radio-party-horn").check();
    cy.get("#sound-image").then(function($el) {
      expect($el).to.have.attr("src", "./assets/media/images/party-horn.svg");
    });
  });

  it("Sound source changes when party horn radio button is selected", () => {
    cy.get("#radio-party-horn").check();
    cy.get("#horn-sound").then(function($el) {
      expect($el).to.have.attr("src", "./assets/media/audio/party-horn.mp3");
    });
  });

  it("Volume image changes from mute to level 1 when volume changes from 0 to 1", () => {
    cy.get("#volume-number").clear().type('0');
    cy.get("#volume-image").then(function($el) {
      expect($el).to.have.attr("src", "./assets/media/icons/volume-level-0.svg");
    });
    
    cy.get("#volume-number").clear().type('1');
    cy.get("#volume-image").then(function($el) {
      expect($el).to.have.attr("src", "./assets/media/icons/volume-level-1.svg");
    });
  });

  it("Volume image changes from level 1 to level 2 when volume changes from 33 to 34", () => {
    cy.get("#volume-number").clear().type('33');
    cy.get("#volume-image").then(function($el) {
      expect($el).to.have.attr("src", "./assets/media/icons/volume-level-1.svg");
    });

    cy.get("#volume-number").clear().type('34');
    cy.get("#volume-image").then(function($el) {
      expect($el).to.have.attr("src", "./assets/media/icons/volume-level-2.svg");
    });
  });

  it("Volume image changes from level 2 to level 3 when volume changes from 66 to 67", () => {
    cy.get("#volume-number").clear().type('66');
    cy.get("#volume-image").then(function($el) {
      expect($el).to.have.attr("src", "./assets/media/icons/volume-level-2.svg");
    });

    cy.get("#volume-number").clear().type('67');
    cy.get("#volume-image").then(function($el) {
      expect($el).to.have.attr("src", "./assets/media/icons/volume-level-3.svg");
    });
  });

  it("Honk button is disabled when volume input is empty", () => {
    cy.get("#volume-number").clear().type(" ");
    cy.get("#honk-btn").then(function($el) {
      expect($el).to.have.attr("disabled");
    });
  });

  it("Honk button is disabled when volume input is non-number", () => {
    cy.get("#volume-number").clear().type("j");
    cy.get("#honk-btn").then(function($el) {
      expect($el).to.have.attr("disabled");
    });
  });

  it("Error message shown when volume input is out of range [0,100]", () => {
    cy.get("#volume-number").clear().type("1000");
    cy.get("#honk-btn").trigger("button");
    cy.get("input:invalid").should("have.length", 1);
    cy.get("#volume-number").invoke("prop", "validationMessage")
      .should("equal", "Value must be less than or equal to 100.");

    cy.get("#volume-number").clear().type("-1000");
    cy.get("#honk-btn").trigger("button");
    cy.get("input:invalid").should("have.length", 1);
    cy.get("#volume-number").invoke("prop", "validationMessage")
      .should("equal", "Value must be greater than or equal to 0.");
  });
});