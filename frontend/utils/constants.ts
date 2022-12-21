export const TOKEN_ETH_ADDRESS = '0xf121DaF9eDdF06F3f7DD56952F6BFd000BFffA61'
export const TOKEN_BSC_ADDRESS = '0x11E47a0465D3933E372fD4A2854e897934Fd14d7'
export const TOKEN_MATIC_ADDRESS = '0xD46B25771dbcd034772D0f2C5dECE94Cd3684435'

export const BRIDGE_ETH_ADDRESS = '0xA097413a69B55fe1aB8D6F0a4612CdAaA21dc725'
export const BRIDGE_MATIC_ADDRESS = '0xa2D60f2A08fF806446b971b19bAa71677c47a415'
export const BRIDGE_BSC_ADDRESS = '0xE88702C4B257f30a5929329191ae58A011f35172';

export const token_address = (id?: number): string => {
    const address: { [_id: number]: string } = {
        5: TOKEN_ETH_ADDRESS,
        80001: TOKEN_MATIC_ADDRESS
    }
    return id ? address[id] : ''
};

export const bridge_address = (id: number): string => {
    const address: { [_id: number]: string } = {
        5: BRIDGE_ETH_ADDRESS,
        80001: BRIDGE_MATIC_ADDRESS
    }
    return address[id]
};
