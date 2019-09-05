import {
  appendToAccordion,
  appendListItemToAccordion,
  getElementById
} from '../others/utils';

class Topping {

  constructor() {
    let self = this;
    this.instructions = new Map();
    this.instructionNumber = 0;
    this.articleSection = getElementById("toppings");
    this.target;
    this.onLoadCallBack;
    // event listeners
    window.addEventListener('message', function (event) {
      if (!event || !event.data) return;
      switch (event.data.target) {
        case "echo-addScenario": {
          if (!self.articleSection) {
            self.articleSection = getElementById("toppings");
          }
          appendToAccordion(self.articleSection, event.data.value);
          break;
        }
        case "echo-addStep": {
          if (!self.articleSection) {
            self.articleSection = getElementById("toppings");
          }
          appendListItemToAccordion(self.articleSection, event.data.value);
          break;
        }
        default: break;
      }
    });

    window.onload = function () {
      self.target = getElementById("target-frame");
      self.target.onload = self.onload.bind(self);
    };
  }

  /**
   * sets the url to be launched
   * @param {*} url 
   * @param {*} callBack on Load 
   */
  launch(url, callback) {
    this.target.src = url || "./topping/index.html";
    this.onLoadCallBack = callback;
    return this;
  }

  /**
   * onloads callbacks function
   * @param {*} commandsFunction | function
   */
  onload() {
    this.onLoadCallBack && this.onLoadCallBack();
    return this;
  }


  /**
   * Adds scenario
   * @param {*} label 
   */
  addScenario(label) {
    this.instructions.set(++this.instructionNumber, {
      target: `addScenario`,
      arguments: [...arguments]
    });
    return this;
  }

  /**
   * Adds Step to the last scenario
   * @param {*} label 
   */
  addStep(label) {
    this.instructions.set(++this.instructionNumber, {
      target: `addStep`,
      arguments: [...arguments]
    });
    return this;
  }

  /**
   * fills input value by Id with delay between each character
   * @param {*} id 
   * @param {*} value 
   * @param {*} delayInterval 
   */
  fillInputById(id, value, delayInterval) {
    this.instructions.set(++this.instructionNumber, {
      target: `fillInputById`,
      arguments: [...arguments]
    });
    return this;
  }

  /**
   * fills input value by class name with delay between each character
   * @param {*} className
   * @param {*} idx 
   * @param {*} value 
   * @param {*} delayInterval 
   */
  fillInputByClassName(className, idx = 0, value, delayInterval) {
    this.instructions.set(++this.instructionNumber, {
      target: `fillInputByClassName`,
      arguments: [...arguments]
    });
    return this;
  }

  /**
   * Clicks element after certain time interval
   * @param {*} id 
   * @param {*} delayInterval 
   */
  clickById(id = null) {
    this.instructions.set(++this.instructionNumber, {
      target: `clickById`,
      arguments: [...arguments]
    });
    return this;
  }

  /**
   * clicks an element provided query selector class name, index, delayInterval
   * @param {*} className 
   * @param {*} idx 
   * @param {*} delayInterval 
   */
  clickByClassName(className, idx = 0) {
    this.instructions.set(++this.instructionNumber, {
      target: `clickByClassName`,
      arguments: [...arguments]
    });
    return this;
  }

  /**
   * setValueById
   * @param {*} id 
   * @param {*} value 
   * @param {*} delayInterval 
   */
  setValueById(id = null, value = '') {
    this.instructions.set(++this.instructionNumber, {
      target: `setValueById`,
      arguments: [...arguments]
    });
    return this;
  }

  /**
   * setValueByClassName
   * @param {*} className 
   * @param {*} idx
   * @param {*} value 
   * @param {*} delayInterval 
   */
  setValueByClassName(className, idx, value = '') {
    this.instructions.set(++this.instructionNumber, {
      target: `setValueByClassName`,
      arguments: [...arguments]
    });
    return this;
  }

  /**
   * setIndexById
   * @param {*} id 
   * @param {*} index 
   * @param {*} delayInterval 
   */
  setSelectedIndexById(id = null, index = 0) {
    this.instructions.set(++this.instructionNumber, {
      target: `setSelectedIndexById`,
      arguments: [...arguments]
    });
    return this;
  }

  /**
   * setSelectedIndexByClassName
   * @param {*} className 
   * @param {*} idx
   * @param {*} selectedIndex 
   * @param {*} delayInterval 
   */
  setSelectedIndexByClassName(className, idx, selectedIndex = 0) {
    this.instructions.set(++this.instructionNumber, {
      target: `setSelectedIndexByClassName`,
      arguments: [...arguments]
    });
    return this;
  }

  /**
   * focusElementById
   * @param {*} id 
   * @param {*} index 
   * @param {*} delayInterval 
   */
  focusElementById(id = null) {
    this.instructions.set(++this.instructionNumber, {
      target: `focusElementById`,
      arguments: [...arguments]
    });
    return this;
  }

  /**
   * focusElementByClassName
   * @param {*} className 
   * @param {*} idx
   */
  focusElementByClassName(className, idx) {
    this.instructions.set(++this.instructionNumber, {
      target: `focusElementByClassName`,
      arguments: [...arguments]
    });
    return this;
  }

  /**
   * scrollElementToViewById
   * @param {*} id 
   */
  scrollElementToViewById(id = null) {
    this.instructions.set(++this.instructionNumber, {
      target: `scrollElementToViewById`,
      arguments: [...arguments]
    });
    return this;
  }

  /**
   * scrollElementToViewByClassName
   * @param {*} className 
   * @param {*} idx 
   */
  scrollElementToViewByClassName(className, idx) {
    this.instructions.set(++this.instructionNumber, {
      target: `scrollElementToViewByClassName`,
      arguments: [...arguments]
    });
    return this;
  }

  /**
   * wait
   * @param {*} interval 
   */
  wait(interval = 0) {
    this.instructions.set(++this.instructionNumber, {
      target: `wait`,
      arguments: [...arguments]
    });
    return this;
  }

  /**
   * Pops up a modal with the header & content
   * @param {*} header 
   * @param {*} content 
   * @param {*} delay 
   */
  popUpModal(header, content) {
    this.instructions.set(++this.instructionNumber, {
      target: `popUpModal`,
      arguments: [...arguments]
    });
    return this;
  }

  /**
   * Pops up a modal with the header & content
   * @param {*} header 
   * @param {*} content 
   * @param {*} delay 
   */
  popUpTreeModal(header, content, treeSource) {
    this.instructions.set(++this.instructionNumber, {
      target: `popUpTreeModal`,
      arguments: [...arguments]
    });
    return this;
  }

  /**
   * clear modal on the screen
   * @param {*} delay 
   */
  flushModal() {
    this.instructions.set(++this.instructionNumber, {
      target: `flushModal`,
      arguments: [...arguments]
    });
    return this;
  }

  /**
   * createToolTipById
   * @param {*} className 
   * @param {*} idx 
   * @param {*} label 
   * @param {*} placement 
   */
  createToolTipById(id = null, label = '', placement = 'top') {
    this.instructions.set(++this.instructionNumber, {
      target: `flushModal`,
      arguments: [...arguments]
    });
    return this;
  }

  /**
   * createToolTipByClassName
   * @param {*} className 
   * @param {*} idx 
   * @param {*} label 
   * @param {*} placement 
   */
  createToolTipByClassName(className, idx = 1, label = '', placement = 'top') {
    this.instructions.set(++this.instructionNumber, {
      target: `createToolTipByClassName`,
      arguments: [...arguments]
    });
    return this;
  }

  /**
   * clear all the tooltips
   */
  clearToolTips() {
    this.instructions.set(++this.instructionNumber, {
      target: `clearToolTips`,
      arguments: [...arguments]
    });
    return this;
  }

  /**
   * finishes topping
   */
  play() {
    let frame = document.getElementsByTagName("iframe")[0];
    frame.contentWindow.postMessage(JSON.parse(JSON.stringify([...this.instructions])), '*');
    return this;
  }

  /**
   * finishes topping
   */
  finish() {
    this.instructions.set(++this.instructionNumber, {
      target: `finish`,
      arguments: [...arguments]
    });
    return this;
  }

}

var topping = new Topping();
window.topping = topping;