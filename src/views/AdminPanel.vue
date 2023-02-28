<template>
  <Header/>
  <div class="main">
    <div class="admin-part">
      <CoverModeration/>
    </div>
    <div  class="admin-part">
      <AvatarModeration/>
    </div>
    <div class="admin-part">
      <ProductModeration/>
    </div>
  </div>
  <Footer/>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CoverModeration from "@/components/CoverModeration";
import AvatarModerationEl from "@/components/AvatarModerationEl";
import AvatarModeration from "@/components/AvatarModeration";
import ProductModeration from "@/components/ProductModeration";
export default {
  name: "AdminPanel",
  components: {ProductModeration, AvatarModeration, AvatarModerationEl, CoverModeration, Footer, Header}
}
</script>

<style scoped>
  .main{
    position: relative;
    width: 100%;
    top: 100px;
    margin-bottom: 150px;
  }
  .admin-part{
    width: 100%;
    height: auto;
    border: 1px solid black;
    margin-bottom: 20px;
  }
</style>