declare global {
  interface Window {
    _PATH_PREFIX_: string;
  }
}

export function getUrl(path: string) {
  if (path.startsWith('/')) path = path.slice(1);
  return window._PATH_PREFIX_ + path;
}
