const web3btn = document.getElementById("web3connect");
const acc = document.getElementById("acc");


let selectedACC;

window.Moralis.initialize("t6bmeCXZOoZgO31r0vu9GfsvRt5bYeubGm5YPtsb");
window.Moralis.serverURL = "https://3xvmpzlfisxr.moralisweb3.com:2053/server";

const init = async () => {
  window.web3 = await Moralis.Web3.enable();
};

init();

const ConnectWallet = async () => {
  try {
    let user = await Moralis.Web3.authenticate();
    if (user) {
      const accounts = await web3.eth.getAccounts();
      const chainId = await web3.eth.net.getId();

      selectedACC = accounts[0];
      acc.innerText = selectedACC;
    }

    if ((selectedACC != null) | undefined) {
      console.log(selectedACC);
    } else {
      console.log("yo! connect the damn wallet");
    }
  } catch (e) {
    console.log(e);
  }
};


web3btn.addEventListener("click", () => {
  ConnectWallet();
});
