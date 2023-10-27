export default {
  local: {
    WALLET_URL: '//www.baidu.com'
  },
  dev: {
    WALLET_URL: '//www.baidu.com'
  },
  test: {
    WALLET_URL: '//www.baidu.com'
  },
  prod: {
    WALLET_URL: '//www.baidu.com'
  }
} as {
    [key: string]: {
        WALLET_URL: string
    }
}
