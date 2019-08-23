let log = function() {
  console.log(Array.from(arguments));
};

function start() {
  new Topping()
    .addStep(`Fill Form`)
    .fillInputById("firstname", "Test First Name")
    .fillInputById("lastname", "Test Last Name")
    .clickElementById("submitButton");
}

function Topping() {
  let articleSection = document.getElementById("articleSection"),
    iframe = document.getElementsByTagName("iframe")[0],
    app = iframe.contentWindow.document;

  function getElementById(id) {
    if (!app || !id) {
      return;
    }
    return app.getElementById(id);
  }

  function fillInput(textBox, value = "") {
    let array = value.split(""),
      length = array.length;

    if (textBox) {
      textBox.value = "";
    }

    return new Promise(function(resolve, reject) {
      if (!textBox || !length) {
        return resolve();
      }

      array.forEach((c, index) =>
        setTimeout(() => {
          textBox.value += c;
          if (length === index) {
            resolve();
          }
        }, 200 * ++index)
      );
    });
  }

  function click(elem) {
    if (elem && elem.click && typeof elem.click == "function") {
      elem.click();
    }
  }

  fillInput = fillInput.bind(this);
  click = click.bind(this);

  this.addStep = function(label) {
    let item = document.createElement("li");
    item.className = "list-group-item list-group-item-primary";
    item.innerText = label || "";
    articleSection.appendChild(item);
    return this;
  };

  this.next = function(func) {
      debugger;
    func && func.call(this);
    return this;
  };

  this.fillInputById = async function(Id, value) {
    await fillInput(getElementById(Id), value);
    return this;
  };

  this.clickElementById = async function(id) {
    await click(getElementById(id));
    return this;
  };
}
