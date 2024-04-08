import { EthereumTransactionSigner } from './ethereum-signer';
import { SolanaTransactionSigner } from './solana-signer';

export interface TxSigner {
  // eslint-disable-next-line no-unused-vars
  signTransaction(privateKey: string, unsignedTx: string): Promise<string>;
}

export class TxSignerFactory {
  static getSigner(protocol: string): TxSigner {
    switch (protocol) {
      case 'ethereum':
        return new EthereumTransactionSigner();
      case 'solana':
        return new SolanaTransactionSigner();
      // other cases for additional protocols
      default:
        throw new Error('Unsupported protocol');
    }
  }
}
