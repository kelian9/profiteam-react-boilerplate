import IMethods from '@models/IMethods';
import IQueryFilter from '@models/IQueryFilter';
import { IEntityField } from 'src/entities/models/IEntityField';
import IEntityFilter from './IEntityFilter';
import IEntityForm from './IEntityForm';
import { IEntityTable } from './IEntityTable';

interface IEntity<T> {
	name: string;
	fields: IEntityField;
	methods: IMethods<T>;
	queryFilter?: IQueryFilter;
	filters?: IEntityFilter;
	table?: IEntityTable;
	forms?: IEntityForm;
}

export default IEntity;
