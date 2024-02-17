import { IFormField } from '@models/IFormField';
import EntityChangeFormType from '@models/enums/EntityChangeFormTypeEnum';

interface IEntityForm {
	formType: EntityChangeFormType;
	onSubmit: (...args: any) => void;
	formsFields: IFormField[];
}

export default IEntityForm;
