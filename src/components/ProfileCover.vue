<template>
  <div class="profile-cover">
    <img v-if="!mnt.coordinates" :src="imagePath" @mouseover="hovered" @mouseleave="hovered" id="ads" style="height: 250px">

    <preview
        v-if="mnt"
        class="big"
        :image="mnt.image"
        :coordinates="mnt.coordinates"
        :width="cssWidth"
        @mouseover="hovered"
        @mouseleave="hovered"
    />
    <div class="buttons" v-bind:class="{animate: rollButton}" @mouseover="hovered">
      <button @click="showUploadModal"> Обновить обложку</button>
      <button @click="changeMiniature"> Область обложки</button>
      <button @click="deleteCover"> Удалить обложку</button>
    </div>
  </div>


</template>


<script>

import { Preview, PreviewResult } from 'vue-advanced-cropper';
import {mapGetters, mapMutations} from "vuex";
import ApiWrapper from "../api";


export default {
  name: "ProfileCover",
  props: {
    imagePath: '',
    mnt: '',
  },
  data: function () {
    return {
      rollButton: false
    }
  },

  components: {
    Preview, PreviewResult
  },
  computed: {
    ...mapGetters(["getAuthorizedProfile", "getCurrentProfile"]),
    cssHeight(){
      return document.getElementsByClassName('profile-cover')[0].style.height;
    },
    cssWidth(){
      return document.getElementsByClassName('profile-cover')[0].style.width;
    },

  },
  methods: {
    hovered: function (event) {

      if (this.getCurrentProfile.id === this.getAuthorizedProfile.userId) {
        if (event.type === 'mouseover') {
          this.rollButton = true;
        }
        if (event.type === 'mouseleave') {
          this.rollButton = false;
        }
      }
    },
    showUploadModal(){
      this.$emit('uploadModules')
    },

    deleteCover: function (){
      this.$emit('deleteCover')
    },
      changeMiniature() {
          this.$emit('changeCoverMiniature')
      },
  },
  mounted() {
  }
}

</script>

<style lang="scss">

@keyframes rollOut {
  0% {
    height: auto;
    opacity: 0;
    transform: translate(-50%, 0);
  }
  100% {
    opacity: 1;
    height: auto;
    display: flex;
    transform: translate(-50%, -120px);
  }
}
.big {
  height: 250px;
}
.profile-cover {
  width: 100%;
  height: 250px;
  position: relative;
  img {
    width: 100%;
    object-fit: cover;
    border-radius: 10px;
  }

  .buttons {
    z-index: 15;
    display: flex;
    height: 0;
    flex-direction: column;
    position: absolute;
    bottom: -100px;
    left: 50%;
    opacity: 0;
    transform: translateX(-50%);

    button {
      cursor: pointer;
      width: 150px;
      height: 35px;
      background-color: white;
      border: none;
      border-radius: 10px;
      font-family: var(--base-font);
      font-size: 14px;
      margin-top: 10px;
    }

    &.animate {
      animation-name: rollOut;
      animation-duration: 0.5s;
      transform: translate(-50%, -120px);
      opacity: 1;
      height: auto;
    }
  }

}
@keyframes rollOut {
  0% {
    height: auto;
    opacity: 0;
    transform: translate(-50%, 0);
  }
  100% {
    opacity: 1;
    height: auto;
    display: flex;
    transform: translate(-50%, -120px);
  }
}
.big {
  height: 250px;
}
.profile-cover {
  width: 100%;
  height: 250px;
  position: relative;
  img {
    width: 100%;
    object-fit: cover;
    border-radius: 10px;
  }

  .buttons {
    z-index: 15;
    display: flex;
    height: 0;
    flex-direction: column;
    position: absolute;
    bottom: -100px;
    left: 50%;
    opacity: 0;
    transform: translateX(-50%);

    button {
      cursor: pointer;
      width: 150px;
      height: 35px;
      background-color: white;
      border: none;
      border-radius: 10px;
      font-family: var(--base-font);
      font-size: 14px;
      margin-top: 10px;
    }

    &.animate {
      animation-name: rollOut;
      animation-duration: 0.5s;
      transform: translate(-50%, -120px);
      opacity: 1;
      height: auto;
    }
  }

}
</style>