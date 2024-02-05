import { throttle } from 'lodash';
import React, { useEffect } from 'react';

export type UseInfiniteScrollDirection = 'down' | 'up';

export type ScrollableElement = HTMLElement | Window | null | undefined;

export function isWindow(element: HTMLElement | Window): element is Window {
	return element === window;
}

const scrollRemainderDetectors = {
	down: function (element: HTMLElement | Window) {
		if (isWindow(element)) return document.documentElement.scrollHeight - element.scrollY - element.innerHeight;
		return element.scrollHeight - element.scrollTop - element.offsetHeight;
	},
	up: function (element: HTMLElement | Window) {
		if (isWindow(element)) return element.scrollY;
		return element.scrollTop;
	},
};

function useScrollListener({
	scrollableElement,
	hasNextPage,
	loading,
	threshold,
	direction,
	onLoadMore,
	scrollCheckInterval,
	startObservingDelay,
}: {
	scrollableElement: ScrollableElement | null;
	threshold: number;
	scrollCheckInterval: number;
	startObservingDelay: number;
	direction: UseInfiniteScrollDirection;
	hasNextPage: React.MutableRefObject<boolean>;
	loading: React.MutableRefObject<boolean>;
	onLoadMore: React.MutableRefObject<() => void>;
}) {
	useEffect(() => {
		if (!scrollableElement) return () => null;

		const listener = throttle(function () {
			if (!hasNextPage.current || loading.current) return;
			const scrollToEnd = scrollRemainderDetectors[direction](scrollableElement);
			if (scrollToEnd > threshold) return;
			onLoadMore.current();
		}, scrollCheckInterval);

		const startObservingTimeout = setTimeout(
			() => scrollableElement.addEventListener('scroll', listener),
			startObservingDelay,
		);

		return () => {
			clearTimeout(startObservingTimeout);
			scrollableElement.removeEventListener('scroll', listener);
		};
	}, [
		direction,
		startObservingDelay,
		hasNextPage,
		loading,
		onLoadMore,
		scrollCheckInterval,
		scrollableElement,
		threshold,
	]);
}

export default useScrollListener;
