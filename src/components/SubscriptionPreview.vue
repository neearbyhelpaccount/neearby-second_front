<template>
  <div class="subscription-preview" @click="showSubscriptionModal = !showSubscriptionModal">
    <div class="subscription-preview-image">
      <img :src="subscriptionObject.subscription_image_path" alt="">
    </div>

    <div class="subscription-preview-title">
      <h3>{{subscriptionObject.title}}</h3>
    </div>

    <div class="subscription-preview-description">
      <h4>{{subscriptionObject.description}}</h4>
    </div>

    <div class="subscription-preview-price">
      <p>{{subscriptionObject.price}}₽ в месяц</p>
    </div>
  </div>

  <VueFinalModal name="subscriptionModal" v-model="showSubscriptionModal">
    <SubscriptionModal type="update" :subscription="subscriptionObject"/>
  </VueFinalModal>

</template>

<script>

import SubscriptionModal from "@/components/SubscriptionModal.vue";

export default {
  name: 'SubscriptionPreview',
  props: {
    subscriptionObject: {},
  },
  components: {
    SubscriptionModal
  },
  data () {
    return {
      showSubscriptionModal: false
    }
  }
}
</script>

<style lang="scss">
.subscription-preview{
  cursor: pointer;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 10px;
  margin-top: 15px;
  padding-bottom: 15px;

  .subscription-preview-image{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    height: 50%;

    img{
      max-height: 150px;
    }
  }

  h3, h4, p{
    margin: 0;
  }

  h3{
    margin-top: 15px;
    color: black;
  }

  h4{
    margin-top: 7px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.6);
  }

  p{
    margin-top: 15px;

  }
}
</style>