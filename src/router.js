import Vue from "vue";
import Router from "vue-router";
import Signin from "./components/auth/login"
import Register from "./components/auth/register"
import AuthLayout from "./components/layout/auth"
import LayoutManage from "./components/layout/manage";

import Vps from "./components/manage/vps";
import Offer from "./components/manage/offer";
import Country from "./components/manage/country";
import Ipqs from "./components/manage/ipqs";
import Conversion from "./components/manage/conversion";
import Click from "./components/manage/click";
import Network from "./components/manage/network";


Vue.use(Router);
export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/auth',
            component:AuthLayout,
            children: [
                {
                    path: '/auth/login',
                    name: 'login',
                    component:Signin,
                },
                {
                    path: '/auth/register',
                    name: 'register',
                    component:Register,
                },
            ]
        },
        {
            path: '/manage',
            component: LayoutManage,
            children: [
                {
                    path: '/manage/vps',
                    name: 'vps',
                    component:Vps,
                },
                {
                    path: '/manage/offer',
                    name: 'offer',
                    component:Offer,
                },
                {
                    path: '/manage/country',
                    name: 'country',
                    component:Country,
                },
                {
                    path: '/manage/click',
                    name: 'click',
                    component:Click,
                },
                {
                    path: '/manage/conversion',
                    name: 'conversion',
                    component:Conversion,
                },
                {
                    path: '/manage/ipqs',
                    name: 'ipqs',
                    component:Ipqs,
                },
                {
                    path: '/manage/network',
                    name: 'network',
                    component:Network,
                },
            ]
        },
        {
            path: '',
            component: LayoutManage,
            redirect: '/manage/vps'
        }
    ]
})
