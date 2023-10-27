export function isMoblie(): boolean {
    const sUserAgent = navigator.userAgent.toLowerCase()
    if (/ipad|iphone|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile/.test(sUserAgent)) {
        return true
    }
    return false
}

export function SeekDom(seekClass: string, e: any): any {
    let ele = e.target
    let b = true
    while (b && ele) {
        if (ele.nodeName === 'BODY') {
            b = false
            return null
        } else if (ele.classList.contains(seekClass)) {
            b = false
            return ele
        }
        ele = ele.parentNode
    }
    return null
}
