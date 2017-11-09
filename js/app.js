(function($, owner) {
	owner.createState = function(name, callback) {
		var state = owner.getState();
		state.account = name;
		state.token = "token123456789";
		owner.setState(state);
		return callback();
	};
	/**
	 * 获取当前状态
	 **/
	owner.getState = function() {
		var stateText = localStorage.getItem('$state') || "{}";
		return JSON.parse(stateText);
	};

	/**
	 * 设置当前状态
	 **/
	owner.setState = function(state) {
		state = state || {};
		localStorage.setItem('$state', JSON.stringify(state));
		//var settings = owner.getSettings();
		//settings.gestures = '';
		//owner.setSettings(settings);
	};

	/**
	 * 获取应用本地配置
	 **/
	owner.setSettings = function(settings) {
		settings = settings || {};
		localStorage.setItem('$settings', JSON.stringify(settings));
	};

	/**
	 * 设置应用本地配置
	 **/
	owner.getSettings = function() {
		var settingsText = localStorage.getItem('$settings') || "{}";
		return JSON.parse(settingsText);
	};
	/**
	 * 获取本地是否安装客户端
	 **/
	owner.isInstalled = function(id) {
		if (mui.os.android) {
			var main = plus.android.runtimeMainActivity();
			var packageManager = main.getPackageManager();
			var PackageManager = plus.android.importClass(packageManager)
			var packageName = {
				"weixin": "com.tencent.mm"
			}
			try {
				return packageManager.getPackageInfo(packageName[id], PackageManager.GET_ACTIVITIES);
			} catch (e) {}
		} else {
			switch (id) {
				case "weixin":
					var WXApi = plus.ios.import("WXApi");
					return WXApi.isWXAppInstalled();
				default:
					break;
			}
		}
	};
	
	/**
	 * 获取页面input元素，并将焦点设置在第一个
	 **/
	owner.getInput = function(){
		var list = new Array(); 
		for(var i=0;i<document.all.length-1;i++) 
		{ 
			if(document.all[i].type=="text"||document.all[i].type=="password") 
				list.push(i); 
		} 
		
		for(var i=0;i<list.length-1;i++) 
		{ 
			if(i<list.length-1){
				document.all[list[i]].setAttribute("nextFocusIndex",list[i+1]);
			}
		} 
		document.all[list[0]].focus(); 
	}
	
	/**
	 * 按下enter键后光标直接定位到下一个input
	 **/
	owner.changeEnter = function(obj){
		if(event.keyCode==13){
	    	var nextFocusIndex=obj.getAttribute("nextFocusIndex"); 
	    	if(nextFocusIndex!=null&&nextFocusIndex!=''){
	    		document.all[nextFocusIndex].focus(); 
	    	}else{
	    		//关闭软键盘
	    		document.activeElement.blur();
	    	}
	    }
	}
}(mui, window.app = {}));