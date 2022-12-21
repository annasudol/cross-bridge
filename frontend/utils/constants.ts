export const TOKEN_ETH_ADDRESS = '0xD445A2Ab9e782Aa0b9f18dC815dEa4324BE25158'
export const TOKEN_BSC_ADDRESS = '0x291846B5bcA36e24232B54e4232537cced31614a'
export const TOKEN_MATIC_ADDRESS = '0x37b75bb10EFD59026D45C8b84bD780189BcD2936'

export const BRIDGE_ETH_ADDRESS = '0x844b76173E34b17257c16878De57c1BcD8a77B93'
export const BRIDGE_MATIC_ADDRESS = '0xCCb28635ec4662cfaEbFe9A9D3fbAceea9AB7110'
export const BRIDGE_BSC_ADDRESS = '0x8d11D5879446483fE856f5B2B7747A3e27551660';

export const token_address = (id: number): string => {
    const address: { [id: number]: string } = {
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
