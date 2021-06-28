export interface IProject {
  ['id']: number;
  ['name']: string;
}

export interface IProjectColumn {
  ['id']: number;
  ['name']: string;
  ['url']: string;
  ['project_url']: string;
}

export interface IProjectCard {
  ['id']: number;
  ['content_url']: string;
}
