<template>
  <div class="title">Product Moderation</div>
  <div  class="moderation-elements">
    <div v-for="i in moderationList">
      <ProductModerationEl :element="i"/>
    </div>
  </div>
</template>

<script>
import ApiWrapper from "@/api";
import ProductModerationEl from "@/components/ProductModerationEl";

export default {
  name: 'ProductModeration',
  components: {ProductModerationEl},
  data(){
    return {
      moderationList: []
    }
  },
  methods: {
    getModerationList(){
      ApiWrapper.getModerationProducts()
          .then(res => {
            this.moderationList = res.data;
          })
    }
  },
  mounted() {
    setInterval(this.getModerationList, 2000);
  }
}
</script>
<style scoped>
.title{
  text-align: left;
  font-size: 25px;
  font-weight: bold;
  color: black;
}
.moderation-elements{
  display: flex;
}
</style>