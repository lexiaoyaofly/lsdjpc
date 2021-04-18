import request from './http.js'

const api = {
    login (data){//登陆
      return request('/sys/mLogin', data, 'post')
    },
	/**
	  * 党员个数
	  */
	getPartyCounts(params) {
		console.log('参数',params)
		// return http.get('/GxxcApiCommon/pagelist',{'title':'联系我们'});
		return request('/party/partyUser/getPartyCounts',params,'get');
	},
    /**
      * news数据
      */
    getNewsList(params) {
    	console.log('news数据的参数',params)
    	// return http.get('/GxxcApiCommon/pagelist',{'title':'联系我们'});
    	return request('/party/content/getList',params,'get');
    },
    /**
      * news详情数据
      */
    getNewsDetails(params) {
    	// return http.get('/GxxcApiCommon/pagelist',{'title':'联系我们'});
    	return request('/party/content/info',params,'get');
    },

    /**
      * news分类数据
      */
    getNewsCategory(params) {
    	console.log('news数据的参数',params)
    	return request('/party/contentCategory/getList',params,'get');
    },
    /**
      * 三会一课数据
      */
    getMeetList(params) {
    	return request('/party/partMeeting/getList',params,'get');
    },
    /**
      * 三会一课数据详情
      */
    getMeetDetails(params) {
    	return request('/party/partMeeting/info',params,'get');
    },
    /**
      * 主题活动数据
      */
    getEventList(params) {
    	return request('/party/event/getList',params,'get');
    },
    /**
      * 主题活动数据详情
      */
    getEventDetails(params) {
    	return request('/party/event/info',params,'get');
    },
    /**
      * 获取详情信息
      */
    getDetails(params) {
    	return request('/GxxcApiCommon/queryById',{data:params});
    },
}

export default api
