import { IFormField } from '@models/IFormField';

interface IEntityForm {
	[key: string]: {
		formFields: IFormField[];
	};
}

export default IEntityForm;
