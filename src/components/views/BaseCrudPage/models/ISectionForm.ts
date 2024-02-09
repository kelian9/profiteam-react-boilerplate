import FormType from '@models/enums/FormTypesEnum';
import { IFormButton } from './IFormButton';
import { IFormModal } from './IFormModal';

export interface ISectionForm {
	type: FormType;
	button?: IFormButton;
	modal?: IFormModal;
}
