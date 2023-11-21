<template>
  <body>
    <div class="wrapper fadeInDown">
      <div id="formContent">
        <!-- Tabs Titles -->
        <router-link to="/login">
          <button class="inactive underlineHover">SIGN IN</button>
        </router-link>
        <h2 class="active">Sign Up</h2>

        <!-- Icon -->
        <div class="fadeIn first mt-5 mb-5">
          <img src="../assets/BAGONK-black.png" />
        </div>

        <!-- Login Form -->
        <form @submit.prevent="handleRegister">
          <input
            type="text"
            id="fullname"
            class="fadeIn second input-customize"
            name="login"
            placeholder="Fullname"
            v-model="fullname" />
          <input
            type="text"
            id="nickname"
            class="fadeIn third input-customize"
            name="login"
            placeholder="Nickname"
            v-model="nickname" />
          <input
            type="email"
            id="email"
            class="fadeIn second input-customize"
            name="login"
            placeholder="Email"
            v-model="email" />
          <input
            type="phone"
            id="phone"
            class="fadeIn third input-customize"
            name="login"
            placeholder="Phone"
            v-model="phone" />
          <input
            type="password"
            id="password"
            class="fadeIn second input-customize"
            name="login"
            placeholder="Password"
            v-model="password" />
          <input type="submit" class="fadeIn fourth mt-2 mb-4 input-custom" value="Register" />
        </form>
      </div>
    </div>
  </body>
</template>
<script>
import axios from "axios";
import VueSweetalert2 from "vue-sweetalert2";

export default {
  components: {
    VueSweetalert2,
  },
  data() {
    return {
      fullname: "",
      nickname: "",
      email: "",
      phone: "",
      password: "",
      //isAdmin: true,
    };
  },
  methods: {
    async handleRegister() {
      const regData = {
        fullName: this.fullname,
        nickname: this.nickname,
        email: this.email,
        phone: this.phone,
        password: this.password,
        isAdmin: this.isAdmin,
      };

      console.log(regData);

      const apiKey = "jT9AqE2XKMRtk78DKfleQMVdM8XA62O+1Uk7OgPcmY4=";

      const config = {
        headers: {
          "X-API-Key": `${apiKey}`,
        },
      };

      console.log(config);

      try {
        const response = await axios.post(
          "http://localhost:8080/register",
          regData,
          config
        );
        console.log("User has created successfully", response.data);

        this.fullname = "";
        this.nickname = "";
        this.email = "";
        this.phone = "";
        this.password = "";

        this.$swal.fire({
          title: "Success!",
          text: "User has been created successfully",
          icon: "success",
          confirmButtonText: "OK",
        });
      } catch (error) {
        console.error("Error in creating user", error.response.data);
        this.$swal.fire({
          title: "Error!",
          text: "Error in creating user: " + error.response.data,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    },
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css?family=Poppins");

/* BASIC */

body {
  font-family: "Poppins", sans-serif;
  height: 100vh;
  background-image: url("/src/assets/bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  max-width: 100%;
  height: 100%;
}

a {
  color: #0000;
  display: inline-block;
  text-decoration: none;
  font-weight: 400;
}

h2 {
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  display: inline-block;
  margin: 40px 8px 10px 8px;
  color: #cccccc;
}

/* STRUCTURE */

.wrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  min-height: 100%;
  padding: 20px;
}

#formContent {
  -webkit-border-radius: 10px 10px 10px 10px;
  border-radius: 10px 10px 10px 10px;
  background: #fff;
  padding: 30px;
  width: 90%;
  max-width: 450px;
  position: relative;
  padding: 0px;
  /* -webkit-box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3); */
  /* box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3); */
  text-align: center;
}

#formFooter {
  background-color: #f6f6f6;
  border-top: 1px solid #dce8f1;
  padding: 25px;
  text-align: center;
  -webkit-border-radius: 0 0 10px 10px;
  border-radius: 0 0 10px 10px;
}

/* TABS */

h2.inactive {
  color: #cccccc;
}

h2.active {
  color: #0d0d0d;
  border-bottom: 2px solid #84d444;
}

/* FORM TYPOGRAPHY*/

.input-custom {
  background-color: #84d444;
  border: none;
  color: white;
  padding: 15px 80px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  text-transform: uppercase;
  font-size: 13px;
  /* -webkit-box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4); */
  /* box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4); */
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
  margin: 5px 20px 40px 20px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}

.input-custom:hover {
  background-color: #84d444;
}

.input-custom:active {
  -moz-transform: scale(0.95);
  -webkit-transform: scale(0.95);
  -o-transform: scale(0.95);
  -ms-transform: scale(0.95);
  transform: scale(0.95);
}

.input-custom {
  /* background-color: #f6f6f6; */
  border: none;
  color: #0d0d0d;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 5px;
  width: 85%;
  border: 2px solid #f6f6f6;
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -ms-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
}

.input-custom:focus {
  background-color: #fff;
  border-bottom: 2px solid #84d444;
}

.input-custom:placeholder {
  color: #cccccc;
}

/* ANIMATIONS */

/* Simple CSS3 Fade-in-down Animation */
.fadeInDown {
  -webkit-animation-name: fadeInDown;
  animation-name: fadeInDown;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

@-webkit-keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

@keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

/* Simple CSS3 Fade-in Animation */
@-webkit-keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@-moz-keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fadeIn {
  opacity: 0;
  -webkit-animation: fadeIn ease-in 1;
  -moz-animation: fadeIn ease-in 1;
  animation: fadeIn ease-in 1;

  -webkit-animation-fill-mode: forwards;
  -moz-animation-fill-mode: forwards;
  animation-fill-mode: forwards;

  -webkit-animation-duration: 1s;
  -moz-animation-duration: 1s;
  animation-duration: 1s;
}

.fadeIn.first {
  -webkit-animation-delay: 0.4s;
  -moz-animation-delay: 0.4s;
  animation-delay: 0.4s;
}

.fadeIn.second {
  -webkit-animation-delay: 0.6s;
  -moz-animation-delay: 0.6s;
  animation-delay: 0.6s;
}

.fadeIn.third {
  -webkit-animation-delay: 0.8s;
  -moz-animation-delay: 0.8s;
  animation-delay: 0.8s;
}

.fadeIn.fourth {
  -webkit-animation-delay: 1s;
  -moz-animation-delay: 1s;
  animation-delay: 1s;
}

/* Simple CSS3 Fade-in Animation */
.underlineHover:after {
  display: block;
  left: 0;
  bottom: -10px;
  width: 0;
  height: 2px;
  background-color: #84d444;
  content: "";
  transition: width 0.2s;
}

.underlineHover:hover {
  color: #0d0d0d;
}

.underlineHover:hover:after {
  width: 100%;
}

/* OTHERS */

*:focus {
  outline: none;
}

#icon {
  width: 60%;
}

* {
  box-sizing: border-box;
}
</style>
