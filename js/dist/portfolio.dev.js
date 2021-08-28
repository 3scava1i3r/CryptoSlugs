"use strict";

var web3btn = document.getElementById("web3connect");
var acc = document.getElementById("acc");
var selectedACC;
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