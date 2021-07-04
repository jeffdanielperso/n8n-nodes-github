import { IDisplayOptions, INodeProperties, INodePropertyOptions } from "n8n-workflow";
import { NodeTypes, Property, PropertyDisplay, Resource } from "../../Common/Enums";
import { IConfigurationMap } from "../../Common/Interfaces";
import { FindItemPropertyDisplay } from "./FindItemEnums";
import { FindItemIssueOperation, FindItemIssueProperty, FindItemIssuePropertyDisplay } from "./FindItemEnums.issue";

const FindItemIssueDisplayOptions: IDisplayOptions = {
  show: {
    [Property.Resource]: [
      Resource.Issue
    ]
  }
}

const FindItemIssueOperationOptions: INodePropertyOptions[] = [
  {
    name: FindItemIssuePropertyDisplay.ByContentUrl,
    value: FindItemIssueOperation.ByContentUrl,
    description: FindItemIssuePropertyDisplay.ByContentUrlDescription
  },
  {
    name: FindItemIssuePropertyDisplay.ByOwnerRepoNumber,
    value: FindItemIssueOperation.ByOwnerRepoNumber,
    description: FindItemIssuePropertyDisplay.ByOwnerRepoNumberDescrtiption
  }
]

const FintItemIssueElementBase: INodeProperties = {
  displayName: '',
  name: '',
  type: NodeTypes.String,
  default: '',
  required: true
}

const FindItemIssueConfig: IConfigurationMap = {
  [Property.Operation]: {
    ...FintItemIssueElementBase,
    displayName: PropertyDisplay.Operation,
    name: Property.Operation,
    description: FindItemPropertyDisplay.OperationDescription,
    displayOptions: FindItemIssueDisplayOptions,
    type: NodeTypes.Options,
    options: FindItemIssueOperationOptions,
    default: FindItemIssueOperation.ByContentUrl
  },
  [FindItemIssueProperty.ContentUrl]: {
    ...FintItemIssueElementBase,
    displayName: PropertyDisplay.ContentUrl,
    name: FindItemIssueProperty.ContentUrl,
    description: PropertyDisplay.ContentUrl,
    displayOptions: {
      ...FindItemIssueDisplayOptions,
      show: {
        [Property.Operation]: [
          FindItemIssueOperation.ByContentUrl
        ]
      }
    }
  },
  [FindItemIssueProperty.Owner]: {
    ...FintItemIssueElementBase,
    displayName: PropertyDisplay.Owner,
    name: FindItemIssueProperty.Owner,
    description: PropertyDisplay.Owner,
    displayOptions: {
      ...FindItemIssueDisplayOptions,
      show: {
        [Property.Operation]: [
          FindItemIssueOperation.ByOwnerRepoNumber
        ]
      }
    }
  },
  [FindItemIssueProperty.Repository]: {
    ...FintItemIssueElementBase,
    displayName: PropertyDisplay.Repository,
    name: FindItemIssueProperty.Repository,
    description: PropertyDisplay.Repository,
    displayOptions: {
      ...FindItemIssueDisplayOptions,
      show: {
        [Property.Operation]: [
          FindItemIssueOperation.ByOwnerRepoNumber
        ]
      }
    }
  },
  [FindItemIssueProperty.IssueNumber]: {
    ...FintItemIssueElementBase,
    displayName: PropertyDisplay.IssueNumber,
    name: FindItemIssueProperty.IssueNumber,
    description: PropertyDisplay.IssueNumber,
    type: NodeTypes.Number,
    displayOptions: {
      ...FindItemIssueDisplayOptions,
      show: {
        [Property.Operation]: [
          FindItemIssueOperation.ByOwnerRepoNumber
        ]
      }
    }
  }
}

export const FindItemIssueConfiguration: INodeProperties[] = [
  FindItemIssueConfig[Property.Operation],
  FindItemIssueConfig[FindItemIssueProperty.ContentUrl],
  FindItemIssueConfig[FindItemIssueProperty.Owner],
  FindItemIssueConfig[FindItemIssueProperty.Repository],
  FindItemIssueConfig[FindItemIssueProperty.IssueNumber]
]
