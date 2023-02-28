<template>
  <div class="home">
    <Header />
    <div class="main-body">
      <div class="sidebar">
        <SidebarMenu />
      </div>
      <div class="author-content">
        <div class="full-width">

          <ProfileCover :image-path="coverImagePath" :mnt="coverImagePathMiniature" @uploadModules="showCovModal"
            @deleteCover="showDelCoverModal" @changeCoverMiniature="changeCoverMiniature" />
          <ProfileShortInfo :short-description="profileDescription" :followers-amount="followersCount"
            :subscribers-amount="subscribersCount" :sales-amount="salesCount" :image-path="profilePicturePath"
            :profilePictureMiniature="profilePictureMiniature" :name="profileName" @update-photo="updatePhoto"
            @delete_photo="deletePhoto" @changeProfileMiniature="changeProfileMiniature" />
        </div>

        <div class="posts-and-products">
          <ProductsSeparator :products-amount="products.length" />
          <ProductsSection :products="products" />
          <PostsSeparator :posts-amount="posts.length" />
          <Post v-for="post in posts" :post="post" />
          <PostsSections />
        </div>

        <div class="subscriptions">
          <SubscriptionsSeparator />
          <SearchSubscriptions />
          <div class="add-subscription-button" v-if="getCurrentProfile.id === getAuthorizedProfile.userId">
            <OrangeButton button-label="Добавить подписку" />
          </div>
          <SubscriptionsSection />
          <SubscriptionPreview v-for="subscription in subscriptions" :subscription-object="subscription" />
        </div>
      </div>
    </div>
    <Footer></Footer>

    <div class="notification-container">
      <div class="notif" v-for="notification of getUnreadNotifications">
        <Notification v-if="notification.status == 1" :notificationContent="notification.data.text"
          :notification-from="notification.data.from.name" :click-event="notification.data.showOn"
          :close-event="hideNotification" :id="notification.notification_id" />
      </div>

    </div>
  </div>

  <VueFinalModal name="photoModal" v-model="showPhotoModal">
    <PhotoModal @close="updatePhoto" @update-photo="showPhotoModal = true, getProfile"></PhotoModal>
  </VueFinalModal>
  <VueFinalModal name="photoModal" v-model="showCoverModal">
    <CoverModal @close="showCoverModal = !showCoverModal" @update-photo="showCoverModal = true, getProfile"></CoverModal>
  </VueFinalModal>
  <VueFinalModal name="deletePhotoModal" v-model="showDeleteCoverModal">
    <DeleteCoverModal @close='showDeleteCoverModal = !showDeleteCoverModal' @update-photo="getProfile"></DeleteCoverModal>
  </VueFinalModal>
  <VueFinalModal name="deletePhotoModal" v-model="showDeletePhotoModal">
    <DeletePhotoModal @close='deletePhoto' @update-photo="getProfile"></DeletePhotoModal>
  </VueFinalModal>

  <VueFinalModal name="changeMiniatureModal" v-model="showChangeMiniatureCoverModal" v-if="showChangeMiniatureCoverModal">
    <ChangeMiniatureCoverModal @updateProfilePictureMiniature="updateCoverMiniature"
      @changeCoverMiniature="changeCoverMiniature" :coverImagePath="coverImagePath"></ChangeMiniatureCoverModal>
  </VueFinalModal>


  <VueFinalModal name="changeMiniatureModal" v-model="showChangeMiniatureProfileModal"
    v-if="showChangeMiniatureProfileModal">
    <ChangeMiniatureProfileModal @updateProfilePictureMiniature='updateProfilePictureMiniature'
      @changeProfileMiniature='changeProfileMiniature' :profilePicturePath="profilePicturePath">
    </ChangeMiniatureProfileModal>
  </VueFinalModal>




  <VueFinalModal name="changeMiniatureModal" v-model="itemProfileModal">
    <Item @popUp="itemProfileModal = true" @close="itemProfileModal = false" />
  </VueFinalModal>
</template>

<script>
// @ is an alias to /sr
import Header from "@/components/Header";
import SidebarMenu from "@/components/Sidebar/SidebarMenu";
import ProfileCover from "@/components/ProfileCover";
import ProfileShortInfo from "@/components/ProfileShortInfo";
import ProductsSeparator from "@/components/ProductsSeparator";
import ProductsSection from "@/components/ProductsSection"
import SubscriptionsSeparator from "@/components/SubscriptionsSeparator";
import SearchSubscriptions from "@/components/SearchSubscriptions"
import OrangeButton from "@/components/Buttons/OrangeButton";
import SubscriptionPreview from "@/components/SubscriptionPreview";
import PostsSeparator from "@/components/PostsSeparator";
import Footer from "@/components/Footer.vue";
import Post from "@/components/Post";
import PhotoModal from "@/components/PhotoModal";
import DeletePhotoModal from "@/components/DeletePhotoModal";
import CoverModal from "@/components/CoverModal";
import DeleteCoverModal from "@/components/DeleteCoverModal";
import ChangeMiniatureProfileModal from "@/components/ChangeMiniatureProfileModal.vue";
import ChangeMiniatureCoverModal from "@/components/ChangeMiniatureCoverModal.vue";
import Notification from "@/components/Notification";
import ApiWrapper from "../api";
import { mapGetters, mapMutations } from "vuex";
import PostsSections from "@/components/PostsSection.vue";
import SubscriptionsSection from "@/components/SubscriptionsSection.vue";
import Item from "@/components/Item";

export default {
  name: "HomeView",
  components: {
    Item,
    SubscriptionsSection,
    PostsSections,
    ProfileCover,
    Header,
    SidebarMenu,
    ProfileShortInfo,
    ProductsSeparator,
    ProductsSection,
    SubscriptionsSeparator,
    SearchSubscriptions,
    OrangeButton,
    SubscriptionPreview,
    PostsSeparator,
    Post,
    PhotoModal,
    DeletePhotoModal,
    CoverModal,
    DeleteCoverModal,
    ChangeMiniatureProfileModal,
    ChangeMiniatureCoverModal,
    Notification,
    Footer
  },
  data() {
    return {
      itemProfileModal: false,
      coverImagePath: '',
      coverImagePathMiniature: '',
      profileDescription: '',
      followersCount: '',
      subscribersCount: '',
      pictureId: 0,
      coverId: 0,
      salesCount: '',
      profilePicturePath: '',
      profilePictureMiniature: '',
      profileCoverMiniature: '',
      profileName: '',
      posts: [],
      profileLogin: '',
      profileId: '',
      products: [],
      subscriptions: [],
      showPhotoModal: false,
      showCoverModal: false,
      showDeletePhotoModal: false,
      showDeleteCoverModal: false,
      showChangeMiniatureProfileModal: false,
      showChangeMiniatureCoverModal: false,
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
    updatePhoto() {
      this.showPhotoModal = !this.showPhotoModal
    },
    showDelCoverModal() {
      this.showDeleteCoverModal = !this.showDeleteCoverModal;
    },
    showCovModal() {
      this.showCoverModal = !this.showCoverModal;
    },
    deletePhoto() {
      this.showDeletePhotoModal = !this.showDeletePhotoModal
    },
    changeProfileMiniature() {
      this.showChangeMiniatureProfileModal = !this.showChangeMiniatureProfileModal
    },
    updateProfilePictureMiniature(data) {
      this.profilePictureMiniature = data
    },
    changeCoverMiniature() {
      this.showChangeMiniatureCoverModal = !this.showChangeMiniatureCoverModal
    },
    updateCoverMiniature(data) {
      this.coverImagePathMiniature = data
    },
    showMessages(data) {
      location.href = data;
    },
    hideNotification(id) {
      ApiWrapper.readNotification({ notificationId: id, status: 4 });
    },
    async getProfile() {
      await ApiWrapper.getProfile({ login: this.profileLogin }).then(response => {
        let profile = response.data;

        this.coverImagePath = profile.cover_path;
        this.profileDescription = profile.description;
        this.followersCount = profile.followers_count;
        this.profileName = profile.name;
        this.subscribersCount = profile.subscribers_count;
        this.profilePicturePath = profile.profile_path;
        this.coverImagePathMiniature = profile.miniature.length > 0 ? JSON.parse(profile.miniature) : false;
        this.profilePictureMiniature = profile.profile_miniature.length > 0 ? JSON.parse(profile.profile_miniature) : false;
        this.salesCount = profile.sells_count;
        this.profileId = profile.id;

        this.setCurrentProile(profile);
      });
    },
    async getModeration(profile) {
      await ApiWrapper.getModerationAvatarByUser({ id: profile.profile_id })
        .then(el => {
          if (el.data.length > 0) {
            this.coverId = el.data[0].id;
            setTimeout(this.getModerationCover, 1000);
          }
        })
      await ApiWrapper.getModerationCoverByUser({ id: profile.cover_id })
        .then(el => {
          if (el.data.length > 0) {
            this.profileId = el.data[0].id;
          }

        })

    },
    async getModerationCover() {
      await ApiWrapper.getModerCover({ id: this.coverId })
        .then(el => {
          let status = el.data[0].status;
          if (status == 1) {
            return;
          }
          if (status == 2) {
            return;
          }
          setTimeout(this.getModerationCover, 1000);
        });

    },
    async getModerationAvatar() {

    },
  },

  computed: {
    ...mapGetters(['getCurrentProfile', 'getAuthorizedProfile', 'getUnreadNotifications'])
  },

  async mounted() {
    this.profileLogin = window.location.pathname.split('page/')[1];
    await ApiWrapper.getProfile({ login: this.profileLogin }).then(response => {
      let profile = response.data;
      console.log(profile);
      this.coverImagePath = profile.cover_path;
      this.profileDescription = profile.description;
      this.followersCount = profile.followers_count;
      this.profileName = profile.name;
      this.subscribersCount = profile.subscribers_count;
      this.profilePicturePath = profile.profile_path;
      this.coverImagePathMiniature = profile.miniature.length > 0 ? JSON.parse(profile.miniature) : false;
      this.profilePictureMiniature = profile.profile_miniature.length > 0 ? JSON.parse(profile.profile_miniature) : false;
      this.salesCount = profile.sells_count;
      this.profileId = profile.id;
      this.setCurrentProile(profile);
    });
    ApiWrapper.getProducts({ authorId: this.profileId }).then(response => {

      this.products = response.data;
    });
    ApiWrapper.getPosts({ authorId: this.profileId }).then(response => {
      this.posts = response.data;
    })
    ApiWrapper.searchSubscriptions({ authorId: this.profileId }).then(response => {
      this.subscriptions = response.data;
    })
  }
};
</script>

<style lang="scss">
body {
  margin: 0 !important;
}

.home {
  height: 100vh;
  background-color: #EDEEF0;

  .notification-container {
    position: fixed;
    display: flex;
    flex-direction: column;
    bottom: 0;
    height: 9rem;
    width: 18%;
    overflow: hidden;
    padding: 1%;
  }

  .disable {
    display: none;
  }
}



.main-body {
  display: grid;
  grid-template-columns: 2fr 3fr 15fr 3fr;
  background-color: var(--secondary-color);
  padding-bottom: 20px;
}

.sidebar {
  grid-column: 2 / 3;
  margin-top: 80px;
}

.author-content {
  grid-column: 3 / 4;
  display: grid;
  grid-template-columns: 3.5fr 1fr;
  margin-top: 110px;

  .full-width {
    grid-column: 1 / 3;
  }

  .posts-and-products {
    grid-column: 1 / 2;
  }

  .subscriptions {
    margin-left: 15px;
    width: calc(100% - 15px);
    display: flex;
    flex-direction: column;
    grid-column: 2 / 3;

    .add-subscription-button {
      margin-top: 15px;
    }
  }

  @media (max-width: 1250px) {
    .posts-and-products {
      grid-column: 1 / 3;
    }

    .subscriptions {
      grid-column: 1 / 3;
      margin-left: 0;
      width: 100%;
    }
  }

}

@media screen and (max-width: 1500px) {

  .subscriptions-separator {
    height: auto;
  }

  .subscriptions-section-wrapper .no-subscriptions {
    height: auto;
  }

  .subscriptions-separator h3 {
    font-size: 20px;
    padding-bottom: 20px;
  }

  .posts-section-wrapper .no-posts {
    margin-bottom: 60px;
  }

  body .main-body {
    grid-template-columns: 1fr 3fr 15fr 1fr;
  }

  .sidebar-wrapper {
    justify-content: start;
  }

  body .author-content {
    grid-template-columns: 4fr 2fr;
  }

  .header {
    grid-template-columns: 1fr 18fr 1fr;
  }
}

@media screen and (max-width: 769px) {
  .posts-section-wrapper .no-posts {
    height: auto;
    margin-bottom: 0;
  }

  .footer-wrapper .footer {
    margin-left: 25px;
  }

  .posts-separator-wrapper {
    grid-template-columns: 1fr 1fr;
  }

  .products-separator-wrapper {
    grid-template-columns: 1fr 1fr;
  }

  .profile-short-info-wrapper {
    height: auto;
    font-size: 16px;
    padding-bottom: 10px;
  }

  .profile-short-info {
    grid-template-columns: 1fr;
  }

  .profile-description {
    grid-column: 1;
  }

  .profile-description .author-info {
    display: flex;
    flex-direction: column;
    text-align: left;
  }

  .product-section-wrapper .no-products {
    font-size: 16px;
  }

  body .main-body {
    grid-template-columns: 0.1fr 0.1fr 15fr 0.1fr;
  }

  .nav-container .hamburger-lines .line {
    background: white;
  }

  .nav-container input[type="checkbox"]:checked~.hamburger-lines .line1 {
    background: black;
  }

  .nav-container input[type="checkbox"]:checked~.hamburger-lines .line2 {
    background: black;
  }

  .nav-container input[type="checkbox"]:checked~.hamburger-lines .line3 {
    background: black;
  }

  .circle {
    margin-right: 40px;
  }
}

@media screen and (max-width: 480px) {
  .product-section-wrapper .no-products {
    font-size: 16px;
  }

  .posts-section-wrapper .no-posts {
    font-size: 16px;
  }

  .profile-description .profile-name h3 {
    font-size: 25px;
  }

  .big {
    height: 350px;
  }

  .products-separator-wrapper {
    display: flex;
    flex-direction: column;
    height: auto;
    justify-content: center;
    align-items: center;
  }

  .products-separator-wrapper .products-amount {
    margin-top: 20px;
    padding-left: 0;
  }

  .products-separator-wrapper .create-product {
    margin-top: 20px;
    margin-bottom: 20px;
    width: 100%;
  }

  .button-wrapper {
    width: 100%;
  }

  .products-separator-wrapper .search {
    width: 100%;
  }

  .search-wrapper {
    width: 100%;
  }

  .posts-separator-wrapper {
    display: flex;
    flex-direction: column;
    height: auto;
    justify-content: center;
    align-items: center;
  }

  .posts-separator-wrapper .posts-amount {
    padding-left: 0;
    margin-top: 20px;
  }

  .posts-separator-wrapper .search {
    margin-top: 20px;
    width: 100%;
  }

  .posts-separator-wrapper .create-posts {
    margin-top: 20px;
    margin-bottom: 20px;
    width: 100%;
  }

}

@media screen and (max-width: 420px) {
  .products-separator-wrapper {
    grid-template-columns: 1fr;
    height: auto;
  }

  .products-separator-wrapper .search {
    grid-column: 1;
    padding-bottom: 20px;
  }

  .products-separator-wrapper .products-amount {
    padding-left: 2%;
  }

  .search-wrapper {
    width: 90%;
  }

  .posts-separator-wrapper {
    grid-template-columns: 1fr;
    height: auto;
  }

  .posts-separator-wrapper .search {
    grid-column: 1;
    padding-bottom: 20px;
  }

  .posts-separator-wrapper .posts-amount {
    padding-left: 2%;
  }

  .posts-section-wrapper .no-posts {
    margin-bottom: 60px;
  }
}
</style>
