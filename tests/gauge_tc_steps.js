/* globals gauge*/
const assert = require('assert')
const Selector = require('testcafe').Selector;
const tc = require(process.cwd()+'/tests/testcafe/tc');
const SITE_DOMAIN = process.env.SITE_DOMAIN;
const TC_ELEM_TIMEOUT = process.env.TESTCAFE_ELEMENT_TIMEOUT;

step("Goto Google's search page", async function () {
  await tc().navigateTo('http://google.com');
});

step("Search for <query>", async function (query) {
  var input = Selector('input[title="Search"]').with({ boundTestRun: _ });
  await tc().typeText(input, query);
  await tc().pressKey("enter");
});

step("First link is <text>", async function(text) {
  var firstLink = Selector('#rso').find('a').with({ boundTestRun: _ });
  await tc().expect(firstLink.innerText).contains(text);
});

step("Step Passed", async() => {
  await assert.equal(1, 1);
})

step("Step Failed", async() => {
  await assert.equal(1, 0);
})

step("Goto <url>", async (url) => {
  await tc().navigateTo(SITE_DOMAIN+url);
});