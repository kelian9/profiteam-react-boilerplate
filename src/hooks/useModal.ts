import { useState } from 'react';

const useModal = () => {
	const [isShowing, setIsShowing] = useState<boolean>(false);
	const toggle = () => setIsShowing(!isShowing);
	return [isShowing, toggle];
};

export default useModal;
