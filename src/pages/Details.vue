<template>
  <div class="body">
    <Title/>
    <Banner/>
    <div class="newsTitle">
        <ul>
            <li>
                <span>主题名称：</span>
                <p>{{ datas.name }}</p>
            </li>
            <li>
                <span>会议类型：</span>
                <p>{{ datas.meetingType_Text }}</p>
            </li>
            <li>
                <span >开会时间：</span>
                <p >{{ datas.beginTime }}</p>
            </li>
            <li>
                <span>结束时间：</span>
                <p>{{ datas.endTime }}</p>
            </li>
            <li>
                <span>主题名称：</span>
                <p>{{ datas.name }}</p>
            </li>
            <li>
                <span>会议地址：</span>
                <p>{{ datas.address }}</p>
            </li>
            <li>
                <span>主持人：</span>
                <p>{{ datas.master }}</p>
            </li>
            <li>
                <span>联系电话：</span>
                <p>{{ datas.phone }}</p>
            </li>
            <li>
                <span>参会人员：</span>
                <p>{{ datas.people }}</p>
            </li>
        </ul>
    </div>
    
    <div class="newsDetails">
      内容：
       <div v-html="datas.content" ></div>
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
    name: 'Details',
    data(){
        return{
            titleList: [
                {title: '会议类型',content: ''},
                {title: '主题名称',content: ''},
                {title: '开会时间',content: ''},
                {title: '结束时间',content: ''},
                {title: '会议地址',content: ''},
                {title: '主持人',content: ''},
                {title: '联系电话',content: ''},
                {title: '参会人员',content: ''},
                {title: '主题内容',content: ''},
            ],
            datas:{},
            content:"",
            date:"",
            title:"",
            id:"",
            type:1,
        }
    },
    components: {
        Title,
        Banner,
        Bottom
    },
    created() {
      this.id = this.$route.query.id
      this.type = this.$route.query.type

      this.getData()
    },
    methods: {
          getData() {
            if(this.type==1)
            {//三会一课
              this.getMeet()
              }
              else{
                //主题活动
                this.getEvent()
              }
          	//数据

          },
          getMeet(){
            api.getMeetDetails({"id":this.id}).then(res => {
            	console.log(res)
            	if(res.data.code===200)
            	{
            		this.$data.title=res.data.result.title
                this.$data.date=res.data.result.createTime
                this.$data.content=res.data.result.content
                this.$data.datas=res.data.result
            	}
            }).catch(e => {
            	console.log("请求错误", e)
            })
          },
          getEvent(){
            api.getEventDetails({"id":this.id}).then(res => {
            	console.log(res)
            	if(res.data.code===200)
            	{
            		this.$data.title=res.data.result.title
                this.$data.date=res.data.result.createTime
                this.$data.content=res.data.result.content
                this.$data.datas=res.data.result
            	}
            }).catch(e => {
            	console.log("请求错误", e)
            })
          }
    },
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
    padding: 0 0 100px;
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
