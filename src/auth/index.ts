import { readFileSync } from "fs";
import { JWK, JWS } from "node-jose";

const legacyPemHeader = "-----BEGIN ECDSA Private Key-----";
const legacyPemFooter = "-----END ECDSA Private Key-----";
const pemHeader = "-----BEGIN EC PRIVATE KEY-----";
const pemFooter = "-----END EC PRIVATE KEY-----";

/**
 * Build a JWT for the specified service and URI.
 * @param service The name of the service.
 * @param uri The URI for which the JWT is to be generated.
 * @returns The generated JWT.
 */
export const buildJWT = async (
  url: string,
  method = "GET",
): Promise<string> => {
  const keyFile = readFileSync(".coinbase_cloud_api_key.json", {
    encoding: "utf8",
  });
  const apiKey: APIKey = JSON.parse(keyFile);

  const pemPrivateKey = extractPemKey(apiKey.privateKey);
  let privateKey: JWK.Key;

  try {
    privateKey = await JWK.asKey(pemPrivateKey, "pem");
    if (privateKey.kty !== "EC") {
      throw new Error("Not an EC private key");
    }
  } catch (error) {
    throw new Error(`jwt: Could not decode or parse private key. ${error}`);
  }

  const header = {
    alg: "ES256",
    kid: apiKey.name,
    typ: "JWT",
    nonce: nonce(),
  };

  const audience = getAudience(url);
  const uri = `${method} ${url.substring(8)}`;

  const claims: APIKeyClaims = {
    sub: apiKey.name,
    iss: "coinbase-cloud",
    nbf: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 60, // +1 minute
    aud: [audience],
    uri,
  };

  const payload = Buffer.from(JSON.stringify(claims)).toString("utf8");

  try {
    const result = await JWS.createSign(
      { format: "compact", fields: header },
      privateKey,
    )
      .update(payload)
      .final();

    return result as unknown as string;
  } catch (err) {
    throw new Error(`jwt: Failed to sign JWT. ${err}`);
  }
};

/**
 * Represents the API key details.
 */
interface APIKey {
  /** The name of the API key. */
  name: string;
  /** The private key string. */
  privateKey: string;
}

/**
 * Represents the claims included in the JWT.
 */
interface APIKeyClaims {
  /** Audience of the JWT. */
  aud: string[];
  /** Subject of the JWT. Typically the identifier of the API key. */
  sub: string;
  /** Expiry time of the JWT in seconds. */
  exp: number;
  /** Time before which the JWT is not valid in seconds. */
  nbf: number;
  /** Issuer of the JWT. */
  iss: string;
  /** URI claim for the JWT. */
  uri: string;
}

/**
 * Extracts the PEM key from the given string.
 * @param privateKeyString The string for the private key from which to extract the PEM key.
 * @returns The extracted PEM key body.
 */
const extractPemKey = (privateKeyString: string): string => {
  // Remove all newline characters
  privateKeyString = privateKeyString.replace(/\n/g, "");

  // If the string starts with the standard PEM header and footer, return as is.
  if (
    privateKeyString.startsWith(pemHeader) &&
    privateKeyString.endsWith(pemFooter)
  ) {
    return privateKeyString;
  }

  // If the string starts with the legacy header and footer, replace them.
  const regex = new RegExp(
    `^${legacyPemHeader}([\\s\\S]+?)${legacyPemFooter}$`,
  );

  const match = privateKeyString.match(regex);
  if (match && match[1]) {
    return pemHeader + match[1].trim() + pemFooter;
  }

  // The string does not match any of the expected formats.
  throw new Error("wrong format of API private key");
};

/**
 * Generates a nonce of 16 numeric characters.
 * @returns The generated nonce.
 */
const nonce = (): string => {
  const range = "0123456789";
  let result = "";
  for (let i = 0; i < 16; i++) {
    result += range.charAt(Math.floor(Math.random() * range.length));
  }

  return result;
};

const getAudience = (url: string): string => {
  if (url.indexOf("staking") > -1) {
    return "staking";
  } else if (url.indexOf("rewards") > -1) {
    return "rewards-reporting";
  } else {
    return "unknown";
  }
};

export const customFetch = async (
  input: RequestInfo | URL,
  init?: RequestInit | undefined,
): Promise<Response> => {
  // remove query parameters
  let url = input.toString();
  if (url.indexOf("?") > -1) {
    url = url.substring(0, url.indexOf("?"));
  }
  const token = await buildJWT(url, init?.method);
  const params = {
    ...init,
    headers: {
      ...init?.headers,
      Authorization: `Bearer ${token}`,
    },
  };

  return fetch(input, params);
};
