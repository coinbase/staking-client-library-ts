import { expect } from 'chai';
import sinon from 'sinon';
import proxyquire from 'proxyquire';
import { JWK, JWS } from 'node-jose';

describe('BuildJWT', () => {
  let readFileSyncStub: sinon.SinonStub;
  let asKeyStub: sinon.SinonStub;
  let signStub: sinon.SinonStub;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let buildJWT: any;

  beforeEach(() => {
    readFileSyncStub = sinon.stub();
    asKeyStub = sinon.stub(JWK, 'asKey');
    signStub = sinon.stub(JWS, 'createSign');

    buildJWT = proxyquire('./jwt', {
      fs: { readFileSync: readFileSyncStub },
    }).buildJWT;
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should build a JWT with provided API key and private key', async () => {
    const url = 'https://api.example.com/resource';
    const method = 'POST';
    const apiKeyName = 'test-api-key';
    const apiPrivateKey =
      '-----BEGIN EC PRIVATE KEY-----\ntest-private-key\n-----END EC PRIVATE KEY-----';
    const pemPrivateKey =
      '-----BEGIN EC PRIVATE KEY-----test-private-key-----END EC PRIVATE KEY-----';
    const privateKey = { kty: 'EC' };

    asKeyStub.resolves(privateKey);
    signStub.returns({
      update: sinon.stub().returnsThis(),
      final: sinon.stub().resolves('signed-jwt'),
    });

    const jwt = await buildJWT(url, method, apiKeyName, apiPrivateKey);

    expect(asKeyStub.calledOnceWithExactly(pemPrivateKey, 'pem')).to.be.true;
    expect(signStub.calledOnce).to.be.true;
    expect(jwt).to.equal('signed-jwt');
  });

  it('should build a JWT with API key from file', async () => {
    const url = 'https://api.example.com/resource';
    const method = 'POST';
    const apiKey = {
      name: 'test-api-key',
      privateKey:
        '-----BEGIN EC PRIVATE KEY-----test-private-key-----END EC PRIVATE KEY-----',
    };
    const pemPrivateKey =
      '-----BEGIN EC PRIVATE KEY-----test-private-key-----END EC PRIVATE KEY-----';
    const privateKey = { kty: 'EC' };

    readFileSyncStub.returns(JSON.stringify(apiKey));
    asKeyStub.resolves(privateKey);
    signStub.returns({
      update: sinon.stub().returnsThis(),
      final: sinon.stub().resolves('signed-jwt'),
    });

    const jwt = await buildJWT(url, method);

    expect(
      readFileSyncStub.calledOnceWithExactly('.coinbase_cloud_api_key.json', {
        encoding: 'utf8',
      }),
    ).to.be.true;
    expect(asKeyStub.calledOnceWithExactly(pemPrivateKey, 'pem')).to.be.true;
    expect(signStub.calledOnce).to.be.true;
    expect(jwt).to.equal('signed-jwt');
  });

  it('should throw an error if private key is not EC', async () => {
    const url = 'https://api.example.com/resource';
    const method = 'POST';
    const apiKeyName = 'test-api-key';
    const apiPrivateKey =
      '-----BEGIN EC PRIVATE KEY-----\ntest-private-key\n-----END EC PRIVATE KEY-----';
    const pemPrivateKey =
      '-----BEGIN EC PRIVATE KEY-----test-private-key-----END EC PRIVATE KEY-----';
    const privateKey = { kty: 'RSA' };

    asKeyStub.resolves(privateKey);

    try {
      await buildJWT(url, method, apiKeyName, apiPrivateKey);
      expect.fail('Expected buildJWT to throw an error');
    } catch (error) {
      expect((error as Error).message).to.contain('Not an EC private key');
    }

    expect(asKeyStub.calledOnceWithExactly(pemPrivateKey, 'pem')).to.be.true;
    expect(signStub.notCalled).to.be.true;
  });

  it('should throw an error if private key cannot be parsed', async () => {
    const url = 'https://api.example.com/resource';
    const method = 'POST';
    const apiKeyName = 'test-api-key';
    const apiPrivateKey =
      '-----BEGIN EC PRIVATE KEY-----\ntest-private-key\n-----END EC PRIVATE KEY-----';
    const pemPrivateKey =
      '-----BEGIN EC PRIVATE KEY-----test-private-key-----END EC PRIVATE KEY-----';

    asKeyStub.rejects(new Error('Invalid key'));

    try {
      await buildJWT(url, method, apiKeyName, apiPrivateKey);
      expect.fail('Expected buildJWT to throw an error');
    } catch (error) {
      expect((error as Error).message).to.include(
        'jwt: Could not decode or parse private key. Error: Invalid key',
      );
    }

    expect(asKeyStub.calledOnceWithExactly(pemPrivateKey, 'pem')).to.be.true;
    expect(signStub.notCalled).to.be.true;
  });

  it('should throw an error if JWT signing fails', async () => {
    const url = 'https://api.example.com/resource';
    const method = 'POST';
    const apiKeyName = 'test-api-key';
    const apiPrivateKey =
      '-----BEGIN EC PRIVATE KEY-----\ntest-private-key\n-----END EC PRIVATE KEY-----';
    const pemPrivateKey =
      '-----BEGIN EC PRIVATE KEY-----test-private-key-----END EC PRIVATE KEY-----';
    const privateKey = { kty: 'EC' };

    asKeyStub.resolves(privateKey);
    signStub.returns({
      update: sinon.stub().returnsThis(),
      final: sinon.stub().rejects(new Error('Signing failed')),
    });

    try {
      await buildJWT(url, method, apiKeyName, apiPrivateKey);
      expect.fail('Expected buildJWT to throw an error');
    } catch (error) {
      expect((error as Error).message).to.include(
        'jwt: Failed to sign JWT. Error: Signing failed',
      );
    }

    expect(asKeyStub.calledOnceWithExactly(pemPrivateKey, 'pem')).to.be.true;
    expect(signStub.calledOnce).to.be.true;
  });
});
