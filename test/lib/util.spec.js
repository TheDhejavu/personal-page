// #!/usr/bin/env node
require = require('esm')(module /*, options*/);
const { validateEmail  } = require("../../lib/util");
const { expect } = require('chai');

describe("Utilities", function() {
  this.timeout(5000);
  
  it("Should return email is valid", function() {
    const email = "akinayodeji4all@gmail.com";
    const isValid = validateEmail(email);
    expect(isValid).to.equal(true);
  });

  it("Should return eamil is not valid", function() {
    const email = "akinayodeji4all@gmail";
    const isValid = validateEmail(email);
    expect(isValid).to.not.equal(true);
  });

})