import { INodeProperties } from "n8n-workflow"
import { NodeTypes } from "../../Common/Enums"
import { IConfigurationMap } from "../../Common/Interfaces"
import { VerifySignProperty, VerifySignPropertyDisplay } from "./VerifySignatureEnums"

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
