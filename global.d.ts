declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: string
    }
}
interface Window {
    okexchain: any
    ethereum: any
}
declare global {
    interface Window {
        okexchain: any
        ethereum: any
    }
}
