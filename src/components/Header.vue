<template>
  <div class="c-header">
        <div class="c-h5__wrap">
            <a-icon class="c-icon" type="github" />
            <h5>
                <router-link to="login">Project Name</router-link>
            </h5>
        </div>
        <a-button @click.prevent="logout" type="primary" class="c-btn c-btn--main" v-show="this.tokenData && currentRouteName !== 'verification'">
            Logout
        </a-button>
  </div>
</template>

<script>
export default {
    data() {
        return {
            tokenData: null
        }
    },
    computed: {
        currentRouteName() {
            return this.$route.name;
        }
    },
    created() {
        const tokenData = JSON.parse(localStorage.getItem('tokenData'))
        if (tokenData) {
            this.tokenData = tokenData;
        }
    },
    methods: {
        logout() {
            localStorage.removeItem('tokenData')
            this.$router.push('login')
        }
    }
}
</script>

<style scoped lang="scss">
.c-header {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
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
    .c-icon__logout {
        width: 10px;
        height: 10px;
    }
    .c-btn--main {
        height: 30px;
        padding: 0 25px;
    }
}
</style>