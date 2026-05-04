<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card shadow">
                    <div class="card-header bg-primary text-white">
                        <h2 class="mb-0">Add New Employee</h2>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="postData">
                            <div class="mb-3">
                                <label for="name" class="form-label">Employee Name <span class="text-danger">*</span></label>
                                <input type="text" class="form-control" id="name" v-model="employee.name" placeholder="Enter employee name" required>
                            </div>

                            <div class="mb-3">
                                <label for="designation" class="form-label">Designation <span class="text-danger">*</span></label>
                                <input type="text" class="form-control" id="designation" v-model="employee.designation" placeholder="Enter designation" required>
                            </div>

                            <div class="mb-3">
                                <label for="department" class="form-label">Department <span class="text-danger">*</span></label>
                                <input type="text" class="form-control" id="department" v-model="employee.department" placeholder="Enter department" required>
                            </div>

                            <div class="mb-3">
                                <label for="salary" class="form-label">Salary <span class="text-danger">*</span></label>
                                <input type="number" class="form-control" id="salary" v-model.number="employee.salary" placeholder="Enter salary" required>
                            </div>

                            <button type="submit" class="btn btn-success w-100" :disabled="loading">
                                <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                {{ loading ? 'Posting...' : 'Add Employee' }}
                            </button>
                        </form>

                        <div v-if="successMessage" class="alert alert-success alert-dismissible fade show mt-3" role="alert">
                            {{ successMessage }}
                            <button type="button" class="btn-close" @click="successMessage = ''"></button>
                        </div>

                        <div v-if="errorMessage" class="alert alert-danger alert-dismissible fade show mt-3" role="alert">
                            {{ errorMessage }}
                            <button type="button" class="btn-close" @click="errorMessage = ''"></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import { getEndpoint } from '../api/config.js';

    export default {
        name: "EmployeeCreate",
        data() {
            return {
                employee: {
                    name: '',
                    designation: '',
                    department: '',
                    salary: 0
                },
                loading: false,
                successMessage: '',
                errorMessage: ''
            }
        },
        methods: {
            resetForm() {
                this.employee = {
                    name: '',
                    designation: '',
                    department: '',
                    salary: 0
                };
            },
            async postData() {
                // Validation
                if (!this.employee.name || !this.employee.designation || !this.employee.department || !this.employee.salary) {
                    this.errorMessage = 'All fields are required!';
                    setTimeout(() => this.errorMessage = '', 3000);
                    return;
                }

                if (this.employee.salary < 0) {
                    this.errorMessage = 'Salary must be a positive number!';
                    setTimeout(() => this.errorMessage = '', 3000);
                    return;
                }

                this.loading = true;
                this.errorMessage = '';
                this.successMessage = '';

                try {
                    await axios.post(getEndpoint('employee'), {
                        name: this.employee.name,
                        designation: this.employee.designation,
                        department: this.employee.department,
                        salary: this.employee.salary
                    });
                    
                    this.successMessage = 'Employee added successfully!';
                    this.resetForm();
                    setTimeout(() => this.successMessage = '', 3000);
                } catch (err) {
                    this.errorMessage = 'Error adding employee: ' + (err.response?.data?.message || err.message);
                    setTimeout(() => this.errorMessage = '', 3000);
                    console.error(err);
                } finally {
                    this.loading = false;
                }
            }
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
    
    .form-control:focus {
        border-color: #0d6efd;
        box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
    }
</style>