import './index.scss'
// @ts-ignore
import Torus from "@n3-wallet/torus-embed/dist/torus.umd.min"
import {Network, Wallet, WalletParams, WalletConfig} from "./type"
import {WALLET_TYPE_NAMES, WalletList, WalletsMap, CLASS_NAMES, ConfigErrorList, WALLET_EVENTS} from "./config/wallets"
import EventEmitter from "./emitter"
import {isMoblie, SeekDom} from "./lib/util"
const torus = new Torus({
    apiKey: "torus-default",
    buttonPosition: "bottom-right"
})

const LOGIN_TYPE_KEY = "NATIV3_LOGIN_TYPE"
const _showLoading = (walletDom: HTMLDivElement, wallet: WalletConfig) => {
    wallet.logining = true
    const loadingDom = walletDom.querySelector(`.${CLASS_NAMES.N3_PRIVIDER_LOADING}`)
    loadingDom && loadingDom.classList.remove(CLASS_NAMES.N3_HIDDEN)
}
const _hideLoading = (walletDom: HTMLDivElement, wallet: WalletConfig) => {
    wallet.logining = false
    const loadingDom = walletDom.querySelector(`.${CLASS_NAMES.N3_PRIVIDER_LOADING}`)
    loadingDom && loadingDom.classList.add(CLASS_NAMES.N3_HIDDEN)
}
export {WalletList, WalletsMap, WALLET_EVENTS, WALLET_TYPE_NAMES}
export type {Wallet, WalletParams, WalletConfig, Network}
export default class N3Wallet extends EventEmitter{
    private chainId: number
    private n3Wallet: Wallet | null
    private n3Instance: any
    private walletDom: HTMLDivElement
    private params: WalletParams
    private walletList: Array<WalletConfig>
    constructor() {
        super()
        this.n3Instance = this
        this.chainId = 0
        this.n3Wallet = null
        this.params = {}
        this.walletList = [...WalletList]
        this.walletDom = document.createElement('div') as HTMLDivElement
        this._initDom()
        this._initEvent()
    }
    static get Instance() {
        // @ts-ignore
        if (!this.n3Instance) {
            // @ts-ignore
            this.n3Instance = new N3Wallet()
        }
        // @ts-ignore
        return this.n3Instance
    }
    private _initDom() {
        this.walletDom.setAttribute('class', CLASS_NAMES.N3_WALLET)
        document.body.appendChild(this.walletDom)
        const itemListHtml = this.walletList.map((item, idx) => {
            return (`
            <div type="${item.type}" idx="${idx}" class='${CLASS_NAMES.N3_ITEM}'>
                <div class='${CLASS_NAMES.N3_PRIVIDER_WARP}'>
                    <img class='${CLASS_NAMES.N3_PRIVIDER_LOGO}' src='${item.logo}'/>
                    <span class='${CLASS_NAMES.N3_PRIVIDER_NAME}'>${item.name}</span>
                    <span class='${CLASS_NAMES.N3_PRIVIDER_DESC}'>
                        ${item.description}
                        <i class='${CLASS_NAMES.N3_PRIVIDER_LOADING} ${!item.logining ? CLASS_NAMES.N3_HIDDEN : ''}'>
                          <svg t="1698054174255" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1173" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M500.914065 101.849403m-101.850403 0a101.850403 101.850403 0 1 0 203.700806 0 101.850403 101.850403 0 1 0-203.700806 0Z" p-id="1174"></path><path d="M254.163511 187.508901m-96.031438 0a96.031437 96.031437 0 1 0 192.062875 0 96.031437 96.031437 0 1 0-192.062875 0Z" p-id="1175"></path><path d="M120.713293 381.395765m-90.210472 0a90.210471 90.210471 0 1 0 180.420943 0 90.210471 90.210471 0 1 0-180.420943 0Z" p-id="1176"></path><path d="M118.049308 609.722427m-84.390505 0a84.390506 84.390506 0 1 0 168.781011 0 84.390506 84.390506 0 1 0-168.781011 0Z" p-id="1177"></path><path d="M224.002687 786.127394m-78.570539 0a78.57054 78.57054 0 1 0 157.141079 0 78.57054 78.57054 0 1 0-157.141079 0Z" p-id="1178"></path><path d="M418.803546 889.708787m-72.750574 0a72.750574 72.750574 0 1 0 145.501148 0 72.750574 72.750574 0 1 0-145.501148 0Z" p-id="1179"></path><path d="M626.851327 877.857856m-66.931608 0a66.931608 66.931608 0 1 0 133.863216 0 66.931608 66.931608 0 1 0-133.863216 0Z" p-id="1180"></path><path d="M800.334311 762.483532m-61.110642 0a61.110642 61.110642 0 1 0 122.221283 0 61.110642 61.110642 0 1 0-122.221283 0Z" p-id="1181"></path><path d="M889.516788 587.14856m-55.290676 0a55.290676 55.290676 0 1 0 110.581352 0 55.290676 55.290676 0 1 0-110.581352 0Z" p-id="1182"></path><path d="M888.602793 408.896604m-49.47071 0a49.47071 49.47071 0 1 0 98.94142 0 49.47071 49.47071 0 1 0-98.94142 0Z" p-id="1183"></path><path d="M818.663203 260.047476m-43.650744 0a43.650744 43.650744 0 1 0 87.301488 0 43.650744 43.650744 0 1 0-87.301488 0Z" p-id="1184"></path><path d="M708.18485 159.990063m-37.829778 0a37.829778 37.829778 0 1 0 75.659557 0 37.829778 37.829778 0 1 0-75.659557 0Z" p-id="1185"></path></svg>
                        </i>
                    </span>
                </div>
            </div>
            `)
        }).join('')
        this.walletDom.innerHTML = `
          <span class='${CLASS_NAMES.N3_BG}'></span>
          <div class='${CLASS_NAMES.N3_WARP}'>
            <div class='${CLASS_NAMES.N3_LIST}'>
            ${itemListHtml}
            <div>
          </div>`
    }
    private _initEvent() {
        const eventType = isMoblie() ? 'touchstart' : 'click'
        const bgDom = this.walletDom.querySelector(`.${CLASS_NAMES.N3_BG}`)
        bgDom && bgDom.addEventListener(eventType, () => {
            this.closeWallet()
        })
        const listDom = this.walletDom.querySelector(`.${CLASS_NAMES.N3_LIST}`)
        listDom && listDom.addEventListener(eventType, (e) => {
            this._walletEvent(e)
        })
    }
    private async _walletEvent(e: any) {
        try {
            const walletDom = SeekDom(CLASS_NAMES.N3_ITEM, e)
            if (walletDom) {
                const wallet = this.walletList[walletDom.getAttribute('idx') || 0]
                if (wallet.logining) return
                _showLoading(walletDom, wallet)
                if (wallet.type === WALLET_TYPE_NAMES.Nativ3) {
                    this.n3Wallet = await this._loginN3wallet(wallet, false)
                } else {
                    this.n3Wallet = await this._loginMateMask(wallet, false)
                }
                _hideLoading(walletDom, wallet)
                this._initWalletEvent()
                this.closeWallet()
            }
        } catch (e: any) {
            console.error(e)
        }
    }
    private _loginN3wallet(wallet: WalletConfig, autoLogin: boolean): Promise<Wallet> {
        return new Promise(async (resolve, reject) => {
            try {
                !torus.isInitialized && await torus.init({
                    buildEnv: this.params.buildEnv || "production",
                    enableLogging: true,
                    network: {
                        chainId: this.params.defaultChainId || 806
                    },
                    showTorusButton: false,
                    mfaLevel: "optional",
                    useWalletConnect: true
                })
                if (autoLogin) {
                    await torus.getUserInfo()
                }
                await torus.login()
                const userInfo = await torus.getUserInfo()
                localStorage.setItem(LOGIN_TYPE_KEY, wallet.type)
                const accounts = await torus.provider.request({method: 'eth_requestAccounts'})
                torus.showTorusButton()
                torus.provider.on(WALLET_EVENTS.ACCOUNTS_CHANGED, (res: Array<any>) => {
                    if (!res || !res.length) {
                        localStorage.removeItem(LOGIN_TYPE_KEY)
                        torus.hideTorusButton()
                    } else {
                        torus.showTorusButton()
                    }
                })
                resolve({
                    loginType: wallet.type,
                    userInfo: userInfo,
                    account: (accounts[0] || '').toLowerCase(),
                    provider: torus.provider,
                    client: torus
                } as Wallet)
            } catch (e) {
                reject(e)
            }
        })
    }
    private _loginMateMask(wallet: WalletConfig, autoLogin: boolean): Promise<Wallet> {
        return new Promise(async (resolve, reject) => {
            try {
                if (!window.ethereum) {
                    window.open(wallet.download, '_blank')
                    reject(new Error('Not found window.ethereum'))
                    return
                }
                if (autoLogin) {
                    await window.ethereum.request({method: 'eth_requestAccounts'})
                }
                await window.ethereum?.enable()
                localStorage.setItem(LOGIN_TYPE_KEY, wallet.type)
                const accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
                resolve({
                    loginType: wallet.type,
                    userInfo: null,
                    account: (accounts[0] || '').toLowerCase(),
                    provider: window.ethereum,
                    client: null
                } as Wallet)
            } catch (e) {
                reject(e)
            }
        })
    }
    private _initWalletEvent() {
        if (!this.n3Wallet?.provider) return
        this.n3Wallet?.provider.on(WALLET_EVENTS.ACCOUNTS_CHANGED, (res: string[]) => {
            const accountArray = res.map((item: string) => item.toLowerCase()) || ['']
            this.emit(WALLET_EVENTS.ACCOUNTS_CHANGED, accountArray)
            this.emit(WALLET_EVENTS.ACCOUNT_CHANGED, accountArray[0])
        })
        this.n3Wallet?.provider.on(WALLET_EVENTS.CHAIN_CHANGED, (chainId: string) => {
            this.emit(WALLET_EVENTS.CHAIN_CHANGED, ~~chainId)
        })
        this.n3Wallet?.provider.request({
            method: 'eth_chainId'
        }).then((chainId: string) => {
            this.emit(WALLET_EVENTS.CHAIN_CHANGED, ~~chainId)
        })
        this.emit(WALLET_EVENTS.ACCOUNT_CHANGED, this.n3Wallet?.account)
        this.emit(WALLET_EVENTS.PUBLIC_WALLET, this.n3Wallet)
    }
    async init(params: WalletParams) {
       try {
           this.params = params
           const loginType = localStorage.getItem(LOGIN_TYPE_KEY)
           if (!loginType) {
               return
           }
           // @ts-ignore
           const wallet = WalletsMap[loginType]
           if (!wallet) return
           if (wallet.type !== WALLET_TYPE_NAMES.Nativ3) {
               window.ethereum?.on(WALLET_EVENTS.ACCOUNTS_CHANGED, (res: Array<any>) => {
                   if (!res || !res.length) {
                       localStorage.removeItem(LOGIN_TYPE_KEY)
                   }
               })
           }
           if (wallet.logining) return
           if (wallet.type === WALLET_TYPE_NAMES.Nativ3) {
               this.n3Wallet = await this._loginN3wallet(wallet, true)
           } else {
               this.n3Wallet = await this._loginMateMask(wallet, true)
           }
           this._initWalletEvent()
           return true
       } catch (e: any) {
           return true
       }
    }
    getChainId(): Promise<number> {
        return new Promise((resolve) => {
            const provider = this.getProvider()
            if (!provider){
                resolve(0)
                return
            }
            provider.request({
                method: 'eth_chainId'
            }).then((chainId: string) => {
                resolve(~~chainId)
            }).catch((e: any) => {
                resolve(0)
            })
        })
    }
    switchChain(network: Network): Promise<number | string | void> {
        return new Promise((resolve, reject) => {
            const provider = this.getProvider()
            if (!provider){
                reject('Not init')
                return
            }
            const hexChainId = `0x${Number(network.chain_id).toString(16)}`
            const errorFn = (error:any) => {
                if (error.code === 4001 || ConfigErrorList.includes(error.message)) {
                    reject(4001)
                    return
                }
                this.addChain(network).then(() => {
                    resolve()
                }).catch((error) => {
                    if (error.code === 4001 || ConfigErrorList.includes(error.message)) {
                        reject(4001)
                        return
                    }
                    reject(error)
                })
            }
            const sendParams = {
                method: "wallet_switchEthereumChain",
                params: {
                    chainId: hexChainId
                }
            }
            if (this.n3Wallet?.client) {
                provider.sendAsync(
                    sendParams,
                    (err: Error) => {
                        if (err) {
                            errorFn(err)
                            return
                        }
                        this.emit(WALLET_EVENTS.CHAIN_CHANGED, ~~network.chain_id)
                        resolve()
                    }
                )
            } else {
                provider.request(sendParams).then(() => {
                    this.emit(WALLET_EVENTS.CHAIN_CHANGED, ~~network.chain_id)
                    resolve()
                }).catch((error: any) => {
                    errorFn(error)
                })
            }
        })
    }
    addChain(network: Network): Promise<number | string | void> {
        const hexChainId = `0x${Number(network.chain_id).toString(16)}`
        return new Promise((resolve, reject) => {
            const provider = this.getProvider()
            if (!provider){
                reject('Not init')
                return
            }
            const addParams = {
                method: 'wallet_addEthereumChain',
                params: [{
                    chainId: hexChainId,
                    // @ts-ignore
                    chainName: network.chain_name,
                    rpcUrls: [network.rpc_public],
                    blockExplorerUrls: [network.block_explorer],
                    nativeCurrency: {
                        name: network.native_token_symbol,
                        symbol: network.native_token_symbol,
                        decimals: 18
                    }
                }]
            }
            if (this.n3Wallet?.client) {
                provider.sendAsync(
                    addParams,
                    (err: Error) => {
                        if (err) {
                            reject(err)
                            return
                        }
                        resolve()
                    })
            } else {
                provider.request(addParams).then(() => {
                    resolve()
                }).catch((e: any) => {
                    reject(e)
                })
            }
        })
    }
    addToken(token: {
        token_address: string,
        token_symbol: string,
        token_decimals: string,
        token_icon: string
    }): Promise<number | string | void> {
        return new Promise((resolve, reject) => {
            const provider = this.getProvider()
            if (!provider){
                reject('Not init')
                return
            }
            const params = {
                method: 'wallet_watchAsset',
                params: {
                    type: 'ERC20',
                    options: {
                        address: token.token_address,
                        symbol: token.token_symbol,
                        decimals: token.token_decimals,
                        image: token.token_icon
                    }
                }
            }
            if (this.n3Wallet?.client) {
                provider.sendAsync(
                    params,
                    (err: Error) => {
                        if (err) {
                            reject(err)
                            return
                        }
                        resolve()
                    })
            } else {
                provider.request(params).then(() => {
                    resolve()
                }).catch((e: any) => {
                    reject(e)
                })
            }
        })
    }
    openWallet() {
        if (!this.walletDom) return
        this.walletDom.classList.add(CLASS_NAMES.N3_SHOW)
        this.emit(WALLET_EVENTS.OPEN_MODAL)
    }
    closeWallet() {
        if (!this.walletDom) return
        this.walletDom.classList.remove(CLASS_NAMES.N3_SHOW)
        this.emit(WALLET_EVENTS.CLOSE_MODAL)
    }
    getProvider() {
        return this.n3Wallet?.provider || null
    }
    async destroy() {
        this.walletDom && this.walletDom.parentNode?.removeChild(this.walletDom)
        await this.disconnect()
    }
    async disconnect() {
        try {
            sessionStorage.removeItem(LOGIN_TYPE_KEY)
            this.emit(WALLET_EVENTS.ACCOUNT_CHANGED, '')
            if (this.n3Wallet?.client) {
                await this.n3Wallet.client.logout()
                return
            }
        } catch (e) {
            console.error(e)
        }
    }
}
