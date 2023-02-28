<template>
  <div class="posts-section-wrapper">
    <div class="posts" v-if="posts.length">
      <div class="posts">
        <Post v-for="post in posts" :post="post"/>
      </div>
    </div>

    <div class="no-posts">
      <h2>У Вас нет постов!</h2>
      <p><a href="/catalogue" style="color: #FE6637">Добавьте свой первый пост</a> прямо сейчас. <br>
        Напишите, как Вас зовут, сколько Вам лет, кем работаете или работали, сколько сейчас зарабатываете и сколько хотите зарабатывать </p>
    </div>
  </div>

</template>

<script>


import Post from "@/components/Post.vue";

export default {
  name: 'PostsSections',
  components: {
    Post
  },
  props: {
    posts: {
      type: Array,
      default: []
    }
  }
}

</script>

<style lang="scss">


.posts-section-wrapper {
  margin-top: 10px;
  width: 100%;
  background-color: white;
  border-radius: 10px;
  height: auto;

  .posts{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    padding: 5px 0 5px 0;
  }

  .no-posts{
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 10% 0 10%;

    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 24px;
  }

}

</style>