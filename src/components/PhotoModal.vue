<template>
    <div class="modal" v-if="step==0">
        <div class="modal-header">
            <p> Обновить обложку </p>
            <img @click="closePhotoModal()" src="../assets/home-view/cancel-modal.svg" alt="">
            
        </div>
        <div class="modal-body">
            <img src="../assets/home-view/img-modal.svg" alt="">
            <p class="title">
                Обновление обложки
            </p>
            <div>
                <p class="text-modal">
                Рекомендуемое разрешение 1250 x 250. <br> 
                Формат - JPG, WEBP или PNG
            </p>
            </div>
            <button style="cursor: pointer; overflow: hidden; text-align: center;">
              <input type="file" accept=".png, .jpeg, .jpg, .gif" @change="selectFile" class="custom-file-input2" style="border: none; background: #FE6637; color: white; width: 100%; height: 100%;padding: 7px 26px;">
            </button>
        </div>

    </div>
  <div class="modal" v-if="step==1" style="height: auto">
    <div class="modal-header">
      <p> Модерация обложки </p>
      <img @click="closePhotoModal()" src="../assets/home-view/cancel-modal.svg" alt="">

    </div>
    <div class="modal-body">
      <img src="../assets/home-view/img-modal.svg" alt="">
      <div>
        <p style="text-align: left; font-size: 18px; line-height: 25px; margin-top: 15px; color: gray;" class="text-modal">
          В течений 5 минут мы проверим Вашу обложку, и если <br> она соответсвует правилам сервиса Neearby.com<br> мы ее опубликуем!
        </p>
      </div>
      <p style="margin-top: 0;" class="title">
        Ожидайте!
      </p>
      <div>
        <p style="text-align: left;" class="text-modal">
          С уважением, команда Neearby. <br>
          Neearby - всегда рядом.
        </p>
        <button @click="closePhotoModal">Ok</button>
      </div>

    </div>
  </div>
  <div class="modal" v-if="step==2" style="height: auto">
    <div class="modal-header">
      <p style="padding: 25px;"> Модерация обложки </p>
      <img @click="closePhotoModal()" src="../assets/home-view/cancel-modal.svg" alt="">

    </div>
    <div class="modal-body">
      <img src="../assets/home-view/img-modal.svg" alt="">
      <div>
        <p style="font-size: 17px; line-height: 25px; font-weight: 550; margin-top: 10px;" class="text-modal">
          Поздравляем! Вы прошли модерацию. Ваша <br>
          обложка была успешна опубликована на Вашу <br>
          страницу в Neearby 
        </p>
      </div>
      <div>
        <p style="text-align: left;" class="text-modal">
          С уважением, команда Neearby. <br>
          Neearby - всегда рядом.
        </p>
        <button @click="closePhotoModal(),step=0">Ok</button>
      </div>

    </div>
  </div>
  <div class="modal" v-if="step==3" style="height: auto">
    <div class="modal-header">
      <p> Модерация обложки  </p>
      <img @click="closePhotoModal(), step = 0" src="../assets/home-view/cancel-modal.svg" alt="">

    </div>
    <div class="modal-body">
      <img src="../assets/home-view/img-modal.svg" alt="">
      <div>
        <p class="text-modal">
          Вы не прошли модерацию Вашей обложки<br>Пожалуйста, загрузите новую обложку
         </p>
      </div>
      <div>
        <p style="text-align: left;" class="text-modal">
          С уважением, команда Neearby. <br>
          Neearby - всегда рядом.
        </p>
        <button @click="closePhotoModal">Ok</button>
      </div>

    </div>
  </div>
</template>

<script>

import ApiWrapper from "@/api";
import {POSITION, TYPE, useToast} from "vue-toastification";
import {mapGetters} from "vuex";
export  default {
    data(){
      return {
        imgSrc: '',
        step: 0,
        idModeration: 0
      }
    },
    methods: {
        closePhotoModal() {
            this.$emit('close')
        },
        selectFile(){
            this.step++;
            let element = document.getElementsByClassName('custom-file-input2')[0];
            this.imgSrc = element.files[0];


            if(this.imgSrc.size > 1e+6){
              this.step = 3;
            }
            const formData = new FormData();
            formData.append('img',  this.imgSrc);
            ApiWrapper.requestUpdateAvatar(formData)
            .then((el) => {
              this.idModeration = el.data[0];
              this.getProfileCoverModer();
            })
                .catch(() => {
                  this.step=3;

                })
//updateAvatar
        },
        getProfileCoverModer(){
            ApiWrapper.getModerAvatar({id: this.idModeration})
                .then(el => {
                  let status = el.data[0].status;
                    const toast = useToast();
                  if(status == 1){
                    toast('Ваша Аватарка одобрена', {position: POSITION.BOTTOM_RIGHT, type: TYPE.SUCCESS  });
                    ApiWrapper.deleteAvatarByUser({id: this.idModeration});
                    this.$emit('update-photo');
                    this.step=2;
                    return;
                  }
                  if(status == 2){
                    toast('Ваша Аватарка не одобрена', {position: POSITION.BOTTOM_RIGHT, type: TYPE.ERROR});
                    ApiWrapper.deleteAvatarByUser({id: this.idModeration});
                    this.step=3;
                    return;
                  }
                  setTimeout(this.getProfileCoverModer, 1000);
                })
        },
      async getCoverModer(profile){
        await ApiWrapper.getModerationAvatarByUser({id: profile.profile_id})
            .then(el => {
              if(el.data.length > 0){
                this.step++;
                this.idModeration = el.data[el.data.length - 1].id;
                this.getProfileCoverModer()
              }
            })
      }
    },
  computed: {
    ...mapGetters(['getCurrentProfile', 'getAuthorizedProfile', 'getUnreadNotifications'])
  },
  async mounted() {

    await ApiWrapper.getProfile({login: this.getCurrentProfile.login}).then(response => {
      let profile = response.data;
      console.log(profile);
      this.getCoverModer(profile);

    });
  }
}
</script>
<style scoped lang="scss">
.custom-file-input2::-webkit-file-upload-button {
  visibility: hidden;
}
.custom-file-input2::before {
  content: 'Загрузить обложку';
  padding: 10px;
  outline: none;
  text-align: center;
  cursor: pointer;
  font-weight: 700;
  font-size: 13pt;
  padding-left: 30px;
}
.modal {
    height: 40%;
    width: 45%;
    
    .modal-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color:#FFDBBA; 
        height: 15%;
        overflow: hidden;
        border-radius: 15px 15px 0 0;
        padding: 0% 4% 0% 4%;

        p {
            color: #00000099;
            font-weight: 500;
            margin-top: 0;
            margin-bottom: 0;
            padding: 20px;
        }
    }

    .modal-body {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 5%;
        p.title {
          margin-top: 5%;
          font-weight: 600;
          color: #000000;
          font-size: 20px;
        }

        div {
            width: 90%;
            .text-modal {
              font-weight: 400;
              color: #000000;
              line-height: 25px;
              font-size: 18px;
              margin-bottom: 5%;
            }
        }

        button {
            width: 50%;
            height: 2.4rem;
            background-color: #FE6637 ;
            color: white;
            font-size: 16px;
            font-weight: 600;
            border: 1px #FE6637;
            border-radius: 10px;
        }
    }
}
@media screen and (max-width: 769px) {
  .modal {
    width: 80%;
  }
  }
  @media screen and (max-width: 480px) {
  .modal {
    width: 100%;
  }
  .modal .modal-body button {
    width: 65%;
  }
  .modal .modal-body div .text-modal {
    font-size: 16px;
  }
  }
  @media screen and (max-width: 420px) {
  .modal .modal-body button {
    width: 75%;
  }
  }

</style>