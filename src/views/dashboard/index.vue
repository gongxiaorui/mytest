<template>
  <div class="dashboard-container">我是首页
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {
      
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-container{
  background: #f5f5f5;
  height: calc(100vh - 84px);
  overflow-y: scroll;
  padding: 30px;
  .chart-wrapper{
    background: #fff;
  }
  .dashboard {
    &-container {
      margin: 30px;
    }
    &-text {
      font-size: 30px;
      line-height: 46px;
    }
  }
}
</style>
