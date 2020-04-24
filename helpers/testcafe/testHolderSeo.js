const RequestLogger = require('testcafe').RequestLogger;
const RequestMock = require('testcafe').RequestMock;
const testControllerHolder = require(process.cwd()+"/tests/testcafe/controller_holder.js");
const CustomRequestHook = require(process.cwd()+'/helpers/testcafe/requestHook.js');
const SITE_DOMAIN = process.env.SITE_DOMAIN;
const isLogResponseHeaders = ( process.env.LOG_RESPONSE_HEADERS
                                && process.env.LOG_RESPONSE_HEADERS.toLowerCase() === 'true' );
const logger = RequestLogger('',{
  logResponseHeaders:isLogResponseHeaders
});

testControllerHolder.setLogger(logger);
fixture("Testcafe SEO Custom Plugin").requestHooks(CustomRequestHook)

test.requestHooks(logger)
  ("testHolder", testControllerHolder.capture);