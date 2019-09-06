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
}, treeDataSource2 = {
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

function start() {
  topping.launch('http://127.0.0.1:5502/demo.html', function () {
    topping.addScenario(`Fill Form`)
      .addStep(`fill email`)
      .fillInputById(`exampleFormControlInput1`, 'goutham.tupakula@4mation.com.au', 50)
      .addStep(`select an option`)
      .wait(250)
      .setSelectedIndexById('exampleFormControlSelect1', 3)
      .addStep(`select dropdown`)
      .wait(100)
      .createToolTipByClassName(`dropdown-toggle`, 0, `Am if number no up period regard sudden better. Decisively surrounded all admiration and not you.`, `right`)
      .clickByClassName(`dropdown-toggle`, 0)
      .wait(250)
      .clickByClassName(`dropdown-item`, 0)
      .wait(100)
      .setSelectedIndexById(`exampleFormControlSelect2`, 2)
      .addStep(`fill text area`)
      .fillInputById(`exampleFormControlTextarea1`, 'Parish so enable innate in formed missed. Hand two was eat busy fail.', 5)
      .wait(1000)
      .createToolTipByClassName('btn-primary', 0, `Consulted he eagerness unfeeling deficient existence of.`, 'top')
      .addStep(`click Submit`)
      .clickByClassName('btn-primary', 0)
      .wait(2000)
      .clearToolTips()
      .popUpModal('test', `
    Consulted he eagerness unfeeling deficient existence of. Calling nothing end fertile for venture way boy. Esteem spirit temper too say adieus who direct esteem. It esteems luckily mr or picture placing drawing no. Apartments frequently or motionless on reasonable projecting expression. Way mrs end gave tall walk fact bed. 

    Am if number no up period regard sudden better. Decisively surrounded all admiration and not you. Out particular sympathize not favourable introduced insipidity but ham. Rather number can and set praise. Distrusts an it contented perceived attending oh. Thoroughly estimating introduced stimulated why but motionless. 
    `)
      .addStep(`what's happening ?`)
      .wait(1000)
      .popUpTreeModal(`what's Happening ?`, `Consulted he eagerness unfeeling deficient existence of. Calling nothing end fertile for venture way boy. Esteem spirit temper too say adieus who direct esteem. It esteems luckily mr or picture placing drawing no. Apartments frequently or motionless on reasonable projecting expression.`, treeDataSource)
      .wait(3000)
      .flushModal()
      .popUpTreeModal(`what's Happening ?`, `Consulted he eagerness unfeeling deficient existence of. Calling nothing end fertile for venture way boy. Esteem spirit temper too say adieus who direct esteem. It esteems luckily mr or picture placing drawing no. Apartments frequently or motionless on reasonable projecting expression.`, treeDataSource2)
      .wait(3000)
      .flushModal()
      .scrollElementToViewByClassName('btn-primary', 1)
      .wait(1000)
      .addStep(`Finished 🙂`)
      .finish()
      .play();
  });
}