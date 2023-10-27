
## Available Scripts

In the project directory, you can run:

### Example
`npm local` or `yarn local`

Runs the app in the development mode.\
Open [http://localhost:8888](http://localhost:8888) to view it in the browser.


### Build
`npm run build` or `yarn build`

### Install
`npm install @nativ3/wallet-sdk` or `yarn add @nativ3/wallet-sdk`

### Import
```javascript
import N3Wallet, {WALLET_EVENTS, Wallet} from '@nativ3/wallet-sdk'
```

### Use Wallet Sdk

```javascript
import N3Wallet, {WALLET_EVENTS} from '@nativ3/wallet-sdk'
const initSDKEvent = () => {
    N3Wallet.Instance.on(WALLET_EVENTS.PUBLIC_WALLET, (wallet) => {
        accountDom.innerText = `account: ${wallet.account}`
        initWalletEvent(wallet)
    })
    N3Wallet.Instance.on(WALLET_EVENTS.CLOSE_MODAL, () => {
        console.log(WALLET_EVENTS.CLOSE_MODAL)
    })
    N3Wallet.Instance.on(WALLET_EVENTS.OPEN_MODAL, () => {
        console.log(WALLET_EVENTS.OPEN_MODAL)
    })
    N3Wallet.Instance.on(WALLET_EVENTS.CHAIN_CHANGED, (chainId) => {
        console.log(`${WALLET_EVENTS.CHAIN_CHANGED} = ${chainId}`)
    })
    N3Wallet.Instance.on(WALLET_EVENTS.ACCOUNT_CHANGED, (account) => {
        console.log(`${WALLET_EVENTS.ACCOUNT_CHANGED} = ${account}`)
    })
    N3Wallet.Instance.on(WALLET_EVENTS.ACCOUNTS_CHANGED, (accountArray) => {
        console.log(`${WALLET_EVENTS.ACCOUNTS_CHANGED} = ${accountArray}`)
    })
}
const initPage = async () => {
    accountDom.innerText = `Loading...`
    initSDKEvent()
    const result = await N3Wallet.Instance.init({
        buildEnv: 'development',
        defaultChainId: '806'
    })
    console.log(`Init ${result ? 'Successful!' : 'Fail!'}`)
}
initPage()
```

### N3Wallet Methods
```javascript
export default class N3Wallet extends EventEmitter {
    static get Instance(): any;
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
```

### Provider

```javascript
const provider = N3Wallet.Instance.getProvider()
// or
N3Wallet.Instance.on(WALLET_EVENTS.PUBLIC_WALLET, (wallet: Wallet) => {
    const provider = wallet.provider
    // wallet = {
    //     loginType: '',
    //     account: '',
    //     provider: window.ethereum,
    //     userInfo: {
    //         name: string
    //         email: string
    //     } | null,
    //     client: any | null
    // }
})
```

### Wallet
```javascript
export interface Wallet {
    loginType: string
    account: string[]
    provider: any
    userInfo: {
        name: string
        email: string
    } | null
    client: any | null
}
```


### WALLET_EVENTS
```javascript
const WALLET_EVENTS = {
    PUBLIC_WALLET: 'publicWallet',
    CLOSE_MODAL: 'closeModal',
    OPEN_MODAL: 'openModal',
    ACCOUNTS_CHANGED: 'accountsChanged', // account array
    ACCOUNT_CHANGED: 'accountChanged', // Current account using wallet
    CHAIN_CHANGED: 'chainChanged'
}
```

