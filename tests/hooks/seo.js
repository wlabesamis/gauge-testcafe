const testControllerHolder = require(process.cwd()+'/tests/testcafe/controller_holder');
const gaugeStorage = require(process.cwd()+'/helpers/general/dataStorage');

const tags = ["seo","desktop"];
const tags2 = ["seo","mobile"];

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
  testControllerHolder.setBrowser(':emulation:width=1280;height=800');
  testControllerHolder.setTestHolder('./helpers/testcafe/testHolderSeo.js');
  gaugeStorage.setScenarioData('USER_AGENT', process.env['DESKTOP_BOT_USER_AGENT']);
},{ tags: tags});

/**
 * Code will run before the Scenario.
 * @param {Function}
 *
 * @returns {Function}
 */
beforeScenario(async () => {
  testControllerHolder.setBrowser(':emulation:mobile=true;width=360;height=740');
  testControllerHolder.setTestHolder('./helpers/testcafe/testHolderSeo.js');
  gaugeStorage.setScenarioData('USER_AGENT', process.env['MOBILE_BOT_USER_AGENT']);
},{ tags: tags2});


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
 gaugeStorage.setScenarioData('USER_AGENT', '');
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
