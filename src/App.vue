<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Index from './pages/Index'
import Details from './pages/Details'

export default {
  name: 'App',
  components: {
    Index,
    Details
  }
}
</script>

<style>
*{
    list-style: none;
    margin: 0;
    padding: 0;
    font-family: SourceHanSansSC;
}
</style>
