<template>
  <v-app>
    <router-view/>
  </v-app>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style lang="scss">
  $c-main: #2C66D5;
  .c-main {
    display: grid;
    width: 100%;
    min-height: 100vh;
    font-family: 'Lato', sans-serif;
    @media screen and (min-width: 1000px) {
      grid-template-columns: 1fr 1fr;
    }
    h1 {
      font-size: 40px;
      color: #000;
      font-weight: bold;
    }
    h2 {
      color: $c-main;
      font-size: 30px;
      font-weight: bold;
      margin: 0;
    }
    .c-h2__wrap {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      margin-bottom: 15px;
      .c-icon {
        font-size: 40px;
        margin-right: 15px;
      }
    }
    p {
      font-size: 16px;
    }
    .c-btn {
      height: 50px;
    }
    .c-btn--main {
       background-color: $c-main;
    }
    .c-btn--sub {
      color: #000;
    }
    .ant-btn-primary:hover, .ant-btn-primary:focus {
      color: #fff;
      background-color: darken($c-main, 10%);
      border-color: $c-main;
    }
  }
  .c-banner {
    display: none;
    @media screen and (min-width: 1000px) {
      display: block;
      background-image: url('./assets/bg.png');
      background-repeat: no-repeat;
      background-size: cover;
      min-height: 100vh;
      width: 100%;
    }
  }
  .c-form {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    .ant-form-item {
      margin-bottom: 15px;
    }
    .ant-form-item-label {
      line-height: 30px;
      label {
        color: #000;
        font-weight: 500;
      }
    }
  }
  .ant-form-item-label > label::after {
    // display: none;
  }
  .c-form__wrap {
    display: block;
    width: 100%;
    padding: 20px;
    max-width: 600px;
  }
  .c-btn__wrap {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 30px;
    margin-top: 30px;
  }
  .c-icon--right {
    position: absolute;
    transform: translateY(-50%);
    top: 50%;
    right: 20px;
  }
  .c-terms {
    text-align: center;
    display: block;
    margin-top: 15px;
    a {
      color: $c-main;
    }
  }
</style>
