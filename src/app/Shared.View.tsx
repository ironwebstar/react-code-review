export function coerce<T>(
  value: T | undefined,
  next: (value: T) => React.ReactNode | React.ReactNode[],
): React.ReactNode | React.ReactNode[] {
  if (value) return next(value)
}
