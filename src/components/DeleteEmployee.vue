<template>
    <div class="container mt-5">
        <div class="card shadow">
            <div class="card-header bg-danger text-white">
                <h2 class="mb-0">Delete Employee Records</h2>
            </div>
            <div class="card-body">
                <div v-if="loading" class="text-center">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <p class="mt-2">Loading employees...</p>
                </div>

                <div v-else-if="list.length === 0" class="alert alert-info" role="alert">
                    No employees to delete.
                </div>

                <div v-else class="table-responsive">
                    <table class="table table-hover table-striped">
                        <thead class="table-light">
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Designation</th>
                                <th>Department</th>
                                <th>Salary</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in list" :key="item.id">
                                <td><span class="badge bg-secondary">{{ item.id }}</span></td>
                                <td>{{ item.name }}</td>
                                <td>{{ item.designation }}</td>
                                <td>{{ item.department }}</td>
                                <td>${{ formatSalary(item.salary) }}</td>
                                <td>
                                    <button class="btn btn-sm btn-danger" @click="deleteItem(item.id)" :disabled="deleting === item.id">
                                        <span v-if="deleting === item.id" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div v-if="successMessage" class="alert alert-success alert-dismissible fade show mt-3" role="alert">
                    {{ successMessage }}
                    <button type="button" class="btn-close" @click="successMessage = ''"></button>
                </div>

                <div v-if="errorMessage" class="alert alert-danger alert-dismissible fade show mt-3" role="alert">
                    {{ errorMessage }}
                    <button type="button" class="btn-close" @click="errorMessage = ''"></button>
                </div>

                <button v-if="!loading" @click="fetchData" class="btn btn-primary mt-3">
                    <i class="bi bi-arrow-clockwise"></i> Refresh
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { getEndpoint } from '../api/config.js';

export default {
    name: "DeleteEmployee",
    data() {
        return {
            apiURL: getEndpoint('employee'),
            list: [],
            loading: true,
            deleting: null,
            successMessage: '',
            errorMessage: ''
        }
    },
    methods: {
        formatSalary(salary) {
            return new Intl.NumberFormat('en-US').format(salary);
        },
        async fetchData() {
            this.loading = true;
            this.errorMessage = '';
            try {
                const res = await axios.get(this.apiURL);
                this.list = res.data;
            } catch (err) {
                this.errorMessage = 'Error loading employees: ' + err.message;
                console.error(err);
            } finally {
                this.loading = false;
            }
        },

        async deleteItem(id) {
            if (!confirm('Are you sure you want to delete this employee? This action cannot be undone.')) {
                return;
            }

            this.deleting = id;
            this.errorMessage = '';
            this.successMessage = '';

            try {
                await axios.delete(`${this.apiURL}/${id}`);
                this.list = this.list.filter(item => item.id !== id);
                this.successMessage = 'Employee deleted successfully!';
                setTimeout(() => this.successMessage = '', 3000);
            } catch (err) {
                this.errorMessage = 'Error deleting employee: ' + err.message;
                console.error(err);
                setTimeout(() => this.errorMessage = '', 3000);
            } finally {
                this.deleting = null;
            }
        }
    },
    mounted() {
        this.fetchData();
    }
}
</script>

<style scoped>
.card {
    border: none;
    border-radius: 8px;
}

.card-header {
    border-radius: 8px 8px 0 0;
}

.table {
    margin-bottom: 0;
}

.table tbody tr:hover {
    background-color: #f5f5f5;
}

.badge {
    font-size: 0.85rem;
}

.btn-danger:hover {
    background-color: #dc3545;
}
</style>