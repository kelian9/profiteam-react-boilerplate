import { throttle } from 'lodash';
import React from 'react';
import useSyncToRef from './useSyncToRef';

export interface UseInfinityScrollByElementConfig {
	loading: boolean;
	hasNextPage: boolean;
	targetElementThresholdPercent?: number;
	startObservingDelay?: number;
	scrollCheckInterval?: number;
	onLoadMore: () => void;
}

type TargetElement = HTMLElement | null | undefined;

function useScrollListenerByElement({
	targetElement,
	hasNextPage,
	loading,
	targetElementThresholdPercent,
	onLoadMore,
	scrollCheckInterval,
	startObservingDelay,
}: {
	targetElement: TargetElement;
	targetElementThresholdPercent: number;
	scrollCheckInterval: number;
	startObservingDelay: number;
	hasNextPage: React.MutableRefObject<boolean>;
	loading: React.MutableRefObject<boolean>;
	onLoadMore: React.MutableRefObject<() => void>;
}) {
	React.useEffect(() => {
		if (!targetElement) return () => null;

		const listener = throttle(function ([entry]: IntersectionObserverEntry[]) {
			if (!hasNextPage.current || loading.current) return;
			if (!entry.isIntersecting) return;
			onLoadMore.current();
		}, scrollCheckInterval);

		let observer: IntersectionObserver | undefined = undefined;

		const startObservingTimeout = setTimeout(() => {
			observer = new IntersectionObserver(listener, {
				root: null,
				rootMargin: '0px',
				threshold: targetElementThresholdPercent,
			});
			observer.observe(targetElement);
		}, startObservingDelay);

		return () => {
			clearTimeout(startObservingTimeout);
			if (observer) observer.disconnect();
		};
	}, [
		hasNextPage,
		loading,
		onLoadMore,
		scrollCheckInterval,
		startObservingDelay,
		targetElement,
		targetElementThresholdPercent,
	]);
}

function useInfinityScrollByElement({
	scrollCheckInterval = 200,
	targetElementThresholdPercent = 0,
	loading,
	startObservingDelay = 500,
	hasNextPage,
	onLoadMore,
}: UseInfinityScrollByElementConfig) {
	const [targetElement, setTargetElement] = React.useState<TargetElement>(null);
	const loadingRef = useSyncToRef(loading);
	const hasNextPageRef = useSyncToRef(hasNextPage);
	const onLoadMoreRef = useSyncToRef(onLoadMore);

	useScrollListenerByElement({
		targetElement,
		targetElementThresholdPercent,
		startObservingDelay,
		scrollCheckInterval,
		hasNextPage: hasNextPageRef,
		loading: loadingRef,
		onLoadMore: onLoadMoreRef,
	});

	return setTargetElement;
}

export default useInfinityScrollByElement;
