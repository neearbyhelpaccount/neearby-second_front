<template>
  <div class="product-path">
    <Header class="hdr"/>

    <TwentyBuyOffer :product="product" :profile="profile"/>


    <Footer></Footer>

    <div class="notification-container">
      <div class="notif" v-for="notification of getUnreadNotifications">
        <Notification v-if="notification.status == 1" :notificationContent="notification.data.text" :notification-from="notification.data.from.name" :click-event="showMessages" :close-event="hideNotification" :id="notification.notification_id" />
      </div>

    </div>
  </div>


</template>

<script>
// @ is an alias to /sr
import Header from "@/components/Header";
import SidebarMenu from "@/components/Sidebar/SidebarMenu";
import Footer from "@/components/Footer.vue";
import Notification from "@/components/Notification";
import ApiWrapper from "../api";
import {mapGetters, mapMutations} from "vuex";
import ProductInfo from "@/components/ProductInfo.vue";
import SubscriptionsSection from "@/components/SubscriptionsSection.vue";
import TwentyBuyOffer from "@/components/TwentyBuyOffer";
const {useToast, POSITION, TYPE} = require('vue-toastification');
export default {
  name: "HomeView",
  components: {
    TwentyBuyOffer,
    Header,
    SidebarMenu,
    Notification,
    Footer,
    ProductInfo
  },
  data() {
    return {
      productId: '',
      profile: {
        mail: '',
        name: '',
        phone: '',
        img: '',
        isLogin: false
      },
      product: {
      },
      showNotification: true,
      contentNotification: {
        show: localStorage.getItem('welcome-notification') != 'true',
        title: 'Новое сообщение',
        messageFrom: 'Neearby.com',
        message: 'Алекс Жаркий, поздравляем! Теперь Вы сможете продав...',
        button: {
          label: 'Посмотреть',
          clickEvent: () => {
              this.showNotification = false;
              localStorage.setItem('welcome-notification', 'true');
          }
        }
      },
    }
  },
  methods: {
    ...mapMutations(['setCurrentProile']),


  },

  computed: {
    ...mapGetters(['getCurrentProfile', 'getAuthorizedProfile', 'getUnreadNotifications'])
  },

  async mounted() {
    const toast = useToast();
    this.productId = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1];
    this.profile.mail =  this.getAuthorizedProfile.email;
    this.profile.name =  this.getAuthorizedProfile.name;
    this.profile.phone =  this.getAuthorizedProfile.phone;
    await ApiWrapper.getProfile({login: this.getAuthorizedProfile.login}).then(response => {
      this.profile.img = response.data.profile_path;
    });
    await ApiWrapper.getProduct({ids: [this.productId]}).then(response => {
      if(!response.success || response.data.length < 1){
        toast('Неверная ссылка на товар, данного товара не существует или он был удален', {position: POSITION.BOTTOM_RIGHT, type: TYPE.ERROR});
        return this.$router.push(`/`);
      }
      this.product = response.data[0];
    });


  }
};
</script>

<style scoped>
.main-body{
  width: 100%;
  margin: auto;
}
</style>