/* globals gauge*/
const assert = require('assert')
const Selector = require('testcafe').Selector;
const tc = require(process.cwd()+'/tests/testcafe/tc');
const SITE_DOMAIN = process.env.SITE_DOMAIN;
const TC_ELEM_TIMEOUT = process.env.TESTCAFE_ELEMENT_TIMEOUT;

step("Step Passed", async() => {
  await assert.equal(1, 1);
})

step("Step Failed", async() => {
  await assert.equal(1, 0);
})

step("Goto <url>", async (url) => {
  await tc().navigateTo(SITE_DOMAIN+url);
});