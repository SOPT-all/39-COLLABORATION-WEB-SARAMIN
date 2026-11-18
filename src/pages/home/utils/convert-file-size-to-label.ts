const KB = 1024;
const MB = KB * 1024;

// 파일 크기를 '1.8 MB' · '860 KB'로 바꿔요. 1KB보다 작으면 '1 KB'로 보여 줘요.
export const convertFileSizeToLabel = (bytes: number) => {
  if (bytes >= MB) return `${(bytes / MB).toFixed(1)} MB`;
  return `${Math.max(1, Math.round(bytes / KB))} KB`;
};
