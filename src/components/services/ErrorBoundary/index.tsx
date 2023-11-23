import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
	children?: ReactNode;
}

interface State {
	hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
	public state: State = {
		hasError: false,
	};

	public static getDerivedStateFromError(): State {
		return { hasError: true };
	}

	public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		// eslint-disable-next-line no-console
		console.error('Uncaught error:', error, errorInfo);
	}

	public render() {
		const { hasError } = this.state;
		const { children } = this.props;
		if (hasError) {
			return (
				// Modal View Recommended
				<>Check browser console for error log</>
			);
		}

		return children;
	}
}

export default ErrorBoundary;
