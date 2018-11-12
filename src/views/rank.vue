<template>
  <div class="rank">
    <mt-cell v-for="(item,index) in songList" :title="item.rankname" :to="`/rank/info/${item.rankid}`" is-link :key="index">
      <img slot="icon" :src="item.imgurl.replace('{size}','400')"  width="60" height="60">
    </mt-cell>
  </div>
</template>
<script>
import { Indicator} from 'mint-ui'
export default {
  data () {
    return {
       songList: []
    }
  },
  created() { // 实例创建完成后执行得钩子函数
      this.getList() // 此处this指向vue实例
  },
  methods: {
    getList(){
      Indicator.open({
        text: '努力加载中...',
        spinnerType:'snake'
      });
      this.$http.get('/proxy/rank/list&json=true').then(({data})=>{
        Indicator.close();
        this.songList = data.rank.list
      })
    }
  }
}
</script>
<style lang="less"> // 此处使用less动态样式语言，对css赋予了动态语言得特性，如变量、继承、运算、函数。
.rank{
  .mint-cell-title img {
    margin-right: 10px;
  }

  .mint-cell-wrapper {
    font-size: 10px;
  }
}
</style>

