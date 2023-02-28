<template>
    <div class="modal">
        <div class="modal-header">
            <p class="modal-font"> Изменение миниатюры </p>
            <img @click="changeMiniature" src="../assets/home-view/cancel-modal.svg" alt="" id="exit">

        </div>
        <div class="modal-body">
            <div>
                <p class="text-modal modal-font">
                    Выберите область для маленьких фотографий. <br>
                    Выбранная миниатюра будет использоваться в новостях, личных сообщениях и комментариях.
                </p>
            </div>
            <div class="img-wrapper">

                <cropper class="change-miniature"
                    :src="profileImage"
                    @change="onChange"
                    :debounce="false"
                    :stencil-props="{
                        aspectRatio: 1
                    }"
                    :stencil-component="$options.components.CircleStencil"
                    :auto-zoom="true"
                />

                <preview
                    class="big"
                    :width="100"
                    :height="100"
                    :image="result.image"
                    :coordinates="result.coordinates"
                />

                <preview
                    class="small"
                    :width="60"
                    :height="60"
                    :image="result.image"
                    :coordinates="result.coordinates"
                />

            </div>

            <button class="modal-font"  style="cursor: pointer" @click="updateMiniature">
                Сохранить
            </button>
        </div>
    </div>
</template>

<script>
import { Cropper, CircleStencil, Preview } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css'
import ApiWrapper from "@/api";

export default {

    components: {
      Cropper, CircleStencil, Preview
    },

    props:['profilePicturePath'],

    data (){
        return {
            profileImage: this.profilePicturePath,
            result: {
              coordinates: null,
              image: null
            }
        }
    },
    methods: {
        changeMiniature() {
            this.$emit('changeProfileMiniature');
        },
        updateMiniature(){
            ApiWrapper.updateProfilePictureMiniature(
                {
                    miniature: JSON.stringify(this.result)
                })
                .then(() => {
                    this.$emit('updateProfilePictureMiniature', this.result);
                    this.$emit('changeProfileMiniature');
                })
        },

        onChange({ coordinates, image }) {
            this.result = {
                coordinates,
                image
            };
        },
    },
}
</script>
<style scoped lang="scss">
.modal {
    height: auto;
    width: 40%;

    img#exit{
        cursor: pointer;
    }
    
    .modal-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color:#FFDBBA; 
        height: 3.5rem;
        overflow: hidden;
        border-radius: 15px 15px 0 0;
        padding: 0% 4% 0% 4%;

        p {
            color: #00000099;
            font-weight: 500;
            margin-bottom: 0;
        }
    }

    .modal-body {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        // padding: 5%;

        div {
            width: 83%;
            margin-top: 2%;
            .text-modal {
                margin-top: 3%;
                font-weight: 400;
                color: #000000;
                font-size: 16px;
                margin-bottom: 0;
            }
        }

        button {
            width: 40%;
            height: 2.4rem;
            background-color: #FE6637 ;
            color: white;
            font-size: 16px;
            font-weight: 600;
            border: 1px #FE6637;
            border-radius: 10px;
            margin-top: 5%;
            margin-bottom: 30px;
        }

        .img-wrapper {
            position: relative;
            display: flex;
            justify-content: space-between;

            .change-miniature {
                width: 50%;
                margin-right: 14%;
            }

            .big {
                width: 100px;
                position: absolute;
                right: 15%;
                bottom: 50%;
                border-radius: 50%;
            }   
            .small {
                width: 50px;
                position: absolute;
                bottom: 17%;
                right: 20%;
                border-radius: 50%;
            }
        }
    }
}
@media screen and (max-width: 769px) {
  .modal {
    width: 80%;
  }
  .modal .modal-body button {
    width: 80%;
  }
  }
  @media screen and (max-width: 480px) {
  .modal {
    width: 100%;
  }
  .modal .modal-body div .text-modal {
    font-size: 16px;
  }
  }

</style>