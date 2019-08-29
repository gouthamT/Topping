import tree from '../helpers/dndTree';
import treeData from '../helpers/sample';
import Popper from 'popper.js';

let accordionId = 0, modalHolder = document.createElement('div');

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
  accordionListItem.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
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
export function appendModal(title, content) {
  modalHolder.classList.remove('d-none');
  modalHolder.innerHTML = GetModal(title, content);
  document.body.appendChild(modalHolder);

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
export function appendTreeModal(title, content, treeSource) {
  modalHolder.classList.remove('d-none');
  modalHolder.innerHTML = GetTreeModal(title, content);
  document.body.appendChild(modalHolder);
  tree(treeSource || treeData, `topping-tree-container`);

  setTimeout(() => {
    modalHolder.querySelector(`div.modal`).classList.add('show');
  }, 1);
}

/**
 * flushModal
 */
export function flushModal() {
  modalHolder.querySelector(`div.modal`).classList.remove('show');
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
  <div class="tooltip-inner border-info p-3 mb-2 bg-dark text-white">
    ${label}
  </div>
  `;
  tooltip.className = `tooltip show bs-tooltip-${position} topping-tool-tip`;
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