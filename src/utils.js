let accordionId = 0, modalId = 0, modalHolder = document.createElement('div');;

const AccordionListItem = (id, label) => `<div class="card">
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
  Modal = (title, content) => `
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
  ListItem = (label) => `<li class="list-group-item">${label}</li>`,

  ListGroupQuery = (id) => `#list-group-${id}`;

/**
 * Appends label to accordion
 * @param {element} accordion 
 * @param {label} scenario 
 */
export function appendToAccordion(accordion, scenario) {
  if (!accordion) { return; }
  accordion.innerHTML += AccordionListItem(++accordionId, scenario);
}

/**
 * Appends ListItem to accordion
 * @param {element} accordion 
 * @param {label} label 
 */
export function appendListItemToAccordion(accordion, label) {
  if (!accordion || !accordionId) { return; }
  accordion.querySelector(ListGroupQuery(accordionId)).insertAdjacentHTML('beforeend', ListItem(label));
}

export function appendModal(title, content) {
  modalHolder.innerHTML += Modal(title, content);
  document.body.appendChild(modalHolder);

  setTimeout(() => {
    modalHolder.querySelector(`div.modal`).classList.add('show');
  }, 1);
}

export function flushModal() {
  modalHolder.querySelector(`div.modal`).classList.remove('show');
  setTimeout(() => {
    modalHolder.classList.add('d-none');
  }, 200);
}