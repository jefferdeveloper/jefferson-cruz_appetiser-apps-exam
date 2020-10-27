<template>
  <div>
    <Header/>
    <div class="c-verify">
      <div class="c-verify__wrap">
        <div class="c-verify__form">
          <h3>Verify Email</h3>
          <p>Input the code sent to: <span>{{ tokenData && tokenData.user ? tokenData.user.email : '' }}</span></p>
          <p>If no code is sent in email may use: <span>00000</span></p>
          <CodeInput className="c-verify__code" :fieldWidth="45" :fieldHeight="45" :fields="5" :autoFocus="false" :loading="false" class="input" v-on:change="onChange" v-on:complete="onComplete" />
        </div>
        <div class="c-verify__btnWrap">
          <button @click.prevent="resend" class="c-btn__resend">Resend</button>
          <div class="c-verify__grp">
              <a-button class="c-btn c-btn--sub">Cancel</a-button>
              <a-button @click.prevent="verify" type="primary" class="c-btn c-btn--main" :disabled="verifyCode ? false : true">
                Verify Email
              </a-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header'
import CodeInput from "vue-verification-code-input";
export default {
  data() {
    return {
      tokenData: null,
      verifyCode: null
    }
  },
  created() {
    // console.log(process.env.VUE_APP_URL)
    const tokenData = JSON.parse(localStorage.getItem('tokenData'))
    if (tokenData) {
      this.tokenData = tokenData;
    }
  },
  components: {
    Header,
    CodeInput
  },
  methods: {
    verify() {
      if(!this.tokenData) {
        this.$message.error('Please register or login first to verify email!', 5);
        return;
      }
      if(!this.verifyCode) {
        this.$message.error('Please complete the verification code!', 5);
        return;
      }
      window.axios('/auth/verification/verify',{
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.tokenData.access_token
        },
        data: {
          "token": this.verifyCode,
          "via": "email"
        }
      }).then(res => {
        if(res.data.success) {
          this.$message.success('Email verified!', 5);
          this.$router.push('login')
        }
      }).catch(err => {
        console.log(err)
        this.$message.error('Email not verified!', 5);
      })
    },
    onChange() {
      this.verifyCode = null
    },
    onComplete(v) {
      this.verifyCode = v
    },
    resend() {
      if(!this.tokenData) {
        this.$message.error('Please register or login first to verify email!', 5);
        return;
      }
      window.axios('/auth/verification/resend',{
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.tokenData.access_token
        },
        data: {
          "via": "email"
        }
      }).then(res => {
        if(res.data.success) {
          this.$message.success('Email verification code resent!', 5);
        }
      }).catch(err => {
        console.log(err)
        this.$message.error('Email verification code not sent!', 5);
      })
    }
  },
}
</script>

<style lang="scss">
  .c-verify {
    min-height: 100vh;
    width: 100%;
    background-color: #F9F9F9;
    padding-top: 30px;
    @media screen and (min-width: 1000px) {
      padding: 70px 30px 50px 30px;
    }
    h3 {
      color: #000;
      font-size: 25px;
      font-weight: bold;
    }
    p {
      span {
        color: #000;
        font-weight: bold;
      }
    }
    .react-code-input {
      display: grid;
      grid-template-columns: auto auto auto auto auto;
      grid-gap: 10px;
      > input {
        border: 2px solid #E5E5E5 !important;
        border-radius: 8px !important;
        &:focus,&:hover {
          border: 2px solid #2C66D5 !important;
        }
      }
    }
  }
  .c-verify__wrap {
    display: block;
    max-width: 500px;
    margin: 0 auto;
    border-radius: 8px;
    background-color: #fff;
    padding: 20px;
    @media screen and (min-width: 1000px) {
      padding: 30px;
    }
  }
  .c-verify__code {
    padding: 30px 0;
  }
  .c-verify__btnWrap {
    display: flex;
    grid-template-columns: auto auto;
    grid-gap: 20px;
    align-items: center;
    justify-content: space-between;
    border-top: 2px solid #B2B2B2;
    padding-top: 30px;
  }
  .c-verify__grp {
    display: grid;
    grid-template-columns: auto auto;
    grid-gap: 20px;
  }
  .c-btn__resend {
    color: #2C66D5;
    font-size: 16px;
    font-weight: 500;
  }
</style>