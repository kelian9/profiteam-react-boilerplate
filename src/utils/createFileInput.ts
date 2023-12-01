import IFile from '@models/IFile';
import AcceptTypes from '@models/enums/AcceptTypesEnum';
import makeInputAccept from './makeInputAccept';

export function createFileInput(onChange: (files: File[]) => void, multiply?: boolean, acceptTypes?: AcceptTypes[]) {
	const input = document.createElement('input');
	input.type = 'file';
	input.style.display = 'none';
	input.multiple = !!multiply;
	if (acceptTypes) input.accept = makeInputAccept(acceptTypes);
	document.body.appendChild(input);

	input.addEventListener('change', function () {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		if (input.files!.length === 0) return;
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-unsafe-argument
		onChange([...Array.from(input.files!)]);
		input.value = '';
	});

	return {
		open: () => input.click(),
		// eslint-disable-next-line no-void
		destroy: () => void (document.body.contains(input) && document.body.removeChild(input)),
	};
}

export function convertFileToFileInterface(file: File): IFile {
	return {
		size: file.size,
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		path: null!,
		name: file.name,
		rawFile: file,
	};
}
