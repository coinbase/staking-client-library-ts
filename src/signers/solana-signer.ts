import { Transaction, Account } from '@solana/web3.js';
import * as bs58 from 'bs58';
import { TxSigner } from './txsigner';

const TRANSACTION_SERIALIZE_CONFIG = {
  requireAllSignatures: false,
  verifySignatures: true,
};

export class SolanaTransactionSigner implements TxSigner {
  async signTransaction(
    privateKey: string,
    unsignedTx: string,
  ): Promise<string> {
    const txn = bs58.decode(unsignedTx);
    const tx = Transaction.from(txn);

    const secretKey = bs58.decode(privateKey);

    const sender = new Account(secretKey);

    tx.sign(sender);

    return bs58.encode(tx.serialize(TRANSACTION_SERIALIZE_CONFIG));
  }
}
