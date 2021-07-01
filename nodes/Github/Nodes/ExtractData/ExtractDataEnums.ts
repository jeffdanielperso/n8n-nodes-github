export enum ExtractDataNode {
  Name = 'githubExtractData',
  DisplayName = 'Github Extract Data',
  Description = 'Extract data from Payload',
  OutputName = 'github-extract-data'
}

export enum ExtractDataOperation {
  ProjectCard = 'extractData_fromProjectCard',
  ProjectUrl = 'extractData_fromProjectUrl',
  ColumnUrl = 'extractData_fromColumnUrl',
  ContentUrl = 'extractData_fromContentUrl'
}

export enum ExtractDataProperty {
  Object = 'extractData_object',
  Url = 'extractData_url',
}

export const enum ExtractDataPropertyDisplay {
  OperationProjectCard = 'From Project Card',
  OperationProjectCardDescription = 'Extract data from Project Card',
  OperationProjectUrl = 'From Project URL',
  OperationProjectUrlDescription = 'Extract data from Project URL (Project ID)',
  OperationColumnUrl = 'From Column URL',
  OperationColumnUrlDescription = 'Extract data from Column URL (Column ID)',
  OperationContentUrl = 'From Content URL',
  OperationContentUrlDescription = 'Extract data from Content URL (Owner, Repository, Content Number)',
  Object = 'Object',
  Url = 'URL',
}
