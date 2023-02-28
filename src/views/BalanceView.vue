<template>
  <div>
    <Header/>
    <div class="balance-body">
      <div class="sidebar">
        <SidebarMenu/>
      </div>
      <div class="full-width">
          <BalanceInfo/>
      </div>
    </div>
  </div>
</template>

<script>

import Header from "@/components/Header";
import LoginModal from "@/components/LoginModal";
import SidebarMenu from "@/components/Sidebar/SidebarMenu";
import BalanceInfo from "@/components/BalanceInfo";
import {useStore, mapGetters} from "vuex";

export default {
  name: "MainPage",
  computed: mapGetters(['getCurrentProfile']),
  components: {
    Header,
    LoginModal,
    SidebarMenu,
    BalanceInfo
  }
}
</script>

<style lang="scss">

.balance-body{
    min-height: 100vh;
    display: grid;
    grid-template-columns: 2fr 3fr 15fr 3fr ;
    background-color: var(--secondary-color);

  .full-width{
    grid-column: 3 / 4;
    margin-top: 15px;

    display: grid;
    grid-template-columns: 3fr 1fr;
  }
}

</style>