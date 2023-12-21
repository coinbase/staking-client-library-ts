import { EthereumTransactionSigner } from "./ethereum_signer";

export interface TxSigner {
  // eslint-disable-next-line no-unused-vars
  signTransaction(privateKey: string, unsignedTx: string): Promise<string>;
}

export class TxSignerFactory {
  static getSigner(protocol: string): TxSigner {
    switch (protocol) {
      case "ethereum":
        return new EthereumTransactionSigner();
      // other cases for additional protocols
      default:
        throw new Error("Unsupported protocol");
    }
  }
}
