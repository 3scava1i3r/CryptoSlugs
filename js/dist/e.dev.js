"use strict";

var web3btn = document.getElementById("web3connect");
var acc = document.getElementById("acc");
var mintBtn = document.getElementById("mint-button");

var NFTStorage = require('nft.storage');

var apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDRmNmFhNTI0NTkzM2E3NGQzM0ZjNGQ0OTZGNTdhNTA3MTBjOEVjODkiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYzMDIyNzc0MDI1OSwibmFtZSI6Ik5GVFZpc2lvbiJ9.GAraBg2Iwi1AuA0dMv7wrpWbalIK0ugke-uM4LPZ2Gg';
var client = new NFTStorage({
  token: apiKey
});
var selectedACC;
var name;
var randomNum;
window.Moralis.initialize("t6bmeCXZOoZgO31r0vu9GfsvRt5bYeubGm5YPtsb");
window.Moralis.serverURL = "https://3xvmpzlfisxr.moralisweb3.com:2053/server";

var init = function init() {
  return regeneratorRuntime.async(function init$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Moralis.Web3.enable());

        case 2:
          window.web3 = _context.sent;

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
};

init();

var ConnectWallet = function ConnectWallet() {
  var user, accounts, chainId;
  return regeneratorRuntime.async(function ConnectWallet$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Moralis.Web3.authenticate());

        case 3:
          user = _context2.sent;

          if (!user) {
            _context2.next = 13;
            break;
          }

          _context2.next = 7;
          return regeneratorRuntime.awrap(web3.eth.getAccounts());

        case 7:
          accounts = _context2.sent;
          _context2.next = 10;
          return regeneratorRuntime.awrap(web3.eth.net.getId());

        case 10:
          chainId = _context2.sent;
          selectedACC = accounts[0];
          acc.innerText = selectedACC;

        case 13:
          if (selectedACC != null | undefined) {
            console.log(selectedACC);
          } else {
            console.log("yo! connect the damn wallet");
          }

          _context2.next = 19;
          break;

        case 16:
          _context2.prev = 16;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);

        case 19:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 16]]);
};

web3btn.addEventListener("click", function () {
  ConnectWallet();
});
document.getElementById("name_field").addEventListener("change", function _callee(res) {
  return regeneratorRuntime.async(function _callee$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          console.log(res.target.value);
          name = res.target.value;

        case 2:
        case "end":
          return _context3.stop();
      }
    }
  });
});
mintBtn.addEventListener("click", function () {
  // call random number
  randomNum = 137865134834567823676; // slice them for dna to traits

  var dna = randomNum.toString();
  var SUS = dna.slice(0, 3);
  console.log(SUS % 100);
  var Speed = dna.slice(3, 6);
  console.log(Speed % 100);
  var Kill = dna.slice(6, 9);
  console.log(Kill % 100);
  var Sabotage = dna.slice(9, 12);
  console.log(Sabotage % 100);
  var BgColor = dna.slice(12, 15);
  console.log(BgColor % 360); // create image

  fetch("../assets/r.jpeg").then(function _callee2(res) {
    var d, metadata;
    return regeneratorRuntime.async(function _callee2$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return regeneratorRuntime.awrap(res.blob());

          case 2:
            d = _context4.sent;
            _context4.next = 5;
            return regeneratorRuntime.awrap(client.store({
              image: d
            }));

          case 5:
            metadata = _context4.sent;
            console.log(metadata);

          case 7:
          case "end":
            return _context4.stop();
        }
      }
    });
  }); //mint composable
  // choose background from dna
  //use rarible factory to make Background NFT
  // send rarible nft background to Composable - 998
  // make escrow contract for composable
});

var stake = function stake() {// stake using FIRB from 88mph  
};