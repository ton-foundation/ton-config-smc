import { Address, Cell, contractAddress, StateInit, toNano } from 'ton';
import { readFileSync } from 'fs';
import qrcode from 'qrcode-terminal';
import qs from 'qs';

const address = Address.parseFriendly('EQBeheXfUfJLKGFDLQ2I62Y9YyG7RpOt36Bqf7HvCyIMIWEq').address;

const configCell = new Cell();
configCell.bits.writeBuffer(Buffer.from('https://ton.org/testnet-config.json', 'utf-8'));

const dataCell = new Cell();
dataCell.bits.writeUint(0x75636667, 32);
dataCell.withReference(configCell);


let link = 'https://test.tonhub.com/transfer/' + address.toFriendly() + '?' + qs.stringify({
    text: 'Update contract',
    amount: toNano(0.01).toString(10),
    bin: dataCell.toBoc().toString('base64')
});
console.log('Update: ' + link);
qrcode.generate(link, { small: true }, (code) => {
    console.log(code)
});
