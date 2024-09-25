// stores/user.js (với Pinia)
import { defineStore } from 'pinia';
import AuthService from '../services/AuthService';

export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: false,
    username: '',
  }),
  actions: {
    login(username, password) {
      return AuthService.login(username, password).then(() => {
        this.isLoggedIn = true;
        this.username = AuthService.getCurrentUser().username;
      });
    },
    logout() {
      AuthService.logout();
      this.isLoggedIn = false;
      this.username = '';
    },
  },
});
