import {Login} from './userApi.js'
import {todoInit} from './index.js'
import {errorMessage} from './error.js'
import {showPreloader, hidePreloader} from './preloader.js'

export class LoginPage {

    constructor() {
        this.html = `<div class="window-login">
                        <div class="login-content">
                            <h3>Login</h3>
                            <form class="form">
                                <table class="form__table">
                                    <tr>
                                        <td><label for="username">имя пользователя</label></td>
                                        <td><input type="text" id="username" name="username"></td>
                                    </tr>
                                    <tr>
                                        <td><label for="password">пароль</label></td>
                                        <td><input type="password" id="password" name="password"></td>
                                    </tr>
                                </table>
                                <div class="form__control">
                                    <button class="form__button" type="submit">Войти</button>
                                    <button class="form__button" type="button">Создать</button>
                                </div>
                            </form>
                        </div>
                    </div>`;
    }

    open() {
        const loginPage = document.createElement('div');
        loginPage.innerHTML = this.html;
        document.body.append(loginPage);
        const form = document.body.querySelector('.window-login form');
        
        form.addEventListener('submit', submitLogin);


        async function submitLogin(e) {
            e.preventDefault();
            const username = e.target.elements.username.value;
            const password = e.target.elements.password.value;
            
            const login = new Login(username, password);
            try {
                showPreloader();
                await login.sendLogin();
            } catch(err) {
                errorMessage('Не удалось войти');
            } finally {
                hidePreloader();
            }

            if (login.ok) {
                const loginWindow = document.body.querySelector('.window-login').parentNode;
                e.target.removeEventListener('submit', submitLogin);
                loginWindow.remove();
                todoInit();
            }
        }
    }
}