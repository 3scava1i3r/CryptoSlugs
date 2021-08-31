const web3btn = document.getElementById("web3connect");
const acc = document.getElementById("acc");
const mintBtn = document.getElementById("mint-button");
const { Readable } = require("stream");


let uploadImg;
let mime;
let Jimp = require("jimp");

Jimp.read("https://gateway.pinata.cloud/ipfs/QmNoyrpvY2f6c4Ad4uyzPNSi72arXPB3eLzdqzVCCBboaF")
.then(image => {
  console.log(image)
  image
    .color([
      { apply: "hue", params: [-90] },
      { apply: "lighten", params: [50] },
      { apply: "xor", params: ["#06D"] },
    ])
    .getBufferAsync(image.getMIME())
    .then((res) => {
      uploadImg = res;
      console.log(uploadImg.buffer)
    })
    console.log(image)
    mime = image.getMIME();
    //console.log(r);

  
  //console.log(image.getMIME())
  //console.log(typeof(image.getMIME()))

  //console.log(image)
  //uploadImg = image.bitmap.data;

}).catch((e) => console.log(e))


let selectedACC;
let name;
let randomNum;


window.Moralis.initialize("t6bmeCXZOoZgO31r0vu9GfsvRt5bYeubGm5YPtsb");
window.Moralis.serverURL = "https://3xvmpzlfisxr.moralisweb3.com:2053/server";



const pinataApiKey = "a770d310d147135d5ec4";
const pinataSecretApiKey =
  "076b05a1c38c2910d32a8079e1007d52b8c02264990e0af61fa0e544cd760c78";
const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";
const jsonUrl = "https://api.pinata.cloud/pinning/pinJSONToIPFS";








const init = async() => {
    window.web3 = await Moralis.Web3.enable();
    

}

init();


const ConnectWallet = async() => {
    try {
        let user = await Moralis.Web3.authenticate();
        if(user){
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
        console.log(e)
    }
}


web3btn.addEventListener("click", () => {
  ConnectWallet();
});


document.getElementById("name_field").addEventListener("change", async(res) =>{
    console.log(res.target.value);
    name = res.target.value;

})


mintBtn.addEventListener("click" ,async() => {
    
        
    // call random number

    randomNum = 137865134834567823676
    // slice them for dna to traits
    let dna = randomNum.toString()

    let SUS = dna.slice(0,3);
    console.log(SUS % 100)

    let Speed = dna.slice(3,6);
    console.log(Speed % 100)

    let Kill = dna.slice(6,9);
    console.log(Kill % 100);

    let Sabotage = dna.slice(9,12);
    console.log(Sabotage % 100);

    let BgColor = dna.slice(12, 15);
    console.log(BgColor % 360);
    // create image


    
    
    fetch(
      "https://gateway.pinata.cloud/ipfs/QmNoyrpvY2f6c4Ad4uyzPNSi72arXPB3eLzdqzVCCBboaF"
    ).then(async (res) => {
      console.log(res)
      let d = await res.blob();
      console.log(d);



    console.log(uploadImg)
      //use this blob to make new image
    
    console.log(uploadImg.buffer);
    
    
    /* let ff = new Blob(uploadImg.buffer);
    console.log(ff)
    let gg = ff.slice(0, ff.size, mime)
    console.log(gg) */

      
      //upload updated image to ipfs
      let data = new FormData();
      data.append("file", d);
      axios
        .post(url, data, {
          maxBodyLength: "Infinity", //this is needed to prevent axios from erroring out with large files
          headers: {
            "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
            pinata_api_key: pinataApiKey,
            pinata_secret_api_key: pinataSecretApiKey,
          },
        })
        .then((response) => {
          //handle response here
          console.log(response.data);
          console.log(
            `image url = https://ipfs.io/ipfs/` + response.data.IpfsHash
          );
        });
    });
    


    //mint composable




    // choose background from dna


    let Back = dna.slice(15, 18);
    console.log(Back)

    //use rarible factory to make Background NFT




    // send rarible nft background to Composable - 998




    // make escrow contract for composable



})



const stake = () => {
    // stake using FIRB from 88mph  



}

