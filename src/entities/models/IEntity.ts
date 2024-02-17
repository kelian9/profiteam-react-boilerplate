import { IEntityField } from '@models/IEntityField';
import IMethods from '@models/IMethods';
import IQueryFilter from '@models/IQueryFilter';
import IEntityFilter from './IEntityFilter';
import IEntityForm from './IEntityForm';
import { IEntityTable } from './IEntityTable';

interface IEntity<T> {
	name: string;
	fields: IEntityField[];
	methods: IMethods<T>;
	queryFilter?: IQueryFilter;
	filters?: IEntityFilter;
	table?: IEntityTable<T>;
	forms?: IEntityForm[];
}

export default IEntity;
