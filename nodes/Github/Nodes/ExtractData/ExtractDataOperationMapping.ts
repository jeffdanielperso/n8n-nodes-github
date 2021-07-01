import { IExecuteFunctions, IHookFunctions } from "n8n-core";
import { ExtractDataOperation } from "./ExtractDataEnums";
import {
  operationFromColumnUrl,
  operationFromContentUrl,
  operationFromProjectCard,
  operationFromProjectUrl
} from "./ExtractDataOperations";
import { IExtractDataResponse } from "./ExtractDataResponses";

interface IOperationMapping {
  [key: string]: (this: IHookFunctions | IExecuteFunctions, itemIndex?: number) => IExtractDataResponse;
}

export const ExtractDataOperationMapping: IOperationMapping = {
  [ExtractDataOperation.ProjectCard]: operationFromProjectCard ,
  [ExtractDataOperation.ProjectUrl]: operationFromProjectUrl,
  [ExtractDataOperation.ColumnUrl]: operationFromColumnUrl,
  [ExtractDataOperation.ContentUrl]: operationFromContentUrl
}
