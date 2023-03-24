import content404 from "./404";
import about from "./about";
import cart from "./cart";
import categories from "./categories";
import home from "./home";
import products from "./products";
import { loaderHTML } from "./constants";
import productDetail from "./productDetail";

const routes = {
    '/': {
        title: 'Welcome To Our SPA Store',
        content: home,
    },
    '/products': {
        title: 'Check Out Our Products',
        content: products,
    },
    '/categories': {
        title: 'All Categories Are Here',
        content: categories,
    },
    '/about': {
        title: 'Here Is Information About Our Store',
        content: about,
    },
    '/cart': {
        title: 'Your products',
        content: cart,
    },
    '404': {
        title: 'This Page Is Not Found',
        content: content404,
    },
};

const handleCLick = (e) => {
    e.preventDefault();
    const route = e.target.pathname;
    if(route !== window.location.pathname) {
        window.history.pushState({}, '', route);
        window.dispatchEvent(new Event('popstate'));
    }
};

const getProductDeatailRoute = (location) => {
    
    if(location.includes('products') && location.match(/\//g).length > 1) {
        return {
            content: productDetail,
            title: '',
        };
    }
};

const handleRoute = () => {
    const location = window.location.pathname;
    const route = routes[location] ?? getProductDeatailRoute(location) ?? routes['404'];
    const { title, content } = route;

    document.querySelector('#content').innerHTML = loaderHTML;

    content().then((html) => {
        document.querySelector('#content').innerHTML = '';
        document.querySelector('#content').append(html);
        document.querySelectorAll('a').forEach((el) => el.addEventListener('click', handleCLick));
    })

    document.querySelector('h1').innerText = title;

    document.querySelectorAll('#nav-list .nav-link').forEach((el) => {
        el.classList.remove('active');
        if(el.pathname === location) {
            el.classList.add('active');
        }
    });
}

const initRouter = () => {
    handleRoute();
    window.addEventListener('popstate', handleRoute);
}

export default initRouter;