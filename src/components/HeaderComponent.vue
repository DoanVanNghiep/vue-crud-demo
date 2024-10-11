<template>
  <header :style="styles.header">
    <nav :style="styles.navbar">
      <div>
        <router-link :to="homeLink" :style="styles.brand">Vue CRUD Web</router-link>
      </div>
      <div :style="styles.navItems">
        <template v-if="isLoggedIn">
          <!-- Thay đổi dòng chào mừng khi đăng nhập -->
          <template v-if="role === 0">
            <button @click="navigateTo('/employee')" :style="styles.button" style="text-decoration: none">Quản lý sản phẩm</button>
          </template>
          <template v-if="role === 0">
            <button @click="navigateTo('/order-manage')" :style="styles.button" style="text-decoration: none">Quản lý đơn hàng</button>
          </template>
          <template v-if="role === 1">
            <button @click="navigateTo('/cart')" :style="styles.button" style="text-decoration: none">Giỏ hàng</button>
          </template>
          <!-- Hiển thị tên người dùng khi đăng nhập -->
          <span :style="styles.welcome">Xin chào, {{ username }}</span>
          <button @click="logout" :style="styles.button" style="text-decoration: none">Đăng xuất</button>
        </template>
        <template v-else>
          <!-- Nếu chưa đăng nhập -->
          <button @click="navigateTo('/login')" :style="styles.button" style="text-decoration: none">Đăng nhập</button>
          <button @click="navigateTo('/register')" :style="styles.button" style="text-decoration: none">Đăng ký</button>
        </template>
      </div>
    </nav>
  </header>
</template>

<script>
import AuthService from "../services/AuthService";
import { inject } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const isLoggedIn = inject('isLoggedIn');
    const username = inject('username');
    const role = inject('role');

    // Khôi phục trạng thái từ localStorage nếu tồn tại
    if (localStorage.getItem("isLoggedIn")) {
      isLoggedIn.value = true;
      username.value = localStorage.getItem("username");
      role.value = Number(localStorage.getItem("role"));
    }

    const homeLink = role.value === 0 ? "/employee" : "/user";

    const navigateTo = (path) => {
      router.push(path);
    };

    const logout = () => {
      AuthService.logout();
      isLoggedIn.value = false;

      // Xóa thông tin khỏi localStorage khi người dùng đăng xuất
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("username");
      localStorage.removeItem("role");

      router.push("/login");
    };
    
    const styles = {
      header: { backgroundColor: "#343a40", padding: "10px 20px" },
      navbar: { display: "flex", justifyContent: "space-between", alignItems: "center" },
      brand: { color: "#fff", textDecoration: "none", fontSize: "1.5rem", fontWeight: "bold" },
      navItems: { display: "flex", gap: "10px" },
      button: { backgroundColor: "transparent", border: "none", color: "#fff", fontSize: "1rem", cursor: "pointer", padding: "5px 10px", textDecoration: "underline" },
      welcome: { color: "#fff", marginRight: "15px", fontSize: "1rem" },
    };

    return {
      isLoggedIn,
      username,
      role,
      homeLink,
      logout,
      navigateTo,
      styles,
    };
  },
};

</script>
