<template>
    <div class="container mt-5">
        <div class="card shadow">
            <div class="card-header bg-warning text-dark">
                <h2 class="mb-0">Update Employee Records</h2>
            </div>
            <div class="card-body">
                <div v-if="loading" class="text-center">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <p class="mt-2">Loading employees...</p>
                </div>

                <div v-else-if="list.length === 0" class="alert alert-info" role="alert">
                    No employees to update.
                </div>

                <div v-else>
                    <div class="table-responsive mb-4">
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
                                        <button class="btn btn-sm btn-warning" @click="editItem(item)">Edit</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div v-if="editData.id" class="card border-primary mb-3">
                        <div class="card-header bg-primary text-white">
                            <h4 class="mb-0">Edit Employee #{{ editData.id }}</h4>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label for="editName" class="form-label">Name</label>
                                        <input type="text" class="form-control" id="editName" v-model="editData.name" placeholder="Employee name">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label for="editDesignation" class="form-label">Designation</label>
                                        <input type="text" class="form-control" id="editDesignation" v-model="editData.designation" placeholder="Designation">
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label for="editDepartment" class="form-label">Department</label>
                                        <input type="text" class="form-control" id="editDepartment" v-model="editData.department" placeholder="Department">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label for="editSalary" class="form-label">Salary</label>
                                        <input type="number" class="form-control" id="editSalary" v-model.number="editData.salary" placeholder="Salary">
                                    </div>
                                </div>
                            </div>

                            <div class="btn-group" role="group">
                                <button class="btn btn-success" @click="updateData" :disabled="updating">
                                    <span v-if="updating" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    {{ updating ? 'Updating...' : 'Update' }}
                                </button>
                                <button class="btn btn-secondary" @click="cancelEdit">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="successMessage" class="alert alert-success alert-dismissible fade show mt-3" role="alert">
                    {{ successMessage }}
                    <button type="button" class="btn-close" @click="successMessage = ''"></button>
                </div>

                <div v-if="errorMessage" class="alert alert-danger alert-dismissible fade show mt-3" role="alert">
                    {{ errorMessage }}
                    <button type="button" class="btn-close" @click="errorMessage = ''"></button>
                </div>

                <button v-if="!loading && !editData.id" @click="fetchData" class="btn btn-primary mt-3">
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
    name: "UpdateEmployee",
    data() {
        return {
            list: [],
            loading: true,
            updating: false,
            editData: {
                id: null,
                name: '',
                designation: '',
                department: '',
                salary: null
            },
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
                const res = await axios.get(getEndpoint('employee'));
                this.list = res.data;
            } catch (err) {
                this.errorMessage = 'Error loading employees: ' + err.message;
                console.error(err);
            } finally {
                this.loading = false;
            }
        },
        editItem(item) {
            this.editData = {
                id: item.id,
                name: item.name,
                designation: item.designation,
                department: item.department,
                salary: item.salary
            }
        },
        cancelEdit() {
            this.editData = {
                id: null,
                name: '',
                designation: '',
                department: '',
                salary: null
            };
        },
        async updateData() {
            if (!this.editData.name || !this.editData.designation || !this.editData.department || !this.editData.salary) {
                this.errorMessage = 'All fields are required!';
                setTimeout(() => this.errorMessage = '', 3000);
                return;
            }

            this.updating = true;
            this.errorMessage = '';
            this.successMessage = '';

            try {
                await axios.put(`${getEndpoint('employee')}/${this.editData.id}`, this.editData);
                this.successMessage = 'Employee updated successfully!';
                await this.fetchData();
                this.cancelEdit();
                setTimeout(() => this.successMessage = '', 3000);
            } catch (err) {
                this.errorMessage = 'Error updating employee: ' + err.message;
                setTimeout(() => this.errorMessage = '', 3000);
                console.error(err);
            } finally {
                this.updating = false;
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

.btn-group {
    display: flex;
    gap: 10px;
}
</style>