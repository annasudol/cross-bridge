import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers } from "ethers";

async function signMessage(from: string, to: string, value: number, chainId: number, symbol: string, validator: SignerWithAddress) {
    const messageHash = ethers.utils.solidityKeccak256(
        ["address", "address", "uint256", "uint256", "uint256", "string"],
        [from, to, value, 0, chainId, symbol]
    );
    const messageArray = ethers.utils.arrayify(messageHash);
    const rawSignature = await validator.signMessage(messageArray);
    return rawSignature;
}

export default signMessage;