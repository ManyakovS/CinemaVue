<template>
  <router-view></router-view>
</template>

<script>


export default {
  name: 'App',

}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap');
@import "@/styles/variables";

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline: none;
  border: none;
  color: $white;
}

input:-webkit-autofill,
input:-webkit-autofill:hover, 
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
    background: rgba(255, 255, 255, 0.2) !important;
    color: rgb(190, 190, 190);
    transition: all 5000s ease-in-out 0s;
}

.loading_page {
  position: relative;
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  height: 100vh;
  width: 100vw;
  background-color: rgba($color: $black, $alpha: .8);
  justify-content: center;
  align-items: center;

  h2 {
    color: $white;
    font-size: 1.9rem;
    text-align: center;
    margin-bottom: 10vh;
  }
}

.container {
  position: relative;
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  height: 100vh;
  width: 100vw;
  background-color: $black;
  justify-content: center;
  align-items: center;

  button {
    font-weight: 700;
    font-size: 1.1rem;
    line-height: 1.2rem;
    background-color: transparent;
    color: $white;
    text-decoration: none;

    transition: opacity .3s ease-out;
  }

  button:hover {
    opacity: .7;
  }

  .close, .go-back {
    z-index: 1000;
    position: absolute;
    left: 8vw;
    top: 4vh;
    background-repeat: no-repeat;
    background-size: contain;
    width: 24px;
    height: 24px;
    background-position-x: center;

    transition: opacity .3s ease-out;
  }
  .close {
    background: url(./assets/Close.svg);
  }
  .go-back {
    background: url(./assets/GoBack.svg);
  }

  .close:hover, .go-back:hover {
    opacity: .7;
  }
}

h3 {
  font-weight: 700;
  font-size: 1.3rem;
  line-height: 1.5rem;
  margin-bottom: 1vh;
  color: $white;
}

h4 {
  font-weight: 400;
  font-size: .95rem;
  line-height: 1.1rem;
  margin-bottom: 2vh;
  color: $white;
}

#app {
  width: 100vw;
  height: 100vh;
  font-family: 'Open Sans', sans-serif;
  font-style: normal;
  letter-spacing: 0.76px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

input {
  margin: 4vh 0 8vh 0;
  background-color: transparent;
  font-weight: 400;
  font-size: 1.2rem;
  line-height: 1.3rem;
  text-align: center;
  color: $white
}
::placeholder {
  color: rgba($color: $white, $alpha: .45);
}



@mixin width($width) {
  width: $width;
}

@mixin height($height) {
  height: $height;
}


.w-10 {
  @include width(10vw)
}

.w-12 {
  @include width(12vw)
}

.grid-col-1 {
  grid-column: 1/2;
}
.grid-col-2 {
  grid-column: 2/3;
}
.grid-col-3 {
  grid-column: 3/4;
}
.grid-col-4 {
  grid-column: 4/5;
}
.grid-col-5 {
  grid-column: 5/6;
}
.grid-col-6 {
  grid-column: 6/7;
}
.grid-col-7 {
  grid-column: 7/8;
}
.grid-col-8 {
  grid-column: 8/9;
}

</style>
