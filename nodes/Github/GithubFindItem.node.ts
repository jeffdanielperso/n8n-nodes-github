import { IExecuteFunctions } from 'n8n-core';
import {
  ICredentialDataDecryptedObject,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription
} from 'n8n-workflow';
import { ConfigCredentials } from './Credentials/ConfigCredentials';
import { FindItemConfiguration, FindItemNode, FindItemOperationMapping } from './FindItem/FindItemConfiguration';
import { prepareItem } from './Common/GenericFunctions';
import { NodeColor, NodeGroup, NodeIcon, NodeMain } from './Common/Configuration';
import { IFindItemBaseResponse, IFindItemErrorResponse } from './FindItem/FindItemResponse';
import { Property } from './Common/Enums';

export class GithubFindItem implements INodeType {
  description: INodeTypeDescription = {
      displayName: FindItemNode.DisplayName,
      name: FindItemNode.Name,
      icon: NodeIcon,
      group: [ NodeGroup ],
      version: 1,
      description: FindItemNode.Description,
      defaults: {
          name: FindItemNode.DisplayName,
          color: NodeColor,
      },
      inputs: [ NodeMain ],
      outputs: [ NodeMain ],
      credentials: ConfigCredentials,
      properties: [
        ...FindItemConfiguration
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
      const resource = this.getNodeParameter(Property.Resource, i) as string;
      const operation = this.getNodeParameter(Property.Operation, i) as string;

      const newItem = prepareItem<IFindItemBaseResponse | IFindItemErrorResponse>(
        item,
        FindItemNode.OutputName,
        await FindItemOperationMapping[resource][operation].call(this, credentials, i)
      )
      returnData.push(newItem);
    }
    return this.prepareOutputData(returnData);
  }
}
