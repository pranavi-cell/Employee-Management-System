<template>
    <div class="container mt-5">
        <div class="card shadow">
            <div class="card-header bg-info text-white">
                <h2 class="mb-0">Employee Directory</h2>
            </div>
            <div class="card-body">
                <div v-if="loading" class="text-center">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <p class="mt-2">Loading employees...</p>
                </div>

                <div v-else-if="list.length === 0" class="alert alert-info" role="alert">
                    No employees found.
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
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in list" :key="item.id">
                                <td><span class="badge bg-secondary">{{ item.id }}</span></td>
                                <td>{{ item.name }}</td>
                                <td>{{ item.designation }}</td>
                                <td>{{ item.department }}</td>
                                <td><strong>${{ formatSalary(item.salary) }}</strong></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div v-if="errorMessage" class="alert alert-danger alert-dismissible fade show mt-3" role="alert">
                    {{ errorMessage }}
                    <button type="button" class="btn-close" @click="errorMessage = ''"></button>
                </div>

                <button v-if="!loading" @click="refreshData" class="btn btn-primary mt-3">
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
    name: "EmployeeList",
    data() {
        return {
            list: [],
            loading: true,
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
                const res = await axios.get(getEndpoint('employee'));
                this.list = res.data;
            } catch (err) {
                this.errorMessage = 'Error loading employees: ' + err.message;
                console.error(err);
            } finally {
                this.loading = false;
            }
        },
        refreshData() {
            this.fetchData();
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
</style>