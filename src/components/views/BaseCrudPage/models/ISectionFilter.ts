import IFilterField from 'src/components/ui/BFilter/IFilterField';

export interface ISectionFilter {
	fields: IFilterField[];
	save?: (...args: any[]) => void;
}
