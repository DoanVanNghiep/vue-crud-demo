<template>
  <div>
    <h2 class="text-center">QUẢN LÝ SẢN PHẨM</h2>
    <div class="row">
      <button class="btn btn-primary" @click="addEmployee">Thêm sản phẩm</button>
    </div>
    <br />
    <div class="row">
      <table class="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Mã sản phẩm</th>
            <th>Sản phẩm</th>
            <th>Số lượng còn lại</th>
            <th>Giá</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="employee in employees" :key="employee.empNo">
            <td>{{ employee.empNo }}</td>
            <td>{{ employee.empName }}</td>
            <td>{{ employee.quantity }}</td>
            <td>{{ employee.price }}</td>
            <td>
              <button @click="updateEmployee(employee.empNo)" class="btn btn-info">Sửa</button>
              <button @click="confirmDeleteEmployee(employee.empNo)" class="btn btn-danger" style="margin-left: 10px">Xóa</button>
              <button @click="viewEmployee(employee.empNo)" class="btn btn-info" style="margin-left: 10px">Chi tiết</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="showModal" :style="modalOverlayStyle">
      <div :style="modalContentStyle">
        <h4>Bạn có chắc chắn muốn xóa sản phẩm này không?</h4>
        <div>
          <button @click="deleteEmployee" class="btn btn-danger">Đồng ý</button>
          <button @click="closeModal" class="btn btn-secondary" style="margin-left: 10px">Hủy</button>
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
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    };

    const modalContentStyle = {
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "5px",
      textAlign: "center",
      boxShadow: "0px 0px 10px rgba(0,0,0,0.25)",
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
.table {
  margin-top: 20px;
}
</style>
