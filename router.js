const basePath = '/' + location.pathname.split('/')[1];

async function loadPage(path) {
  if (path === '/') {
    path = '/index';
  }
  if(path.endsWith('/')) {
    path = path.slice(0, -1);
  }
  const pagePath = '/pages' + path;
  try {
    const html = await fetch(pagePath + '/page.html').then((response) =>
      response.text()
    );
    const element = document.createElement('template');
    document.body.appendChild(element);
    element.innerHTML = html;
    const script = document.createElement('script');
    script.type = 'module';
    script.src = pagePath + '/script.js';
    element.content.appendChild(script);
    const styles = document.createElement('link');
    styles.rel = 'stylesheet';
    styles.href = pagePath + '/styles.css';
    element.content.appendChild(styles);
    return element.content.cloneNode(true);
  } catch (err) {
    console.error(err);
    return null;
  }
}

class Router {
  constructor() {
    const params = new URLSearchParams(location.search);
    if (params.has('url')) {
      history.replaceState(null, null, basePath + '/' + params.get('url'));
    }
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
    history.pushState(null, null, basePath + path);
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
