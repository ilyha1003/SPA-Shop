const ul = document.createElement('ul');
ul.classList.add('categories-list');

const createCategory = ({ name, slug }, index) => {
    const capitalizeTitle = name.charAt(0).toUpperCase() + name.slice(1);
    
    return `
        <li class="card my-4">
            <div class="card-header">
                Category №${index + 1}
            </div>
            <div class="card-body">
                <h5 class="card-title">${capitalizeTitle}</h5>
                <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                <a href="/categories/${slug}" class="btn btn-primary">Go to the ${capitalizeTitle}</a>
            </div>
        </li>
    `;   
};

const categories = async () => {
    if(!ul.querySelectorAll('li').length) {
        const data = await fetch('https://api.storerestapi.com/categories');
        const json = await data.json();
        json.data.map((el, index) => ul.insertAdjacentHTML('beforeend',createCategory(el, index)));
    }
    
    return ul;
};

export default categories;

