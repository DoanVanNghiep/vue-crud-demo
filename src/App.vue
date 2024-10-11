<template>
  <div>
    <HeaderComponent />
    <router-view></router-view>
    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from "./components/HeaderComponent.vue";
import FooterComponent from "./components/FooterComponent.vue";
import { ref, provide } from "vue";

export default {
  components: {
    HeaderComponent,
    FooterComponent
  },
  setup() {
    const isLoggedIn = ref(false);
    const username = ref("");
    const role = ref(null);

    // Chia sẻ trạng thái đăng nhập cho toàn bộ ứng dụng
    provide('isLoggedIn', isLoggedIn);
    provide('username', username);
    provide('role', role);

    return {
      isLoggedIn,
      username,
      role
    };
  }
};
</script>
