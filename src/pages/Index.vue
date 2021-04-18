<template>
    <div class="body">
        <Title/>
        <Banner/>
        <div class="center">
            <ul>
            <li>
                <div>
                    <img src="../assets/images/v2_qr4w1g.png" alt="">
                </div>
                <router-link tag="p" to="/Details">党员</router-link>
                <h3>{{dyCount}}</h3>
            </li>
            <li>
                <div>
                    <img src="../assets/images/v2_qr4w4k.png" alt="">
                </div>
                <router-link tag="p" to="/Details">主题活动</router-link>
                <h3>{{ztCount0+ztCount1}}</h3>
            </li>
            <li>
                <div>
                    <img src="../assets/images/v2_qr4w2t.png" alt="">
                </div>
                <router-link tag="p" to="/newsList">新闻动态</router-link>
                <h3>{{newsCount}}</h3>
            </li>
            <li>
                <div>
                    <img src="../assets/images/v2_qr4w5k.png" alt="">
                </div>
                <router-link tag="p" to="/Details">三会一课</router-link>
                <h3>{{shykCount0+shykCount1}}</h3>
            </li>
            </ul>
        </div>
        <ul class="activityList">
            <li>
                <dl>
                    <dt>
                        <div>
                            <img src="../assets/images/v2_qr4w51.png" alt="">
                            <span>新闻动态</span>
                        </div>
                    </dt>
                    <dd v-for="(item, index) in newsDataList" :key="index">
                        <router-link tag="p" class="pwidth" :to="{path:'/NewsDetails',query:{id:item.id}}">{{item.title}}</router-link>
                       <!-- <img src="/static/images/v2_qr4xc6.png" alt=""> -->
                    </dd>
                    <dt><router-link tag="p" to="/newsList">更多</router-link></dt>
                </dl>
            </li>
            <li>
                <dl>
                    <dt>
                        <div>
                            <img src="../assets/images/v2_qr4w22.png" alt="">
                            <span>主题活动</span>
                        </div>
                    </dt>
                   <dd v-for="(item, index) in ztDataList1" :key="index">
                        <router-link tag="p" :to="{path:'/Details',query:{id:item.id,type:2}}">{{item.name}}</router-link>
                        <img src="../assets/images/v2_qr4xc6.png" alt="">
                    </dd>
                   <!-- 补上往期活动 -->
                   <dd v-for="(item, index) in ztDataList0" :key="index" v-if="ztCount1<5&&index<(5-ztCount1)">
                       <router-link tag="p" class="pwidth" :to="{path:'/Details',query:{id:item.id,type:2}}">{{item.name}}</router-link>
                   </dd>
                    <dt><router-link tag="p" :to="{path:'/List',query:{type:2}}">更多</router-link></dt>
                </dl>
            </li>
            <li>
                <dl>
                    <dt>
                        <div>
                            <img src="../assets/images/v2_qr4w38.png" alt="">
                            <span>三会一课</span>
                        </div>
                    </dt>
                    <dd v-for="(item, index) in shykDataList1" :key="index">
                        <router-link tag="p" :to="{path:'/Details',query:{id:item.id,type:1}}"><span>{{item.meetingType_Text}}| </span>{{item.name}}</router-link>
                        <img src="../assets/images/v2_qr4xc6.png" alt="">
                    </dd>
                     <dd v-for="(item, index) in shykDataList0" :key="index" v-if="ztCount1<5&&index<(5-shykCount1)">
                        <router-link class="pwidth" tag="p" :to="{path:'/Details',query:{id:item.id,type:1}}"><span>{{item.meetingType_Text}}| </span>{{item.name}}</router-link>
                    </dd>
                    <dt><router-link tag="p" :to="{path:'/List',query:{type:1}}">更多</router-link></dt>
                </dl>
            </li>
        </ul>
        <Bottom/>
    </div>
</template>

<script>
import api from '../utils/api.js'
import Title from '../components/Title'
import Banner from '../components/Banner'
import Bottom from '../components/Bottom'

export default {
  name: 'App',
  components: {
    Title,
    Banner,
    Bottom
  },
  data() {
  	return {
  		dyCount: 0,
  		ztCount1: 0,
  		ztCount0: 0,
  		newsCount: 0,
  		shykCount1: 0,
  		shykCount0: 0,
  		ztDataList1: [],
  		ztDataList0: [],
  		newsDataList: [],
  		shykDataList0: [],
  		shykDataList1: [],
  	}
  },
  created() {
         this.getDataList()
  },
  methods: {
  	getDataList() {
      //获取党员个数
      api.getPartyCounts().then(res => {
      	console.log("党员个数", res)
         this.$data.dyCount=res.data.result
      }).catch(e => {
      	console.log("请求错误", e)
      })

  		//新闻数据
  		api.getNewsList({
  			"pageSize": 5
  		}).then(res => {
  			console.log(res)
  			this.$data.newsCount=res.data.result.total
  			if(res.data.result.total>0)
  			{
  				this.$data.newsDataList=res.data.result.records
  					console.log("新闻数据",this.$data.newsDataList)
  			}
  		}).catch(e => {
  			console.log("请求错误", e)
  		})
  		//主题活动数据-进行中
  		api.getEventList({
  			"pageSize": 5,
  			"isEnd":1,
  		}).then(res => {
  			console.log(res)
  			this.$data.ztCount1=res.data.result.total
  			if(res.data.result.total>0)
  			{
  				this.$data.ztDataList1=res.data.result.records
  				console.log("主题活动数据-进行中",this.$data.ztDataList1)
  			}
  			//这样做的目的是先获取进行中的数据,然后再补上往期的数据
  			this.getZtDataList()
  		}).catch(e => {
  			console.log("请求错误", e)
  		})

  		//三会一课数据-进行中
  		api.getMeetList({
  			"pageSize": 5,
  			"isEnd":1,
  		}).then(res => {
  			console.log(res)
  			this.$data.shykCount1=res.data.result.total
  			if(res.data.result.total>0)
  			{
  				this.$data.shykDataList1=res.data.result.records
  					console.log("三会一课数据",this.$data.shykDataList1)
  			}
  		}).catch(e => {
  			console.log("请求错误", e)
  		})
  		//三会一课数据-往期
  		api.getMeetList({
  			"pageSize": 5,
  			"isEnd":0,
  		}).then(res => {
  			console.log(res)
  			this.$data.shykCount0=res.data.result.total
  			if(res.data.result.total>0)
  			{
  				this.$data.shykDataList0=res.data.result.records
  					console.log("三会一课数据",this.$data.shykDataList0)
  			}
  		}).catch(e => {
  			console.log("请求错误", e)
  		})
  	},
  	getZtDataList(){
  		//主题活动数据-往期
  		api.getEventList({
  			"pageSize": 5,
  			"isEnd":0,
  		}).then(res => {
  			console.log(res)
  			this.$data.ztCount0=res.data.result.total
  			if(res.data.result.total>0)
  			{
  				this.$data.ztDataList0=res.data.result.records
  				console.log("主题活动数据-往期",this.$data.ztDataList0)
  			}
  		}).catch(e => {
  			console.log("请求错误", e)
  		})
  	}
  }
}
</script>

<style>
.body{
    width: 100%;
    min-width: 1080px;
    background-color: #fff;
}
.center{
    width: 100%;
    height: 185px;
    overflow: hidden;
    background-image: url(../assets/images/v2_qr4vi9.jpg);
    background-position: bottom;
    background-size: 115%;
}
.center ul{
    width: 1080px;
    margin: auto;
}
.center li{
    float: left;
    margin: 0 80px;
    text-align: center;
    color: #fff;
}
.center li:nth-of-type(1){
    margin-left: 160px;
}
.center li div{
    width: 70px;
    height: 70px;
    margin: 25px 0 12px;
    border-radius: 50%;
    overflow: hidden;
    background-color: #fff;
}
.center li div img{
    margin: 19px;
    width: 32px;
}
.center li p{
    font-size: 20px;
    line-height: 20px;
    margin-bottom: 14px;
}
.center li h3{
    font-family: SourceHanSansSC;
    font-weight: 700;
    font-size: 36px;
    color: rgb(255, 255, 255);
    font-style: normal;
    letter-spacing: 0px;
    line-height: 36px;
    text-decoration: none;
}
.activityList{
    width: 1080px;
    height: 514px;
    margin: auto;
    display: flex;
}
.activityList li{
    flex: 1;
    float: left;
}
.activityList li dl{
    width: 330px;
    height: 354px;
    margin: 0 auto;
    display: block;
    position: relative;
}
.activityList li dl dt{
    width: 100%;
    height: 78px;
}
.activityList li dl dt:nth-of-type(1){
    margin-top: 35px;
    margin-bottom: 20px;
    border-bottom: 6px solid #BFBFBF;
}
.activityList li dl dt:nth-of-type(2){
    width: 64px;
    height: 30px;
    line-height: 30px;
    background-color: rgb(172, 181, 173);
    border: none;
    color: rgb(255, 255, 255);
    font-size: 14px;
    text-align: center;
    /* float: right; */
    /* margin-top: 16px; */
    position: absolute;
    right: 0;
    bottom: -50px;
}
.activityList li dl dt div{
    margin-left: 56px;
}
.activityList li dl dt div img{
    width: 75px;
    float: left;
}
.activityList li dl dt div span{
    font-weight: 700;
    font-size: 28px;
    color: rgb(16, 16, 16);
    font-style: normal;
    letter-spacing: 0px;
    line-height: 75px;
    text-decoration: none;
    margin-left: 18px;
}
.activityList li dl dd{
    width: 100%;
    height: 48px;
    border-bottom: 2px dotted #BFBFBF;
    cursor: pointer;

}
.activityList li dl dd p span{
    font-weight: bold;
}
.activityList li dl dd p{
    width: 252px;
    height: 48px;
    line-height: 48px;
    float: left;
    overflow:hidden;
    word-break:keep-all;
    white-space:nowrap;
    text-overflow:ellipsis;

}
.activityList li dl dd img{
        float: right;
        width: 70px;
        margin-top: 8px;
}
.pwidth{
    width: 100%!important;
}
/* @media  */
</style>
