import { IExecuteFunctions } from 'n8n-core';
import {
  ICredentialDataDecryptedObject,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription
} from 'n8n-workflow';
import { ConfigCredentials } from './Credentials/ConfigCredentials';
import { FindProjectConfiguration, FindProjectNode, FindProjectProperty } from './FindProject/FindProjectConfiguration';
import { IProject, IProjectColumn } from './Project/ProjectEntities';
import { getColumn, getProject } from './Project/ProjectRequests';
import * as _ from 'lodash';
import { prepareItem } from './Common/GenericFunctions';
import { IFindProjectOperationResponse } from './FindProject/FindProjectResponse';
import { NodeColor, NodeGroup, NodeIcon, NodeMain } from './Common/Configuration';
import { getRegexMatchOfColumnUrl, getRegexMatchOfProjectUrl } from './ExtractData/ExtractDataActions';

export class GithubFindProject implements INodeType {
  description: INodeTypeDescription = {
      displayName: FindProjectNode.DisplayName,
      name: FindProjectNode.Name,
      icon: NodeIcon,
      group: [ NodeGroup ],
      version: 1,
      description: FindProjectNode.Description,
      defaults: {
          name: FindProjectNode.DisplayName,
          color: NodeColor,
      },
      inputs: [ NodeMain ],
      outputs: [ NodeMain ],
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
        const regexpResult = getRegexMatchOfProjectUrl(column.project_url);
        if (regexpResult) {
          const projectId: number = parseInt(regexpResult[1]);
          const project = await getProject.call(this, credentials, projectId) as IProject;
          if (project) {
            const newItem = prepareItem<IFindProjectOperationResponse>(
              item,
              FindProjectNode.OutputName,
              {
                "id": projectId,
                "name": project.name
              }
            )
            returnData.push(newItem);
          }
        }
      }
    }

    return this.prepareOutputData(returnData);
  }
}
