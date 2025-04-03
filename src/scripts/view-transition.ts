export function withTransition(callback: ViewTransitionUpdateCallback) {
  if (document.startViewTransition) {
    document.startViewTransition(callback);
  } else {
    callback();
  }
}
