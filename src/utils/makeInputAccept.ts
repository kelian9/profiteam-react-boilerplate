import AcceptTypes from '@models/enums/AcceptTypesEnum';
import { memoizeWith } from './memoizeWith';

const makeInputAccept = memoizeWith(
	(accepts) => accepts.join(''),
	(accepts: AcceptTypes[]) => accepts.join(','),
);

export default makeInputAccept;
