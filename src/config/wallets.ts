import {WalletConfig} from "../type"
export const WALLET_TYPE_NAMES = {
    Nativ3: 'Nativ3',
    MetaMask: 'MetaMask'
}
export declare type WalletType = 'Nativ3' | 'MetaMask'
export const WalletList = [
    {
        type: 'Nativ3',
        name: 'Nativ3 Wallet',
        logo: 'data:image/png;base64,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',
        description: 'Connect to your Nativ3 Wallet',
        download: '',
        logining: false
    },
    {
        type: 'MetaMask',
        name: 'MetaMask',
        logo: 'data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjMzIiB2aWV3Qm94PSIwIDAgMzUgMzMiIHdpZHRoPSIzNSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iLjI1Ij48cGF0aCBkPSJtMzIuOTU4MiAxLTEzLjEzNDEgOS43MTgzIDIuNDQyNC01LjcyNzMxeiIgZmlsbD0iI2UxNzcyNiIgc3Ryb2tlPSIjZTE3NzI2Ii8+PGcgZmlsbD0iI2UyNzYyNSIgc3Ryb2tlPSIjZTI3NjI1Ij48cGF0aCBkPSJtMi42NjI5NiAxIDEzLjAxNzE0IDkuODA5LTIuMzI1NC01LjgxODAyeiIvPjxwYXRoIGQ9Im0yOC4yMjk1IDIzLjUzMzUtMy40OTQ3IDUuMzM4NiA3LjQ4MjkgMi4wNjAzIDIuMTQzNi03LjI4MjN6Ii8+PHBhdGggZD0ibTEuMjcyODEgMjMuNjUwMSAyLjEzMDU1IDcuMjgyMyA3LjQ2OTk0LTIuMDYwMy0zLjQ4MTY2LTUuMzM4NnoiLz48cGF0aCBkPSJtMTAuNDcwNiAxNC41MTQ5LTIuMDc4NiAzLjEzNTggNy40MDUuMzM2OS0uMjQ2OS03Ljk2OXoiLz48cGF0aCBkPSJtMjUuMTUwNSAxNC41MTQ5LTUuMTU3NS00LjU4NzA0LS4xNjg4IDguMDU5NzQgNy40MDQ5LS4zMzY5eiIvPjxwYXRoIGQ9Im0xMC44NzMzIDI4Ljg3MjEgNC40ODE5LTIuMTYzOS0zLjg1ODMtMy4wMDYyeiIvPjxwYXRoIGQ9Im0yMC4yNjU5IDI2LjcwODIgNC40Njg5IDIuMTYzOS0uNjEwNS01LjE3MDF6Ii8+PC9nPjxwYXRoIGQ9Im0yNC43MzQ4IDI4Ljg3MjEtNC40NjktMi4xNjM5LjM2MzggMi45MDI1LS4wMzkgMS4yMzF6IiBmaWxsPSIjZDViZmIyIiBzdHJva2U9IiNkNWJmYjIiLz48cGF0aCBkPSJtMTAuODczMiAyOC44NzIxIDQuMTU3MiAxLjk2OTYtLjAyNi0xLjIzMS4zNTA4LTIuOTAyNXoiIGZpbGw9IiNkNWJmYjIiIHN0cm9rZT0iI2Q1YmZiMiIvPjxwYXRoIGQ9Im0xNS4xMDg0IDIxLjc4NDItMy43MTU1LTEuMDg4NCAyLjYyNDMtMS4yMDUxeiIgZmlsbD0iIzIzMzQ0NyIgc3Ryb2tlPSIjMjMzNDQ3Ii8+PHBhdGggZD0ibTIwLjUxMjYgMjEuNzg0MiAxLjA5MTMtMi4yOTM1IDIuNjM3MiAxLjIwNTF6IiBmaWxsPSIjMjMzNDQ3IiBzdHJva2U9IiMyMzM0NDciLz48cGF0aCBkPSJtMTAuODczMyAyOC44NzIxLjY0OTUtNS4zMzg2LTQuMTMxMTcuMTE2N3oiIGZpbGw9IiNjYzYyMjgiIHN0cm9rZT0iI2NjNjIyOCIvPjxwYXRoIGQ9Im0yNC4wOTgyIDIzLjUzMzUuNjM2NiA1LjMzODYgMy40OTQ2LTUuMjIxOXoiIGZpbGw9IiNjYzYyMjgiIHN0cm9rZT0iI2NjNjIyOCIvPjxwYXRoIGQ9Im0yNy4yMjkxIDE3LjY1MDctNy40MDUuMzM2OS42ODg1IDMuNzk2NiAxLjA5MTMtMi4yOTM1IDIuNjM3MiAxLjIwNTF6IiBmaWxsPSIjY2M2MjI4IiBzdHJva2U9IiNjYzYyMjgiLz48cGF0aCBkPSJtMTEuMzkyOSAyMC42OTU4IDIuNjI0Mi0xLjIwNTEgMS4wOTEzIDIuMjkzNS42ODg1LTMuNzk2Ni03LjQwNDk1LS4zMzY5eiIgZmlsbD0iI2NjNjIyOCIgc3Ryb2tlPSIjY2M2MjI4Ii8+PHBhdGggZD0ibTguMzkyIDE3LjY1MDcgMy4xMDQ5IDYuMDUxMy0uMTAzOS0zLjAwNjJ6IiBmaWxsPSIjZTI3NTI1IiBzdHJva2U9IiNlMjc1MjUiLz48cGF0aCBkPSJtMjQuMjQxMiAyMC42OTU4LS4xMTY5IDMuMDA2MiAzLjEwNDktNi4wNTEzeiIgZmlsbD0iI2UyNzUyNSIgc3Ryb2tlPSIjZTI3NTI1Ii8+PHBhdGggZD0ibTE1Ljc5NyAxNy45ODc2LS42ODg2IDMuNzk2Ny44NzA0IDQuNDgzMy4xOTQ5LTUuOTA4N3oiIGZpbGw9IiNlMjc1MjUiIHN0cm9rZT0iI2UyNzUyNSIvPjxwYXRoIGQ9Im0xOS44MjQyIDE3Ljk4NzYtLjM2MzggMi4zNTg0LjE4MTkgNS45MjE2Ljg3MDQtNC40ODMzeiIgZmlsbD0iI2UyNzUyNSIgc3Ryb2tlPSIjZTI3NTI1Ii8+PHBhdGggZD0ibTIwLjUxMjcgMjEuNzg0Mi0uODcwNCA0LjQ4MzQuNjIzNi40NDA2IDMuODU4NC0zLjAwNjIuMTE2OS0zLjAwNjJ6IiBmaWxsPSIjZjU4NDFmIiBzdHJva2U9IiNmNTg0MWYiLz48cGF0aCBkPSJtMTEuMzkyOSAyMC42OTU4LjEwNCAzLjAwNjIgMy44NTgzIDMuMDA2Mi42MjM2LS40NDA2LS44NzA0LTQuNDgzNHoiIGZpbGw9IiNmNTg0MWYiIHN0cm9rZT0iI2Y1ODQxZiIvPjxwYXRoIGQ9Im0yMC41OTA2IDMwLjg0MTcuMDM5LTEuMjMxLS4zMzc4LS4yODUxaC00Ljk2MjZsLS4zMjQ4LjI4NTEuMDI2IDEuMjMxLTQuMTU3Mi0xLjk2OTYgMS40NTUxIDEuMTkyMSAyLjk0ODkgMi4wMzQ0aDUuMDUzNmwyLjk2Mi0yLjAzNDQgMS40NDItMS4xOTIxeiIgZmlsbD0iI2MwYWM5ZCIgc3Ryb2tlPSIjYzBhYzlkIi8+PHBhdGggZD0ibTIwLjI2NTkgMjYuNzA4Mi0uNjIzNi0uNDQwNmgtMy42NjM1bC0uNjIzNi40NDA2LS4zNTA4IDIuOTAyNS4zMjQ4LS4yODUxaDQuOTYyNmwuMzM3OC4yODUxeiIgZmlsbD0iIzE2MTYxNiIgc3Ryb2tlPSIjMTYxNjE2Ii8+PHBhdGggZD0ibTMzLjUxNjggMTEuMzUzMiAxLjEwNDMtNS4zNjQ0Ny0xLjY2MjktNC45ODg3My0xMi42OTIzIDkuMzk0NCA0Ljg4NDYgNC4xMjA1IDYuODk4MyAyLjAwODUgMS41Mi0xLjc3NTItLjY2MjYtLjQ3OTUgMS4wNTIzLS45NTg4LS44MDU0LS42MjIgMS4wNTIzLS44MDM0eiIgZmlsbD0iIzc2M2UxYSIgc3Ryb2tlPSIjNzYzZTFhIi8+PHBhdGggZD0ibTEgNS45ODg3MyAxLjExNzI0IDUuMzY0NDctLjcxNDUxLjUzMTMgMS4wNjUyNy44MDM0LS44MDU0NS42MjIgMS4wNTIyOC45NTg4LS42NjI1NS40Nzk1IDEuNTE5OTcgMS43NzUyIDYuODk4MzUtMi4wMDg1IDQuODg0Ni00LjEyMDUtMTIuNjkyMzMtOS4zOTQ0eiIgZmlsbD0iIzc2M2UxYSIgc3Ryb2tlPSIjNzYzZTFhIi8+PHBhdGggZD0ibTMyLjA0ODkgMTYuNTIzNC02Ljg5ODMtMi4wMDg1IDIuMDc4NiAzLjEzNTgtMy4xMDQ5IDYuMDUxMyA0LjEwNTItLjA1MTloNi4xMzE4eiIgZmlsbD0iI2Y1ODQxZiIgc3Ryb2tlPSIjZjU4NDFmIi8+PHBhdGggZD0ibTEwLjQ3MDUgMTQuNTE0OS02Ljg5ODI4IDIuMDA4NS0yLjI5OTQ0IDcuMTI2N2g2LjExODgzbDQuMTA1MTkuMDUxOS0zLjEwNDg3LTYuMDUxM3oiIGZpbGw9IiNmNTg0MWYiIHN0cm9rZT0iI2Y1ODQxZiIvPjxwYXRoIGQ9Im0xOS44MjQxIDE3Ljk4NzYuNDQxNy03LjU5MzIgMi4wMDA3LTUuNDAzNGgtOC45MTE5bDIuMDAwNiA1LjQwMzQuNDQxNyA3LjU5MzIuMTY4OSAyLjM4NDIuMDEzIDUuODk1OGgzLjY2MzVsLjAxMy01Ljg5NTh6IiBmaWxsPSIjZjU4NDFmIiBzdHJva2U9IiNmNTg0MWYiLz48L2c+PC9zdmc+',
        description: 'Connect to your MetaMask Wallet',
        download: 'https://metamask.io/download/',
        logining: false
    }
] as Array<WalletConfig>
const map = {} as {[key in WalletType]: WalletConfig}
WalletList.forEach((wallet) => {
    map[wallet.type] = wallet
})
export const WalletsMap = map
export const ConfigErrorList = ['ACTION_REJECTED', '用户取消了操作', 'User rejected the request.', 'May not specify default MetaMask chain.']
export const CLASS_NAMES = {
    N3_WALLET: 'n3-wallet',
    N3_HIDDEN: 'n3-hidden',
    N3_SHOW: 'n3-show',
    N3_BG: 'n3-wallet-bg',
    N3_WARP: 'n3-wallet-warp',
    N3_LIST: 'n3-list-wallet',
    N3_ITEM: "item-wallet",
    N3_PRIVIDER_WARP: 'wallet-provider-wrapper',
    N3_PRIVIDER_LOGO: 'wallet-provider-logo',
    N3_PRIVIDER_NAME: 'wallet-provider-name',
    N3_PRIVIDER_DESC: 'wallet-provider-description',
    N3_PRIVIDER_LOADING: 'wallet-provider-loading',
}
export const WALLET_EVENTS = {
    PUBLIC_WALLET: 'publicWallet',
    CLOSE_MODAL: 'closeModal',
    OPEN_MODAL: 'openModal',
    ACCOUNTS_CHANGED: 'accountsChanged',
    ACCOUNT_CHANGED: 'accountChanged',
    CHAIN_CHANGED: 'chainChanged'
}
