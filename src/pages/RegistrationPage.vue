<template>
    <login-components
    v-show="isOpenLogin"
    @OpenReg="RegisterSwitch">
    </login-components>

    <registration-page-components
    @OpenLang="LangSwitch" 
    v-show="isOpenStartRegPage">
    </registration-page-components>


    <LanguageRegistrationPageComponents 
    @OpenEmail="EmailSwitch"
    @CloseLang="LangSwitch"
    v-show="isOpenLang">
    </LanguageRegistrationPageComponents>


    <email-page-components 
    @OpenPassword="PasswordSwitch" 
    @CloseEmail="EmailSwitch"
    v-show="isOpenEmail">
    </email-page-components>


    <password-page-components 
    @ClosePassword="PasswordSwitch"
    @ConfirmReg="ConfirmReg"
    v-show="isOpenPassword">
    </password-page-components>
</template>

<script>
import axios from 'axios';
import {mapState} from 'vuex'

import LoginComponents from '@/components/LoginComponents'
import RegistrationPageComponents from '@/components/RegistrationPageComponents.vue';
import LanguageRegistrationPageComponents from '@/components/LanguageRegistrationPageComponents'
import EmailPageComponents from '@/components/EmailPageComponents.vue'
import PasswordPageComponents from '@/components/PasswordPageComponents.vue';
    export default {
  components: { RegistrationPageComponents, EmailPageComponents, PasswordPageComponents, LanguageRegistrationPageComponents, LoginComponents, },
        data() {
          return {
            isOpenLogin: true,
            isOpenStartRegPage: false,
            isOpenLang: false,
            isOpenEmail: false,
            isOpenPassword: false,

            email: '',
            password: '',
            lang: '',
          }
        },
        methods: {

          RegisterSwitch() {
            this.isOpenLogin = !this.isOpenLogin
            this.isOpenStartRegPage = !this.isOpenStartRegPage
          },
          LangSwitch() {
              this.isOpenLang = !this.isOpenLang;
              this.isOpenStartRegPage = !this.isOpenStartRegPage
          },
          
          EmailSwitch(lang) {
            this.lang = lang
            this.isOpenEmail = !this.isOpenEmail
            this.isOpenLang = !this.isOpenLang;
          },
          
          PasswordSwitch(email) {
            this.email = email
            this.isOpenPassword = !this.isOpenPassword
            this.isOpenEmail = !this.isOpenEmail
          },
          async ConfirmReg(password) {
             {
                this.password = password

                await axios.post(this.BASE_URL + '/api/Auth/register', {
                  userName: this.email,
                  password: this.password,
                  language: this.lang.tag,
                }
                )
                .then(res => {
                    setTimeout(() => {
                      console.log(res)
                      this.isOpenPassword = !this.isOpenPassword
                      this.isOpenLogin = true
                    }, 1500);
                })
                .catch(error => console.log(error)) 
            }
          }
        },
        computed: {
                ...mapState({
                    BASE_URL: state => state.post.BASE_URL,
                }),
        }


    }
</script>

<style lang="scss" scoped>

</style>