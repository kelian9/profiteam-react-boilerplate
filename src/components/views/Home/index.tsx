import BaseCrudPage from '@views/BaseCrudPage';
import React from 'react';
import Test from '../../../entities/Test';

const Home: React.FC = () => {
	const style = {};

	return (
		<>
			Home Page
			<BaseCrudPage
				methods={Test.methods}
				fields={Test.fields}
				queryFilter={Test.queryFilter}
				filters={Test.filters}
				table={Test.table}
				forms={Test.forms}
				style={style}
			/>
		</>
	);
};

export default Home;
