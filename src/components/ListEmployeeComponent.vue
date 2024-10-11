<template>
  <div class="container">
    <h2 class="text-center mt-4">QUẢN LÝ SẢN PHẨM</h2>
    <div class="row mb-3 text-right">
      <button class="btn btn-success" @click="addEmployee">+ Thêm sản phẩm</button>
    </div>
    <div class="row">
      <table class="table table-hover table-bordered shadow-sm">
        <thead class="thead-dark">
          <tr>
            <th>Mã sản phẩm</th>
            <th>Sản phẩm</th>
            <th>Số lượng còn lại</th>
            <th>Giá</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="employee in employees" :key="employee.empNo" class="table-row">
            <td>{{ employee.empNo }}</td>
            <td>{{ employee.empName }}</td>
            <td>{{ employee.quantity }}</td>
            <td>{{ employee.price }} VND</td>
            <td>
              <button @click="updateEmployee(employee.empNo)" class="btn btn-info btn-sm">Sửa</button>
              <button @click="confirmDeleteEmployee(employee.empNo)" class="btn btn-danger btn-sm ml-2">Xóa</button>
              <button @click="viewEmployee(employee.empNo)" class="btn btn-primary btn-sm ml-2">Chi tiết</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <div v-if="showModal" :style="modalOverlayStyle">
      <div :style="modalContentStyle">
        <h4>Bạn có chắc chắn muốn xóa sản phẩm này không?</h4>
        <div class="mt-4">
          <button @click="deleteEmployee" class="btn btn-danger">Đồng ý</button>
          <button @click="closeModal" class="btn btn-secondary ml-2">Hủy</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EmployeeService from "../services/EmployeeService";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const employees = ref([]);
    const employeeToDelete = ref(null);
    const showModal = ref(false);
    const router = useRouter();

    const fetchEmployees = () => {
      EmployeeService.getEmployees().then((res) => {
        employees.value = res.data;
      });
    };

    const viewEmployee = (id) => {
      router.push(`/view-employee/${id}`);
    };

    const updateEmployee = (id) => {
      router.push(`/update-employee/${id}`);
    };

    const confirmDeleteEmployee = (id) => {
      employeeToDelete.value = id;
      showModal.value = true;
    };

    const deleteEmployee = () => {
      EmployeeService.deleteEmployee(employeeToDelete.value).then(() => {
        employees.value = employees.value.filter(
          (employee) => employee.empNo !== employeeToDelete.value
        );
        employeeToDelete.value = null;
        showModal.value = false;
      });
    };

    const closeModal = () => {
      showModal.value = false;
    };

    const addEmployee = () => {
      router.push("/add-employee/_add");
    };

    onMounted(() => {
      fetchEmployees();
    });

    const modalOverlayStyle = {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    };

    const modalContentStyle = {
      backgroundColor: "#fff",
      padding: "30px",
      borderRadius: "10px",
      textAlign: "center",
      boxShadow: "0px 0px 20px rgba(0,0,0,0.4)",
      maxWidth: "400px",
      width: "100%",
    };

    return {
      employees,
      employeeToDelete,
      showModal,
      viewEmployee,
      updateEmployee,
      confirmDeleteEmployee,
      deleteEmployee,
      closeModal,
      addEmployee,
      modalOverlayStyle,
      modalContentStyle,
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

.table {
  margin-top: 20px;
}

.table-row:hover {
  background-color: #f1f1f1;
}

thead {
  background-color: #343a40;
  color: white;
}

button {
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: rgb(94, 89, 89);
}

.ml-2 {
  margin-left: 10px;
}
</style>
