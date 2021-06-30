export interface IExtractDataBaseResponse {
  operation: string;
  error?: string;
}

export interface IExtractDataProjectResponse extends IExtractDataBaseResponse {
  projectId: number;
}

export interface IExtractDataColumnResponse extends IExtractDataBaseResponse {
  columnId: number;
}

export interface IExtractDataContentResponse extends IExtractDataBaseResponse {
  owner: string;
  repository: string;
  contentId: number;
}

export interface IExtractDataProjectCardResponse extends IExtractDataProjectResponse, IExtractDataColumnResponse, IExtractDataContentResponse {
}

export type IExtractDataResponse = IExtractDataProjectCardResponse | IExtractDataProjectResponse | IExtractDataColumnResponse | IExtractDataContentResponse | undefined;
