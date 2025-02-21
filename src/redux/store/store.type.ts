import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configureStoreWithMiddlewares } from './store';

export type AppStore = ReturnType<typeof configureStoreWithMiddlewares>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
