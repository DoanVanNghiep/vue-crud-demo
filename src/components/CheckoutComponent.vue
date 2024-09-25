<template>
    <div>
      <h2 class="text-center">THANH TOÁN</h2>
      <div class="row">
        <div class="col-md-8">
          <h3>Tổng hợp đơn hàng</h3>
          <ul class="list-group">
            <li v-for="item in cart" :key="item.empNo" class="list-group-item">
              {{ item.empName }} x {{ item.quantity }} = ${{ item.price * item.quantity }}
            </li>
          </ul>
          <h4>Tổng cộng: ${{ calculateTotal() }}</h4>
        </div>
        <div class="col-md-4">
          <h3>Thông tin chi tiết</h3>
          <div class="form-group">
            <label>Địa chỉ:</label>
            <input v-model="address" type="text" class="form-control" />
          </div>
          <div class="form-group">
            <label>Số điện thoại:</label>
            <input v-model="phone" type="text" class="form-control" />
          </div>
          <div class="form-group">
            <label>Ghi chú:</label>
            <textarea v-model="note" class="form-control"></textarea>
          </div>
          <button class="btn btn-success" @click="handleCheckout">Thanh toán khi nhận hàng</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import AuthService from "../services/AuthService";
  import axios from "axios";
  
  export default {
    data() {
      return {
        cart: AuthService.loadCart(),
        address: "",
        phone: "",
        note: "",
        orderId: null,
      };
    },
    methods: {
      calculateTotal() {
        return this.cart
          .reduce((total, item) => total + item.price * item.quantity, 0)
          .toFixed(2);
      },
      handleCheckout() {
        const orderData = {
          order: {
            userId: AuthService.getCurrentUser().user_id,
            orderDate: new Date(),
            totalAmount: this.calculateTotal(),
            address: this.address,
            phone: this.phone,
            note: this.note,
            status: 0,
          },
          orderDetails: this.cart.map((item) => ({
            empNo: item.empNo,
            quantity: item.quantity,
            price: item.price,
          })),
        };
  
        axios
          .post("http://localhost:8080/orders/create", orderData, {
            headers: AuthService.authHeader(),
          })
          .then((response) => {
            this.orderId = response.data.orderId;
            alert("Order successfully placed!");
            this.$router.push(`/order-details/${this.orderId}`);
          })
          .catch((error) => {
            console.error("There was an error placing the order!", error);
          });
      },
    },
  };
  </script>
  