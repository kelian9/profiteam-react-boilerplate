import { TypedUseSelectorHook, useDispatch, useSelector as useReduxSelector } from 'react-redux';
import { AppDispatch, RootState } from './store';

export const useAppSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

export const useAppDispatch = () => useDispatch<AppDispatch>();
