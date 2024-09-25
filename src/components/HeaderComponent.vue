<template>
  <header :style="styles.header">
    <nav :style="styles.navbar">
      <div>
        <router-link :to="homeLink" :style="styles.brand">Vue CRUD Web</router-link>
      </div>
      <div :style="styles.navItems">
        <template v-if="isLoggedIn">
          <template v-if="role === 0">
            <button @click="navigateTo('/employee')" :style="styles.button" style="text-decoration: none">Quản lý sản phẩm</button>
          </template>
          <template v-if="role === 0">
            <button @click="navigateTo('/order-manage')" :style="styles.button" style="text-decoration: none">Quản lý đơn hàng</button>
          </template>
          <template v-if="role === 1">
            <button @click="navigateTo('/cart')" :style="styles.button" style="text-decoration: none">Giỏ hàng</button>
          </template>
          <span :style="styles.welcome">Welcome, {{ username }}</span>
          <button @click="logout" :style="styles.button" style="text-decoration: none">Đăng xuất</button>
        </template>
        <template v-else>
          <button @click="navigateTo('/login')" :style="styles.button" style="text-decoration: none">Đăng nhập</button>
          <button @click="navigateTo('/register')" :style="styles.button" style="text-decoration: none">Đăng ký</button>
        </template>
      </div>
    </nav>
  </header>
</template>

<script>
import AuthService from "../services/AuthService";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const isLoggedIn = ref(false);
    const username = ref("");
    const role = ref(null);
    const homeLink = ref("/");

    const navigateTo = (path) => {
      router.push(path);
    };

    const logout = () => {
      AuthService.logout();
      isLoggedIn.value = false;
      router.push("/login");
    };

    onMounted(() => {
      const user = AuthService.getCurrentUser();
      if (user) {
        isLoggedIn.value = true;
        username.value = user.username;
        role.value = AuthService.getCurrentUserRole();
        homeLink.value = role.value === 0 ? "/employee" : "/user";
      }
    });

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
