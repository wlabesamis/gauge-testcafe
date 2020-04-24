const testControllerHolder = require(process.cwd()+"/tests/testcafe/controller_holder.js");

fixture("Testcafe Custom Plugin")

test("testHolder", testControllerHolder.capture);