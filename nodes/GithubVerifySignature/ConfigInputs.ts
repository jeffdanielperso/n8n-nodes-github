import { INodeProperties } from "n8n-workflow"
import { IConfigurationMap } from "../Common/Interfaces"

export enum VerifySignProperty {
  XHubSignature256 = 'verifySignSignature256',
  SecretToken = 'verifySignSecretToken',
  Body = 'verifySignBody'
}

const VerifySignPropertyDisplay = {
  XHubSignature256: 'Hash Signature (256)',
  XHubSignature256Desc: 'Hash signature received as header \'X-Hub-Signature-256\' supposely from Github',
  SecretToken: 'Secret token',
  SecretTokenDesc: 'Secret token shared with Github',
  Body: 'Payload/Body',
  BodyDesc: 'Github creates a Hash Signature for each Payload/Body'
}

const VerifySignConfigElementBase: INodeProperties = {
  displayName: '',
  name: '',
  type: 'string',
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

export const ConfigInputs = [
  VerifySignConfig[VerifySignProperty.XHubSignature256],
  VerifySignConfig[VerifySignProperty.SecretToken],
  VerifySignConfig[VerifySignProperty.Body],
]