import { resolve } from 'path'
import fs from 'fs'
import pkg from '../package.json'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript2 from 'rollup-plugin-typescript2'
import { IOptions } from 'rollup-plugin-typescript2/dist/ioptions'
import babel from '@rollup/plugin-babel'
import replace from 'rollup-plugin-replace'
import json from '@rollup/plugin-json'
import sass from 'rollup-plugin-sass'
import terser from '@rollup/plugin-terser'
import serve, {RollupServeOptions} from 'rollup-plugin-serve'
import config from "./config"
const NODE_ENV = process.env.NODE_ENV || 'dev'
const WALLET_URL = config[NODE_ENV].WALLET_URL
const isProd = NODE_ENV === 'prod'
const isLocal = NODE_ENV === 'local'

const removeAllFiles = (pathStr: string) => {
    if (!fs.existsSync(pathStr)) return
    fs.readdirSync(pathStr).forEach(file => {
        const str = `${pathStr}/${file}`
        if (fs.lstatSync(str).isFile()) {
            fs.unlinkSync(str)
        } else if (fs.lstatSync(str).isDirectory()) {
            removeAllFiles(str)
            fs.rmdirSync(str)
        }
    })
}
const removeFiles = () => {
    return {
        name: 'removeFiles',
        buildStart() {
            const filePath = resolve(__dirname, '../dist')
            removeAllFiles(filePath)
        }
    }
}
const rollupConfig = {
    input: resolve(__dirname, '../src/index.ts'),
    treeshake: true,
    output: [
        {
            name: 'N3Wallet',
            file: pkg.main,
            format: 'cjs',
            sourcemap: !isProd,
        },
        {
            name: 'N3Wallet',
            file: pkg.module,
            format: 'esm',
            sourcemap: !isProd,
        },
        {
            name: 'N3Wallet',
            file: pkg.umd,
            format: 'umd',
            sourcemap: !isProd,
        }
    ],
    plugins: [
        removeFiles(),
        json(),
        replace({
            BUILD_ENV: JSON.stringify(NODE_ENV),
            WALLET_URL: JSON.stringify(WALLET_URL),
        }),
        nodeResolve(),
        commonjs(),
        typescript2({
            tsConfig: resolve(__dirname, 'tsconfig.json'),
            useTsconfigDeclarationDir: true,
        } as Partial<IOptions>),
        babel(),
        sass({
            insert: true,
            output: 'dist/index.css'
        }),
        isProd && terser({
            compress: {
                drop_debugger: true,
                drop_console: true
            },
            mangle: true,
        }),
    ]
}
if (isLocal) {
    rollupConfig.plugins.push(serve({
        open: true,
        openPage: '/index.html',
        verbose: true,
        contentBase: '',
        host: 'localhost',
        port: 8888,
    } as RollupServeOptions))
}
export default rollupConfig
