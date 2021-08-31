"use strict";

var web3btn = document.getElementById("web3connect");
var acc = document.getElementById("acc");
var mintBtn = document.getElementById("mint-button");

var _require = require("stream"),
    Readable = _require.Readable;

var uploadImg;
var mime;

var Jimp = require("jimp");

Jimp.read("https://gateway.pinata.cloud/ipfs/QmNoyrpvY2f6c4Ad4uyzPNSi72arXPB3eLzdqzVCCBboaF").then(function (image) {
  console.log(image);
  image.color([{
    apply: "hue",
    params: [-90]
  }, {
    apply: "lighten",
    params: [50]
  }, {
    apply: "xor",
    params: ["#06D"]
  }]).getBufferAsync(image.getMIME()).then(function (res) {
    uploadImg = res;
    console.log(uploadImg.buffer);
  });
  console.log(image);
  mime = image.getMIME(); //console.log(r);
  //console.log(image.getMIME())
  //console.log(typeof(image.getMIME()))
  //console.log(image)
  //uploadImg = image.bitmap.data;
})["catch"](function (e) {
  return console.log(e);
});
var selectedACC;
var name;
var randomNum;
window.Moralis.initialize("t6bmeCXZOoZgO31r0vu9GfsvRt5bYeubGm5YPtsb");
window.Moralis.serverURL = "https://3xvmpzlfisxr.moralisweb3.com:2053/server";
var pinataApiKey = "a770d310d147135d5ec4";
var pinataSecretApiKey = "076b05a1c38c2910d32a8079e1007d52b8c02264990e0af61fa0e544cd760c78";
var url = "https://api.pinata.cloud/pinning/pinFileToIPFS";
var jsonUrl = "https://api.pinata.cloud/pinning/pinJSONToIPFS";

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
mintBtn.addEventListener("click", function _callee3() {
  var dna, SUS, Speed, Kill, Sabotage, BgColor, Back;
  return regeneratorRuntime.async(function _callee3$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          // call random number
          randomNum = 137865134834567823676; // slice them for dna to traits

          dna = randomNum.toString();
          SUS = dna.slice(0, 3);
          console.log(SUS % 100);
          Speed = dna.slice(3, 6);
          console.log(Speed % 100);
          Kill = dna.slice(6, 9);
          console.log(Kill % 100);
          Sabotage = dna.slice(9, 12);
          console.log(Sabotage % 100);
          BgColor = dna.slice(12, 15);
          console.log(BgColor % 360); // create image

          fetch("https://gateway.pinata.cloud/ipfs/QmNoyrpvY2f6c4Ad4uyzPNSi72arXPB3eLzdqzVCCBboaF").then(function _callee2(res) {
            var d, data;
            return regeneratorRuntime.async(function _callee2$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    console.log(res);
                    _context4.next = 3;
                    return regeneratorRuntime.awrap(res.blob());

                  case 3:
                    d = _context4.sent;
                    console.log(d);
                    console.log(uploadImg); //use this blob to make new image

                    console.log(uploadImg.buffer);
                    /* let ff = new Blob(uploadImg.buffer);
                    console.log(ff)
                    let gg = ff.slice(0, ff.size, mime)
                    console.log(gg) */
                    //upload updated image to ipfs

                    data = new FormData();
                    data.append("file", d);
                    axios.post(url, data, {
                      maxBodyLength: "Infinity",
                      //this is needed to prevent axios from erroring out with large files
                      headers: {
                        "Content-Type": "multipart/form-data; boundary=".concat(data._boundary),
                        pinata_api_key: pinataApiKey,
                        pinata_secret_api_key: pinataSecretApiKey
                      }
                    }).then(function (response) {
                      //handle response here
                      console.log(response.data);
                      console.log("image url = https://ipfs.io/ipfs/" + response.data.IpfsHash);
                    });

                  case 10:
                  case "end":
                    return _context4.stop();
                }
              }
            });
          }); //mint composable
          // choose background from dna

          Back = dna.slice(15, 18);
          console.log(Back); //use rarible factory to make Background NFT
          // send rarible nft background to Composable - 998
          // make escrow contract for composable

        case 15:
        case "end":
          return _context5.stop();
      }
    }
  });
});

var stake = function stake() {// stake using FIRB from 88mph  
};