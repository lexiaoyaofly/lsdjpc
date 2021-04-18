<template>
  <div class="body">
    <Title/>
    <Banner/>
    <div class="newsDetails">
        <h3>{{title}}</h3>
        <h5>{{date}}</h5>
       <div v-html="content" ></div>
    </div>
    <Bottom/>
  </div>
</template>

<script>
  import api from '../utils/api.js'
import Title from '../components/Title'
import Banner from '../components/Banner'
import Bottom from '../components/Bottom'

export default {
    name: 'NewsDetails',
    data(){
        return{
          content:"",
          date:"",
          title:"",
          id:"",
        }
    },
    components: {
        Title,
        Banner,
        Bottom
    },
    created() {
      this.id = this.$route.query.id
           this.getNewsData()
    },
    methods: {
      getNewsData() {
      	//新闻数据
      	api.getNewsDetails({"id":this.id}).then(res => {
      		console.log(res)
      		if(res.data.code===200)
      		{
      			this.$data.title=res.data.result.title
            this.$data.date=res.data.result.createTime
            this.$data.content=res.data.result.content
      				console.log("新闻数据",this.$data.newsDatas)
      		}
      	}).catch(e => {
      		console.log("请求错误", e)
      	})
      }
  }
}
</script>

<style scoped>
.body{
    width: 100%;
    min-width: 1080px;
    background-color: #fff;
}
.newsTitle{
    width: 1080px;
    margin: auto;
    min-height: 170px;
    padding: 30px 0 10px;
}
.newsTitle ul li{
    float: left;
    width: 50%;
    overflow: hidden;
    line-height: 34px;
    font-size: 16px;
}
.newsTitle ul li:nth-last-of-type(1){
    width: 100%;
}
.newsTitle ul li span{
    width: 90px;
    float: left;
}
.newsTitle ul li p{
    width: calc( 100% - 90px );
    float: left;
    word-wrap:break-word;
}
.newsDetails{
    width: 1080px;
    min-height: 500px;
    overflow: hidden;
    margin: auto;
    padding: 50px 0 100px;
}
.newsDetails h3{
    text-align: center;
    font-size: 24px;
    line-height: 24px;
    font-family: 宋体, SimSun;
    margin-bottom: 16px;
}
.newsDetails h5{
    text-align: center;
    font-size: 12px;
    color: rgb(191, 191, 191);
    font-family: arial, helvetica, sans-serif;
    line-height: 12px;
    margin-bottom: 14px;
}
.newsDetails p{
    line-height: 2em;
    width: 1080px;
    margin: auto;
    text-align: justify;
    font-family: 宋体, SimSun;
    font-size: 16px;
}
.newsDetails img{
    width: 1080px;
    height: auto;
    margin: 16px 0;
}
</style>
