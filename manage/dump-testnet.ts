import { Address, Cell, TonClient } from 'ton'

const address = Address.parseFriendly('EQBeheXfUfJLKGFDLQ2I62Y9YyG7RpOt36Bqf7HvCyIMIWEq').address;

(async () => {
    const client = new TonClient({
        endpoint: 'https://testnet.tonhubapi.com/jsonRPC'
    });

    let state = await client.getContractState(address);
    let data = Cell.fromBoc(state.data!)[0].beginParse();
    console.log({
        owner: data.readAddress(),
        version: data.readUint(32),
        config: data.readRef().readRemaining().getTopUppedArray().toString('utf-8'),
    });

    let result = (await client.callGetMethod(address, 'get_config')).stack;
    let version = parseInt(result[0][1], 16);
    console.log('Version: ', version, 'config: ', Buffer.from(result[1][1].object.data.b64, 'base64').toString('utf-8'));
})()
