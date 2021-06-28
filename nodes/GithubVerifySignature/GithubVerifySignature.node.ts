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
    const signature = this.getNodeParameter(VerifySignProperty.XHubSignature256, 0) as string;
    const secretToken = this.getNodeParameter(VerifySignProperty.SecretToken, 0) as string;
    const body = this.getNodeParameter(VerifySignProperty.Body, 0) as string;

    console.log(JSON.stringify(signature, null, ' '));
    console.log(JSON.stringify(secretToken, null, ' '));
    console.log(JSON.stringify(body, null, ' '));

    let response: any;
    return [this.helpers.returnJsonArray(response)];
  }
}
