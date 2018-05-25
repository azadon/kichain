// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.
import product_artifacts from '../../build/contracts/Product.json'

var Product = contract(product_artifacts);

window.App = {
  start: function() {
    var self = this;
    
    Product.setProvider(web3.currentProvider);
    
    // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }
      
      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }
    });
  },
  
  readContractAddr: function()
  {
    var contract_address = document.getElementById('contract_address').value;
    console.log("Address: '" + contract_address + "'");

    if (contract_address && contract_address.length > 0 && contract_address.trim())
    {
      console.log("Reloading product contract");
      Product.at(contract_address).then(function(instance) {
        App.resetDataTable();
        App.setProductInfo(instance);
        App.getDataSources(instance);
      });
    }
  },
  
  setProductInfo: function(pi) {
      pi.vendor().then(function(v) {
      let vendor = v;
      pi.serialNumber.call().then(function(s){
        document.getElementById("product_info").innerHTML = vendor + ": " + s;
      });
    }).catch(function(e) {
      console.log(e);
    });
  },

  getDataSources: function(pi)
  {
    var dataSources;
    
    pi.getDataSources().then(function(v) {
      dataSources = v;
      for (let i = 0; i < dataSources.length; ++i)
      {
        pi.getData.call(dataSources[i]).then(function(d) { 
          const table = document.getElementById("product_data");
          table.insertAdjacentElement("beforeend", App.renderRow(web3.toAscii(dataSources[i]), d)); 
        });  
      }
    }).catch(function(e) {
      console.log(e);
    }); 
  },
  
  renderRow: function (l, r) {
    const rowEl = document.createElement('tr');
    rowEl.innerHTML = `<td>${l}</td><td>${r}</td>`
    return rowEl;
  },
  
  resetDataTable: function(l, r) {
    const table = document.getElementById("product_data");
    table.innerHTML = "";
  },
};

window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9545"));
  }
  
  App.start();
});
