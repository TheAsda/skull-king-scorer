export function getUrl(path) {
  if(path.startsWith('/')) path = path.slice(1);
  return window._PATH_PREFIX_ + path;
}