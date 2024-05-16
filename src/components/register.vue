<template>
    <div class="register-container">
        <div class="register-card">
            <h1 class="register-title">Registro</h1>
            <form @submit.prevent="handleSubmit">
                <div class="input-group">
                    <label for="name">Nombre:</label>
                    <input type="text" id="name" v-model="formData.name" @input="validateName" required>
                    <p v-if="nameError" class="error">{{ nameError }}</p>
                </div>
                <div class="input-group">
                    <label for="email">Correo electrónico:</label>
                    <input type="email" id="email" v-model="formData.email" @input="validateEmail" required>
                    <p v-if="emailError" class="error">{{ emailError }}</p>
                </div>
                <div class="input-group">
                    <label for="password">Contraseña:</label>
                    <input type="password" id="password" v-model="formData.password" @input="validatePassword" required>
                    <p v-if="passwordError" class="error">{{ passwordError }}</p>
                </div>
                <div class="input-group">
                    <label for="confirm-password">Confirmar contraseña:</label>
                    <input type="password" id="confirm-password" v-model="formData.confirmPassword"
                        @input="validateConfirmPassword" required>
                    <p v-if="confirmPasswordError" class="error">{{ confirmPasswordError }}</p>
                </div>
                <button type="submit" class="register-button" :disabled="!formValid">Registrarse</button>
            </form>
        </div>
    </div>
</template>

<script>
import { auth } from '@/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setLoggedIn } from '@/router';

export default {
    name: 'RegisterComponent',
    data() {
        return {
            formData: {
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
            },
            nameError: '',
            emailError: '',
            passwordError: '',
            confirmPasswordError: '',
        };
    },
    computed: {
        formValid() {
            return (
                !this.nameError &&
                !this.emailError &&
                !this.passwordError &&
                !this.confirmPasswordError &&
                this.formData.name &&
                this.formData.email &&
                this.formData.password &&
                this.formData.confirmPassword
            );
        },
    },
    methods: {
        validateName() {
            if (!this.formData.name) {
                this.nameError = 'El nombre es obligatorio';
            } else {
                this.nameError = '';
            }
        },
        validateEmail() {
            const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.){1,}[a-zA-Z]{2,}$/;
            if (!this.formData.email) {
                this.emailError = 'El correo electrónico es obligatorio';
            } else if (!emailRegex.test(this.formData.email)) {
                this.emailError = 'Ingrese un correo electrónico válido';
            } else {
                this.emailError = '';
            }
        },
        validatePassword() {
            if (!this.formData.password) {
                this.passwordError = 'La contraseña es obligatoria';
            } else if (this.formData.password.length < 8) {
                this.passwordError = 'La contraseña debe tener al menos 8 caracteres';
            } else {
                this.passwordError = '';
            }
        },
        validateConfirmPassword() {
            if (!this.formData.confirmPassword) {
                this.confirmPasswordError = 'Confirmar contraseña es obligatorio';
            } else if (this.formData.password !== this.formData.confirmPassword) {
                this.confirmPasswordError = 'Las contraseñas no coinciden';
            } else {
                this.confirmPasswordError = '';
            }
        },
        async handleSubmit() {
            if (this.formValid) {
                try {
                    // Realizar registro con Firebase
                    await createUserWithEmailAndPassword(auth, this.formData.email, this.formData.password);

                    // Si el registro es exitoso, actualizar el estado de loggedIn y redirigir a la ruta protegida
                    setLoggedIn(true);
                    this.$router.push('/ruta-protegida');
                } catch (error) {
                    // Manejar errores de registro aquí (por ejemplo, mostrar un mensaje de error)
                    console.error('Error en el registro:', error.message);
                }
            }
        },
    },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap');

body {
    font-family: 'Roboto', sans-serif;
    margin: 0;
    background-color: #f5f5f5;
}

.register-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

.register-card {
    background-color: white;
    padding: 2rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    width: 100%;
}

.register-title {
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

.register-button {
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

.register-button:hover,
.register-button:focus {
    background-color: #0069d9;
    border-color: #0062cc;
}

.register-button:disabled {
    background-color: #007bff;
    border-color: #007bff;
    opacity: 0.5;
    cursor: not-allowed;
}
</style>