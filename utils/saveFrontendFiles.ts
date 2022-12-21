import fs from 'fs';
import { config } from 'hardhat';
function saveFrontendFiles(contractName: string, contractAddress: string) {
    fs.appendFile(
        `../frontend/constants.ts`,
        `\n export const ${contractName} = '${contractAddress}'`,
        (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("\nFile Contents of file after append:",
                    fs.readFileSync(`${config.paths.artifacts}/contracts/contractAddress.ts`, "utf8"));

            }
        });
    fs.appendFile(
        `./.env`,
        `\n ${contractName}='${contractAddress}'`,
        (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("\nFile Contents of file after append:",
                    fs.readFileSync(`.env`, "utf8"));

            }
        });

}

export default saveFrontendFiles