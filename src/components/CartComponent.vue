<template>
    <div>
      <h2 class="text-center">Giỏ hàng</h2>
      <div class="row">
        <table class="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Mã sản phẩm</th>
              <th>Sản phẩm</th>
              <th>Số lượng</th>
              <th>Giá</th>
              <th>Tổng cộng</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="employee in cart" :key="employee.empNo">
              <td>{{ employee.empNo }}</td>
              <td>{{ employee.empName }}</td>
              <td>
                <div class="input-group">
                  <button @click="decrementQuantity(employee.empNo)" class="btn btn-danger">-</button>
                  <input type="text" class="form-control text-center" :value="employee.quantity" readonly />
                  <button @click="incrementQuantity(employee.empNo)" class="btn btn-success">+</button>
                </div>
              </td>
              <td>{{ employee.price }}</td>
              <td>{{ (employee.price * employee.quantity).toFixed(2) }}</td>
              <td>
                <button @click="removeItem(employee.empNo)" class="btn btn-warning">Xóa đơn hàng</button>
              </td>
            </tr>
          </tbody>
        </table>
        <h3>Tổng tiền: ${{ calculateTotal() }}</h3>
        <button class="btn btn-primary" @click="$router.push('/checkout')">Thanh toán</button>
      </div>
    </div>
  </template>
  
  <script>
  import AuthService from "../services/AuthService";
  
  export default {
    data() {
      return {
        cart: AuthService.loadCart(),
      };
    },
    methods: {
      incrementQuantity(empNo) {
        this.cart = this.cart.map((item) =>
          item.empNo === empNo
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        AuthService.saveCart(this.cart);
      },
      decrementQuantity(empNo) {
        this.cart = this.cart.map((item) =>
          item.empNo === empNo
            ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
            : item
        );
        AuthService.saveCart(this.cart);
      },
      removeItem(empNo) {
        this.cart = this.cart.filter((item) => item.empNo !== empNo);
        AuthService.saveCart(this.cart);
      },
      calculateTotal() {
        return this.cart
          .reduce((total, item) => total + item.price * item.quantity, 0)
          .toFixed(2);
      },
    },
  };
  </script>