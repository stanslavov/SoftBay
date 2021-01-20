import home, { catalog, createPage, createPost, editPage, editPost, detailsPage, deletePage, deleteOffer } from './controllers/catalog.js';
import { registerPage, registerPost, loginPage, loginPost, logout } from './controllers/user.js';
import { deletOffer } from './data.js';

window.addEventListener('load', () => {

    const app = Sammy('.container', function () {
            
        this.use('Handlebars', 'hbs');

        this.userData = {

            email: sessionStorage.getItem('email') || '',
            userId: sessionStorage.getItem('userId') || '',
        };

        this.get('/', home);
        this.get('#/home', home);
        this.get('index.html', home);

        this.get('#/register', registerPage);
        this.get('#/login', loginPage);
        this.get('#/logout', logout);

        this.get('#/create', createPage);
        this.get('#/edit/:id', editPage);
        this.get('#/catalog', catalog);
        this.get('#/details/:id', detailsPage);
        this.get('#/delete/:id', deletePage);

        this.post('#/register', ctx => { registerPost.call(ctx); });
        this.post('#/login', ctx => { loginPost.call(ctx); });
        this.post('#/create', (context) => { createPost.call(context); });
        this.post('#/edit/:id', (context) => { editPost.call(context); });
        this.post('#/delete/:id', (context) => { deleteOffer.call(context); });
    });

    app.run();
});