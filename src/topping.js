import { Subject, of, from } from 'rxjs';
import { concatMap, delay, tap, mergeMap } from 'rxjs/operators';

import { appendToAccordion, appendListItemToAccordion, appendModal, flushModal } from './utils';

const sub$ = new Subject(), TYPE_OF_OBSERVABLE = 'OBSERVABLE', TYPE_OF_FUNCTION = 'function';

class Topping {

  constructor() {
    this.articleSection = document.getElementById("toppings");
    sub$.pipe(concatMap(obj => {
      if (!obj) { return; }
      switch (obj.type) {

        case TYPE_OF_OBSERVABLE: return obj.delegate();

        case TYPE_OF_FUNCTION: return of(obj.delegate).pipe(delay(obj.delay || 0), tap(val => obj.delegate()));

        default: break;
      }
    })).subscribe(console.log);
  }

  /**
   * Adds scenario
   * @param {*} label 
   */
  addScenario(label) {
    sub$.next({ type: TYPE_OF_FUNCTION, delegate: () => appendToAccordion(this.articleSection, label), delay: 0 });
    return this;
  }

  /**
   * Adds Step to the last scenario
   * @param {*} label 
   */
  addStep(label) {

    sub$.next({ type: TYPE_OF_FUNCTION, delegate: () => appendListItemToAccordion(this.articleSection, label), delay: 0 });
    return this;
  }

  /**
   * fills input value by Id with delay between each character
   * @param {*} id 
   * @param {*} value 
   * @param {*} delayInterval 
   */
  fillInputById(id, value, delayInterval) {
    let element = document.getElementById(id), fillValue = function (element, value) {
      element.value += value || ""
    };

    if (element) {
      element.value = "";
    }

    if (!delayInterval || !value) {
      sub$.next({ type: TYPE_OF_FUNCTION, delegate: () => fillValue(element, value), delay: 0 });
    } else {
      sub$.next({
        type: TYPE_OF_OBSERVABLE, delegate: () => from(value.split('')).pipe(mergeMap((x) => from(x)),
          concatMap(x => of(x).pipe(delay(delayInterval), tap(val => fillValue(element, val)))))
      });
    };

    return this;
  }

  /**
   * Clicks element after certain time interval
   * @param {*} id 
   * @param {*} delayInterval 
   */
  clickById(id = null, delayInterval = 0) {
    let element = document.getElementById(id), clickElement = function () {
      if (element && element.click && typeof element.click == "function") {
        element.click();
      }
    }

    sub$.next({ type: TYPE_OF_FUNCTION, delegate: () => { clickElement() }, delay: delayInterval });
    return this;
  }

  /**
   * clicks an element provided query selector class name, index, delayInterval
   * @param {*} className 
   * @param {*} idx 
   * @param {*} delayInterval 
   */
  clickByClassName(className, idx = 0, delayInterval = 0) {
    let element = document.getElementsByClassName(className)[idx], clickElement = function () {
      if (element && element.click && typeof element.click == "function") {
        element.click();
      }
    }
    sub$.next({ type: TYPE_OF_FUNCTION, delegate: () => { clickElement() }, delay: delayInterval });
    return this;
  }

  /**
   * Pops up a modal with the header & content
   * @param {*} header 
   * @param {*} content 
   * @param {*} delay 
   */
  popUpModal(header, content, delay = 0) {
    let delegate = () => appendModal(header, content);
    sub$.next({ type: TYPE_OF_FUNCTION, delegate, delay });
    return this;
  }

  /**
   * clear modal on the screen
   * @param {*} delay 
   */
  flushModal(delay = 0) {
    let delegate = () => flushModal();
    sub$.next({ type: TYPE_OF_FUNCTION, delegate, delay });
    return this;
  }

}

let topping = new Topping();

export default topping;