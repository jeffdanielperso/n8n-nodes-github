import { createHmac } from 'crypto';
import { IExecuteFunctions } from 'n8n-core';
import { INodeExecutionData, INodeType, INodeTypeDescription } from 'n8n-workflow';
import { VerifySignatureConfiguration } from './Nodes/VerifySignature/VerifySignatureConfiguration';
import { prepareItem } from './Common/GenericFunctions';
import { IVerifySignatureResponse } from './Nodes/VerifySignature/VerifySignatureResponse';
import { NodeColor, NodeGroup, NodeIcon, NodeMain } from './Common/Configuration';
import { VerifySignNode, VerifySignProperty } from './Nodes/VerifySignature/VerifySignatureEnums';

export class GithubVerifySignature implements INodeType {
  description: INodeTypeDescription = {
      displayName: VerifySignNode.DisplayName,
      name: VerifySignNode.Name,
      icon: NodeIcon,
      group: [ NodeGroup ],
      version: 1,
      description: VerifySignNode.Description,
      defaults: {
          name: VerifySignNode.DisplayName,
          color: NodeColor,
      },
      inputs: [ NodeMain ],
      outputs: [ NodeMain, NodeMain ],
      outputNames: [ VerifySignNode.OutputTrue, VerifySignNode.OutputFalse ],
      properties: VerifySignatureConfiguration
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
		const returnDataVerified: INodeExecutionData[] = [];
		const returnDataWrong: INodeExecutionData[] = [];
		const length = items.length as unknown as number;

		let item: INodeExecutionData;
		for (let i = 0; i < length; i++) {
			item = items[i];
      const signature = this.getNodeParameter(VerifySignProperty.XHubSignature256, i) as string;
      const secretToken = this.getNodeParameter(VerifySignProperty.SecretToken, i) as string;
      const body = this.getNodeParameter(VerifySignProperty.Body, i) as string;
			const hmac = `sha256=${createHmac('SHA256', secretToken).update(body).digest('hex')}`;
      const isVerified = hmac === signature;

      const newItem = prepareItem<IVerifySignatureResponse>(
        item,
        VerifySignNode.OutputName,
        {
          hmac: hmac,
          verified: isVerified
        }
      );
      if (isVerified) {
        returnDataVerified.push(newItem);
      } else {
        returnDataWrong.push(newItem);
      }
		}
		return [returnDataVerified, returnDataWrong];
  }
}
