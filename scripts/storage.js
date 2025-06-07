export class Storage {
  static set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  static get(key) {
    const value = localStorage.getItem(key);
    if (!value) {
      return null;
    }
    return JSON.parse(value);
  }
}
