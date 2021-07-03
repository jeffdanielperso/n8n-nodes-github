import { IDisplayOptions, INodeProperties, INodePropertyCollection, INodePropertyOptions } from "n8n-workflow";
import { CollectionNodeItemName, CollectionNodeItemType, CollectionNodeName } from "../../Common/Configuration";
import { NodeTypes, Property, PropertyDisplay, Resource } from "../../Common/Enums";
import { IConfigurationMap } from "../../Common/Interfaces";
import { ActionElementBase } from "./ActionConfiguration";
import { ActionIssueOperation, ActionIssueProperty, ActionIssuePropertyDisplay, ActionPropertyDisplay } from "./ActionEnums";

const ActionLabelCollectionOptions: INodePropertyCollection[] = [
  {
    name: CollectionNodeName,
    displayName: PropertyDisplay.Labels,
    values: [
      {
        displayName: PropertyDisplay.Name,
        name: CollectionNodeItemName,
        type: CollectionNodeItemType,
        default: '',
        description: ActionIssuePropertyDisplay.NameOfLabel,
      }
    ],
  }
]

const ActionIssueDisplayOptions: IDisplayOptions = {
  hide: {
    [Property.Resource]: [
      Resource.Project,
      Resource.ProjectCard,
      Resource.ProjectColumn
    ]
  },
  show: {
    [Property.Resource]: [
      Resource.Issue
    ]
  }
}

export const ActionIssueOperationOptions: Array<INodePropertyOptions | INodeProperties | INodePropertyCollection> = [
  {
    name: ActionIssuePropertyDisplay.UpdateLabels,
    value: ActionIssueOperation.UpdateLabels,
    description: ActionIssuePropertyDisplay.UpdateLabelsDescription,
  },
  {
    name: ActionIssuePropertyDisplay.AddLabels,
    value: ActionIssueOperation.AddLabels,
    description: ActionIssuePropertyDisplay.AddLabelsDescription,
  },
  {
    name: ActionIssuePropertyDisplay.RemoveLabel,
    value: ActionIssueOperation.RemoveLabel,
    description: ActionIssuePropertyDisplay.RemoveLabelDescription,
  }
]

const ActionIssueElementBase: INodeProperties = {
  ...ActionElementBase,
  type: NodeTypes.String,
  displayOptions: ActionIssueDisplayOptions
}

const ActionIssueConfig: IConfigurationMap = {
  [ActionIssueProperty.Operation]: {
    ...ActionIssueElementBase,
    displayName: PropertyDisplay.Operation,
    name: Property.Operation,
    description: ActionPropertyDisplay.OperationDescription,
    type: NodeTypes.Options,
    options: ActionIssueOperationOptions,
    default: ActionIssueOperation.UpdateLabels
  },
  [ActionIssueProperty.Owner]: {
    ...ActionIssueElementBase,
    displayName: PropertyDisplay.Owner,
    name: ActionIssueProperty.Owner,
    description: ActionIssuePropertyDisplay.OwnerDescription,
  },
  [ActionIssueProperty.Repository]: {
    ...ActionIssueElementBase,
    displayName: PropertyDisplay.Repository,
    name: ActionIssueProperty.Repository,
    description: ActionIssuePropertyDisplay.RepositoryDescription,
  },
  [ActionIssueProperty.IssueNumber]: {
    ...ActionIssueElementBase,
    displayName: PropertyDisplay.IssueNumber,
    name: ActionIssueProperty.IssueNumber,
    description: ActionIssuePropertyDisplay.IssueNumberDescription,
  },
  [ActionIssueProperty.LabelsToRemove]: {
    ...ActionIssueElementBase,
    displayName: ActionIssuePropertyDisplay.LabelsToRemove,
    name: ActionIssueProperty.LabelsToRemove,
    type: NodeTypes.FixedCollection,
    placeholder: ActionIssuePropertyDisplay.AddLabel,
    typeOptions: {
      multipleValues: true,
    },
    default: {},
    displayOptions: {
      ...ActionIssueDisplayOptions,
      show: {
        [Property.Operation]: [
          ActionIssueOperation.UpdateLabels
        ]
      }
    },
  },
  [ActionIssueProperty.LabelsToAdd]: {
    ...ActionIssueElementBase,
    displayName: ActionIssuePropertyDisplay.LabelsToAdd,
    name: ActionIssueProperty.LabelsToAdd,
    type: NodeTypes.FixedCollection,
    placeholder: ActionIssuePropertyDisplay.AddLabel,
    typeOptions: {
      multipleValues: true,
    },
    default: {},
    displayOptions: {
      ...ActionIssueDisplayOptions,
      show: {
        [Property.Operation]: [
          ActionIssueOperation.UpdateLabels,
          ActionIssueOperation.AddLabels
        ]
      }
    },
    options: ActionLabelCollectionOptions
  },
  [ActionIssueProperty.LabelsToRemove]: {
    ...ActionIssueElementBase,
    displayName: ActionIssuePropertyDisplay.LabelsToRemove,
    name: ActionIssueProperty.LabelsToRemove,
    type: NodeTypes.FixedCollection,
    placeholder: ActionIssuePropertyDisplay.AddLabel,
    typeOptions: {
      multipleValues: true,
    },
    default: {},
    displayOptions: {
      ...ActionIssueDisplayOptions,
      show: {
        [Property.Operation]: [
          ActionIssueOperation.UpdateLabels
        ]
      }
    },
    options: ActionLabelCollectionOptions
  },
  [ActionIssueProperty.LabelToRemove]: {
    ...ActionIssueElementBase,
    displayName: ActionIssuePropertyDisplay.LabelToRemove,
    name: ActionIssueProperty.LabelToRemove,
    description: ActionIssuePropertyDisplay.NameOfLabel,
    displayOptions: {
      ...ActionIssueDisplayOptions,
      show: {
        [Property.Operation]: [
          ActionIssueOperation.RemoveLabel
        ]
      }
    }
  }
}

export const ActionIssueConfiguration: INodeProperties[] = [
  ActionIssueConfig[ActionIssueProperty.Operation],
  ActionIssueConfig[ActionIssueProperty.Owner],
  ActionIssueConfig[ActionIssueProperty.Repository],
  ActionIssueConfig[ActionIssueProperty.IssueNumber],
  ActionIssueConfig[ActionIssueProperty.LabelsToAdd],
  ActionIssueConfig[ActionIssueProperty.LabelsToRemove],
  ActionIssueConfig[ActionIssueProperty.LabelToRemove]
]
