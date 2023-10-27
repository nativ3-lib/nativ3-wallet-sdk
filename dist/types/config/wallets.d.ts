import { WalletConfig } from "../type";
export declare const WALLET_TYPE_NAMES: {
    Nativ3: string;
    MetaMask: string;
};
export declare type WalletType = 'Nativ3' | 'MetaMask';
export declare const WalletList: WalletConfig[];
export declare const WalletsMap: {
    Nativ3: WalletConfig;
    MetaMask: WalletConfig;
};
export declare const ConfigErrorList: string[];
export declare const CLASS_NAMES: {
    N3_WALLET: string;
    N3_HIDDEN: string;
    N3_SHOW: string;
    N3_BG: string;
    N3_WARP: string;
    N3_LIST: string;
    N3_ITEM: string;
    N3_PRIVIDER_WARP: string;
    N3_PRIVIDER_LOGO: string;
    N3_PRIVIDER_NAME: string;
    N3_PRIVIDER_DESC: string;
    N3_PRIVIDER_LOADING: string;
};
export declare const WALLET_EVENTS: {
    PUBLIC_WALLET: string;
    CLOSE_MODAL: string;
    OPEN_MODAL: string;
    ACCOUNTS_CHANGED: string;
    ACCOUNT_CHANGED: string;
    CHAIN_CHANGED: string;
};
