/* globals gauge*/
const testControllerHolder = require(process.cwd()+'/tests/testcafe/controller_holder');

const tc = function(){
  return testControllerHolder.getPromiseHolder();
}

module.exports = tc