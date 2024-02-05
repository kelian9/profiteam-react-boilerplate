import { debounce } from 'lodash';
import React, { useEffect } from 'react';
import useSyncToRef from './useSyncToRef';

type ScrollableElement = HTMLElement | Window | null | undefined;

function isWindow(element: HTMLElement | Window): element is Window {
	return element === window;
}

function useResizeObserver({
	scrollableElement,
	hasNextPage,
	loading,
	onLoadMore,
	scrollCheckInterval,
}: {
	scrollableElement: ScrollableElement | null;
	scrollCheckInterval: number;
	hasNextPage: React.MutableRefObject<boolean>;
	loading: React.MutableRefObject<boolean>;
	onLoadMore: React.MutableRefObject<() => void>;
}) {
	const previousActiveClientHeight = useSyncToRef(0);

	useEffect(() => {
		if (!scrollableElement) return () => null;
		if (isWindow(scrollableElement)) return;

		const resizeObserver = new ResizeObserver(
			debounce(([entry]: ResizeObserverEntry[]) => {
				if (!entry) return;

				const newClientHeight = Math.round(entry.contentRect.height);

				if (newClientHeight === 0) return;
				if (previousActiveClientHeight.current === newClientHeight) return;
				if (!hasNextPage.current || loading.current) return;
				if (scrollableElement.clientHeight !== scrollableElement.scrollHeight) return;

				onLoadMore.current();
				previousActiveClientHeight.current = newClientHeight;
			}, scrollCheckInterval),
		);

		resizeObserver.observe(scrollableElement);
		return () => resizeObserver.disconnect();
	}, [scrollableElement, previousActiveClientHeight, hasNextPage, loading, scrollCheckInterval, onLoadMore]);
}

export default useResizeObserver;
