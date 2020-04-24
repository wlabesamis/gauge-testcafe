const BrowserStack            = require("browserstack");
const qrcode               = require('qrcode-terminal');
const fs                   = require('fs');
const createTestCafe       = require('testcafe');
const testControllerHolder = require('./controller_holder');
const tc = require(process.cwd()+'/tests/testcafe/tc');

const BROWSER              = process.env.BROWSER || 'chromium';
const isRemoteTest         = ( process.env.REMOTE_TEST
                                && process.env.REMOTE_TEST.toLowerCase() === 'true' );
const BROWSERSTACK_USERNAME   = process.env.BROWSERSTACK_USERNAME;
const BROWSERSTACK_ACCESS_KEY = process.env.BROWSERSTACK_ACCESS_KEY;

const automateClient          = BrowserStack.createAutomateClient({
                                username: BROWSERSTACK_USERNAME,
                                password: BROWSERSTACK_ACCESS_KEY
                              });

function runTest () {
  let runner    = null;
  let testcafe  = null;
  let runnerObject = null;

  createTestCafe()
      .then(function (tc) {
          testcafe = tc;
          runner   = tc.createRunner();

          return testcafe.createBrowserConnection();
      })
      .then(remoteConnection => {
          // Outputs remoteConnection.url so that it can be visited from the remote browser.
          console.log(remoteConnection.url);
          gauge.dataStore.suiteStore.put('runnerObject', runner);
          console.log('Domain: "'+process.env['SITE_DOMAIN']+'"');
          console.log('Browser: "'+testControllerHolder.getBrowser()+'"');
          runnerObject = runner
                            .src(testControllerHolder.getTestHolder())
                            .browsers(testControllerHolder.getBrowser())
                            .screenshots({
                              path: process.env.gauge_reports_dir+'/'+process.env.gauge_html_report_dir
                            })
                            .run({skipJsErrors:process.env['SKIP_JS_ERROR'], });
          gauge.dataStore.suiteStore.put('runnerObject', runner);
          gauge.dataStore.suiteStore.put('testcafe', testcafe);
      })
}

function runTestRemote () {
  let runner    = null;
  let testcafe  = null;
  let runnerObject = null;

  createTestCafe()
      .then(function (tc) {
          testcafe = tc;
          runner   = tc.createRunner();

          return testcafe.createBrowserConnection();
      })
      .then(remoteConnection => {
        console.log('Domain: "'+process.env['SITE_DOMAIN']+'"');
        console.log("Visit the url or scan the qrcode below to start the testing remotely");
        // Outputs remoteConnection.url so that it can be visited from the remote browser.
        console.log(remoteConnection.url);
        // creating QR Code
        qrcode.generate(remoteConnection.url, {small: true});

        remoteConnection.once('ready', () => {
            runnerObject = runner
                .src(testControllerHolder.getTestHolder())
                .browsers(remoteConnection)
                .screenshots({
                  path: process.env.gauge_reports_dir+'/'+process.env.gauge_html_report_dir
                })
                .run({skipJsErrors:process.env['SKIP_JS_ERROR']});
            gauge.dataStore.suiteStore.put('runnerObject', runner);
        });
      })
}

function setBrowseStackSession(){
  const testcafe = gauge.dataStore.suiteStore.get('testcafe');
  const connections = testcafe.browserConnectionGateway
                        && testcafe.browserConnectionGateway._connections;
  for ( key in connections ) {
    let browserInfo = connections[key].browserInfo || null;
    if ( browserInfo && browserInfo.providerName ) {
      switch (browserInfo.providerName) {
        case "browserstack":
          var url = browserInfo.userAgentProviderMetaInfo
          gauge.dataStore.suiteStore.put('browserstackSessionId', url.split("/").pop());
          gauge.dataStore.suiteStore.put('providerName', browserInfo.providerName);
          break;
      }
    }
  }
}

beforeScenario(async function(){

  if ( isRemoteTest ) {
    runTestRemote();
  } else {
    runTest();
  }

  testControllerHolder.setPromiseHolder(await testControllerHolder.get())

  if ( testControllerHolder.isBrowserCloud() ) {
    setBrowseStackSession();
  }
});

afterScenario(async (e) => {
  await testControllerHolder.free();

  if ( testControllerHolder.isBrowserCloud() ) {
    const sessionId = gauge.dataStore.suiteStore.get('browserstackSessionId');
    const isBuildFailed = e.currentSpec.isFailed || false;
    const status = ( isBuildFailed ) ? "FAILED" : "PASSED";
    const reason = ( isBuildFailed ) ? "FAILED" : "PASSED";

    /* For some reason the session update doesn't work so we need to call it thrice
      before and after cancelling the runnerObject.
    */
    await automateClient.updateSession(sessionId,{ status: status, reason: reason});
    await gauge.dataStore.suiteStore.get('runnerObject').stop();
    await tc().wait(10000)
    await automateClient.updateSession(sessionId,{ status: status, reason: reason});
    await automateClient.updateSession(sessionId,{ status: status, reason: reason});
  } else {
    await gauge.dataStore.suiteStore.get('runnerObject').stop();
  }
});