<template>
  <div>
    <a-spin v-if="loading" />
    <div class="container-auth">
      <div class="auth container-fluid">
        <div class="content-right d-flex justify-content-center">
          <div
            class="ad-custom-form shadow-sm"
            style="width: 500px; margin: 30px auto; padding: 20px 30px"
          >
            <a-form-model ref="ruleForm" :model="ruleForm" :rules="rules">
              <div class="form-content">
                <h1>Đăng ký</h1>
                <a-form-model-item has-feedback prop="email">
                  <a-input
                    autoFocus
                    v-model.trim="ruleForm.email"
                    type="text"
                    placeholder="Tên email"
                    autocomplete="off"
                  />
                </a-form-model-item>
                <a-form-model-item has-feedback prop="name">
                  <a-input
                    v-model.trim="ruleForm.name"
                    type="text"
                    placeholder="Tên của bạn ko dấu "
                    autocomplete="off"
                  />
                </a-form-model-item>
                <div id="ip-pass">
                  <a-form-model-item has-feedback prop="password">
                    <a-input-password
                      type="password"
                      v-model.trim="ruleForm.password"
                      placeholder="Mật khẩu"
                      autocomplete="new-password"
                      v-on:keyup.enter="submitForm('ruleForm')"
                    />
                  </a-form-model-item>
                </div>
                <a-button
                  style="width: 100%"
                  type="primary"
                  @click="submitForm('ruleForm')"
                >
                  Đăng ký
                </a-button>
              </div>
            </a-form-model>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    let checkPending;
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Vui lòng nhập mật khẩu"));
      } else if (value.length < 3) {
        callback(new Error("Mật khẩu it nhất 3 ký tự"));
      } else {
        callback();
      }
    };
    let validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Vui lòng nhập tên của bạn"));
      } else if (value.length < 5) {
        callback(new Error("Tên ít nhất 5 ký tự"));
      } else {
        callback();
      }
    };
    let validateEmail = (rule, value, callback) => {
      clearTimeout(checkPending);
      var regex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!value) {
        return callback(new Error("Vui lòng nhập địa chỉ email"));
      }
      if (!regex.test(value)) {
        callback(new Error("Địa chỉ email không đúng định dạng"));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      ruleForm: {
        password: "",
        email: "",
        name: "",
      },

      rules: {
        password: [{ validator: validatePass, trigger: "change" }],
        email: [{ validator: validateEmail, trigger: "change" }],
        name: [{ validator: validateName, trigger: "change" }],
      },
    };
  },
  created() {},
  methods: {
    submitForm(formName) {
      this.loading = true;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submitLogin(this.ruleForm);
        } else {
          this.loading = false;
          return false;
        }
      });
    },

    async submitLogin(data) {
      this.loading = true;
      try {
        await axios
          .post(process.env.VUE_APP_BASE_URL + "/api/auth/register", data)
          .then((res) => {
            if (res.data.status == 200) {
              this.showNotificationWithIcon("success", res.data.message);
              this.$router.push({ name: "login" });
            } else {
              this.showNotificationWithIcon("error", res.data.message);
              this.ruleForm.email = "";
            }
          });
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
