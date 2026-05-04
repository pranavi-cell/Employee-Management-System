<template>
  <nav class="navbar navbar-dark bg-dark mb-5">
    <div class="container-fluid">
      <span class="navbar-brand mb-0 h1">
        <i class="bi bi-people-fill"></i> Employee Management System
      </span>
    </div>
  </nav>

  <main class="pb-5">
    <section id="create" class="mb-5">
      <EmployeeComp />
    </section>

    <hr class="my-5">

    <section id="view" class="mb-5">
      <EmployeeList />
    </section>

    <hr class="my-5">

    <section id="update" class="mb-5">
      <UpdateEmployee />
    </section>

    <hr class="my-5">

    <section id="delete" class="mb-5">
      <DeleteEmployee />
    </section>
  </main>

  <footer class="bg-light text-center py-3 mt-5 border-top">
    <div class="container">
      <p class="mb-0">&copy; 2024 Employee Management System. All rights reserved.</p>
    </div>
  </footer>
</template>

<script>
import DeleteEmployee from './components/DeleteEmployee.vue';
import EmployeeComp from './components/EmployeeComp.vue';
import EmployeeList from './components/EmployeeList.vue';
import UpdateEmployee from './components/UpdateEmployee.vue';

export default {
  name: 'App',
  components: {
    EmployeeComp,
    EmployeeList,
    UpdateEmployee,
    DeleteEmployee
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f8f9fa;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}

hr {
  border: none;
  border-top: 2px solid #dee2e6;
  margin-top: 3rem !important;
  margin-bottom: 3rem !important;
}

footer {
  margin-top: auto;
}
</style>
