export const QUERY_KEYS = {
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
    applications: ['user', 'applications'] as const,
  },
} as const;
