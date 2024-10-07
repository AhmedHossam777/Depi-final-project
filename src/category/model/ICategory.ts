import { Document } from 'mongoose';

export interface ICategory {
	name: string;
	description: string;
}

export type CategoryDocument = ICategory & Document;
