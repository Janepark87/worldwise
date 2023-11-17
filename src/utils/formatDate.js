export function formatDate(date, options = {}) {
	const defaultOption = {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	};
	const mergedOptions = { ...defaultOption, ...options };
	return new Intl.DateTimeFormat('en', mergedOptions).format(new Date(date));
}
