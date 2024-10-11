<template>
  <div>
    <br />
    <div class="card col-md-6 offset-md-3">
      <h3 class="text-center">CHI TIẾT SẢN PHẨM</h3>
      <div class="card-body">
        <div class="row">
          <label>Mã sản phẩm</label>
          <div>{{ employee.empNo }}</div>
        </div>
        <div class="row">
          <label>Sản phẩm</label>
          <div>{{ employee.empName }}</div>
        </div>
        <div class="row">
          <label>Ảnh minh họa</label>
          <div>
            <img v-if="employee.photoUrl" :src="getPhotoUrl(employee.photoUrl)" :alt="employee.empName" width="100" height="100" />
            <div v-else>No photo available</div>
          </div>
        </div>
        <div class="row">
          <label>Số lượng còn lại</label>
          <div>{{ employee.quantity }}</div>
        </div>
        <div class="row">
          <label>Giá</label>
          <div>{{ employee.price }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EmployeeService from "../services/EmployeeService";
import AuthService from "../services/AuthService";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

export default {
  setup() {
    const route = useRoute();
    const employee = ref({});
    const id = route.params.id;

    const fetchEmployeeDetails = () => {
      EmployeeService.getEmployeeById(id)
        .then((res) => {
          employee.value = res.data;
        })
        .catch((error) => {
          console.error("Error fetching employee:", error);
        });
    };

    const addToCart = () => {
      let cart = AuthService.loadCart();
      const existingEmployee = cart.find(
        (item) => item.empNo === employee.value.empNo
      );
      if (existingEmployee) {
        cart = cart.map((item) =>
          item.empNo === employee.value.empNo
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        cart.push({ ...employee.value, quantity: 1 });
      }
      AuthService.saveCart(cart);
      alert("Sản phẩm đã được thêm vào giỏ hàng");
    };

    const getPhotoUrl = (photoUrl) => {
      return `http://localhost:8081${photoUrl}`;
    };
    onMounted(() => {
      fetchEmployeeDetails();
    });

    return {
      employee,
      addToCart,
      getPhotoUrl,
    };
  },
};
</script>

<style scoped>
.card {
  margin-top: 20px;
}
</style>
