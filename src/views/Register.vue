<template>
<div class="c-main">
  <div class="c-banner"></div>
  <div class="c-form">
    <div class="c-form__wrap">
      <div class="c-h2__wrap">
        <a-icon class="c-icon" type="github" />
        <h2>Project Name</h2>
      </div>
      <h1>New Account</h1>
      <p>
        But I must explain to you how all this mistaken idea of denouncing
      </p>

      <a-form :form="form" @submit="handleSubmit" hideRequiredMark :colon="false">
        <a-form-item label="E-mail">
          <a-input
            size="large"
            placeholder="Type in email address"
            v-decorator="[
              'email',
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
                  },
                  {
                    validator: checkEmailExist
                  },
                ],
              },
            ]"
          />
        </a-form-item>
        <a-form-item label="Full Name">
          <a-input
            size="large"
            placeholder="Type in full name"
            v-decorator="[
              'full_name',
              {
                rules: [{ required: true, message: 'Please input your full name!' }],
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
        <a-form-item label="Confirm Password">
          <a-input
            size="large"
            placeholder="Type in password confirmation"
            v-decorator="[
              'password_confirmation',
              {
                rules: [
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  {
                    validator: compareToFirstPassword,
                  },
                ],
              },
            ]"
            type="password"
            @blur="handleConfirmBlur"
          />
        </a-form-item>
        <a-form-item>
          <div class="c-btn__wrap">
            <a-button class="c-btn c-btn--sub" size="large" @click.prevent="reset">
              Back
            </a-button>
            <a-button class="c-btn c-btn--main" type="primary" size="large" html-type="submit">
              Sign up <a-icon class="c-icon--right" type="arrow-right" />
            </a-button>
          </div>
          <p class="c-terms">By signing up, I agree to the <a href="#">Terms and Conditions</a> and <a href="#">Privacy Policy</a></p>
        </a-form-item>
      </a-form>

    </div>

  </div>
</div>
</template>

<script>
  export default {
    data: () => ({
      email: '',
      full_name: '',
      password: '',
      password_confirmation: ''
    }),
    beforeCreate() {
      this.form = this.$form.createForm(this, { name: 'register' });
    },
    mounted() {
      this.form.setFieldsValue({
        email: '1@gmail.com',
        full_name: 'John Doe',
        password: '12345678',
        password_confirmation: '12345678'
      });
    },
    methods: {
      submit () {

      },
      reset() {
        this.form.resetFields();
      },
      handleSubmit(e) {
        e.preventDefault();
        this.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            window.axios.post('/auth/register', values).then(res => {
              console.log(res.data)
            }).catch(err => {
              console.log(err)
              this.$message.error(
                'Registration failed!', 10
              );
            })
          }
        });
      },
      handleConfirmBlur(e) {
        const value = e.target.value;
        this.confirmDirty = this.confirmDirty || !!value;
      },
      compareToFirstPassword(rule, value, callback) {
        const form = this.form;
        if (value && value !== form.getFieldValue('password')) {
          callback('Passwords do not match!');
        } else {
          callback();
        }
      },
      checkEmailExist(rule, value, callback) {
        window.axios.post('/auth/check-email',{
          email: value
        }).then(res => {
          console.log(res.data)
          callback('Email already exist!');
        }).catch(() => {
          callback();
        })
      }
    }
  }
</script>