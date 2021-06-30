import { INodeProperties } from "n8n-workflow"
import { NodeTypes } from "../Common/Enums"
import { IConfigurationMap } from "../Common/Interfaces"

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

enum VerifySignPropertyDisplay {
  XHubSignature256 = 'Hash Signature (256)',
  XHubSignature256Desc = 'Hash signature received as header \'X-Hub-Signature-256\' supposely from Github',
  SecretToken = 'Secret token',
  SecretTokenDesc = 'Secret token shared with Github',
  Body = 'Payload/Body',
  BodyDesc = 'Github creates a Hash Signature for each Payload/Body'
}

const VerifySignConfigElementBase: INodeProperties = {
  displayName: '',
  name: '',
  type: NodeTypes.String,
  default: '',
  required: true
}

const VerifySignConfig: IConfigurationMap = {
  [VerifySignProperty.XHubSignature256]: {
    ...VerifySignConfigElementBase,
    displayName: VerifySignPropertyDisplay.XHubSignature256,
    name: VerifySignProperty.XHubSignature256,
    description: VerifySignPropertyDisplay.XHubSignature256Desc
  },
  [VerifySignProperty.SecretToken]: {
    ...VerifySignConfigElementBase,
    displayName: VerifySignPropertyDisplay.SecretToken,
    name: VerifySignProperty.SecretToken,
    description: VerifySignPropertyDisplay.SecretTokenDesc
  },
  [VerifySignProperty.Body]: {
    ...VerifySignConfigElementBase,
    displayName: VerifySignPropertyDisplay.Body,
    name: VerifySignProperty.Body,
    description: VerifySignPropertyDisplay.BodyDesc
  }
}

export const VerifySignatureConfiguration: INodeProperties[] = [
  VerifySignConfig[VerifySignProperty.XHubSignature256],
  VerifySignConfig[VerifySignProperty.SecretToken],
  VerifySignConfig[VerifySignProperty.Body],
]