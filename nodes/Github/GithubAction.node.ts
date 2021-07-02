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
import { NodeColor, NodeGroup, NodeIcon, NodeMain } from './Common/Configuration';
import { ActionConfiguration } from './Nodes/Action/ActionConfiguration';
import { IActionIssueResponse } from './Nodes/Action/ActionResponses.issue';
import { IActionProjectResponse } from './Nodes/Action/ActionResponses.project';
import { actionOrchestration } from './Nodes/Action/ActionOrchestration';
import { ActionNode } from './Nodes/Action/ActionEnums';
import { prepareItem } from './Common/GenericFunctions';

export class GithubAction implements INodeType {
  description: INodeTypeDescription = {
      displayName: ActionNode.DisplayName,
      name: ActionNode.Name,
      icon: NodeIcon,
      group: [ NodeGroup ],
      version: 1,
      description: ActionNode.DisplayName,
      defaults: {
          name: ActionNode.DisplayName,
          color: NodeColor,
      },
      inputs: [ NodeMain ],
      outputs: [ NodeMain ],
      credentials: ConfigCredentials,
      properties: ActionConfiguration
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];
    const credentials = this.getCredentials('oAuth2Api') as ICredentialDataDecryptedObject;
    const length = items.length as unknown as number;

		let item: INodeExecutionData;
		for (let i = 0; i < length; i++) {
      item = items[i];
      const response = await actionOrchestration.call(this, credentials, i);
      const newItem = prepareItem<IActionIssueResponse | IActionProjectResponse>(
        item,
        ActionNode.OutputName, 
        response);

      returnData.push(newItem);
    }

    return this.prepareOutputData(returnData);
  }
}
