<template>
<div class="c-main">
  <div class="c-banner"></div>
  <div class="c-form">
    <div class="c-form__wrap">
      <div class="c-h2__wrap">
        <a-icon class="c-icon" type="github" />
        <h2>Project Name</h2>
      </div>
      <h1>Welcome Back</h1>
      <p>
        But I must explain to you how all this mistaken idea of denouncing
      </p>

      <a-form :form="form" @submit="handleSubmit" hideRequiredMark :colon="false">
        <a-form-item label="E-mail">
          <a-input
            size="large"
            placeholder="Type in email address"
            v-decorator="[
              'username',
              {
                trigger: 'blur',
                rules: [
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {
                    required: true,
                    message: 'Please input your E-mail!',
                  }
                ],
              },
            ]"
          />
        </a-form-item>
        <a-form-item label="Password">
          <a-input
            size="large"
            placeholder="Type in password"
            v-decorator="[
              'password',
              {
                rules: [
                  {
                    required: true,
                    message: 'Please input password!',
                  }
                ],
              },
            ]"
            type="password"
          />
        </a-form-item>
        <a-form-item>
          <div class="c-btn__wrap">
            <a-button class="c-btn c-btn--sub" size="large">
              <router-link to="register">
                Sign up
              </router-link>
            </a-button>
            <a-button class="c-btn c-btn--main" type="primary" size="large" html-type="submit">
              Login <img class="c-icon--img" src="@/assets/i-login.svg" alt="">
            </a-button>
          </div>
        </a-form-item>
      </a-form>

    </div>

  </div>
</div>
</template>

<script>
  export default {
    beforeCreate() {
      this.form = this.$form.createForm(this, { name: 'login' });
    },
    mounted() {
      // this.form.setFieldsValue({
      //   username: '1@gmail.com',
      //   password: '12345678'
      // });
    },
    methods: {
      reset() {
        this.form.resetFields();
      },
      handleSubmit(e) {
        e.preventDefault();
        this.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            window.axios.post('/auth/login', values).then(res => {
              if(res.data.success) {
                localStorage.setItem('tokenData',JSON.stringify(res.data.data))
                this.$router.push('success')
              } else {
                this.$message.error('Username or Password is incorrect!', 5);
              }
            }).catch(err => {
              console.log(err)
              this.$message.error('Username or Password is incorrect!', 5);
            })
          }
        });
      }
    }
  }
</script>