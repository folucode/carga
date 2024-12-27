export const capitalise = (value: string | string[]): string | string[] => {
  if (Array.isArray(value)) {
    return value.map((v) =>
      v
        .split(' ')
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
        )
        .join(' '),
    );
  } else if (typeof value === 'string') {
    return value
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
  throw new TypeError('Input must be a string or an array of strings');
};
