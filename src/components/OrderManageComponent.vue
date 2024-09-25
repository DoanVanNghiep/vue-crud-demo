<template>
    <div>
      <h2 class="text-center">Quản lý đơn hàng</h2>
      <div class="row">
        <div class="col-md-4">
          <label>Từ ngày:</label>
          <input type="date" v-model="startDate" class="form-control" />
        </div>
        <div class="col-md-4">
          <label>Đến ngày:</label>
          <input type="date" v-model="endDate" class="form-control" />
        </div>
        <div class="col-md-4 text-right">
          <button class="btn btn-primary mt-4" @click="handleDateChange">
            Lọc đơn hàng
          </button>
        </div>
        <div class="col-md-12 text-right">
          <h4>Tổng tiền: ${{ totalAmount }}</h4>
        </div>
      </div>
      <div class="row mt-3">
        <table class="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Mã đơn hàng</th>
              <th>Tên người dùng</th>
              <th>Ngày đặt hàng</th>
              <th>Tổng tiền</th>
              <th>Địa chỉ</th>
              <th>Số điện thoại</th>
              <th>Ghi chú</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders" :key="order[0]">
              <td>{{ order[0] }}</td>
              <td>{{ order[7] }}</td>
              <td>{{ formatDate(order[1]) }}</td>
              <td>{{ order[2] }}</td>
              <td>{{ order[3] }}</td>
              <td>{{ order[4] }}</td>
              <td>{{ order[5] }}</td>
              <td>{{ order[6] === 0 ? 'Chờ xử lý' : 'Đã bán' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import AuthService from '../services/AuthService';
  import { ref, onMounted } from 'vue';
  
  export default {
    setup() {
      const orders = ref([]);
      const startDate = ref('');
      const endDate = ref('');
      const totalAmount = ref(0);
  
      const fetchOrdersWithUsername = () => {
        axios.get('http://localhost:8080/orders/all-with-username', {
          headers: AuthService.authHeader(),
        }).then((response) => {
          orders.value = response.data;
          calculateTotalAmount(response.data);
        }).catch((error) => {
          console.error('Error fetching orders!', error);
        });
      };
  
      const fetchOrdersWithUsernameByDateRange = (start, end) => {
        axios.get('http://localhost:8080/orders/filter-by-date-range', {
          headers: AuthService.authHeader(),
          params: { startDate: start, endDate: end },
        }).then((response) => {
          orders.value = response.data;
          calculateTotalAmount(response.data);
        }).catch((error) => {
          console.error('Error fetching orders by date range!', error);
        });
      };
  
      const handleDateChange = () => {
        if (startDate.value && endDate.value) {
          fetchOrdersWithUsernameByDateRange(startDate.value, endDate.value);
        } else {
          fetchOrdersWithUsername();
        }
      };
  
      const calculateTotalAmount = (orders) => {
        const total = orders.reduce((sum, order) => sum + parseFloat(order[2]), 0);
        totalAmount.value = total.toFixed(2);
      };
  
      const formatDate = (date) => {
        return new Date(date).toLocaleString();
      };
  
      onMounted(() => {
        fetchOrdersWithUsername();
      });
  
      return {
        orders,
        startDate,
        endDate,
        totalAmount,
        handleDateChange,
        formatDate,
      };
    },
  };
  </script>
  