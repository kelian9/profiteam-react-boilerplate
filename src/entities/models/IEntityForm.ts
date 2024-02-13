import FormType from '@models/enums/FormTypesEnum';

interface IFormField {
	type: FormType;
	name: string;
	disabled?: boolean;
	multiple?: boolean;
}

interface IEntityForm {
	formsFields: IFormField[];
}

export default IEntityForm;
