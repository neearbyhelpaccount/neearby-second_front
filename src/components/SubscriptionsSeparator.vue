<template>
  <div class="subscriptions-separator">
      <h3>Уровни подписки <p>{{subscriptionsAmount}}</p></h3>
  </div>
</template>

<script>

export default {
  name: 'SubscriptionsSeparator',
  props: {
    subscriptionsAmount: 0,

  }
}
</script>

<style lang="scss">

.subscriptions-separator{

  h3{
    margin: 0;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  margin-top: 10px;
  border-radius: 10px;
  width: 100%;
  padding-top: 0;
  height: 45px;
  background-color: white;

  font-family: var(--base-font);
  font-size: 20px;

  p{

  }
}
</style>