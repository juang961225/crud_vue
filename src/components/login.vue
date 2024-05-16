<template>
    <div class="login-container">
        <div class="login-card">
            <h1 class="login-title">Login</h1>
            <form @submit.prevent="handleSubmit">
                <div class="input-group">
                    <label for="email">Correo electrónico:</label>
                    <input type="email" id="email" v-model="email" @input="validateEmail" />
                    <p v-if="emailError" class="error">{{ emailError }}</p>
                </div>
                <div class="input-group">
                    <label for="password">Contraseña:</label>
                    <input type="password" id="password" v-model="password" @input="validatePassword" />
                    <p v-if="passwordError" class="error">{{ passwordError }}</p>
                </div>
                <button type="submit" class="login-button" :disabled="!formValid">Iniciar sesión</button>
            </form>
        </div>
    </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { setLoggedIn } from '@/router';

export default {
    name: 'LoginComponent',
    data() {
        return {
            email: '',
            password: '',
            emailError: '',
            passwordError: '',
        };
    },
    computed: {
        formValid() {
            return !this.emailError && !this.passwordError && this.email && this.password;
        },
    },
    methods: {
        validateEmail() {
            const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
            if (!this.email) {
                this.emailError = 'El correo electrónico es obligatorio';
            } else if (!emailRegex.test(this.email)) {
                this.emailError = 'Ingrese un correo electrónico válido';
            } else {
                this.emailError = '';
            }
        },
        validatePassword() {
            if (!this.password) {
                this.passwordError = 'La contraseña es obligatoria';
            } else if (this.password.length < 8) {
                this.passwordError = 'La contraseña debe tener al menos 8 caracteres';
            } else {
                this.passwordError = '';
            }
        },
        async handleSubmit() {
            if (this.formValid) {
                try {
                    // Realizar inicio de sesión con Firebase
                    const auth = getAuth();
                    await signInWithEmailAndPassword(auth, this.email, this.password);

                    // Si el inicio de sesión es exitoso, actualizar el estado de loggedIn y redirigir a la ruta protegida
                    setLoggedIn(true);
                    this.$router.push('/ruta-protegida');
                } catch (error) {
                    // Manejar errores de inicio de sesión aquí (por ejemplo, mostrar un mensaje de error)
                    console.error('Error en el inicio de sesión:', error.message);
                }
            }
        },
    },
};
</script>

<style>
body {
    font-family: 'Roboto', sans-serif;
    margin: 0;
    background-color: #f5f5f5;
}

.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

.login-card {
    background-color: white;
    padding: 2rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    width: 100%;
}

.login-title {
    font-size: 2rem;
    font-weight: 500;
    margin-bottom: 1.5rem;
    text-align: center;
    color: #37474f;
}

.input-group {
    margin-bottom: 1rem;
}

label {
    display: inline-block;
    margin-bottom: 0.5rem;
    color: #37474f;
}

input {
    display: block;
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    line-height: 1.5;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
}

.error {
    color: red;
    font-size: 0.8rem;
    margin-top: 0.25rem;
}

.login-button {
    display: block;
    margin-top: 1rem;
    width: 100%;
    background-color: #007bff;
    border-color: #007bff;
    color: white;
    font-size: 1rem;
    line-height: 1.5;
    padding: 0.5rem;
    border-radius: 0.25rem;
    cursor: pointer;
    transition: background-color 0.3s, border-color 0.3s;
}

.login-button:hover,
.login-button:focus {
    background-color: #0069d9;
    border-color: #0062cc;
}

.login-button:disabled {
    background-color: #007bff;
    border-color: #007bff;
    opacity: 0.5;
    cursor: not-allowed;
}
</style>
