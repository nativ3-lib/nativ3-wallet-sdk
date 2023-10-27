import './index.scss';
import { Network, Wallet, WalletParams, WalletConfig } from "./type";
import { WALLET_TYPE_NAMES, WalletList, WalletsMap, WALLET_EVENTS } from "./config/wallets";
import EventEmitter from "./emitter";
export { WalletList, WalletsMap, WALLET_EVENTS, WALLET_TYPE_NAMES };
export type { Wallet, WalletParams, WalletConfig, Network };
export default class N3Wallet extends EventEmitter {
    private chainId;
    private n3Wallet;
    private n3Instance;
    private walletDom;
    private params;
    private walletList;
    constructor();
    static get Instance(): any;
    private _initDom;
    private _initEvent;
    private _walletEvent;
    private _loginN3wallet;
    private _loginMateMask;
    private _initWalletEvent;
    init(params: WalletParams): Promise<true | undefined>;
    getChainId(): Promise<number>;
    switchChain(network: Network): Promise<number | string | void>;
    addChain(network: Network): Promise<number | string | void>;
    addToken(token: {
        token_address: string;
        token_symbol: string;
        token_decimals: string;
        token_icon: string;
    }): Promise<number | string | void>;
    openWallet(): void;
    closeWallet(): void;
    getProvider(): any;
    destroy(): Promise<void>;
    disconnect(): Promise<void>;
}
