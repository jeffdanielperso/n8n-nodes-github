export enum NodeTypes {
  Boolean = 'boolean',
  Collection = 'collection',
  Color = 'color',
  DateTime = 'dateTime',
  FixedCollection = 'fixedCollection',
  Hidden = 'hidden',
  Json = 'json',
  MultiOptions = 'multiOptions',
  Number = 'number',
  Options = 'options',
  String = 'string'
}

export enum Property {
  Resource = 'resource',
  Operation = 'operation'
}

export enum Resource {
  Issue = 'issue',
  Project = 'project',
  ProjectCard = 'projectCard',
  ProjectColumn = 'projectColumn'
}

export enum PropertyDisplay {
  Resource = 'Resource',
  Operation = 'Operation',
  Organization = 'Organization',
  Owner = 'Owner',
  User = 'User',
  Repository = 'Repository',
  Type = 'Type',
  Issue = 'Issue',
  IssueNumber = 'Issue Number',
  IssueId = 'Issue ID',
  Project = 'Project',
  ProjectId = 'Project ID',
  ProjectColumn = 'Project Column',
  ProjectColumnId = 'Column ID',
  ProjectCard = 'Project Card',
  ProjectCardId = 'Card ID',
  ContentUrl = 'Content URL',
  Name = 'Name',
  Labels = 'Labels',
  Yes = 'Yes',
  No = 'No'
}

export enum ProjectType {
  Organization = 'organization',
  Repository = 'repository',
  User = 'user'
}

export enum ProjectMovePosition {
  Top = 'top',
  Bottom = 'bottom'
}

export enum YesNo {
  Yes = 'yes',
  No = 'no'
}
