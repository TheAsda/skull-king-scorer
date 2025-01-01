async function loadPage(path) {
  if (path === '/') {
    path = '/index';
  }
  const basePath = '/pages' + path;
  try {
    const html = await fetch(basePath + '/page.html').then((response) =>
      response.text()
    );
    const element = document.createElement('template');
    document.body.appendChild(element);
    element.innerHTML = html;
    const script = document.createElement('script');
    script.type = 'module';
    script.src = basePath + '/script.js';
    element.content.appendChild(script);
    const styles = document.createElement('link');
    styles.rel = 'stylesheet';
    styles.href = basePath + '/styles.css';
    element.content.appendChild(styles);
    return element.content.cloneNode(true);
  } catch (err) {
    console.error(err);
    return null;
  }
}

class Router {
  constructor() {
    this.main = document.querySelector('main');
    this.mountPage();
    document.addEventListener('click', (e) => {
      if (e.target.matches('a')) {
        e.preventDefault();
        const href = e.target.getAttribute('href');
        this.navigate(href);
      }
    });
    window.addEventListener('popstate', () => this.mountPage());
  }

  async navigate(path) {
    history.pushState(null, null, path);
    await this.mountPage();
  }

  async mountPage() {
    const page = await loadPage(location.pathname);
    this.main.innerHTML = '';
    if (page) {
      this.main.appendChild(page);
    } else {
      await this.navigate('/404');
    }
  }
}

export const router = new Router();
