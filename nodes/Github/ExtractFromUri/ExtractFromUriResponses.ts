export interface IExtractFromUriBaseResponse {
  error?: string;
}

export interface IExtractFromUriProjectResponse extends IExtractFromUriBaseResponse {
  projectId: number;
}

export interface IExtractFromUriColumnResponse extends IExtractFromUriBaseResponse {
  columnId: number;
}

export interface IExtractFromUriContentResponse extends IExtractFromUriBaseResponse {
  owner: string;
  repository: string;
  contentId: number;
}

export type IExtractFromUriResponse = IExtractFromUriProjectResponse | IExtractFromUriColumnResponse | IExtractFromUriContentResponse | undefined;
