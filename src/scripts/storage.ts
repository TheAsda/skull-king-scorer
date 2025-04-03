export class Storage {
  static set<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static get<T>(key: string) {
    const value = localStorage.getItem(key);
    if (!value) {
      return null;
    }
    return JSON.parse(value) as T;
  }
}
