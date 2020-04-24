const RequestHook = require('testcafe').RequestHook;
const testControllerHolder = require(process.cwd()+"/tests/testcafe/controller_holder.js");
const gaugeStorage = require(process.cwd()+'/helpers/general/dataStorage');

const headers = ( process.env.REQUEST_HEADERS )
  ? process.env.REQUEST_HEADERS.split(',') : [];
const urlFilter = (process.env['SITE_DOMAIN']).replace(/\//g,"\\/").replace(/\:/g,"?:");

class CustomRequestHook extends RequestHook {
  constructor (requestFilterRules, responseEventConfigureOpts) {
      super(requestFilterRules, responseEventConfigureOpts);
  }
  async onRequest (event) {
    Object.keys(headers).forEach(key=>{
      const item = headers[key].split(':');
      event.requestOptions.headers[item[0]] = item[1];
    })

    if ( gaugeStorage.getScenarioData('USER_AGENT') && gaugeStorage.getScenarioData('USER_AGENT') != '' ) {
      event.requestOptions.headers['User-Agent'] = gaugeStorage.getScenarioData('USER_AGENT');
    }
  }
}

module.exports = new CustomRequestHook(new RegExp(urlFilter));