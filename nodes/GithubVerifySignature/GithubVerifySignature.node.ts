import { set } from 'lodash';
import { createHmac } from 'crypto';
import { IExecuteFunctions } from 'n8n-core';
import { INodeExecutionData, INodeType, INodeTypeDescription } from 'n8n-workflow';
import { ConfigInputs, VerifySignProperty } from './ConfigInputs';

export class GithubVerifySignature implements INodeType {
  description: INodeTypeDescription = {
      displayName: 'Github Verify Signature',
      name: 'githubVerifySignature',
      icon: 'file:githubVerifySignature.svg',
      group: ['transform'],
      version: 1,
      description: 'Check ',
      defaults: {
          name: 'Github Verify Signature',
          color: '#1A82e2',
      },
      inputs: ['main'],
      outputs: ['main', 'main'],
      properties: [
        ...ConfigInputs
      ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const length = items.length as unknown as number;

		let item: INodeExecutionData;
		for (let i = 0; i < length; i++) {
			item = items[i];
      const signature = this.getNodeParameter(VerifySignProperty.XHubSignature256, i);
      const secretToken = this.getNodeParameter(VerifySignProperty.SecretToken, i) as string;
      const body = this.getNodeParameter(VerifySignProperty.Body, i) as string;
			const hmac = `sha256=${createHmac('SHA256', secretToken).update(body).digest('hex')}`;
      const isVerified = hmac === signature;

			const newItem: INodeExecutionData = {
        json: JSON.parse(JSON.stringify(item.json))
      }
			if (item.binary !== undefined) {
				newItem.binary = item.binary;
			}

			set(newItem, 'json.github-verify-signature.hmac', hmac);
			set(newItem, 'json.github-verify-signature.verified', isVerified);

			returnData.push(newItem);
		}
		return this.prepareOutputData(returnData);
  }
}
