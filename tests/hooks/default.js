const testControllerHolder = require(process.cwd()+'/tests/testcafe/controller_holder');
const tc = require(process.cwd()+'/tests/testcafe/tc');
const tcScreenshot = require(process.cwd()+'/helpers/testcafe/screenshot');

/**
 * Code will run before the Spec.
 * @param {Function}
 *
 * @returns {Function}
 */
beforeSpec(async () => {
  // Code for before step
});

/**
 * Code will run before the Scenario.
 * @param {Function}
 *
 * @returns {Function}
 */
beforeScenario(async () => {
/*
Set default emulation as desktop
*/
  testControllerHolder.setBrowser(':emulation:width=1280;height=800;');

/*
Set default test file
*/
  testControllerHolder.setTestHolder('./helpers/testcafe/testHolder.js');

});

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
});

/**
 * Code will run after the Scenario.
 * @param {Function}
 *
 * @returns {Function}
 */
afterScenario(async () => {
    // Code for after scenario
});

/**
 * Code will run after the Step.
 * @param {Function}
 *
 * @returns {Function}
 */
afterStep(async (e) => {
  const isBuildFailed = e.currentStep.isFailed || false;

  if ( isBuildFailed ) {
    await tcScreenshot.takeScreenshot(e.currentSpec.fileName);
  }
});