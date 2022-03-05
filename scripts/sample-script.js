
const hre = require("hardhat");

async function main() {

  const VelorexMembersClubNFT = await hre.ethers.getContractFactory("VelorexMembersClubNFT");
  const velorexMembersClubNFT = await VelorexMembersClubNFT.deploy("Velorex Members Club", "VMCNFT");

  await velorexMembersClubNFT.deployed();

  console.log("VelorexMembersClubNFT deployed to:", velorexMembersClubNFT.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
