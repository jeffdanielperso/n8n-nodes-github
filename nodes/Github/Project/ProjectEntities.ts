import { ICreator, IGithubMutableEntity } from "../Common/Entities";

export interface IProject extends IGithubMutableEntity {
  ['owner_url']: string;
  ['url']: string;
  ['html_url']: string;
  ['columns_url']: string;
  ['name']: string;
  ['body']: string;
  ['number']: number;
  ['state']: string;
  ['creator']: ICreator | null;
}

export interface IProjectColumn extends IGithubMutableEntity {
  ['url']: string;
  ['project_url']: string;
  ['cards_url']: string;
  ['name']: string;
}

export interface IProjectCard extends IGithubMutableEntity {
  ['url']: string;
  ['note']?: string;
  ['creator']: ICreator;
  ['archived']: boolean;
  ['column_url']: string;
  ['content_url']?: string;
  ['project_url']: string;
}
