import { WalletType } from "../config/wallets";
export interface Wallet {
    loginType: string;
    account: string;
    provider: any;
    userInfo: {
        name: string;
        email: string;
    } | null;
    client: any | null;
}
export interface WalletParams {
    buildEnv?: '' | 'development' | 'production';
    defaultChainId?: string;
}
export interface Network {
    chain_id: number | string;
    chain_name: string;
    chain_icon?: string;
    rpc_public: string;
    block_explorer: string;
    native_token_name?: string;
    native_token_symbol: string;
}
export interface WalletConfig {
    type: WalletType;
    name: string;
    logo: string;
    description: string;
    download: string;
    logining: boolean;
}
