const stakingAddress = "0x4436a07606de10ea23dac531672d855ec4b9de37";
const tokenAddress = "0x65e47d9bd03c73021858ab2e1acb2cab38d9b039";

const stakingABI = [{"inputs":[{"internalType":"address","name":"_g3xToken","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"uint16","name":"","type":"uint16"}],"name":"aprByTier","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"depositRewards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"g3xToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getStakeCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getStakeInfo","outputs":[{"internalType":"uint112","name":"amount","type":"uint112"},{"internalType":"uint32","name":"startTime","type":"uint32"},{"internalType":"uint32","name":"unlockTime","type":"uint32"},{"internalType":"uint16","name":"durationDays","type":"uint16"},{"internalType":"uint16","name":"apr","type":"uint16"},{"internalType":"bool","name":"claimed","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"duration","type":"uint16"},{"internalType":"uint16","name":"newApr","type":"uint16"}],"name":"setAPR","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint16","name":"duration","type":"uint16"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"stakeCounts","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalStaked","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"unstake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"userStakes","outputs":[{"internalType":"uint112","name":"amount"},{"internalType":"uint32","name":"startTime"},{"internalType":"uint32","name":"unlockTime"},{"internalType":"uint16","name":"durationDays"},{"internalType":"uint16","name":"apr"},{"internalType":"bool","name":"claimed"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token"},{"internalType":"uint256","name":"amount"}],"name":"withdrawExcess","outputs":[],"stateMutability":"nonpayable","type":"function"}];

document.getElementById("connectBtn").addEventListener("click", async () => {
  if (typeof window.ethereum !== "undefined") {
    const web3 = new Web3(window.ethereum);
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await web3.eth.getAccounts();
      const userAddress = accounts[0];
      document.getElementById("wallet").textContent = userAddress;

      const staking = new web3.eth.Contract(stakingABI, stakingAddress);
      const totalStaked = await staking.methods.totalStaked().call();
      const rewardPool = await staking.methods.rewardPool().call();

      document.getElementById("staked").textContent = (totalStaked / 1e18).toFixed(2) + " G3X";
      document.getElementById("rewards").textContent = (rewardPool / 1e18).toFixed(2) + " G3X";

    } catch (err) {
      alert("Connection failed: " + err.message);
    }
  } else {
    alert("Please install MetaMask.");
  }
});
