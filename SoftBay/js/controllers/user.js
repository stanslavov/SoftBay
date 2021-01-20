import { register, login, logout as apiLogout, checkResult } from '../data.js';
import { showInfo, showError } from '../notification.js';

export async function registerPage() {

    this.partials = {

        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    };

    this.partial('./templates/user/register.hbs')
}

export async function loginPage() {

    this.partials = {

        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    };

    this.partial('./templates/user/login.hbs')
}

export async function logout() {

    try {
        const result = await apiLogout();

        checkResult(result);
        
        this.app.userData.email = '';
        this.app.userData.userId = '';

        showInfo('Logout successful');

        this.redirect('#/home');
    } catch (err) {
        showError(err.message);
    }
}

export async function registerPost() {

    try {

        if (!this.params.email) {
            throw new Error('Email cannot be empty');
        }
        if (!this.params.password) {
            throw new Error('Password cannot be empty');
        }
        if (this.params.password !== this.params.repeatPassword) {
            throw new Error('Password don\'t match');
        }

        const result = await register(this.params.email, this.params.password);     
        checkResult(result);

        const loginResult = await login(this.params.email, this.params.password);
        checkResult(loginResult);

        this.app.userData.email = loginResult.email;
        this.app.userData.userId = loginResult.objectId;

        showInfo('User registration successful');

        this.app.userData.email = result.email;
        this.app.userData.userId = result.objectId;

        this.redirect('#/home');
    } catch (err) {
        showError(err.message);
    }
}

export async function loginPost() {

    try {

        const result = await login(this.params.email, this.params.password);
        checkResult(result);

        this.app.userData.email = result.email;
        this.app.userData.userId = result.objectId;

        showInfo('Login successful');

        this.redirect('#/home');
    } catch (err) {
        showError(err.message);
    }
}