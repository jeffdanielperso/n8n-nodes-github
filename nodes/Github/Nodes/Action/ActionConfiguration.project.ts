import { IDisplayOptions, INodeProperties, INodePropertyCollection, INodePropertyOptions } from "n8n-workflow";
import { YesNoOptions } from "../../Common/Configuration";
import { NodeTypes, ProjectType, Property, PropertyDisplay, Resource, YesNo } from "../../Common/Enums";
import { IConfigurationMap } from "../../Common/Interfaces";
import { ActionElementBase } from "./ActionConfiguration";
import { ActionProjectOperation, ActionProjectProperty, ActionProjectPropertyDisplay } from "./ActionEnums";

const ActionProjectTypeOptions: INodePropertyOptions[] = [
  {
    name: PropertyDisplay.Organization,
    value: ProjectType.Organization,
    description: ActionProjectPropertyDisplay.TypeOrganizationDescription
  },
  {
    name: PropertyDisplay.Repository,
    value: ProjectType.Repository,
    description: ActionProjectPropertyDisplay.TypeRepositoryDescription
  },
  {
    name: PropertyDisplay.User,
    value: ProjectType.User,
    description: ActionProjectPropertyDisplay.TypeUserDescription
  }
]

const ActionProjectDisplayOptions: IDisplayOptions = {
  hide: {
    [Property.Resource]: [
      Resource.Issue,
      Resource.ProjectCard,
      Resource.ProjectColumn
    ]
  },
  show: {
    [Property.Resource]: [
      Resource.Project
    ]
  }
}

export const ActionProjectOperationOptions: Array<INodePropertyOptions | INodeProperties | INodePropertyCollection> = [
  {
    name: ActionProjectPropertyDisplay.MoveCard,
    value: ActionProjectOperation.MoveCard,
    description: ActionProjectPropertyDisplay.MoveCardDescription,
    displayOptions: ActionProjectDisplayOptions
  }
]

const ActionProjectElementBase: INodeProperties = {
  ...ActionElementBase,
  displayOptions: ActionProjectDisplayOptions
}

const ActionProjectConfig: IConfigurationMap = {
  [ActionProjectProperty.Type]: {
    ...ActionProjectElementBase,
    displayName: PropertyDisplay.Type,
    name: ActionProjectProperty.Type,
    description: ActionProjectPropertyDisplay.ProjectTypeDescription,
    type: NodeTypes.Options,
    options: ActionProjectTypeOptions,
  },
  [ActionProjectProperty.Owner]: {
    ...ActionProjectElementBase,
    displayName: PropertyDisplay.Owner,
    name: ActionProjectProperty.Owner,
    description: ActionProjectPropertyDisplay.OwnerProjectDescription,
    displayOptions: {
      ...ActionProjectDisplayOptions,
      show: {
        [ActionProjectProperty.Type]: [
          ProjectType.Organization,
          ProjectType.Repository
        ]
      }
    }
  },
  [ActionProjectProperty.Repository]: {
    ...ActionProjectElementBase,
    displayName: PropertyDisplay.Repository,
    name: ActionProjectProperty.Repository,
    description: ActionProjectPropertyDisplay.RepositoryProjectDescription,
    displayOptions: {
      ...ActionProjectDisplayOptions,
      show: {
        [ActionProjectProperty.Type]: [
          ProjectType.Repository
        ]
      }
    }
  },
  [ActionProjectProperty.User]: {
    ...ActionProjectElementBase,
    displayName: PropertyDisplay.User,
    name: ActionProjectProperty.User,
    description: ActionProjectPropertyDisplay.UserDescription,
    displayOptions: {
      ...ActionProjectDisplayOptions,
      show: {
        [ActionProjectProperty.Type]: [
          ProjectType.User
        ]
      }
    }
  },
  [ActionProjectProperty.Name]: {
    ...ActionProjectElementBase,
    displayName: PropertyDisplay.Name,
    name: ActionProjectProperty.Name,
    description: ActionProjectPropertyDisplay.NameDescription,
  },
  [ActionProjectProperty.ColumnId]: {
    ...ActionProjectElementBase,
    displayName: PropertyDisplay.ProjectColumnId,
    name: ActionProjectProperty.ColumnId,
    description: ActionProjectPropertyDisplay.ColumnIdDescription,
    type: NodeTypes.Number,
  },
  [ActionProjectProperty.IssueNumber]: {
    ...ActionProjectElementBase,
    displayName: PropertyDisplay.IssueNumber,
    name: ActionProjectProperty.IssueNumber,
    description: ActionProjectPropertyDisplay.IssueNumberDescription,
    type: NodeTypes.Number
  },
  [ActionProjectProperty.KnownIssueId]: {
    ...ActionProjectElementBase,
    displayName: ActionProjectPropertyDisplay.KnownIssueId,
    name: ActionProjectProperty.KnownIssueId,
    description: ActionProjectPropertyDisplay.KnownIssueId,
    default: YesNo.No,
    type: NodeTypes.Options,
    options: YesNoOptions,
  },
  [ActionProjectProperty.IssueId]: {
    ...ActionProjectElementBase,
    displayName: PropertyDisplay.IssueId,
    name: ActionProjectProperty.IssueId,
    description: PropertyDisplay.IssueId,
    type: NodeTypes.Number,
    displayOptions: {
      ...ActionProjectDisplayOptions,
      show: {
        [ActionProjectProperty.KnownIssueId]: [
          YesNo.Yes
        ]
      }
    }
  },
  [ActionProjectProperty.IssueRepository]: {
    ...ActionProjectElementBase,
    displayName: ActionProjectPropertyDisplay.IssueRepository,
    name: ActionProjectProperty.IssueRepository,
    description: ActionProjectPropertyDisplay.IssueRepository,
    displayOptions: {
      ...ActionProjectDisplayOptions,
      show: {
        [ActionProjectProperty.KnownIssueId]: [
          YesNo.No
        ]
      },
      hide: {
        [ActionProjectProperty.Type]: [
          ProjectType.Repository
        ]
      }
    }
  }
}

export const ActionProjectConfiguration: INodeProperties[] = [
  ActionProjectConfig[ActionProjectProperty.Type],
  ActionProjectConfig[ActionProjectProperty.Owner],
  ActionProjectConfig[ActionProjectProperty.Repository],
  ActionProjectConfig[ActionProjectProperty.User],
  ActionProjectConfig[ActionProjectProperty.Name],
  ActionProjectConfig[ActionProjectProperty.ColumnId],
  ActionProjectConfig[ActionProjectProperty.IssueNumber],
  ActionProjectConfig[ActionProjectProperty.KnownIssueId],
  ActionProjectConfig[ActionProjectProperty.IssueRepository],
  ActionProjectConfig[ActionProjectProperty.IssueId]
]
