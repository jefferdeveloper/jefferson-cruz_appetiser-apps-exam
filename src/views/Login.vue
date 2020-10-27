<template>
<div>
  <h1>Login</h1>
  <validation-observer
    ref="observer"
    v-slot="{ invalid }"
  >
    <form @submit.prevent="submit">
      <validation-provider
        v-slot="{ errors }"
        name="email"
        rules="required|email"
      >
        <v-text-field
          v-model="email"
          :error-messages="errors"
          label="E-mail"
          required
        ></v-text-field>
      </validation-provider>
      <validation-provider
        v-slot="{ errors }"
        name="password"
        vid="password"
        rules="required|max:30"
      >
        <v-text-field
          v-model="password"
          :error-messages="errors"
          label="Password"
          required
        ></v-text-field>
      </validation-provider>
      <v-btn
        class="mr-4"
        type="submit"
        :disabled="invalid"
      >
        Login
      </v-btn>
      <v-btn @click="clear">
        clear
      </v-btn>
    </form>
  </validation-observer>
</div>
</template>

<script>
  import { required, email, max } from 'vee-validate/dist/rules'
  import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

  setInteractionMode('eager')

  extend('required', {
    ...required,
    message: 'Field {_field_} can not be empty',
  })

  extend('max', {
    ...max,
    message: 'Field {_field_} may not be greater than {length} characters',
  })

  extend('email', {
    ...email,
    message: 'Email must be valid',
  })

  export default {
    components: {
      ValidationProvider,
      ValidationObserver,
    },
    data: () => ({
      email: 'jeffergit@gmail.com',
      password: '12345678',
    }),
    methods: {
      submit () {
        this.$refs.observer.validate()
        const payload = {
          username: this.email,
          password: this.password
        }
        console.log(payload)
        window.axios.post('/auth/login', payload).then(res => {
          console.log(res.data)
          console.log('res')
        }).catch(err => {
          console.log(err)
          console.log('err')
        })
      },
      clear () {
        this.email = ''
        this.password = '',
        this.$refs.observer.reset()
      },
    },
  }
</script>

<style>

</style>