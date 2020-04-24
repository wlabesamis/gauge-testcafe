const testControllerHolder = require(process.cwd()+'/tests/testcafe/controller_holder');

const tags = ["mobile"];

/**
 * Code will run before the Spec.
 * @param {Function}
 *
 * @returns {Function}
 */
beforeSpec(async () => {
  // Code for before scenario
},{ tags: tags});

/**
 * Code will run before the Scenario.
 * @param {Function}
 *
 * @returns {Function}
 */
beforeScenario(async () => {
  testControllerHolder.setBrowser(':emulation:mobile=true;width=360;height=740;');
},{ tags: tags});

/**
 * Code will run before the Step.
 * @param {Function}
 *
 * @returns {Function}
 */
beforeStep(async () => {
    // Code for before step
});

/**
 * Code will run after the Spec.
 * @param {Function}
 *
 * @returns {Function}
 */
afterSpec(async () => {
  // Code for before step
},{ tags: tags});

/**
 * Code will run after the Scenario.
 * @param {Function}
 *
 * @returns {Function}
 */
afterScenario(async () => {
    // Code for after scenario
},{ tags: tags});

/**
 * Code will run after the Step.
 * @param {Function}
 *
 * @returns {Function}
 */
afterStep(async () => {
    // Code for after step
},{ tags: tags});