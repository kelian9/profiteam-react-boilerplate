import IFilterField from 'src/components/ui/BFilter/IFilterField';

export interface ISectionFilter {
	filterFields: IFilterField[];
	onSave: (...args: any) => void;
}
