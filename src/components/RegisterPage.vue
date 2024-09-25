<template>
    <div :style="styles.container">
      <div :style="styles.card">
        <form @submit.prevent="handleRegister">
          <div :style="styles.formGroup">
            <label for="username">Username</label>
            <input
              v-model="username"
              type="text"
              name="username"
              :style="styles.input"
            />
          </div>
          <div :style="styles.formGroup">
            <label for="password">Password</label>
            <input
              v-model="password"
              type="password"
              name="password"
              :style="styles.input"
            />
          </div>
          <div :style="styles.formGroup">
            <label for="role">Role</label>
            <select v-model="role" name="role" :style="styles.select">
              <option value="0">Admin</option>
              <option value="1">User</option>
            </select>
          </div>
          <div :style="styles.formGroup">
            <button :style="styles.button" :disabled="loading">
              <span v-if="loading" :style="styles.spinner"></span>
              <span>Đăng ký</span>
            </button>
          </div>
          <div v-if="message" :style="styles.formGroup">
            <div :style="styles.alert">{{ message }}</div>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from "vue";
  import AuthService from "../services/AuthService";
  import { useRouter } from "vue-router";
  
  export default {
    setup() {
      const router = useRouter();
      const username = ref("");
      const password = ref("");
      const role = ref(1);
      const loading = ref(false);
      const message = ref("");
  
      const handleRegister = () => {
        loading.value = true;
        message.value = "";
        AuthService.register(username.value, password.value, role.value)
          .then(() => {
            router.push("/login");
            window.location.reload();
          })
          .catch((error) => {
            const resMessage =
              (error.response && error.response.data && error.response.data.message) ||
              error.message ||
              error.toString();
            message.value = resMessage;
            loading.value = false;
          });
      };
  
      const styles = {
        container: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#f4f4f4",
        },
        card: {
          width: "350px",
          padding: "20px",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        },
        formGroup: {
          marginBottom: "15px",
        },
        input: {
          width: "100%",
          padding: "10px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          marginBottom: "10px",
        },
        select: {
          width: "100%",
          padding: "10px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          marginBottom: "10px",
        },
        button: {
          width: "100%",
          padding: "10px",
          backgroundColor: "#007bff",
          color: "#fff",
          borderRadius: "4px",
          border: "none",
          cursor: "pointer",
        },
        spinner: {
          marginRight: "5px",
          width: "16px",
          height: "16px",
          border: "2px solid #f3f3f3",
          borderTop: "2px solid #007bff",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        },
        alert: {
          color: "red",
          fontSize: "14px",
        },
      };
  
      return {
        username,
        password,
        role,
        loading,
        message,
        handleRegister,
        styles,
      };
    },
  };
  </script>
  
  <style scoped>
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  </style>
  