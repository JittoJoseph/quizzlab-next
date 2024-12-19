declare module 'classnames' {
	type ClassValue = string | number | ClassDictionary | ClassValue[] | undefined | null | boolean;
	interface ClassDictionary {
		[id: string]: string | number | boolean | undefined | null;
	}

	export default function classNames(...args: ClassValue[]): string;
}