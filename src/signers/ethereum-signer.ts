import { TransactionFactory } from '@ethereumjs/tx';
import { bytesToHex } from '@ethereumjs/util';
import { TxSigner } from './txsigner';

export class EthereumTransactionSigner implements TxSigner {
  async signTransaction(
    privateKey: string,
    unsignedTx: string,
  ): Promise<string> {
    let transaction = TransactionFactory.fromSerializedData(
      Buffer.from(unsignedTx, 'hex'),
    );

    const decodedPrivateKey = Buffer.from(privateKey, 'hex');

    let signedTx = transaction.sign(decodedPrivateKey);

    const verifiedSignature = signedTx.verifySignature();

    if (!verifiedSignature) {
      throw new Error('Produced an invalid signature!');
    }

    return bytesToHex(signedTx.serialize());
  }
}
