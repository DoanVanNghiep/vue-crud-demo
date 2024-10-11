<template>
  <div>
    <h3 v-if="id === '_add'" class="text-center">THÊM SẢN PHẨM</h3>
    <h3 v-else class="text-center">THÊM SẢN PHẨM</h3>
    <div class="container">
      <div class="row justify-content-center">
        <div class="card col-md-6">
          <div class="card-body">
            <form @submit.prevent="saveOrUpdateEmployee">
              <div class="form-group">
                <label>Mã sản phẩm</label>
                <input
                  v-model="empNo"
                  placeholder="Mã sản phẩm"
                  class="form-control"
                />
              </div>
              <div class="form-group">
                <label>Sản phẩm</label>
                <input
                  v-model="empName"
                  placeholder="Tên sản phẩm"
                  class="form-control"
                />
              </div>
              <div class="form-group">
                <label>Loại sản phẩm</label>
                <input
                  v-model="position"
                  placeholder="Loại sản phẩm"
                  class="form-control"
                />
              </div>
              <div class="form-group">
                <label>Số lượng</label>
                <input
                  v-model="quantity"
                  type="number"
                  class="form-control"
                  placeholder="Số lượng"
                />
              </div>
              <div class="form-group">
                <label>Giá</label>
                <input
                  v-model="price"
                  type="number"
                  step="0.01"
                  class="form-control"
                  placeholder="Giá"
                />
              </div>
              <div class="form-group">
                <label>Ảnh minh họa</label>
                <input type="file" @change="changePhotoHandler" class="form-control" />
              </div>
              <div v-if="photoUrl" class="form-group text-center">
                <img :src="photoUrl" alt="Employee Photo" class="uploaded-image" />
              </div>
              <div class="form-group text-center">
                <button type="submit" class="btn btn-primary btn-custom">Lưu</button>
                <button @click="cancel" class="btn btn-secondary btn-custom ml-2">Hủy</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EmployeeService from "../services/EmployeeService";
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted } from "vue";

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
    const photoUrl = ref("");

    const saveOrUpdateEmployee = () => {
      const employee = {
        empNo: empNo.value,
        empName: empName.value,
        position: position.value,
        quantity: quantity.value,
        price: price.value,
        photoUrl: photoUrl.value,
      };

      if (id === "_add") {
        EmployeeService.createEmployee(employee).then(() => {
          router.push("/employee");
        });
      } else {
        EmployeeService.updateEmployee(id, employee).then(() => {
          router.push("/employee");
        });
      }
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
      if (id !== "_add") {
        EmployeeService.getEmployeeById(id).then((res) => {
          empNo.value = res.data.empNo;
          empName.value = res.data.empName;
          position.value = res.data.position;
          quantity.value = res.data.quantity;
          price.value = res.data.price;
          photoUrl.value = res.data.photoUrl;
        });
      }
    });

    return {
      empNo,
      empName,
      position,
      quantity,
      price,
      photoUrl,
      saveOrUpdateEmployee,
      cancel,
      changePhotoHandler,
    };
  },
};
</script>

<style scoped>
.container {
  margin-top: 20px;
}

.card {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.form-group {
  margin-bottom: 15px;
}

.form-control {
  height: 45px;
  border-radius: 5px;
}

.uploaded-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
  border: 1px solid #ddd;
  margin-top: 10px;
}

.btn-custom {
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.btn-primary:hover {
  background-color: #0056b3;
  border-color: #0056b3;
}

.btn-secondary {
  background-color: #6c757d;
  border-color: #6c757d;
}

.btn-secondary:hover {
  background-color: #565e64;
  border-color: #4e555b;
}

.ml-2 {
  margin-left: 10px;
}

.text-center {
  text-align: center;
}
</style>
