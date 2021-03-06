import tree from '../helpers/dndTree';
import Popper from 'popper.js';

let accordionId = 0;

const GetAccordionListItem = (id, label) => `<div class="card">
<div class="card-header" id="headingOne">
  <h2 class="mb-0">
    <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#scenario-${id}"
      aria-expanded="true" aria-controls="scenario-${id}">
      ${label || id}
    </button >
  </h2 >
</div >

  <div id="scenario-${id}" class="collapse show" aria-labelledby="headingOne" data-parent="#toppings">
    <div class="card-body">
      <ul id="list-group-${id}" class="list-group">
      </ul>
    </div>
  </div>
</div > `,
  GetModal = (title, content) => `
<div class="modal-backdrop fade show"></div>
<div class="modal fade" tabindex="-1" role="dialog" aria-hidden="true" style="display: block;">
<div class="modal-dialog modal-dialog-centered" role="document">
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title" id="exampleModalLongTitle">${title}</h5>
    </div>
    <div class="modal-body">
      ${content}
    </div>
  </div>
</div>
</div>`,
  GetTreeModal = (title, content) => `
<div class="modal-backdrop fade show"></div>
<div class="modal topping-modal fade" tabindex="-1" role="dialog" aria-hidden="true" style="display: block;">
<div class="modal-dialog modal-dialog-centered" role="document">
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title" id="exampleModalLongTitle">${title}</h5>
    </div>
    <div class="modal-body">
      <div id="topping-tree-container"></div>
      ${content}
    </div>
  </div>
</div>
</div>`,
  GetListItem = (label) => `<li class="list-group-item">${label}</li>`;

const ListGroupQuery = (id) => `#list-group-${id}`;

/**
 * Appends label to accordion
 * @param {element} accordion 
 * @param {label} scenario 
 */
export function appendToAccordion(accordion, scenario) {
  if (!accordion) { return; }
  accordion.innerHTML += GetAccordionListItem(++accordionId, scenario);
}

/**
 * Appends ListItem to accordion
 * @param {element} accordion 
 * @param {label} label 
 */
export function appendListItemToAccordion(accordion, label) {
  if (!accordion || !accordionId) { return; }
  let accordionListItem = accordion.querySelector(ListGroupQuery(accordionId));
  accordionListItem.insertAdjacentHTML('beforeend', GetListItem(label));
  toView(accordionListItem);
}

/**
 * getElementByClassName
 * @param {*} className 
 * @param {*} idx 
 */
export function getElementByClassName(className, idx = 0) {
  return document.getElementsByClassName(className)[idx];
}

/**
 * getElementByTagName
 * @param {*} tagName 
 * @param {*} idx 
 */
export function getElementByTagName(tagName, idx = 0) {
  return document.getElementsByTagName(tagName)[idx];
}

/**
 * getElementById
 * @param {*} id 
 */
export function getElementById(id) {
  return document.getElementById(id);
}

/**
 * appendModal
 * @param {*} title 
 * @param {*} content 
 */
export function appendModal(modalHolder, title, content) {
  modalHolder.classList.remove('d-none');
  modalHolder.innerHTML = GetModal(title, content);

  setTimeout(() => {
    modalHolder.querySelector(`div.modal`).classList.add('show');
  }, 200);
}

/**
 * appendTreeModal
 * @param {*} title 
 * @param {*} content 
 * @param {*} treeSource 
 */
export function appendTreeModal(modalHolder, title, content, treeSource) {
  modalHolder.classList.remove('d-none');
  modalHolder.innerHTML = GetTreeModal(title, content);
  tree(treeSource, modalHolder.querySelector(`#topping-tree-container`));

  setTimeout(() => {
    modalHolder.querySelector(`div.modal`).classList.add('show');
  }, 1);
}

/**
 * flushModal
 */
export function flushModal(modalHolder) {
  let modal = modalHolder.querySelector(`div.modal`);
  modal && modal.classList.remove('show');
  setTimeout(() => {
    modalHolder.classList.add('d-none');
  });
}

/**
 * createTooltipAtElement
 * @param {*} parentElement
 * @param {*} label 
 * @param {*} position : 'top', 'left', 'right', 'bottom'
 */
export function createTooltipAtElement(parentElement, label = '', position = 'top') {
  if (!parentElement) { return; }

  let tooltip = document.createElement('div');
  tooltip.innerHTML = `
  <div style="color: #fff!important;padding: 1rem!important;margin-bottom: .5rem!important;border-color: #17a2b8!important;background-color: #343a40!important;max-width: 200px;text-align: center;border-radius: .25rem;">
    ${label}
  </div>
  `;
  tooltip.className = `topping-tool-tip`;
  tooltip.style.zIndex = 100000;
  document.body.append(tooltip);
  return new Popper(parentElement, tooltip, {
    removeOnDestroy: true,
    placement: position,
    modifiers: {
      flip: {
        behavior: ['left', 'right', 'top', 'bottom']
      },
      offset: {
        enabled: true,
        offset: '0, 1'
      }
    }
  });
}

/**
 * focusElement
 * @param {*} element 
 */
export function focusElement(element) {
  element && element.focus && typeof element.focus == "function" && element.focus();
}

/**
 * toView
 * @param {*} element 
 */
export function toView(element) {
  element && element.scrollIntoView && element.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });;
}

/**
 * setElementSelectedIndex
 * @param {*} element 
 * @param {*} selectedIndex 
 */
export function setElementSelectedIndex(element, selectedIndex) {
  if (element) {
    element.selectedIndex = selectedIndex;
  }
}

/**
 * setElementValue
 * @param {*} element 
 * @param {*} value 
 */
export function setElementValue(element, value) {
  if (element) {
    element.value = value;
  }
}

/**
 * clickElement
 * @param {*} element 
 */
export function clickElement(element) {
  element && element.click && typeof element.click == "function" && element.click();
}

/**
 * fillElementValue
 * @param {*} element 
 * @param {*} value 
 */
export function fillElementValue(element, value) {
  if (!element) return;
  let actualValue = element.value || "";
  actualValue += value || ""
  let nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set,
    event = new Event('input', { bubbles: true });
  nativeInputValueSetter.call(element, actualValue);
  element.dispatchEvent(event);
}