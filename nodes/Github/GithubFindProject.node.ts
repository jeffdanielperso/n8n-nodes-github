import {
  IExecuteFunctions
} from 'n8n-core';
import {
  ICredentialDataDecryptedObject,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription
} from 'n8n-workflow';
import { ConfigCredentials } from './Credentials/ConfigCredentials';
import { FindProjectConfiguration, FindProjectProperty } from './FindProject/FindProjectConfiguration';
import { IProject, IProjectColumn } from './Project/ProjectEntities';
import { getColumn, getProject } from './Project/ProjectRequests';
import * as _ from 'lodash';
import { getOrCreateArrayAndPush } from './Common/GenericFunctions';
import { IFindProjectOperationResponse } from './FindProject/FindProjectResponse';

export class GithubFindProject implements INodeType {
  description: INodeTypeDescription = {
      displayName: 'Github Find Project',
      name: 'githubFindProject',
      icon: 'file:github.svg',
      group: ['transform'],
      version: 1,
      description: 'Github Find Project from Column',
      defaults: {
          name: 'Github Find Project',
          color: '#1A82e2',
      },
      inputs: ['main'],
      outputs: ['main'],
      credentials: ConfigCredentials,
      properties: [
        ...FindProjectConfiguration
      ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];
    const credentials = this.getCredentials('oAuth2Api') as ICredentialDataDecryptedObject;
    const length = items.length as unknown as number;

		let item: INodeExecutionData;
		for (let i = 0; i < length; i++) {
      item = items[i];
      const columnId = this.getNodeParameter(FindProjectProperty.ColumnId, i) as number;

      const column = await getColumn.call(this, credentials, columnId) as IProjectColumn;
      if (column) {
        const projectId: number = +(_.last(column.project_url.split('/')) as string);
        const project = await getProject.call(this, credentials, projectId) as IProject;
        if (project) {
          const newItem: INodeExecutionData = {
            json: JSON.parse(JSON.stringify(item.json))
          }
          if (item.binary !== undefined) {
            newItem.binary = item.binary;
          }
          
          newItem.json['github-find-project'] = getOrCreateArrayAndPush<IFindProjectOperationResponse>(
            newItem.json['github-find-project'] as [],
            {
              "id": projectId,
              "name": project.name
            });

          returnData.push(newItem);
        }
      }
    }

    return this.prepareOutputData(returnData);
  }
}
