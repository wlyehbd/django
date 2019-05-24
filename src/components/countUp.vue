<template>
  <div class="number-grow-warp">
    <span ref="numberGrow" :data-time="time" class="number-grow" :data-value="value">0</span>
  </div>
</template>

<script>
  export default {
    props: {
      time: {
        type: Number,
        default: 200
      },
      value: ''
    },
    data(){
      return{
        t: ''
      }
    },
    methods: {
      numberGrow(ele) {
        if(typeof this.value=='number'){
          let _this = this
          let step = Math.ceil(_this.value / _this.time)
          let current = 0
          let start = 0
          this.t = setInterval(function() {
            start += step
            if (start >= _this.value) {
              start = _this.value
              clearInterval(_this.t)
            }
            ele.innerHTML = start.toString().replace(/(\d)(?=(?:\d{3}[+]?)+$)/g, '$1,')
          }, 10)
        }else{
          ele.innerHTML='--'
        }
      }
    },
    mounted() {
      this.numberGrow(this.$refs.numberGrow)
    },
    watch:{
      'value':function(val){
        clearInterval(this.t)
        this.numberGrow(this.$refs.numberGrow)
      }
    }
  }
</script>

<style>
  .number-grow-warp {
    transform: translateZ(0);
  }
  .number-grow {
    font-family: Arial-BoldMT;
    font-size: 40px;
    letter-spacing: 2.67px;
    display: block;
    margin: 10px 0;
    line-height: 64px;
  }
</style>