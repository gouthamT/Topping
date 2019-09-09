# Topping

Topping is a JavaScript library for writing flows/walkthroughs/enriched readme.

## Use case
* Imagine a complex application, new joiners or team mates who started working on this application with zero knowledge might not know -
  * how application works?
  * what's the architecture behind app? 
  * why it was built for ?..etc.

* Isn’t it would be cool if there is an documentation in place with which helps user to understand better about the app.

* This package which helps user to write walk through / tour about application.

* [Sample App with source code](https://github.com/gouthamT/pokedex)

* [example App](https://gouthamt.github.io/pokedex/)  --> [Demo topping App](https://gouthamt.github.io/topping-sample-app/)

* [more info here](https://medium.com/@tupakulagoutham/topping-javascript-library-to-write-walk-through-ede6653179df)

## Installation

`npm i -D topping`

`node node_modules\topping\initTopping`

* After executing above commands `quarry.js` file will be created under topping folder.

* update the start function code snippet.

* make sure to update your root html file (or) import `node_modules\topping\toppingRelay.js` file in dev mode only.

## Launch Topping

`npm run startToppings` 

or 

`node node_modules\topping\startToppings`

## List of available functions

* launch(url, callback)
* addScenario(label)
* addStep(label)
* fillInputById(id, value, delayInterval)
* fillInputByClassName(className, idx = 0, value, delayInterval)
* fillInputByTagName(tagName, idx = 0, value, delayInterval)
* clickById(id)
* clickByClassName(className, idx)
* clickByTagName(tagName, idx)
* setValueById(id, value)
* setValueByClassName(className, idx, value)
* setValueByTagName(tagName, idx, value)
* setSelectedIndexById(id, index)
* setSelectedIndexByClassName(className, idx, selectedIndex)
* setSelectedIndexByTagName(tagName, idx, selectedIndex)
* focusElementById(id)
* focusElementByClassName(className, idx)
* focusElementByTagName(tagName, idx)
* scrollElementToViewById(id)
* scrollElementToViewByClassName(className, idx)
* scrollElementToViewByTagName(tagName, idx)
* wait(interval)
* popUpModal(header, content)
* popUpTreeModal(header, content, treeSource)
* flushModal()
* createToolTipById(id, label, placement = 'top')
* createToolTipByClassName(className, idx, label, placement = 'top')
* createToolTipByTagName(tagName, idx, label, placement = 'top')
* clearToolTips()
* play()
* finish()

## sample quarry code snippet

```
const treeDataSource = {
  "name": "Sample WebApp",
  "children": [
    {
      "name": "Api Gateway",
      "children": [{
        "name": "Micro Service 1"
      }, {
        "name": "Micro Service 2"
      }, {
        "name": "Micro Service 3",
        "children": [{
          "name": "Mongo Db"
        }]
      }, {
        "name": "Micro Service 4"
      }]
    }]
};

const treeDataSource2 = {
  "name": "Sample WebApp 2",
  "children": [
    {
      "name": "Api Gateway",
      "children": [{
        "name": "Micro Service 3",
        "children": [{
          "name": "Mongo Db"
        }]
      }]
    }]
};

const modalSample = `Consulted he eagerness unfeeling deficient existence of. Calling nothing end fertile for venture way boy. Esteem spirit temper too say adieus who direct esteem. It esteems luckily mr or picture placing drawing no. Apartments frequently or motionless on reasonable projecting expression. Way mrs end gave tall walk fact bed.`;

function start() {
  topping.launch(
    'http://127.0.0.1:5502/demo.html', 
    function () {
      topping
      .addScenario(`Fill Form`)
        .addStep(`fill email`)
        .fillInputById(`exampleFormControlInput1`, 'goutham.tupakula@4mation.com.au', 50)
        .addStep(`select an option`)
        .wait(.25)
        .setSelectedIndexById('exampleFormControlSelect1', 3)
        .addStep(`select dropdown`)
        .wait(.1)
        .createToolTipByClassName(`dropdown-toggle`, 0, `Decisively surrounded all admiration and not you.`, `right`)
        .clickByClassName(`dropdown-toggle`, 0)
        .wait(.25)
        .clickByClassName(`dropdown-item`, 0)
        .wait(.1)
        .setSelectedIndexById(`exampleFormControlSelect2`, 2)
        .addStep(`fill text area`)
        .fillInputById(`exampleFormControlTextarea1`, 'Hand two was eat busy fail.', 5)
        .wait(1)
        .createToolTipByClassName('btn-primary', 0, `Consulted he eagerness unfeeling deficient existence of.`, 'top')
        .addStep(`click Submit`)
        .clickByClassName('btn-primary', 0)
        .wait(2)
        .clearToolTips()
        .popUpModal('test modal', modalSample)
        .addStep(`what's happening ?`)
        .wait(1)
        .popUpTreeModal(`what's Happening ?`, `Consulted he eagerness unfeeling deficient existence of.`, treeDataSource)
        .wait(3)
        .flushModal()
        .popUpTreeModal(`what's Happening ?`, `Consulted he eagerness unfeeling deficient existence of.`, treeDataSource2)
        .wait(3)
        .flushModal()
        .scrollElementToViewByClassName('btn-primary', 1)
        .wait(1)
        .addStep(`Finished 🙂`)
        .finish()
        .play();
      }
    );
  }
```
