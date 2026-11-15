export const QUERY_KEYS = {
  RECRUIT: {
    all: ['recruit'] as const,
    detail: (id: number) => ['recruit', id] as const,
    list: (params?: object) => ['recruit', 'list', params] as const,
  },
  JOB_POSTING: {
    all: ['jobPosting'] as const,
    recommended: (params?: object) =>
      ['jobPosting', 'recommended', params] as const,
    viewed: (params?: object) => ['jobPosting', 'viewed', params] as const,
    deadlineSoon: (params?: object) =>
      ['jobPosting', 'deadlineSoon', params] as const,
    search: (params?: object) => ['jobPosting', 'search', params] as const,
  },
  USER: {
    all: ['user'] as const,
    keywords: ['user', 'keywords'] as const,
    documents: ['user', 'documents'] as const,
  },
} as const;
