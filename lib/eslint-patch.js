'use strict';
var fs = require('fs');
var path = require('path');

var Plugins = require("eslint/lib/config/plugins");

var docs = require('./docs');
var Config = require("eslint/lib/config");
var ConfigUpgrader = require('./config_upgrader');


module.exports = function patcher(engine) {

  Plugins.loadAll = function(pluginNames) {
    for(var index in pluginNames) {
      var name = pluginNames[index];

      try {
        Plugins.load(name);
        console.error('>>>> Plugin loaded', name);
      } catch(e) {
        console.error('>>>> Problem loading plugin', name);
      }
    }

  }


  const originalGetConfig = Config.prototype.getConfig;
  Config.prototype.getConfig = function(filePath) {
    const originalConfig = originalGetConfig.apply(this, [filePath]);
    const configUpgrader = new ConfigUpgrader();

    return configUpgrader.upgrade(originalConfig);
  };

  engine.docs = docs;


  return engine;
};
