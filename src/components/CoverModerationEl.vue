<template>
  <div class="moder-el">
  <img :src="element.img_path" alt="">
    <div class="btns">
      <button @click="acceptCover(element)" class="btn green">yes</button>
      <div class="block"></div>
      <button @click="cancelCover(element)" class="btn red">not</button>
    </div>
  </div>
</template>
<script>
import ApiWrapper from "@/api";

export default {
  name: "CoverModerationEl",
  props:['element'],
  methods: {
    acceptCover(data){
      ApiWrapper.updateCover({imgPath: data.img_path, id: data.id, coverId: data.cover_id})
          .then(() => {
            this.$emit('changeCover');
          })
          .catch()
    },
    cancelCover(data){
      ApiWrapper.cancelCover({id: data.id, coverId: data.cover_id})
          .then(() => {
            this.$emit('changeCover');
          })
          .catch()
    }
  }

}
</script>
<style scoped>
.moder-el{
  margin-left: 20px;
  margin-bottom: 10px;
  width: 300px;
}
img{
  width: 300px;
}
.btns{
  display: flex;
  width: 100%;
}
.btn{
  cursor: pointer;
  font-weight: bold;
  font-size: 22px;
  width: 100%;
  color: white;
  padding: 5px;
  border: none;
  border-radius: 10px;
}
.green{
  background: greenyellow;
}
.red{
  background: crimson;
}
.block{
  width: 20px;
}

</style>