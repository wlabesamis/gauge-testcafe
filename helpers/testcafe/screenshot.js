const testControllerHolder = require(process.cwd()+'/tests/testcafe/controller_holder');
const tc = require(process.cwd()+'/tests/testcafe/tc');


/* globals gauge*/

const tcScreenshot = {

  takeScreenshot: async function(specFile){
    const dt = new Date().getTime();
    const tcScreenshotDir = this.setDirectory(specFile)+'/screenshot';
    const fileName = "fs-"+dt+".png";

    await tc().takeScreenshot({
      path: tcScreenshotDir+'/'+fileName
    });

    await gauge.message("<a target='_blank' href='"+tcScreenshotDir+"/"+fileName+"'><img src='"+tcScreenshotDir+"/thumbnails/"+fileName+"' /> </a>");
  },

  setDirectory: function(specFile){
    const trimSpecFile = specFile.replace(process.cwd()+'/','');
    const countDir = (trimSpecFile.match(new RegExp("/", "g")) || []).length;
    const reportDir = "../".repeat(countDir-1);
    const reportDirOverride = ( countDir > 1 ) ? "../".repeat(countDir-2) : "";

    const tcImagesDir = ( process.env.overwrite_reports
                           && process.env.overwrite_reports.toLowerCase() === 'true'
                        ) ? reportDirOverride+process.env['TESTCAFE_IMAGES'] : reportDir+process.env['TESTCAFE_IMAGES'];
    return tcImagesDir;
  }
};


module.exports = tcScreenshot