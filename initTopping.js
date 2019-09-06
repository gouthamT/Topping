const fs = require('fs'),
  packageJson = require('../../package.json'),
  folderName = '../../topping';

function updatePackageJson() {
  if (packageJson) {
    const { startToppings } = packageJson.scripts;

    if (!startToppings) {
      packageJson.scripts.startToppings = 'node node_modules/topping/startToppings';
    }

    fs.writeFileSync('../../package.json', JSON.stringify(packageJson, null, 2));
  }
}


// async
function updateTargetDirectory() {
  try {
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName);
    }
  } catch (err) {
    console.error(err)
  }

  if (!fs.existsSync(`${folderName}\\topping.js`)) {
    fs.writeFile(`${folderName}\\topping.js`, 'This is my text', function (err) {
      if (err) throw err;
      console.log('Done');
    });
  }

  console.log('Done');
}

updatePackageJson();
updateTargetDirectory();