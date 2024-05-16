<template>
    <div class="product-list-container">
        <h1>Lista de productos</h1>
        <div class="product-cards">
            <div class="product-card" v-for="product in products" :key="product.id">
                <div class="product-image">
                    <img :src="product.image || 'https://via.placeholder.com/150'" alt="imagen del producto" />
                </div>
                <div class="product-info">
                    <h2>{{ product.name }}</h2>
                    <p class="price">${{ product.price }}</p>
                    <p class="description">{{ product.description }}</p>
                </div>
                <div class="actions">
                    <button class="btn-small" @click="editProduct(product.id)">Editar</button>
                    <button class="btn-small btn-danger" @click="deleteProduct(product.id)">Eliminar</button>
                </div>
            </div>
        </div>
        <button class="add-button" @click="showAddProduct = true">Agregar nuevo producto</button>

        <transition name="modal">
            <div v-if="showAddProduct || selectedProduct" class="modal-overlay" @click.self="cancel">
                <div class="product-form">
                    <h2>{{ selectedProduct ? 'Editar producto' : 'Agregar nuevo producto' }}</h2>
                    <input v-model="productFrom.name" placeholder="Nombre">
                    <input v-model="productFrom.price" placeholder="Precio" type="number">
                    <textarea v-model="productFrom.description" placeholder="Descripción"></textarea>
                    <div class="form-actions">
                        <button class="submit-button" @click="submitProduct">{{ selectedProduct ? 'Actualizar' :
                'Enviar' }}</button>
                        <button class="cancel-button" @click="cancel">Cancelar</button>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import { db } from "../firebaseConfig";
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";

export default {
    data() {
        return {
            products: [],
            showAddProduct: false,
            selectedProduct: null,
            productFrom: {
                name: '',
                price: 0,
                description: '',
            },
        };
    },
    async created() {
        await this.fetchProducts();
    },
    methods: {
        async fetchProducts() {
            const querySnapshot = await getDocs(collection(db, 'products'));
            this.products = querySnapshot.docs
                .map(doc => ({ id: doc.id, ...doc.data() }))
                .sort((a, b) => a.name.localeCompare(b.name));
        },
        editProduct(id) {
            const product = this.products.find(product => product.id === id);
            this.productFrom = { ...product }
            this.selectedProduct = id;
            this.showAddProduct = true;
        },
        async deleteProduct(id) {
            await deleteDoc(doc(db, 'products', id));
            await this.fetchProducts();
        },
        async submitProduct() {
            if (this.selectedProduct) {
                await updateDoc(doc(db, 'products', this.selectedProduct), this.productFrom);
            } else {
                await addDoc(collection(db, 'products'), this.productFrom);
            }
            this.cancel();
            await this.fetchProducts();
        },
        cancel() {
            this.showAddProduct = false;
            this.selectedProduct = null;
            this.productFrom = { name: '', price: 0, description: '' };
        },
    }
}

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap');

body {
    font-family: 'Roboto', sans-serif;
    margin: 0;
    background-color: #f5f5f5;
}

.product-list-container {
    padding: 2rem;
    background-color: #f5f5f5;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

h1 {
    font-size: 2rem;
    font-weight: 500;
    margin-bottom: 1.5rem;
    color: #37474f;
}

.product-cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 2rem;
    width: 100%;
    max-width: 1200px;
    padding: 0 2rem;
}

.product-card {
    background-color: white;
    padding: 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    flex: 0 0 calc(25% - 2rem);
    margin: 1rem;
}

.product-image {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 150px;
    margin-bottom: 1rem;
    overflow: hidden;
}

.product-image img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
}

.product-info {
    flex-grow: 1;
}

.product-card h2 {
    font-size: 1.2rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
    color: #37474f;
}

.price {
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
    color: #37474f;
}

.description {
    margin-bottom: 1rem;
    color: #37474f;
}

.actions {
    display: flex;
    justify-content: space-between;
}

.btn-small {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background-color: #007bff;
    color: white;
}

.btn-small.btn-danger {
    background-color: #dc3545;
}

.btn-small:hover {
    background-color: #0069d9;
}

.btn-small.btn-danger:hover {
    background-color: #c82333;
}

.add-button {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background-color: #28a745;
    color: white;
    transition: background-color 0.3s;
}

.add-button:hover {
    background-color: #218838;
}

.modal {
    transition: all 0.3s;
}

.modal-enter,
.modal-leave-to {
    opacity: 0;
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.product-form {
    background-color: white;
    padding: 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
}

.product-form input,
.product-form textarea {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 1rem;
}

.form-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
}

.submit-button,
.cancel-button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.submit-button {
    background-color: #007bff;
    color: white;
    transition: background-color 0.3s;
}

.submit-button:hover {
    background-color: #0069d9;
}

.cancel-button {
    background-color: #ccc;
    color: black;
    transition: background-color 0.3s;
}

.cancel-button:hover {
    background-color: #999;
}
</style>