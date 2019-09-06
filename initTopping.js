const fs = require('fs'),
  targetJsonPath = './package.json',
  folderName = './topping',
  fileName = `${folderName}\\quarry.js`,
  quarrySample = `function start() {
    topping.launch('sample local host url', function () {
      topping.addScenario().addStep().wait(100).play()
    })
  }`;

function updatePackageJson() {
  let rawdata = fs.readFileSync(targetJsonPath), packageJson = JSON.parse(rawdata);
  if (packageJson) {
    const { startToppings } = packageJson.scripts;

    if (!startToppings) {
      packageJson.scripts.startToppings = 'node node_modules/topping/startToppings';
    }

    fs.writeFileSync(targetJsonPath, JSON.stringify(packageJson, null, 2));
  }
}


// async
function updateTargetDirectory() {
  try {
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName);
      if (!fs.existsSync(fileName)) {
        fs.writeFile(fileName, quarrySample, function (err) {
          if (err) throw err;
          console.log('Done');
        });
      }
    }
  } catch (err) {
    console.error(err)
  }

  console.log('Done');
}

updatePackageJson();
updateTargetDirectory();