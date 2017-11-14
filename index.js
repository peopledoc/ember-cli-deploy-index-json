/*eslint-env node*/
'use strict';

const RSVP = require('rsvp');
const fs = require('fs');
const path = require('path');
const minimatch = require('minimatch');
const jsonfile = require('jsonfile');
const DeployPluginBase = require('ember-cli-deploy-plugin');

// removes the md5 hash from the filename
function getOriginalFilename(filename) {
  return filename.replace(/(-[a-f0-9]{32})(\..+)$/g, '$2');
}

module.exports = {
  name: 'ember-cli-deploy-index-json',

  createDeployPlugin: function(options) {
    let DeployPlugin = DeployPluginBase.extend({
      name: options.name,

      /*
       * Define any config validation here
       *
       * http://ember-cli-deploy.com/docs/v1.0.x/creating-a-plugin/#validating-plugin-config
       */

       defaultConfig: {
         filePattern: '**/*.{js,css,png,gif,ico,jpg,map,xml,txt,svg,swf,eot,ttf,woff,woff2}',
         fileIgnorePattern: null,
         indexPath: 'index.json',
         distDir: function(context) {
           return context.distDir;
         },
         distFiles: function(context) {
           return context.distFiles || [];
         }
       },

      /*
       * Implement any pipeline hooks here
       *
       * http://ember-cli-deploy.com/docs/v1.0.x/pipeline-hooks/
       */

      //configure(context) {
      //  let configProp = this.readConfig('foo'); // this is how you access plugin config
      //},

      //setup(context) {
      //  // Return an object with values you'd like merged in to the context to be accessed by other pipeline hooks and plugins
      //  return {
      //    someProp: 'someValue'
      //  };
      //},

      willUpload: function(/* context */) {
        let filePattern = this.readConfig('filePattern');
        let distDir = this.readConfig('distDir');
        let distFiles = this.readConfig('distFiles');
        let indexPath = this.readConfig('indexPath');
        let fileIgnorePattern = this.readConfig('fileIgnorePattern');

        this.log('generating manifest at `' + indexPath + '`', { verbose: true });
        try {
          let filesToInclude = distFiles.filter(minimatch.filter(filePattern, { matchBase: true }));
          if (fileIgnorePattern != null) {
            filesToInclude = filesToInclude.filter(function(path) {
              return !minimatch(path, fileIgnorePattern, { matchBase: true });
            });
          }
          filesToInclude.sort();
          let mappedFilesToInclude = {};
          filesToInclude.forEach((filename)=> {
            mappedFilesToInclude[getOriginalFilename(filename)] = filename;
          });
          let outputPath = path.join(distDir, indexPath);
          jsonfile.writeFileSync(outputPath, mappedFilesToInclude, { spaces: 2 });
          this.log('generated manifest including ' + filesToInclude.length + ' files ok', { verbose: true });
          return { indexPath };
        } catch (error) {
          this.log(error, { color: 'red' });
          return RSVP.reject(error);
        }
      }

      //willBuild(context) {},
      //build(context) {},
      //didBuild(context) {},

      //willPrepare(context) {},
      //prepare(context) {},
      //didPrepare(context) {},

      //willUpload(context) {},
      //upload(context) {},
      //didUpload(context) {},

      //willActivate(context) {},
      //activate(context) {},
      //didActivate(context) {},

      //fetchInitialRevisions(context) {},
      //fetchRevisions(context) {},

      //didDeploy(context) {},

      //teardown(context) {},
    });

    return new DeployPlugin();
  }
};
