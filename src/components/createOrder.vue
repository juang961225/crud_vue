<template>
    <div class="create-order-container">
        <h1>Crear nuevo pedido</h1>

        <form @submit.prevent="submitOrder">
            <input v-model="newOrder.orderNumber" placeholder="Número de pedido" class="input-style" />

            <table class="product-selection-table">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Agregar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="product in availableProducts" :key="product.id">
                        <td>{{ product.name }}</td>
                        <td>${{ product.price }}</td>
                        <td>
                            <input type="number" v-model="product.quantity" min="0" placeholder="Cantidad"
                                class="input-style" />
                        </td>
                        <td>
                            <button type="button" @click="addProductToOrder(product)" class="add-button"
                                :disabled="isProductAdded(product)">Agregar</button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <h2>Productos seleccionados:</h2>
            <ul>
                <li v-for="(item, index) in newOrder.products" :key="index">
                    {{ item.name }} - Cantidad: {{ item.quantity }} - Total: {{ item.total }}
                    <button @click="removeProductFromOrder(index)" class="btn-small btn-danger">Eliminar</button>
                </li>
            </ul>
            <p><strong>Total del pedido: {{ newOrder.total }}</strong></p>

            <button type="submit" class="submit-button">Enviar pedido</button>

        </form>
    </div>
</template>

<script>
import { db } from '../firebaseConfig';
import { collection, addDoc, getDocs } from "firebase/firestore";

export default {
    data() {
        return {
            newOrder: {
                orderNumber: '',
                products: [],
                total: 0,
            },
            availableProducts: [],
        };
    },
    async created() {
        await this.fetchProducts();
    },
    methods: {
        async fetchProducts() {
            const querySnapshot = await getDocs(collection(db, 'products'));
            this.availableProducts = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                quantity: 0
            }));
            console.log("Productos cargados:", this.availableProducts);
        },
        addProductToOrder(selectedProduct) {
            if (selectedProduct.quantity <= 0) {
                alert('please add a valid quantity')
                return;
            }
            const productTotal = selectedProduct.price * selectedProduct.quantity;
            const productToAdd = {
                ...selectedProduct,
                total: productTotal,
            };
            this.newOrder.products.push(productToAdd);
            this.calculateOrderTotal();
        },
        calculateOrderTotal() {
            this.newOrder.total = this.newOrder.products.reduce((acc, product) => acc + product.total, 0);
        },
        isProductAdded(product) {
            // Verificar que this.newOrder.products no sea nulo o indefinido
            if (!this.newOrder.products) {
                return false;
            }
            return this.newOrder.products.some(item => item.id === product.id);
        },
        removeProductFromOrder(index) {
            this.newOrder.products.splice(index, 1);
            this.calculateOrderTotal();
        },
        async submitOrder() {
            if (this.newOrder.products.length === 0) {
                alert("Please add at least one product to the order.");
                return;
            }
            await addDoc(collection(db, 'orders'), this.newOrder);
            alert("Order created successfully.");
            this.resetOrderForm();
        },
        resetOrderForm() {
            this.newOrder = {
                orderNumber: '',
                products: [],
                total: 0,
            };
            this.availableProducts.forEach(product => product.quantity = 0);
        }
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

.create-order-container {
    max-width: 800px;
    margin: auto;
    padding: 2rem;
    background-color: #f5f5f5;
    min-height: 100vh;
}

h1 {
    font-size: 2rem;
    font-weight: 500;
    margin-bottom: 1.5rem;
    text-align: center;
    color: #37474f;
}

.input-style {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 1rem;
}

.product-selection-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.product-selection-table th,
.product-selection-table td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
}

.product-selection-table th {
    background-color: #f5f5f5;
    color: #37474f;
}

.add-button {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background-color: #007bff;
    color: white;
    transition: background-color 0.3s;
}

.add-button:hover {
    background-color: #0069d9;
}

.submit-button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background-color: #28a745;
    color: white;
    transition: background-color 0.3s;
}

.submit-button:hover {
    background-color: #218838;
}

ul {
    list-style: none;
    padding: 0;
}

li {
    background-color: #e9ecef;
    padding: 10px;
    border-radius: 4px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.btn-small {
    border-radius: 4px;
    cursor: pointer;
}

.btn-danger {
    background-color: #dc3545;
    color: white;
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
    border: none;
    border-radius: 4px;
}

.btn-danger:hover {
    background-color: #c82333;
}

h2,
p {
    margin-top: 20px;
}
</style>