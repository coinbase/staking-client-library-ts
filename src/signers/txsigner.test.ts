import { expect } from 'chai';
import { TxSignerFactory } from './txsigner';
import { EthereumTransactionSigner } from './ethereum-signer';
import { SolanaTransactionSigner } from './solana-signer';

describe('TxSignerFactory', () => {
  it('should return an EthereumTransactionSigner for the "ethereum" protocol', () => {
    const signer = TxSignerFactory.getSigner('ethereum');

    expect(signer).to.be.instanceOf(EthereumTransactionSigner);
  });

  it('should return a SolanaTransactionSigner for the "solana" protocol', () => {
    const signer = TxSignerFactory.getSigner('solana');

    expect(signer).to.be.instanceOf(SolanaTransactionSigner);
  });

  it('should throw an error for an unsupported protocol', () => {
    expect(() => TxSignerFactory.getSigner('unsupported')).to.throw(
      'Unsupported protocol',
    );
  });
});
