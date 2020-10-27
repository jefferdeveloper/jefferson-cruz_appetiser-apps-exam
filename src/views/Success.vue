<template>
  <div>
    <Header/>
    <div class="c-success">
      <div class="c-success__wrap">
        <h1>Login successful!</h1>
        <img class="c-success__img" src="@/assets/image.svg" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header'
export default {
  components: {
    Header
  }
}
</script>

<style scoped lang="scss">
  .c-success {
    min-height: 100vh;
    width: 100%;
    background-color: #F9F9F9;
    padding: 30px 20px 20px 20px;
    @media screen and (min-width: 1000px) {
      padding: 70px 30px 50px 30px;
    }
  }
  .c-success__wrap {
    display: block;
    widows: 100%;
    max-width: 700px;
    margin: 0 auto;
    h1 {
      text-align: center;
      margin-bottom: 50px;
    }
  }
  .c-success__img {
    display: block;
    width: 100%;
  }
</style>