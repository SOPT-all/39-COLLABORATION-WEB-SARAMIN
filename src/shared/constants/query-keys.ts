export const QUERY_KEYS = {
  RECRUIT: {
    all: ['recruit'] as const,
    detail: (id: number) => ['recruit', id] as const,
    list: (params?: Record<string, unknown>) =>
      ['recruit', 'list', params] as const,
  },
} as const;
