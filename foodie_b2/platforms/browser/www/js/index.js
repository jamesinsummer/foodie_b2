

// Initialize app Framework7  https://framework7.io/docs/init-app.html
var myApp = new Framework7({
	
	pushState: true, //show url change or not, mostly for webapp
	precompileTemplates: true, //
	template7Pages: true, //enable Template7 rendering for pages
	dynamicNavbar: true,	//Set to true to enable Dynamic Navbar in this View
	cacheIgnore:["blog"],	//若這失效，可以試看看 myApp.params.cacheIgnore = ['/users/index', '/users/add', 'users/index', 'users/add'];
	cache:false,			//try myApp.params.cache = false;
	
	// Hide and show indicator during ajax requests
    onAjaxStart: function (xhr) {
        myApp.showIndicator();
    },
    onAjaxComplete: function (xhr) {
        myApp.hideIndicator();
    },
	
	//Specify templates/pages data
	template7Data: {
		
		// Data for home page
        'page:home2': {
				signuporlogin:'註冊2 / 登入'
		},
		
		'url:about.html': {
			name: 'John Doe',
			age: 38,
			company: 'Apple',
			position: 'Developer'
		},
		
		// Plain data object
		'languages': {
			
			'lang_landing': [
				{
					
					signuporlogin:'註冊 / 登入',
					naviback: '上一頁',
					pagetitle: '多語 & page2 測試'
				},
				{
					
					signuporlogin:'Sign up / Login',
					naviback: 'Back',
					pagetitle: 'Locale & page2 Test'
				}
			],
			'lang_signuporlogin': [
				{
					signup:'註冊',
					login: '登入',
					signinname:'登入名稱',
					signinphone:'手機號碼',
					loginpassword:'密碼',
					forgotPW:'忘記密碼?',
					theor:'或',
					newuser:'新用戶',
					signinSMS:'密碼會以短訊發送至手機',
					signinagree:'我同意',
					signinterm:'服務及使用條款'
				},
				{
					signup:'Sign up',
					login: 'Login',
					signinname:'Account Name',
					signinphone:'Phone Number',
					loginpassword:'Password',
					forgotPW:'Lost your password?',
					theor:'or',
					newuser:'New User',
					signinSMS:'Your password will send to your phone by SMS',
					signinagree:'I agree',
					signinterm:'Term and condition'
				},
			]
		}
		
	}
	
});






// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;



// Add view
var mainView = myApp.addView('.view-main', {
  // Because we want to use dynamic navbar, we need to enable it for this view:
  dynamicNavbar: true
});


//Hide Navi
mainView.hideNavbar();



//用 Global 在任何 refresh 都 ok
/*
Template7.global = {
	os: 'windows',
	browser: 'Chrome',
	username: 'jla',
	email: 'james@idea-ripple.com'
};
*/




/*
$( document ).ready(function() {
	console.log( "document loaded" );
	//alert("Step 1");
});
*/



// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
	
	//alert("Step 2");
	
    console.log("FW7 Device is ready!");
	
	console.log("RID : " + localStorage.getItem('registrationId'));
	
	//改變 Android Statusbar
	if (cordova.platformId == 'android') {
		StatusBar.backgroundColorByHexString("#000000");
		//白底黑字 沒有用
		//StatusBar.styleDefault();
	}
	
	console.log($( window ).width() + " , " + $( document ).width());
	 
	console.log("****" + "\n" + 
		device.cordova + "\n" +
		device.model + "\n" +
		device.platform + "\n" +
		device.uuid + "\n" +
		device.version + "\n" +
		device.manufacturer + "\n" +
		device.isVirtual + "\n" +
		device.serial
	);
	
	//獲得 notification 需要的 RID
		pushJS.setupPush();
	
	
	//獲得 Slider 的 json
		$.ajax({ 
			type: 'GET', 
			url: $_slider_json_url, 
			data: { get_param: 'value' }, 
			dataType: 'json',
			success: function (data) { 
				
				//alert(data.slider.length);
				 for (var i=0;i<data.slider.length;++i) {
					 //console.log(data.slider[i].img);
					 $_slider_html +='<div class="swiper-slide"><img src="'+ data.slider[i].img +'" /></div>';
				 }
				
				
				//alert($_slider_html);
				
			}
		});

	
	//獲得 GPS info
		// Options: throw an error if no update is received every 30 seconds.
		var watchID = navigator.geolocation.watchPosition(onSuccess, onError, { timeout: 30000 , enableHighAccuracy: true });

    
	//Android hardware back btn handler
		document.addEventListener("backbutton", onBackKeyDown, false);
		
		
		
});


//Android Hardware back handler function
function onBackKeyDown() {
	
	//alert(mainView.activePage.name);

	if (mainView.activePage.name == "index" || mainView.activePage.name == "home") {
		myApp.confirm('Exit the APP?', '11 Foody' , function () {
			navigator.app.exitApp();
			//myApp.alert('You clicked Ok button');
		});
	} else if (mainView.activePage.name == "blog")  {
		
		//不要有動作
		
		/*
		mainView.router.back({
			url: 'home.html',
			force: true,
			ignoreCache : true,
			context: Template7.data.languages.lang_landing[_lang_index] 
		});
		*/
		
		//mainView.router.back();
		
		
		
		
	} else {
		mainView.router.back();
	}
	
	

}


//GPS functions
	function onSuccess(position) {
        var element = document.getElementById('geolocation');
		$("#gpsInfo").html('Latitude: '  + position.coords.latitude  + "<br />" + 'Longitude: ' + position.coords.longitude + "<br />");
        console.log('Latitude: '  + position.coords.latitude  + "\n" + 'Longitude: ' + position.coords.longitude + "\n");
    }


    function onError(error) {
		//alert("Please turn on GPS/Location");
        //alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
    }

    





//alert("Step 3");
//index JS only run one time
$$("#btn_lang_tw").on('click', function () {
	_lang_set = "hk";
	_lang_index = 0;
	
	//myApp.popup('.popup-order-comfirmed');
	

	//alert(_lang_set);
	
	//mainView.router.loadContent(content)
	mainView.router.load({
		url: 'home.html',
		context: Template7.data.languages.lang_landing[_lang_index] 
	})
	

});

$$("#btn_lang_en").on('click', function () {
	_lang_set = "en";
	_lang_index = 1;
	//alert(_lang_set);


	mainView.router.load({
		url: 'home.html',
		context: Template7.data.languages.lang_landing[_lang_index]
	})

});


//Link demo
/*
$$("#ext-link").on("click", function() {
	console.log('clicked'); 
	
	
	alert("Your RID : " + localStorage.getItem('registrationId'));
	
	$sender_url = "http://dev1.idearipple.com/FCM/sender.php?rid=" + localStorage.getItem('registrationId') + "&model=" + device.model;
	
	window.open($sender_url, "_blank");
	
	//已經不需要這樣了，直接用 window.open 即可
	if (typeof navigator !== "undefined" && navigator.app) {
		
		alert("b");
		
		// Mobile device.
		//navigator.app.loadUrl('http://www.google.com/', {openExternal: true});
		
		window.open($sender_url, "_blank");
		
		
	} else {
		
		alert("c");
		
		// Possible web browser
		window.open($sender_url, "_blank");
	}
	
});
*/


//只要有下面的碼就可獲得設備的 push 所需的 registration id
//Android 需要 sender ID , 這部分必須在 FireBase 建立 for web 的 APP 下獲得
//James Got and modified this from phonegap push notifiaction sample code
var pushJS = {
	setupPush: function() {
        console.log('calling push init');
        var push = PushNotification.init({
            "android": {
                "senderID": _senderID
            },
            "browser": {},
            "ios": {
                "sound": true,
                "vibration": true,
                "badge": true
            },
            "windows": {}
        });
        console.log('after init');

        push.on('registration', function(data) {
            console.log('registration event: ' + data.registrationId);
			
			//alert(data.registrationId);
			
			$$("#rid").html(data.registrationId);
			
			
			$$(".listening").hide();
			$$(".received").show();
			$$("#btnWrap").show();
			
			
			
            var oldRegId = localStorage.getItem('registrationId');
            if (oldRegId !== data.registrationId) {
                // Save new registration ID
                localStorage.setItem('registrationId', data.registrationId);
                // Post registrationId to your app server as the value has changed
            }
			
			/*
			//拿掉
            var parentElement = document.getElementById('registration');
            var listeningElement = parentElement.querySelector('.waiting');
            var receivedElement = parentElement.querySelector('.received');

            listeningElement.setAttribute('style', 'display:none;');
            receivedElement.setAttribute('style', 'display:block;');
			*/
			
        });

        push.on('error', function(e) {
            console.log("push error = " + e.message);
        });
		
		//收到 notification 處理的地方
        push.on('notification', function(data) {
			
            console.log('notification event');
			
			//$$("#rid").html("Got Push");
			//myApp.alert('Here goes alert text', 'Custom Title!');
			
			
			//不這樣用會無效（壓成 APK）
			setTimeout(function () {
				myApp.popup('.popup-about');
				//alert('timeout');
			}, 300);
			
			
            navigator.notification.alert(
                data.message,         // message
                null,                 // callback
                data.title,           // title
                'Ok'                  // buttonName
            );
			
			
			
       });
    }
};
 
 
