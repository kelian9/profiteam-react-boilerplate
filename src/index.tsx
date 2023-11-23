import store from '@store/store';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import RejectedErrorsReporter from './RejectedErrorsReporter';
import './index.scss';
import App from './root/App';

const container = document.getElementById('root');

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
root.render(
	<React.StrictMode>
		<Provider store={store}>
			{/* <PersistGate loading={<div>...</div>} persistor={persistor}> */}
			<SnackbarProvider maxSnack={3} autoHideDuration={2500}>
				<RejectedErrorsReporter />
				<App />
			</SnackbarProvider>
			{/* </PersistGate> */}
		</Provider>
	</React.StrictMode>,
);
