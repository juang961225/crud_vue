<template>
    <div class="order-list-container">
        <h1>Lista de pedidos</h1>

        <table class="orders-table">
            <thead>
                <tr>
                    <th>Número de pedido</th>
                    <th>Total</th>
                    <th>Acción</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="order in orders" :key="order.id">
                    <td>{{ order.orderNumber }}</td>
                    <td>{{ order.total }}</td>
                    <td>
                        <button class="btn-small btn-danger" @click="deleteOrders(order.id)">Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <router-link to="/create-order" class="add-order-link">Agregar nuevo pedido</router-link>
    </div>
</template>

<script>
import { db } from '../firebaseConfig';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

export default {
    data() {
        return {
            orders: [],
        };
    },
    async created() {
        await this.fetchOrders();
    },
    methods: {
        async fetchOrders() {
            const querySnapshot = await getDocs(collection(db, 'orders'));
            this.orders = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        },
        async deleteOrders(id) {
            await deleteDoc(doc(db, 'orders', id));
            await this.fetchOrders();
        },

    },

}

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap');

body {
    font-family: 'Roboto', sans-serif;
    margin: 0;
    background-color: #f5f5f5;
}

.order-list-container {
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

.orders-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.orders-table th,
.orders-table td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
}

.orders-table th {
    background-color: #f5f5f5;
    color: #37474f;
}

.btn-small {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background-color: #dc3545;
    color: white;
    transition: background-color 0.3s;
}

.btn-small:hover {
    background-color: #c82333;
}

.add-order-link {
    display: inline-block;
    margin-top: 20px;
    padding: 0.5rem 1rem;
    text-decoration: none;
    background-color: #007bff;
    color: white;
    border-radius: 4px;
    transition: background-color 0.3s;
}

.add-order-link:hover {
    background-color: #0069d9;
}
</style>