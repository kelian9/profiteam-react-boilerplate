import { UseInfinityScrollConfig, useInfinityScroll } from '@hooks/useInfinityScroll';
import React, { PropsWithChildren, useEffect, useRef } from 'react';

interface IInfinityScrollContainerProps extends UseInfinityScrollConfig {
	style?: React.CSSProperties;
}

const InfinityScrollContainer: React.FC<PropsWithChildren<IInfinityScrollContainerProps>> = (props) => {
	const {
		hasNextPage,
		loading,
		onLoadMore,
		scrollCheckInterval,
		startObservingDelay,
		direction,
		threshold,
		style,
		children,
	} = props;
	const containerRef = useRef(null);

	const setInfinityScrollContainer = useInfinityScroll({
		loading,
		hasNextPage,
		onLoadMore,
		scrollCheckInterval,
		startObservingDelay,
		direction,
		threshold,
	});

	useEffect(() => setInfinityScrollContainer(containerRef.current));

	return (
		<div ref={containerRef} style={{ ...style, overflow: 'auto' }}>
			{children}
		</div>
	);
};

export default InfinityScrollContainer;
