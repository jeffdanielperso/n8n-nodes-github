export enum ActionNode {
  Name = 'githubAction',
  DisplayName = 'Github Action',
  Description = 'Execute an Action on a Github Resource',
  OutputName = 'github-action'
}

export enum ActionPropertyDisplay {
  ResourceDescription = 'Type of Ressource to target',
  OperationDescription = 'Operation to execute on the Resource',
}

//#region Issue

export enum ActionIssuePropertyDisplay {
  OwnerDescription = 'Owner of the Issue Repository',
  RepositoryDescription = 'Repository of the Issue',
  IssueNumberDescription = 'Number of the targeted Issue',
  NameOfLabel = 'Name of Label',
  UpdateLabels = 'Update Labels',
  UpdateLabelsDescription = 'Update Labels of Issue',
  AddLabels = 'Add Labels',
  AddLabelsDescription = 'Add Labels to Issue',
  RemoveLabel = 'Remove Label',
  RemoveLabelDescription = 'Remove Label of Issue',
  LabelsToAdd = 'Labels to Add',
  LabelsToRemove = 'Labels to Remove',
  LabelToRemove = 'Label to Remove',
  AddLabel = 'Add a Label',
}

export enum ActionIssueProperty {
  Operation = 'action_issue_operation',
  Owner = 'action_issue_owner',
  Repository = 'action_issue_repository',
  IssueNumber = 'action_issue_issueNumber',
  LabelsToAdd = 'action_issue_labelsToAdd',
  LabelsToRemove = 'action_issue_labelsToRemove',
  LabelToRemove = 'action_issue_labelToRemove'
}

export enum ActionIssueOperation {
  UpdateLabels = 'action_issue_updateLabels',
  AddLabels = 'action_issue_addLabels',
  RemoveLabel = 'action_issue_removeLabel'
}

//#endregion

//#region Project

export enum ActionProjectPropertyDisplay {
  TypeOrganizationDescription = 'Organization project',
  TypeRepositoryDescription = 'Repository project',
  TypeUserDescription = 'User project',
  ProjectTypeDescription = 'Type of Project',
  OwnerProjectDescription = 'Owner of the Project',
  RepositoryProjectDescription = 'Repository of the Project',
  UserDescription = 'User (owner) of the Project',
  MoveCard = 'Move Card',
  MoveCardDescription = 'Move Card to specific Project and Column',
  NameDescription = 'Name of the Project',
  ColumnIdDescription = 'ID of the destination Column',
  IssueNumberDescription = 'Number of the Issue link to the Card',
  KnownIssueId = 'Known Issue ID',
  IssueRepository = 'Issue repository'
}

export enum ActionProjectProperty {
  Operation = 'action_project_operation',
  Type = 'action_project_type',
  Owner = 'action_project_owner',
  Repository = 'action_project_repository',
  User = 'action_project_user',
  Name = 'action_project_name',
  ColumnId = 'action_project_columnId',
  IssueNumber = 'action_project_issueNumber',
  KnownIssueId = 'action_project_knownIssueId',
  IssueRepository = 'action_project_issueRepository',
  IssueId = 'action_project_issueId'
}

export enum ActionProjectOperation {
  MoveCard = 'action_project_moveCard'
}

//#endregion
