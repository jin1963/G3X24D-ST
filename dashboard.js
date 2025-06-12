let web3;
let contract;
const contractAddress = "0x4436a07606de10ea23dac531672d855ec4b9de37";

window.addEventListener("load", async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
    } else {
        alert("Please install MetaMask!");
    }
});

document.getElementById("connectButton").onclick = async () => {
    try {
        await ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await web3.eth.getAccounts();
        const user = accounts[0];
        document.getElementById("wallet").innerText = user;

        contract = new web3.eth.Contract(stakingABI, contractAddress);

        const totalStaked = await contract.methods.totalStaked().call();
        const rewardPool = await contract.methods.rewardPool().call();

        document.getElementById("totalStaked").innerText = web3.utils.fromWei(totalStaked, "ether");
        document.getElementById("rewardPool").innerText = web3.utils.fromWei(rewardPool, "ether");
    } catch (err) {
        console.error(err);
        alert("Connection failed.");
    }
};
