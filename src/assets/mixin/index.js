import Vue from 'vue';
Vue.mixin({
    methods: {
        showNotificationWithIcon(type, message) {
            this.$notification[type]({
                message,
            });
        },
    },
});
