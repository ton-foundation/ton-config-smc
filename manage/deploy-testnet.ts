import { Address, Cell, contractAddress, StateInit, toNano } from 'ton';
import { readFileSync } from 'fs';
import { BN } from 'bn.js';
import qrcode from 'qrcode-terminal';
import qs from 'qs';

const owner = Address.parseFriendly('kQB74ererQXuWClKBzI-LUHYxBtFbxHlwRb_k67I7TEdmThB').address;

const codeCell = Cell.fromBoc(readFileSync('./build/config.cell'))[0];

const configCell = new Cell();
configCell.bits.writeBuffer(Buffer.from('https://ton.org/global-config.json', 'utf-8'));

const dataCell = new Cell();
dataCell.bits.writeAddress(owner);
dataCell.bits.writeUint(0, 32);
dataCell.withReference(configCell);

const address = contractAddress({
    workchain: 0,
    initialCode: codeCell,
    initialData: dataCell
});

const initCell = new Cell();
new StateInit({
    code: codeCell,
    data: dataCell,
}).writeTo(initCell);

let link = 'https://test.tonhub.com/transfer/' + address.toFriendly() + '?' + qs.stringify({
    text: 'Deploy contract',
    amount: toNano(0.01).toString(10),
    init: initCell.toBoc({ idx: false }).toString('base64')
});
console.log('Deploy: ' + link);
qrcode.generate(link, { small: true }, (code) => {
    console.log(code)
});
