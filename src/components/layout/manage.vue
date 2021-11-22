<template>
  <a-layout id="components-layout-demo-fixed">
    <a-layout-header :style="{ position: 'fixed', zIndex: 100, width: '100%' }">
      <div >
          <img class="logo" src="https://lh3.googleusercontent.com/proxy/ZEn-G39kz7uU79iiw5Goay2_VaZKY8HHjodxMmFIWuuAHerWXdAT9dTGPLcH-QjBO9v6XoJyZL4cpJA=s0-d" >
      </div>
      <a-menu
        theme="dark"
        mode="horizontal"
        :default-selected-keys="[keyDefault]"
        :style="{ lineHeight: '64px' }"
        class=""
      >
        <a-menu-item key="info">
          <div class="badge rounded-pill bg-secondary">
            {{ getUserInfo }}
          </div>
        </a-menu-item>
        <a-menu-item key="logout" @click="Logout()">   
          <div class="badge rounded-pill bg-danger">
            Logout
          </div> 
        </a-menu-item>
        <a-menu-item key="vps" @click="$router.push({ name: 'vps' })">
          Vps
        </a-menu-item>
        <a-menu-item key="offer" @click="$router.push({ name: 'offer' })">
          Offer
        </a-menu-item>
        <a-menu-item key="country" @click="$router.push({ name: 'country' })">
          Country
        </a-menu-item>
        <a-menu-item key="click" @click="$router.push({ name: 'click' })">
          Click
        </a-menu-item>
        <a-menu-item key="conversion" @click="$router.push({ name: 'conversion' })">
          Conversion
        </a-menu-item>
        <a-menu-item key="ipqs" @click="$router.push({ name: 'ipqs' })">
          Ipqs
        </a-menu-item>
        <a-menu-item key="network" @click="$router.push({ name: 'network' })">
          Network
        </a-menu-item>
      </a-menu>
      <!-- <h1>{{ getUserInfo.name }}</h1> -->
    </a-layout-header>
    <a-layout-content :style="{ padding: '0 50px', marginTop: '64px' }">
      <a-breadcrumb :style="{ margin: '56px 0' }">
        <!-- <a-breadcrumb-item>Home</a-breadcrumb-item>
        <a-breadcrumb-item>List</a-breadcrumb-item>
        <a-breadcrumb-item>App</a-breadcrumb-item> -->
      </a-breadcrumb>
      <div :style="{ background: '#fff', padding: '24px' }">
        <router-view ></router-view>
      </div>
    </a-layout-content>
    <a-layout-footer :style="{ textAlign: 'center' }">
      Ant Design ©2018 Created by Ant UED
    </a-layout-footer>
  </a-layout>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import JwtService from "@/store/jwt.service";
export default {
  data() {
    return {
      keyDefault : this.$route.name,
      // routeName: this.router.name
    }
  },
  mounted() {
    if(JwtService.getUser()) {
      this.getInfo(JwtService.getUser());
    }
    // console.log(65, this.getUserInfo)
  },
  created() {
    console.log(74, this.$route.name);
    if (!JwtService.getToken()) {
      this.$router.push({ name: "login" });
    }
  },
  computed: {
    ...mapGetters(["getUserInfo"]),
  },
  methods: {
    ...mapActions(["getInfo"]),
    Logout() {
      JwtService.destroyToken();
      this.getInfo({});
      this.$router.push({ name: "login" });
    },
  },
};
</script>
<style>
#components-layout-demo-fixed .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 24px 16px 0;
  float: left;
}
</style>
