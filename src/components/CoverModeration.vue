<template>
<div class="title">Cover Moderation</div>
<div  class="moderation-elements">
  <div v-for="el in moderationList">
  <CoverModerationEl @changeCover="getAllModerationCover" :element="el" />
  </div>
  </div>
</template>


<script>
import CoverModerationEl from "@/components/CoverModerationEl";
import ApiWrapper from "@/api";
export default {
  name: "CoverModeration",
  components: {CoverModerationEl},
  data(){
    return {
        moderationList: [],
    }
  },
  methods: {//getModerationCover
    getAllModerationCover(){
      ApiWrapper.getModerationCover()
          .then(res => {
            this.moderationList = res.data;
          })

    }
  },
  mounted() {
    this.getAllModerationCover();
    setInterval(this.getAllModerationCover, 2000);

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