export enum VerifySignNode {
  Name = 'githubVerifySignature',
  DisplayName = 'Github Verify Signature',
  Description = 'Verify the received signature with \'secret_token\'',
  OutputTrue = 'Verified',
  OutputFalse = 'Wrong',
  OutputName = 'github-verify-signature'
}

export enum VerifySignProperty {
  XHubSignature256 = 'verifySignSignature256',
  SecretToken = 'verifySignSecretToken',
  Body = 'verifySignBody'
}

export enum VerifySignPropertyDisplay {
  XHubSignature256 = 'Hash Signature (256)',
  XHubSignature256Desc = 'Hash signature received as header \'X-Hub-Signature-256\' supposely from Github',
  SecretToken = 'Secret token',
  SecretTokenDesc = 'Secret token shared with Github',
  Body = 'Payload/Body',
  BodyDesc = 'Github creates a Hash Signature for each Payload/Body'
}
