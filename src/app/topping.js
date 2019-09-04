import { of, empty, from, fromEvent } from 'rxjs';
import { concatMap, delay, tap, mergeMap, map } from 'rxjs/operators';
import ToppingBase from './base';
import {
  appendModal,
  appendTreeModal,
  flushModal,
  getElementById,
  getElementByClassName,
  createTooltipAtElement,
  focusElement,
  setElementSelectedIndex,
  setElementValue,
  clickElement,
  toView
} from '../others/utils';
import { TYPE_OF_OBSERVABLE, TYPE_OF_FUNCTION } from '../others/constants';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../index.scss';
import '../../favicon.ico';

class Topping extends ToppingBase {

  constructor() {
    super();
    this.toolTips = [];
  }

  /**
   * Adds scenario
   * @param {*} label 
   */
  addScenario(label) {
    this.sub$.next({ type: TYPE_OF_FUNCTION, delegate: () => { window.top.postMessage({ target: 'echo-addScenario', value: label }, '*') } });
    return this;
  }

  /**
   * Adds Step to the last scenario
   * @param {*} label 
   */
  addStep(label) {
    this.sub$.next({ type: TYPE_OF_FUNCTION, delegate: () => { window.top.postMessage({ target: 'echo-addStep', value: label }, '*') } });
    return this;
  }

  /**
   * fills input value by Id with delay between each character
   * @param {*} id 
   * @param {*} value 
   * @param {*} delayInterval 
   */
  fillInputById(id, value, delayInterval) {
    debugger;
    let fillValue = function (element, value) {
      element.value += value || ""
    }, clearValue = function (element) {
      if (element) {
        element.value = "";
      }
    }

    if (!delayInterval || !value) {
      this.sub$.next({
        type: TYPE_OF_FUNCTION, delegate: () => {
          let element = getElementById(id);
          clearValue(element);
          return fillValue(element, value);
        }
      });
    } else {
      this.sub$.next({
        type: TYPE_OF_OBSERVABLE, delegate: () => {
          let element = getElementById(id);
          clearValue(element);
          return from(value.split('')).pipe(mergeMap((x) => from(x)),
            concatMap(x => of(x).pipe(delay(delayInterval), tap(val => fillValue(element, val)))))
        }
      });
    };

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
    let fillValue = function (element, value) {
      element.value += value || ""
    }, clearValue = function (element) {
      if (element) {
        element.value = "";
      }
    }

    if (!delayInterval || !value) {
      this.sub$.next({
        type: TYPE_OF_FUNCTION, delegate: () => {
          let element = getElementByClassName(className, idx);
          clearValue(element);
          return fillValue(element, value);
        }
      });
    } else {
      this.sub$.next({
        type: TYPE_OF_OBSERVABLE, delegate: () => {
          let element = getElementByClassName(className, idx);
          clearValue(element);
          return from(value.split('')).pipe(mergeMap((x) => from(x)),
            concatMap(x => of(x).pipe(delay(delayInterval), tap(val => fillValue(element, val)))))
        }
      });
    };

    return this;
  }

  /**
   * Clicks element after certain time interval
   * @param {*} id 
   * @param {*} delayInterval 
   */
  clickById(id = null) {
    let delegate = function () {
      clickElement(getElementById(id));
    };
    this.sub$.next({ type: TYPE_OF_FUNCTION, delegate });
    return this;
  }

  /**
   * clicks an element provided query selector class name, index, delayInterval
   * @param {*} className 
   * @param {*} idx 
   * @param {*} delayInterval 
   */
  clickByClassName(className, idx = 0) {
    let delegate = function () {
      clickElement(getElementByClassName(className, idx));
    };
    this.sub$.next({ type: TYPE_OF_FUNCTION, delegate });
    return this;
  }

  /**
   * setValueById
   * @param {*} id 
   * @param {*} value 
   * @param {*} delayInterval 
   */
  setValueById(id = null, value = '') {
    let delegate = function () {
      setElementValue(getElementById(id), value);
    }

    this.sub$.next({ type: TYPE_OF_FUNCTION, delegate });
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
    let delegate = function () {
      setElementValue(getElementByClassName(className, idx), value);
    }

    this.sub$.next({ type: TYPE_OF_FUNCTION, delegate });
    return this;
  }

  /**
   * setIndexById
   * @param {*} id 
   * @param {*} index 
   * @param {*} delayInterval 
   */
  setSelectedIndexById(id = null, index = 0) {
    let delegate = function () {
      setElementSelectedIndex(getElementById(id), index);
    };
    this.sub$.next({ type: TYPE_OF_FUNCTION, delegate });
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
    let delegate = function () {
      setElementSelectedIndex(getElementByClassName(className, idx), selectedIndex);
    };
    this.sub$.next({ type: TYPE_OF_FUNCTION, delegate });
    return this;
  }

  /**
   * focusElementById
   * @param {*} id 
   * @param {*} index 
   * @param {*} delayInterval 
   */
  focusElementById(id = null) {
    let delegate = function () {
      focusElement(getElementById(id));
    };
    this.sub$.next({ type: TYPE_OF_FUNCTION, delegate });
    return this;
  }

  /**
   * focusElementByClassName
   * @param {*} className 
   * @param {*} idx
   */
  focusElementByClassName(className, idx) {
    let delegate = function () {
      focusElement(getElementByClassName(className, idx));
    };
    this.sub$.next({ type: TYPE_OF_FUNCTION, delegate });
    return this;
  }

  /**
   * scrollElementToViewById
   * @param {*} id 
   */
  scrollElementToViewById(id = null) {
    let delegate = function () {
      toView(getElementById(id));
    };
    this.sub$.next({ type: TYPE_OF_FUNCTION, delegate });
    return this;
  }

  /**
   * scrollElementToViewByClassName
   * @param {*} className 
   * @param {*} idx 
   */
  scrollElementToViewByClassName(className, idx) {
    let delegate = function () {
      toView(getElementByClassName(className, idx));
    };
    this.sub$.next({ type: TYPE_OF_FUNCTION, delegate });
    return this;
  }

  /**
   * wait
   * @param {*} interval 
   */
  wait(interval = 0) {
    this.sub$.next({
      type: TYPE_OF_OBSERVABLE, delegate: () => empty().pipe(delay(interval))
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
    let delegate = () => appendModal(this.modalHolder, header, content);
    this.sub$.next({ type: TYPE_OF_FUNCTION, delegate });
    return this;
  }

  /**
   * Pops up a modal with the header & content
   * @param {*} header 
   * @param {*} content 
   * @param {*} delay 
   */
  popUpTreeModal(header, content, treeSource) {
    let delegate = () => appendTreeModal(this.modalHolder, header, content, treeSource);
    this.sub$.next({ type: TYPE_OF_FUNCTION, delegate });
    return this;
  }

  /**
   * clear modal on the screen
   * @param {*} delay 
   */
  flushModal() {
    let delegate = () => flushModal(this.modalHolder);
    this.sub$.next({ type: TYPE_OF_FUNCTION, delegate });
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
    let delegate = () => { this.toolTips.push(createTooltipAtElement(getElementById(id), label, placement)) };
    this.sub$.next({ type: TYPE_OF_FUNCTION, delegate });
    return this;
  }

  /**
   * createToolTipByClassName
   * @param {*} className 
   * @param {*} idx 
   * @param {*} label 
   * @param {*} placement 
   */
  createToolTipByClassName(className, idx = 0, label = '', placement = 'top') {
    let delegate = () => { this.toolTips.push(createTooltipAtElement(getElementByClassName(className, idx), label, placement)) };
    this.sub$.next({ type: TYPE_OF_FUNCTION, delegate });
    return this;
  }

  /**
   * clear all the tooltips
   */
  clearToolTips() {
    let delegate = () => { this.toolTips.forEach(t => t && t.destroy && t.destroy()); this.toolTips = []; };
    this.sub$.next({ type: TYPE_OF_FUNCTION, delegate });
    return this;
  }

}

let topping = new Topping();

fromEvent(window, 'message').pipe(
  map(event => {
    if (!event || !event.data || !event.data.values) return;
    return event.data;
  }),
  tap(source => {
    if (!source) return;
    let data;
    for (var value of source.values()) {
      data = value[1];
      data && data.target && topping[data.target] && topping[data.target](...data.arguments);
    }
  })
).subscribe();

export default topping;