import Aepp from '@aeternity/aepp-sdk/es/ae/aepp'

const aeternity = {
    client: null,
    address: null,
    height: null,
    balance: null
}

aeternity.initBase = async () => {
    console.log("initBase")
    try {
        console.log(Aepp);
        aeternity.client = await Aepp().catch(e => console.error("initBase",e))
        return aeternity.initProvider()
    } catch (e) {
        console.warn("initBase", e)
        return false
    }
}

aeternity.getWalletWindow = async () => {
    const iframe = document.createElement('iframe')
    iframe.src = 'https://base.aepps.com' // https://stage-identity.aepps.com/
    iframe.style.display = 'none'
    document.body.appendChild(iframe)
    await new Promise(resolve => {
        const handler = ({data}) => {
            if (data.method !== 'ready') return
            window.removeEventListener('message', handler)
            resolve()
        }
        window.addEventListener('message', handler)
    })
    return iframe.contentWindow
}

aeternity.initLedger = async () => {
    console.log("initLedger")
    try {
        aeternity.client = await Aepp({
            parent: await aeternity.getWalletWindow()
        })
        return aeternity.initProvider()
    } catch (e) {
        console.warn("initLedger", e)
        return false
    }
}

aeternity.initProvider = async () => {
    console.log("initProvider")

    try {
        aeternity.address = await aeternity.client.address()
        aeternity.height = await aeternity.client.height()
        aeternity.balance = await aeternity.client.balance(aeternity.address)

        console.log("aeternity", aeternity)

        const contractSource = "contract Identity =\n" +
            "  record state = {x : int}\n" +
            "  \n" +
            "  function init() = {x = 0}\n" +
            "  \n" +
            "  stateful function main(x : int) =\n" +
            "   put(state{x = x})\n" +
            "   state.x";

        console.log(contractSource)

        const contract = await aeternity.client.getContractInstance(contractSource, {contractAddress: "ct_2fGNgjtLxMxnD5z4e5EYog1tJ9bVcvCqHSG2WaKBKhnyg9B2Am"});
        console.log(contract)
        const call = await contract.methods.main(1)
        console.log(call)

        return true
    } catch (e) {
        console.warn("initProvider", e)
        return false
    }
}

export default aeternity
