var testControllerHolder = {
    testController: null,

    captureResolver: null,
    getResolver:     null,

    requestLogger: null,
    testHolder: null,

    promiseHolder: null,

    browser: 'chromium',

    capture: function (t) {
        testControllerHolder.testController = t;

        if (testControllerHolder.getResolver)
            testControllerHolder.getResolver(t);

        return new Promise(function (resolve) {
            testControllerHolder.captureResolver = resolve;
        });
    },

    free: function () {
        testControllerHolder.testController = null;

        if (testControllerHolder.captureResolver)
            testControllerHolder.captureResolver();
    },

    get: function () {
        return new Promise(function (resolve) {
            if (testControllerHolder.testController)
                resolve(testControllerHolder.testController);
            else
                testControllerHolder.getResolver = resolve;
        });
    },

    setPromiseHolder: function(tc){
      testControllerHolder.promiseHolder = tc;
    },

    getPromiseHolder: function(){
      return testControllerHolder.promiseHolder;
    },

    setLogger: function (logger){
      testControllerHolder.requestLogger = logger;
    },

    getLogger: function(){
      return testControllerHolder.requestLogger;
    },

    setTestHolder: function(file) {
        testControllerHolder.testHolder = file;
    },

    getTestHolder: function(){
      if (!testControllerHolder.testHolder)
        testControllerHolder.testHolder = './helpers/testcafe/testHolder.js';

      return testControllerHolder.testHolder;
    },

    setBrowser: function(option){
      const browser = ( process.env['IS_HEADLESS_BROWSER'] === 'true' )
                      ? process.env['BROWSER']+process.env['BROWSER_HEADLESS_OPTION']
                      : process.env['BROWSER']
      testControllerHolder.browser = testControllerHolder.isBrowserCloud()
                                    ? process.env['BROWSERSTACK_BROWSER']
                                    : browser+option;
    },

    getBrowser: function(){
      return testControllerHolder.browser;
    },

    isBrowserCloud: function(){
      return ( process.env.ISBROWSERSTACK
               && process.env.ISBROWSERSTACK.toLowerCase() === 'true' );
    }
};

module.exports = testControllerHolder;