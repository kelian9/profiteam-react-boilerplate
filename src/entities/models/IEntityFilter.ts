import IFilterField from 'src/components/ui/BFilter/IFilterField';

interface IEntityFilter {
	filterFields: IFilterField[];
	onSave: (...args: any) => void;
}

export default IEntityFilter;
