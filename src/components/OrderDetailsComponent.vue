<template>
    <div>
      <h2 class="text-center">CHI TIẾT ĐƠN HÀNG</h2>
      <div class="row">
        <div class="col-md-8">
          <h3>Tổng hợp đơn hàng</h3>
          <ul class="list-group">
            <li
              v-for="detail in orderDetails"
              :key="detail.orderDetailId"
              class="list-group-item"
            >
              {{ detail.empNo }} x {{ detail.quantity }} = ${{ detail.price * detail.quantity }}
            </li>
          </ul>
          <h4>Tổng cộng: ${{ order.totalAmount }}</h4>
        </div>
        <div class="col-md-4">
          <h3>Thông tin chi tiết</h3>
          <p>Địa chỉ: {{ order.address }}</p>
          <p>Số điện thoại: {{ order.phone }}</p>
          <p>Ghi chú: {{ order.note }}</p>
          <p>Ngày đặt hàng: {{ formatDate(order.orderDate) }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { ref, onMounted } from 'vue';
  import AuthService from '../services/AuthService';
  import { useRoute } from 'vue-router';
  
  export default {
    setup() {
      const route = useRoute();
      const orderId = route.params.orderId;
      const order = ref({});
      const orderDetails = ref([]);
  
      const fetchOrderDetails = () => {
        axios.get(`http://localhost:8080/orders/${orderId}`, {
          headers: AuthService.authHeader(),
        }).then((response) => {
          order.value = response.data;
        }).catch((error) => {
          console.error('Error fetching order!', error);
        });
  
        axios.get(`http://localhost:8080/orders/details/${orderId}`, {
          headers: AuthService.authHeader(),
        }).then((response) => {
          orderDetails.value = response.data;
        }).catch((error) => {
          console.error('Error fetching order details!', error);
        });
      };
  
      const formatDate = (date) => {
        return new Date(date).toLocaleString();
      };
  
      onMounted(() => {
        fetchOrderDetails();
      });
  
      return {
        order,
        orderDetails,
        formatDate,
      };
    },
  };
  </script>
  
  <style scoped>
  .list-group-item {
    margin-bottom: 10px;
  }
  </style>
  