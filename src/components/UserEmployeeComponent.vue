<template>
  <div class="container">
    <!-- Menu điều hướng -->

    <!-- Phần nội dung chính -->
    <div class="row">
      <!-- Danh mục sách bên trái -->
      <!-- Danh sách sản phẩm bên phải -->
      <div class="rightcolumn">
        <div class="product-card" v-for="employee in employees" :key="employee.empNo">
          <img v-if="employee.photoUrl" :src="getPhotoUrl(employee.photoUrl)" :alt="employee.empName" class="product-img" />
          <div class="no-photo" v-else>No photo available</div>
          <h3>{{ employee.empName }}</h3>
          <p>Giá: {{ employee.price }}đ</p>
          <a :href="'/detailBook?bookId=' + employee.empNo" class="detail-link">Xem chi tiết</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import EmployeeService from '../services/EmployeeService';

export default {
  setup() {
    const employees = ref([]);

    const fetchEmployees = () => {
      EmployeeService.getEmployees().then((res) => {
        employees.value = res.data;
      });
    };

    const getPhotoUrl = (photoUrl) => {
      return `http://localhost:8081${photoUrl}`;
    };

    onMounted(() => {
      fetchEmployees();
    });

    return {
      employees,
      getPhotoUrl,
    };
  },
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: auto;
  padding: 20px;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f8f8f8;
  padding: 10px;
  margin-bottom: 20px;
}

.nav-item {
  margin-right: 15px;
  text-decoration: none;
  color: #000;
}

.nav-item.active {
  color: red;
}

.search-bar {
  display: flex;
  align-items: center;
}

.search-bar input {
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.btn-clear {
  background: none;
  border: none;
  color: #333;
  margin-left: 5px;
  cursor: pointer;
}

.row {
  display: flex;
}

.leftcolumn {
  flex: 1;
}

.rightcolumn {
  flex: 3;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.category-list {
  list-style: none;
  padding: 0;
}

.category-list li {
  margin-bottom: 10px;
  font-size: 16px;
}

.icon-book {
  margin-right: 5px;
  color: red;
}

.product-card {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  width: 200px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
}

.product-img {
  max-width: 100%;
  height: 200px;
}

.detail-link {
  color: #007bff;
  text-decoration: none;
}

.detail-link:hover {
  text-decoration: underline;
}
</style>
