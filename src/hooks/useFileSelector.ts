import IFile from '@models/IFile';
import AcceptTypes from '@models/enums/AcceptTypesEnum';
import { convertFileToFileInterface, createFileInput } from '@utils/createFileInput';
import React from 'react';
import useDropArea from './useDropArea';

type Result = { dropAreaProps: ReturnType<typeof useDropArea>[0]; dropping: boolean; openNativeFileDialog: () => void };

export function useFileSelector(
	onChange: (files: IFile[]) => void,
	options: { acceptTypes?: AcceptTypes[]; multiply: true },
): Result;

export function useFileSelector(
	onChange: (files: IFile) => void,
	options: { acceptTypes?: AcceptTypes[]; multiply: false },
): Result;

export function useFileSelector(
	onChange: ((files: IFile) => void) | ((files: IFile[]) => void),
	{ acceptTypes, multiply }: { acceptTypes?: AcceptTypes[]; multiply: boolean },
) {
	const handleChange = React.useCallback(
		(files: File[]) =>
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			onChange(multiply ? files.map(convertFileToFileInterface) : (convertFileToFileInterface(files[0]) as any)),
		[multiply, onChange],
	);
	const input = React.useMemo(
		// process.browser ?
		() => (typeof window !== 'undefined' ? createFileInput(handleChange, multiply, acceptTypes) : null),
		[multiply, handleChange, acceptTypes],
	);
	const [dropAreaProps, dropAreaState] = useDropArea({ onFiles: handleChange });

	React.useEffect(() => () => input?.destroy(), [input]);

	return {
		dropAreaProps,
		dropping: dropAreaState.over,
		openNativeFileDialog: React.useCallback(() => input?.open(), [input]),
	};
}
