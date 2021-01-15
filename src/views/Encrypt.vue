<template>
  <div>
    <div v-if="password.length === 0">
      <label class="block">
        <span>Encryption Password</span>
        <input class="form-textarea mt-2 block w-full placeholder-black text-black rounded-lg" type="password" placeholder="Enter password..." v-model="password" />
      </label>
    </div>

    <div v-if="password.length > 0">
      <FileUpload v-on:input="handleFile" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import FileUpload from '@/components/FileUpload.vue'
import * as openpgp from 'openpgp'

export default Vue.extend({
  name: 'Home',
  components: { FileUpload },
  data: (): {password: string} => ({
    password: ''
  }),
  methods: {
    download (filename: string, text: string) {
      const element = document.createElement('a')
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
      element.setAttribute('download', filename)

      element.style.display = 'none'
      document.body.appendChild(element)

      element.click()

      document.body.removeChild(element)
    },
    async handleFile (file: File) {
      if (!this.password) {
        return
      }

      const base64: string = btoa(String.fromCharCode(...new Uint8Array(await file.arrayBuffer())))

      const { key } = await openpgp.generateKey({ userIds: [{ email: 'anon@sendprivate.app', name: 'SendPrivate App' }] })

      const { data } = await openpgp.encrypt({
        message: openpgp.message.fromText(base64, `${file.name}.base64.txt`, new Date(), 'text'),
        passwords: [this.password],
        privateKeys: [key],
        compression: openpgp.enums.compression.zip
      })

      this.download(`${file.name}.spkey`, btoa(JSON.stringify(key)))
      this.download(`${file.name}.spfile`, data.replace('OpenPGP.js', 'SendPrivate.app + OpenPGP.js'))

      this.password = ''
    }
  }
})
</script>
