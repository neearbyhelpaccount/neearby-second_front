<template>
  <div class="post-wrapper">
    <div class="post-header">
      <div class="author-logo">
        <img :src="author?.profile_picture" alt="">
      </div>
      <div class="author-name">
        <h4><b>{{ author?.name }}</b></h4>
        <p>8 сентября в 23:12</p>
      </div>
    </div>
    <div class="post-content">
      <div class="post-image">
        <img :src="post?.post_image_path" alt="">
      </div>
      <div class="post-title">
        <h3>{{ post?.title }}</h3>
      </div>
      <div class="post-description">
        <p>{{ post?.description }}</p>
      </div>
      <div class="reactions">
        <div class="likes" v-bind:class="{unliked: !liked}" @click="toggleLike">
          <img :src="require('../assets/like.svg')" alt="">
          <p>{{ post?.likes.length }}</p>
        </div>

        <div class="comment">
          <img :src="require('../assets/comment.svg')" alt="">
          <p>{{ post?.comments.length }}</p>
        </div>

        <div class="share">
          <img :src="require('../assets/share.svg')" alt="">
        </div>

        <div class="favourite">
          <img :src="require('../assets/favourite.svg')" alt="">
        </div>
      </div>

      <div class="comments-sections">
        <hr>
        <div class="comment" v-for="comment of post.comments">
          <div class="user-logo">
            <img :src="comment.picture" alt="">
          </div>
          <div class="comment-area">
            <h3>{{comment.name}}</h3>
            <p>{{comment.comment}}</p>
            <p style="color: #2A5885; margin-top: 10px;">{{new Date(comment.date).toLocaleDateString()}} {{new Date(comment.date).toLocaleTimeString()}}</p>
          </div>
        </div>

        <div class="create-comment">
          <div class="user-logo">
            <img :src="getAuthorizedProfile.profilePicture" alt="">
          </div>
          <div class="comment-area">
            <TextInput placeholder="Написать комментарий..." :height="45" v-model="comment"/>
          </div>
          <div class="send-button" @click="sendComment">
            <img :src="require('../assets/send-arrow.svg')" alt="">
          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<script>
import ApiWrapper from '@/api'
import TextInput from "@/components/TextInput";
import {mapGetters} from "vuex";

export default {
  name: "Post",
  components: {
    TextInput
  },
  props: {
    post: {}
  },
  data: function () {
    return {
      author: {},
      liked: false,
      comment: ''
    }
  },
  watch: {
    post: {
      async handler() {
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters(['getAuthorizedProfile']),
  },
  methods: {
    getAuthor: async function (author_id) {
      ApiWrapper.getProfile({id: author_id}).then(result => {
        this.author = result.data;
      })
    },
    getProfile: async function (user_id){
      return await ApiWrapper.getProfile({id: user_id})
    },
    toggleLike: function (){
      ApiWrapper.placeLike({postId: this.post.id}).then(result => {

        if(result.success) {
          this.liked = !this.liked;
          if(this.liked === true){
            this.post.likes.push(this.getAuthorizedProfile.userId);
            return;
          }
          this.post.likes = this.post.likes.filter(x => x !== this.getAuthorizedProfile.userId)

        }
      });
    },
    sendComment: function () {
      ApiWrapper.writeComment({postId: this.post.id, comment: this.comment}).then(element => {
        this.comment = '';
      })
    }
  },
  async mounted() {
    this.getAuthor(this.post.author_id).then(result => {
      this.liked = this.post.likes.includes(this.getAuthorizedProfile.userId);
    });

    for(let comment of this.post.comments){
      let profile = (await this.getProfile(comment.user_id)).data;
      comment.picture = profile.profile_picture;
      comment.name = profile.name;
    }
    this.post.comments = this.post.comments.sort(function(a, b) {

      if (a.date < b.date) {
        return 1;
      }
      if (a.date > b.date) {
        return -1;
      }
      // a должно быть равным b
      return 0;
    })

  },
}
</script>

<style lang="scss">

.post-wrapper {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  border-radius: 10px;
  width: 100%;
  background-color: white;
  height: auto;
  padding-bottom: 10px;


  .comments-sections {
    width: 100%;
    height: 100%;

    .comment{
      display: flex;
      height: 90px;

      .comment-area {
        display: flex;
        flex-direction: column;
        margin-left: 2%;
        margin-top: 10px;

        h3{
          text-align: left;
        }

        p{
          text-align: left;
          font-size: 14px;
        }
      }

      .user-logo{
        img {
          height: 80px;
          width: 80px;
          border-radius: 100px;
        }
      }
    }

    hr {
      width: calc(100% + 20px);
      margin-left: -20px;
      border: 1px solid #EDEEF0;
      border-bottom: none;
    }

    .create-comment {
      display: flex;
      width: 100%;
      height: auto;

      img {
        height: 60px;
        border-radius: 100px;
      }

      .comment-area {
        width: 80%;
        height: auto;
        display: flex;
        align-items: center;
        margin-left: 20px;
      }

      .send-button {
        cursor: pointer;
        display: flex;
        align-items: center;
        margin-left: 40px;

        img {
          height: 35px;
        }
      }

    }
  }

  .post-content {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 20px;

    .reactions {
      margin-top: 30px;
      display: flex;

      .likes.unliked {
          img {
            filter: grayscale(1) opacity(0.8);
          }
          p {
            color: gray;
          }
        }


      div {
        margin-right: 10px;
        cursor: pointer;
        height: 30px;
        background-color: #F0F2F5;
        display: flex;
        align-items: center;
        border-radius: 10px;
        padding: 0 12px 0 12px;

        p {
          margin-left: 5px;
          color: #FE6637;
        }
      }
    }

    .post-title {
      margin-top: 10px;
    }

    .post-description {
      margin-top: 10px;
    }

    .post-image {
      img {
        height: 360px;
      }
    }
  }
}


.post-header {
  height: 100px;
  display: flex;


  .author-logo {
    margin-left: 20px;
    display: flex;
    align-items: center;

    img {
      height: 80%;
      border-radius: 100px;
    }
  }

  .author-name {
    display: flex;
    margin-left: 20px;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    h4 {
      font-family: var(--base-font);
      font-size: 20px;
      margin: 0;
    }

    p {
      margin-top: 3px;
      font-family: var(--base-font);
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
    }
  }


}

</style>