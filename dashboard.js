const tokenAddress = "0x65e47d9bd03c73021858ab2e1acb2cab38d9b039";
const contractAddress = "0x4436a07606de10ea23dac531672d855ec4b9de37";

let web3;
let contract;

async function connectWallet() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            await ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await web3.eth.getAccounts();
            document.getElementById('walletAddress').innerText = accounts[0];
            contract = new web3.eth.Contract(stakingABI, contractAddress);
            loadData();
        } catch (error) {
            alert("Connection failed.");
        }
    } else {
        alert("MetaMask not found!");
    }
}

async function loadData() {
    const totalStaked = await contract.methods.totalStaked().call();
    const rewardPool = await contract.methods.rewardPool().call();

    document.getElementById('totalStaked').innerText = (totalStaked / 1e18).toLocaleString();
    document.getElementById('rewardPool').innerText = (rewardPool / 1e18).toLocaleString();
}

document.getElementById('connectButton').addEventListener('click', connectWallet);
