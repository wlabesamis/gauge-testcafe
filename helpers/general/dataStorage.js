/* globals gauge*/

const gaugeStorage = {

  /*
  Set data to gauge storage
  */

  setSuiteData: function(name,value){
    gauge.dataStore.suiteStore.put(name, value);
  },

  /*
  Get data from gauge storage
  */

  getSuiteData: function(name){
    return gauge.dataStore.suiteStore.get(name);
  },

  /*
  Set data to gauge storage
  */

  setSpecData: function(name,value){
    gauge.dataStore.specStore.put(name, value);
  },

  /*
  Get data from gauge storage
  */

  getSpecData: function(name){
    return gauge.dataStore.specStore.get(name);
  },

  /*
  Set data to gauge storage
  */

  setScenarioData: function(name,value){
    gauge.dataStore.scenarioStore.put(name, value);
  },

  /*
  Get data from gauge storage
  */

  getScenarioData: function(name){
    return gauge.dataStore.scenarioStore.get(name);
  }
};

module.exports = gaugeStorage