<template>
  <div class="Spinner" v-show="isLoaded">
    <v-spinner />
  </div>
</template>

<script>
import { Spinner } from 'mint-ui'
export default {
  name: 'Spinner',
  components: {
    'v-spinner': Spinner
  },
  props: ['isLoaded']
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .Spinner {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0,0,0,.6);
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
  }
</style>
