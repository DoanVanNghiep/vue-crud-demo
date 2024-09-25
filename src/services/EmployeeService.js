import axios from 'axios';
import AuthService from './AuthService';

const API_URL = 'http://localhost:8081/employees';

class EmployeeService {
  getEmployees() {
    return axios.get(API_URL, { headers: AuthService.authHeader() });
  }

  createEmployee(employee) {
    return axios.post(API_URL, employee, { headers: AuthService.authHeader() });
  }

  getEmployeeById(employeeId) {
    return axios.get(`${API_URL}/${employeeId}`, { headers: AuthService.authHeader() });
  }

  updateEmployee(employeeId, employee) {
    return axios.put(`${API_URL}/${employeeId}`, employee, { headers: AuthService.authHeader() });
  }

  deleteEmployee(employeeId) {
    return axios.delete(`${API_URL}/${employeeId}`, { headers: AuthService.authHeader() });
  }

  uploadPhoto(photo) {
    return axios.post(`${API_URL}/upload`, photo, {
      headers: {
        'Content-Type': 'multipart/form-data',
        ...AuthService.authHeader(),
      },
    });
  }
}

export default new EmployeeService();
