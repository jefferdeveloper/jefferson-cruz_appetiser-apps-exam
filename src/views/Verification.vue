<template>
  <div>
    <h1>Verification</h1>
    <button @click.prevent="verify">Verify</button>
  </div>
</template>

<script>
export default {
  created() {
    console.log(process.env.VUE_APP_URL)
  },
  methods: {
    verify() {
      const token = "1240|TwqsTGpB4fIf8o5yRdoGzHTYwPRVkXlq94jx28Q3"
      window.axios.post('/auth/verification/verify',{
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        },
        data: {
          "token": token,
          "via": "email"
        }
      }).then(res => {
        console.log(res.data)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style>

</style>