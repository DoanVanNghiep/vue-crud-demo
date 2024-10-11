<template>
  <div class="container mt-4">
    <h3 v-if="id === '_add'" class="text-center mb-4">THÊM SẢN PHẨM</h3>
    <h3 v-else class="text-center mb-4">SỬA SẢN PHẨM</h3>
    <div class="row justify-content-center">
      <div class="card col-md-8 col-lg-6">
        <div class="card-body">
          <form @submit.prevent="updateEmployee">
            <div class="form-group mb-3">
              <label for="empNo">Mã sản phẩm</label>
              <input
                v-model="empNo"
                id="empNo"
                placeholder="Mã sản phẩm"
                class="form-control"
                readonly
              />
            </div>
            <div class="form-group mb-3">
              <label for="empName">Sản phẩm</label>
              <input
                v-model="empName"
                id="empName"
                placeholder="Tên sản phẩm"
                class="form-control"
              />
            </div>
            <div class="form-group mb-3">
              <label for="position">Loại sản phẩm</label>
              <input
                v-model="position"
                id="position"
                placeholder="Loại sản phẩm"
                class="form-control"
              />
            </div>
            <div class="form-group mb-3">
              <label for="quantity">Số lượng còn lại</label>
              <input
                v-model="quantity"
                id="quantity"
                type="number"
                placeholder="Số lượng còn lại"
                class="form-control"
              />
            </div>
            <div class="form-group mb-3">
              <label for="price">Giá</label>
              <input
                v-model="price"
                id="price"
                type="number"
                step="0.01"
                placeholder="Giá"
                class="form-control"
              />
            </div>
            <div class="form-group mb-3">
              <label for="photo">Ảnh minh họa</label>
              <input type="file" @change="changePhotoHandler" id="photo" class="form-control" />
            </div>
            <div v-if="photoUrl" class="form-group text-center mb-4">
              <img :src="photoUrl" alt="Ảnh sản phẩm" class="uploaded-image" />
            </div>
            <div class="d-flex justify-content-center">
              <button type="submit" class="btn btn-primary btn-custom">Lưu</button>
              <button @click="cancel" class="btn btn-secondary btn-custom ml-3">Hủy</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import EmployeeService from '../services/EmployeeService';
import { useRoute, useRouter } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const id = route.params.id;

    const empNo = ref("");
    const empName = ref("");
    const position = ref("");
    const quantity = ref(0);
    const price = ref(0.0);
    const photoUrl = ref(null);

    const updateEmployee = () => {
      const employee = {
        empNo: empNo.value,
        empName: empName.value,
        position: position.value,
        quantity: quantity.value,
        price: price.value,
        photoUrl: photoUrl.value,
      };

      EmployeeService.updateEmployee(id, employee)
        .then(() => {
          router.push("/employee");
        })
        .catch((error) => {
          console.error("Error updating employee:", error);
          alert("An error occurred while updating the employee. Please try again.");
        });
    };

    const cancel = () => {
      router.push("/employee");
    };

    const changePhotoHandler = (event) => {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("file", file);

      EmployeeService.uploadPhoto(formData)
        .then((response) => {
          photoUrl.value = response.data;
        })
        .catch((error) => {
          console.error("Error uploading photo:", error);
          alert("An error occurred while uploading the photo. Please try again.");
        });
    };

    onMounted(() => {
      EmployeeService.getEmployeeById(id).then((res) => {
        empNo.value = res.data.empNo;
        empName.value = res.data.empName;
        position.value = res.data.position;
        quantity.value = res.data.quantity;
        price.value = res.data.price;
        photoUrl.value = res.data.photoUrl;
      });
    });

    return {
      empNo,
      empName,
      position,
      quantity,
      price,
      photoUrl,
      updateEmployee,
      cancel,
      changePhotoHandler,
    };
  },
};
</script>

<style scoped>
.container {
  margin-top: 40px;
}

.card {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.form-group {
  margin-bottom: 15px;
}

.form-control {
  height: 45px;
  border-radius: 6px;
  padding: 10px;
}

.uploaded-image {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
  border: 2px solid #ddd;
  margin-top: 10px;
}

.btn-custom {
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 6px;
  transition: background-color 0.3s ease;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: #6c757d;
  border-color: #6c757d;
}

.btn-secondary:hover {
  background-color: #565e64;
}

.ml-3 {
  margin-left: 15px;
}

.text-center {
  text-align: center;
}
</style>
