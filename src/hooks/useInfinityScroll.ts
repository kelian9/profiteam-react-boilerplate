import React from 'react';
import useResizeObserver from './useResizeObserver';
import useScrollListener, { ScrollableElement, UseInfiniteScrollDirection } from './useScrollListener';
import useSyncToRef from './useSyncToRef';

export interface UseInfinityScrollConfig {
	loading: boolean;
	hasNextPage: boolean;
	threshold?: number; // distance in px
	startObservingDelay?: number;
	scrollCheckInterval?: number;
	direction?: UseInfiniteScrollDirection;
	onLoadMore: () => void;
}

export function useInfinityScroll({
	scrollCheckInterval = 200,
	threshold = 100,
	loading,
	startObservingDelay = 500,
	direction = 'down',
	hasNextPage,
	onLoadMore,
}: UseInfinityScrollConfig) {
	const [scrollableElement, setScrollableElement] = React.useState<ScrollableElement>(null);
	const loadingRef = useSyncToRef(loading);
	const hasNextPageRef = useSyncToRef(hasNextPage);
	const onLoadMoreRef = useSyncToRef(onLoadMore);

	useScrollListener({
		scrollableElement,
		threshold,
		startObservingDelay,
		scrollCheckInterval,
		direction,
		hasNextPage: hasNextPageRef,
		loading: loadingRef,
		onLoadMore: onLoadMoreRef,
	});

	useResizeObserver({
		scrollableElement,
		scrollCheckInterval,
		hasNextPage: hasNextPageRef,
		loading: loadingRef,
		onLoadMore: onLoadMoreRef,
	});

	return setScrollableElement;
}
