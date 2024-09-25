<template>
    <div>
      <h2 class="text-center">Danh sách sản phẩm</h2>
      <div class="row">
        <div
          v-for="employee in employees"
          :key="employee.empNo"
          class="col-md-3"
        >
          <div class="card mb-4 shadow-sm" style="border: 1;">
            <div class="card-img-container" style="height: 200px; overflow: hidden;">
              <img
                v-if="employee.photoUrl"
                :src="getPhotoUrl(employee.photoUrl)"
                :alt="employee.empName"
                style="width: 100%; height: 100%; object-fit: cover;"
              />
              <div
                v-else
                class="no-photo"
                style="display: flex; align-items: center; justify-content: center; height: 100%; background-color: #f0f0f0;"
              >
                No photo available
              </div>
            </div>
            <div class="card-body">
              <h5 class="card-title">{{ employee.empName }}</h5>
              <p class="card-text">Mã sản phẩm: {{ employee.empNo }}</p>
              <p class="card-text">Giá: ${{ employee.price }}</p>
              <button @click="viewEmployee(employee.empNo)" class="btn btn-info">
                Chi tiết
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import EmployeeService from '../services/EmployeeService';
  import { useRouter } from 'vue-router';
  
  export default {
    setup() {
      const employees = ref([]);
      const router = useRouter();
  
      const fetchEmployees = () => {
        EmployeeService.getEmployees().then((res) => {
          employees.value = res.data;
        });
      };
  
      const viewEmployee = (id) => {
        router.push(`/view-employee/${id}`);
      };
  
      const getPhotoUrl = (photoUrl) => {
        return `http://localhost:8081${photoUrl}`;
      };
  
      onMounted(() => {
        fetchEmployees();
      });
  
      return {
        employees,
        viewEmployee,
        getPhotoUrl,
      };
    },
  };
  </script>
  
  <style scoped>
  .card-img-container {
    height: 200px;
    overflow: hidden;
  }
  .card-title {
    font-size: 1.25rem;
    margin-bottom: 10px;
  }
  </style>
  