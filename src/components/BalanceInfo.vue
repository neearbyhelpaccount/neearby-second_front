<template>
  <div class="balance-info-wrapper">
    <div class="balance-info-header">
      <img src="../assets/balance-info.png" alt="">
      <p>История баланса</p>
    </div>
    <hr>
    <div class="balance-info-content">

    </div>
  </div>
</template>

<script>

</script>

<style lang="scss">

.balance-info-wrapper {
  background-color: white;
  border-radius: 10px;
  width: 100%;
  display: flex;
  height: 200px;
  flex-direction: column;

  .balance-info-header {
    margin-top: 30px;
    padding-left: 50px;
    display: flex;
    align-items: center;
    width: 100%;

    p {
      margin-left: 20px;
      font-family: var(--base-font);
      font-size: 20px;
    }
  }
}

</style>