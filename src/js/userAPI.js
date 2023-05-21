export class Login {

    constructor(username = '', password = '') {
        this.username = username;
        this.password = password;
        this._url = `https://parseapi.back4app.com/login?username=${this.username}&password=${this.password}`;
        this._options = {
            method: 'get',
            headers: {
                'X-Parse-Application-Id': '8t5ZKASH24D5ML6z49AYtS9zUJRzwtRtQIL6IHkO',
			    'X-Parse-REST-API-Key': 'pcTtwjZ1vW2tdIhlizzzKrAb7pBMDR1QJ2f81lO5',
			    'X-Parse-Revocable-Session': '1'
            }
        },
        this._sessionToken = '';
        this.ok = false;
        this.error = false;
    }

    async sendLogin() {
        try {
            const response = await fetch(this._url, this._options);
            if (!response.ok) {
                const error = new Error();
                error.name = 'LoginError';
                error.response = response;
                throw error;
            } else {
                const data = await response.json();
                this.ok = true;
                this._sessionToken = data.sessionToken;
                localStorage.setItem('sessionToken', this._sessionToken);
            }
        } catch(error) {
            this.error = true;
            if (error.name === 'LoginError') {
                const dataError = await error.response.json();
                error.message = `${dataError.code} ${dataError.error}`;
                console.error(error);
                throw error;
            } else {
                throw error; 
            }
        }
    }
}