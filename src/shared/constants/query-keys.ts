export const QUERY_KEYS = {
  RECRUIT: {
    all: ['recruit'] as const,
    detail: (id: number) => ['recruit', id] as const,
    list: (params?: Record<string, unknown>) =>
      ['recruit', 'list', params] as const,
  },
  JOB_POSTING: {
    all: ['jobPosting'] as const,
    recommended: (params?: Record<string, unknown>) =>
      ['jobPosting', 'recommended', params] as const,
    viewed: (params?: Record<string, unknown>) =>
      ['jobPosting', 'viewed', params] as const,
    deadlineSoon: (params?: Record<string, unknown>) =>
      ['jobPosting', 'deadlineSoon', params] as const,
    search: (params?: Record<string, unknown>) =>
      ['jobPosting', 'search', params] as const,
  },
  USER: {
    all: ['user'] as const,
    keywords: ['user', 'keywords'] as const,
    documents: ['user', 'documents'] as const,
  },
} as const;
