<template>
  <div class="c-header">
        <div class="c-h5__wrap">
            <a-icon class="c-icon" type="github" />
            <h5>
                <router-link to="login">Project Name</router-link>
            </h5>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
    .c-header {
        display: block;
        padding: 20px;
    }
    h5 {
      color: #2C66D5;
      font-size: 16px;
      margin: 0;
    }
    .c-h5__wrap {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      max-width: 1000px;
      .c-icon {
        font-size: 30px;
        margin-right: 10px;
      }
    }
</style>