import {
  IExecuteFunctions
} from 'n8n-core';
import {
  ICredentialDataDecryptedObject,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription
} from 'n8n-workflow';
import { Property, Resource } from './Common/Enums';
import { ConfigCredentials } from './Credentials/ConfigCredentials';
import { IssueConfiguration } from './Issue/IssueConfiguration';
import { orchestrateIssueOperation } from './Issue/IssueOrchestrator';
import { ProjectConfiguration } from './Project/ProjectConfiguration';
import { orchestrateProjectOperation } from './Project/ProjectOrchestrator';
import { ConfigResource } from './Common/Configuration';
import { getOrCreateArrayAndPush } from './Common/GenericFunctions';

export class GithubAction implements INodeType {
  description: INodeTypeDescription = {
      displayName: 'Github Action',
      name: 'githubAction',
      icon: 'file:github.svg',
      group: ['transform'],
      version: 1,
      description: 'Github Action',
      defaults: {
          name: 'Github Action',
          color: '#1A82e2',
      },
      inputs: ['main'],
      outputs: ['main'],
      credentials: ConfigCredentials,
      properties: [
        ConfigResource,
        ...IssueConfiguration,
        ...ProjectConfiguration,
      ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const credentials = this.getCredentials('oAuth2Api') as ICredentialDataDecryptedObject;
    const resource = this.getNodeParameter(Property.Resource, 0) as string;
    let response: any;

    if (resource === Resource.Issue) {
      await orchestrateIssueOperation.call(this, credentials);
    } else if (resource === Resource.Project) {
      response = await orchestrateProjectOperation.call(this, credentials);
    }

    return [this.helpers.returnJsonArray(response)];
    //return this.prepareOutputData(items);
  }
}
