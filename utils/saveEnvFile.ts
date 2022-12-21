import fs from 'fs';

function saveEnvFile(contractName: string, contractAddress: string) {
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

export default saveEnvFile