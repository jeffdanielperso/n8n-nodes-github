import { INodeProperties } from "n8n-workflow";

export interface IConfigurationMap {
  [key: string]: INodeProperties;
}

export interface IValueData {
	value: any;
}
