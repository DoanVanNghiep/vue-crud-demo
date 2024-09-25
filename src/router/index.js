import { createRouter, createWebHistory } from 'vue-router';
import ListEmployeeComponent from '../components/ListEmployeeComponent.vue';
import CreateEmployeeComponent from '../components/CreateEmployeeComponent.vue';
import UpdateEmployeeComponent from '../components/UpdateEmployeeComponent.vue';
import ViewEmployeeComponent from '../components/ViewEmployeeComponent.vue';
import UserEmployeeComponent from '../components/UserEmployeeComponent.vue';
import CartComponent from '../components/CartComponent.vue';
import CheckoutComponent from '../components/CheckoutComponent.vue';
import OrderDetailsComponent from '../components/OrderDetailsComponent.vue';
import OrderManageComponent from '../components/OrderManageComponent.vue';
import LoginPage from '../components/LoginPage.vue';
import RegisterPage from '../components/RegisterPage.vue';

const routes = [
  { path: '/', component: LoginPage },
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },
  { path: '/employee', component: ListEmployeeComponent },
  { path: '/add-employee/:id', component: CreateEmployeeComponent },
  { path: '/update-employee/:id', component: UpdateEmployeeComponent },
  { path: '/view-employee/:id', component: ViewEmployeeComponent },
  { path: '/user', component: UserEmployeeComponent },
  { path: '/cart', component: CartComponent },
  { path: '/checkout', component: CheckoutComponent },
  { path: '/order-details/:orderId', component: OrderDetailsComponent },
  { path: '/order-manage', component: OrderManageComponent },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
