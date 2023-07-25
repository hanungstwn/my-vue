<template lang="">
  <div class="spinner-container">
    <div class="loadingio-spinner-cube-ib351c5gug">
      <div class="ldio-ouqewxplmd">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="css">
@keyframes ldio-ouqewxplmd {
  0% {
    transform: scale(1.1500000000000001);
  }
  100% {
    transform: scale(1);
  }
}
.spinner-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.ldio-ouqewxplmd div {
  position: absolute;
  width: 80px;
  height: 80px;
  top: 13.333333333333336px;
  left: 13.333333333333336px;
  background: #199256;
  animation: ldio-ouqewxplmd 1s cubic-bezier(0, 0.5, 0.5, 1) infinite;
  animation-delay: -0.3s;
}
.ldio-ouqewxplmd div:nth-child(2) {
  top: 13.333333333333336px;
  left: 106.66666666666666px;
  background: #f2bd2d;
  animation-delay: -0.2s;
}
.ldio-ouqewxplmd div:nth-child(3) {
  top: 106.66666666666666px;
  left: 13.333333333333336px;
  background: #ceca9e;
  animation-delay: 0s;
}
.ldio-ouqewxplmd div:nth-child(4) {
  top: 106.66666666666666px;
  left: 106.66666666666666px;
  background: #f4f8f1;
  animation-delay: -0.1s;
}
.loadingio-spinner-cube-ib351c5gug {
  width: 200px;
  height: 200px;
  display: inline-block;
  overflow: hidden;
  background: #ffffff;
}
.ldio-ouqewxplmd {
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0; /* see note above */
}
.ldio-ouqewxplmd div {
  box-sizing: content-box;
}
</style>
