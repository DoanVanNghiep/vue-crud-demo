<template>
    <div>
      <h3 v-if="id === '_add'" class="text-center">THÊM SẢN PHẨM</h3>
      <h3 v-else class="text-center">SỬA SẢN PHẨM</h3>
      <div class="container">
        <div class="row">
          <div class="card col-md-6 offset-md-3">
            <div class="card-body">
              <form @submit.prevent="updateEmployee">
                <div class="form-group">
                  <label>Mã sản phẩm</label>
                  <input
                    v-model="empNo"
                    placeholder="Employee No"
                    class="form-control"
                    readonly
                  />
                </div>
                <div class="form-group">
                  <label>Sản phẩm</label>
                  <input
                    v-model="empName"
                    placeholder="Employee Name"
                    class="form-control"
                  />
                </div>
                <div class="form-group">
                  <label>Loại sản phẩm</label>
                  <input
                    v-model="position"
                    placeholder="Position"
                    class="form-control"
                  />
                </div>
                <div class="form-group">
                  <label>Số lượng còn lại</label>
                  <input
                    v-model="quantity"
                    type="number"
                    placeholder="Quantity"
                    class="form-control"
                  />
                </div>
                <div class="form-group">
                  <label>Giá</label>
                  <input
                    v-model="price"
                    type="number"
                    step="0.01"
                    placeholder="Price"
                    class="form-control"
                  />
                </div>
                <div class="form-group">
                  <label>Ảnh minh họa</label>
                  <input type="file" @change="changePhotoHandler" class="form-control" />
                </div>
                <div v-if="photoUrl" class="form-group">
                  <img :src="photoUrl" alt="Employee Photo" width="100" height="100" />
                </div>
                <button type="submit" class="btn btn-success">Lưu</button>
                <button @click="cancel" class="btn btn-danger" style="margin-left: 10px">Hủy</button>
              </form>
            </div>
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
  