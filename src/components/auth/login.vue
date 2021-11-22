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
                <h1>Đăng nhập</h1>
                <a-form-model-item has-feedback prop="email">
                  <a-input
                    autoFocus
                    v-model.trim="ruleForm.email"
                    type="text"
                    placeholder="Tên email"
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
                  Đăng nhập
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
import JwtService from "@/store/jwt.service";
import { mapActions } from "vuex";
export default {
  data() {
    let checkPending;
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Vui lòng nhập mật khẩu"));
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
      },

      rules: {
        password: [{ validator: validatePass, trigger: "change" }],
        email: [{ validator: validateEmail, trigger: "change" }],
      },
    };
  },
  created() {},
  methods: {
    ...mapActions(["getInfo"]),
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submitLogin(this.ruleForm);
        }
      });
    },

    async submitLogin(data) {
      this.loading = true;
      try {
        await axios
          .post(process.env.VUE_APP_BASE_URL + "/api/auth/login", data)
          .then((res) => {
            if (res.data.status == 200) {
              this.showNotificationWithIcon("success", res.data.message);
              JwtService.saveToken(res.data.token);
              JwtService.saveUser(res.data.info.name);
              // console.log(111, res.data.info)
              this.$router.push({ name: "vps" });
            } else {
              this.showNotificationWithIcon("error", res.data.message);
              this.ruleForm.email = "";
              this.ruleForm.password = "";
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
