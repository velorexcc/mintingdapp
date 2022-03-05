import './App.css';
import velorexMembersClubABI from "./velorexMembersClubABI.json";
import { ethers } from "ethers";
import { useEffect, useState, React } from 'react';
import Lottie from 'react-lottie';
import animationData from './lotties/coin.json';

//********
//Internal 
//********
const velorexMembersClubNFTAddress = "0x165A62C4AEd1f461C902718Dcf20eC15CD2FA8EC"

function App() {
// Connecting to Blockchain
    const [accounts, setAccounts] = useState([]);

    async function connectAccounts() {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts"
        });
        setAccounts(accounts);
      }
    }

useEffect(() => {
  connectAccounts();
}, []);

//Minting functionality
  const [mintAmount, setMintAmount] = useState(1);

//Setting wallet functionality
  const [address, setAddress] = useState();
  
//Limit mint counter between values of 1 and 5 - reset values
  if (mintAmount <= 0) {
    setMintAmount(mintAmount +1);
    alert("Mint amount must be greater than 0!");
  } else if (mintAmount >= 6) {
    setMintAmount(mintAmount -1);
    alert("If you want to mint more than 5 NFTs in this wallet, please contact support@velorex.net");
  }

  async function handleMint() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        velorexMembersClubNFTAddress,
        velorexMembersClubABI.abi,
        signer
      );
      try {
  //Setting the current wallet address
        setAddress(await signer.getAddress());

  //Checking if wallet is in the whitelist
        const preBoolean = await contract.whitelistWallets(address);
        console.log(preBoolean);
  //If the wallet is in the whitelist - reduce the cost of minting by 25%
        if (preBoolean) {
          var checkedPrice =("" + 0.75 * mintAmount + "");
          } else {
          var checkedPrice =("" + 1 * mintAmount + "");
        }
  //Check if the wallet belongs to the owner and enable free minting 
        const adminBoolean = await contract.adminRights(address);
        console.log(adminBoolean);
        if (adminBoolean) {
            var checkedPrice = "0";
          }

        const response = await contract.mint(mintAmount, { value: ethers.utils.parseEther(checkedPrice)});
        console.log("response: ", response);      } catch (err) {
        console.log("error: ", err);
      }
    }
  }


//Lottie animation options
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

//Application
    return ( 
    <div className="appText" >
    Velorex Members Club NFTs
    <div className='lottie'>
    <Lottie
          options={defaultOptions}
          height={350}
          width={350}
        />
        </div>
    <div className="connectedWallet" style={{display: 'flex', justifyContent: 'center'}}>
    🟢 {address}
      </div>
    {accounts.length && (
      <div>
        <div className="button2">
        <button
          onClick={handleMint}>Mint {mintAmount} NFTs</button>  
    </div>
    <div className="button1">
        <button
          onClick={() => setMintAmount(mintAmount - 1) }  >-</button>
        </div>
        <div className="button1">
        <button  
          onClick={() => setMintAmount(mintAmount + 1)}>+</button>  
        </div>
      </div>  
    )}
    </div>
  );
  
}

export default App;


