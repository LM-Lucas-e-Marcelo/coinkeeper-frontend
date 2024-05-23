interface FormatGenericPayloadProps<T> {
  data: T
}

export function formatGenericPayload<T>({
  data,
}: FormatGenericPayloadProps<T>) {
  return {
    items: data,
    total: 20,
    currentPage: 1,
    lastPage: 2,
    limit: 10,
  }
}
