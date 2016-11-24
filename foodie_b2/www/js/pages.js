//所有相容的 JS
$$(document).on('pageInit', function (e) {
	// Do something here when page loaded and initialized
	$$("#btn_lang_tw").on('click', function () {
		_lang_set = "hk";
		_lang_index = 0;

		//myApp.popup('.popup-order-comfirmed');

		//alert(_lang_set);

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
	
	
	$$("#btnForgotPW").on('click', function () {
		
		//alert(_lang_index);
		
		mainView.router.load({
			url: 'forgotpw.html',
			context: Template7.data.languages.lang_signuporlogin[_lang_index]
		})
		

	});
	
	
	//open terms and conditions
	$$('.open-popup-term').on('click', function () {
		
		if (_lang_index==0) {
			//alert("0 " + _lang_index);
			myApp.popup('.popup-condition-tw');
		} else {
			//alert("1 " + _lang_index);
			myApp.popup('.popup-term-en');
		}
		
	});
	
	
	
	
		
	
	
	//alert("sss" + Template7.data.languages.lang_landing[0].signuporlogin);
	
	
  
})


	









//Pasword request password page
$$(document).on('pageInit', '.page[data-page="forgotpw"]', function (e) {
	
	$( "form#formPassREQ" ).submit(function( event ) {
		$_okForm = true;
		event.preventDefault();
		
		if ($('input[name="forgotuserphone"]').val()=="") {
			//alert("name");
			$('input[name="forgotuserphone"]').addClass("formError");
			$_okForm = false;
		}
		
	
		
		
		if ($_okForm) {
			
			$('input[name="needpassrid"]').val(localStorage.getItem('registrationId'));
			
			var postData = $(this).serialize();
			console.log(postData);
			
				
				$.ajax({
					type: 'POST',
					data: postData,
					crossDomain: true,
					url: $_server_pass_request,
					success: function(data){
						
						var n = data.search("pass"); 
						
						console.log("pass request 回傳 : " + n + data);
						if (data.search("pass")>=0) {
							alert("You may receive a password reset via SMS/text message.");
							
						} else {
							alert("Negative " + data);
						}
						
						//Redirect to Login
						mainView.router.load({
							url: 'login.html',
							context: Template7.data.languages.lang_signuporlogin[_lang_index] 
						});
						
						
					},
					error: function(data){
						console.log(data);
						//alert('You havent sign in yet!');
					}
				});
				
		}
			
		
		
		
	});
});









//Login page
$$(document).on('pageInit', '.page[data-page="login"]', function (e) {
	
	
	$$("#btn_signinfromlogin").on('click', function () {
		
		
		mainView.router.load({
			url: 'signin.html',
			context: Template7.data.languages.lang_signuporlogin[_lang_index] 
		})
	});
	
	
	$( "form#formLogin" ).submit(function( event ) {
		$_okLogin = true;
		event.preventDefault();
		
		if ($('input[name="loginuserphone"]').val()=="") {
			//alert("name");
			$('input[name="loginuserphone"]').addClass("formError");
			$_okLogin = false;
		}
		
		
		if ($('input[name="userpassword"]').val()=="") {
			//alert("name");
			$('input[name="userpassword"]').addClass("formError");
			$_okLogin = false;
		}
		
		
		if ($_okLogin) {
			
			
			$('input[name="loginrid"]').val(localStorage.getItem('registrationId'));
			
			var postData = $(this).serialize();
			console.log(postData);
			//alert($_server_login);
			
			//save to SQL 資料庫
				/*
				var postData = JSON.stringify(formData);
				contentType: "application/json; charset=utf-8",
					dataType: "json",
				*/
				
				$.ajax({
					type: 'POST',
					data: postData,
					crossDomain: true,
					url: $_server_login,
					success: function(data){
						
						var n = data.search("pass"); 
						
						console.log("Login 回傳 : " + n + data);
						if (data.search("pass")>=0) {
							alert("Login OK");
						} else {
							alert("Negative " + data);
						}
						
						//alert('Your profile was successfully added');
					},
					error: function(data){
						console.log(data);
						alert('There was an error adding your profile');
					}
				});
				
		}
			
		
		
		
	});
});




//指定 signin page 的 JS
//別的寫法  myApp.onPageInit('signin', function (page) { });   應該是一樣的用途
$$(document).on('pageInit', '.page[data-page="signin"]', function (e) {
	

	
	var _thetimestamp = Math.round(+new Date()/1000);
	
	$( "form#formSignin" ).submit(function( event ) {
		
		event.preventDefault();
		
		
		//alert("TimeStamp : " + _thetimestamp);
		
		$_okSubmit = true;
		
		
		
		$('input[name="rid"]').val(localStorage.getItem('registrationId'));
		$('input[name="imgPath"]').val($$("#myImage").attr("src"));
		
		//init
			$('input[name="username"]').removeClass("formError");
			$('input[name="userphone"]').removeClass("formError");
			$(".checkbox-custom  + .checkbox-custom-label").removeClass("formError");
		
		
		var formData = myApp.formToJSON('#formSignin');
		
		
		
		if ($('input[name="username"]').val()=="") {
			//alert("name");
			$('input[name="username"]').addClass("formError");
			$_okSubmit = false;
		}
		
		//Check if phone number is number
		isnum = /^\d+$/.test($('input[name="userphone"]').val());
		
		if (!isnum) {
			//alert("name");
			$('input[name="userphone"]').addClass("formError");
			$_okSubmit = false;
		}
		
		if (!JSON.stringify(formData.agreeTerm[0])) {
			$(".checkbox-custom  + .checkbox-custom-label").addClass("formError");
			$_okSubmit = false;
		}
		
		if ($_okSubmit) {
			/*	{"rid":"es0trHujKTU:APA91bFqXGni6mLnb7BuB9nvwEFbZoIubQb05bzPtHVCBqBhImtDFQI_ESsqubIc-SYnnsucffu96uZWzSylhFxyMB5Qjf8kIF3NxkTyjxNYuYRL8851CoGOC61JiCbs-3LDQL6_mTyd","imgPath":"img/dock_account_on.png","username":"12","userphone":"112","agreeTerm":["on"]}
			*/
			//console.log(JSON.stringify(formData));
			
			
			//上傳圖片
			if (_imageURI) {
				//alert("img");
				uploadProfileImg();
			} else {
				//alert("no img");
			}
			
			var postData = $(this).serialize();
			//console.log(postData);
			
			
			//alert($_server_saveDB + "?thetimestamp=" + _thetimestamp);
			
			//save to SQL 資料庫
				/*
				var postData = JSON.stringify(formData);
				contentType: "application/json; charset=utf-8",
					dataType: "json",
				*/
				
				$.ajax({
					type: 'POST',
					data: postData,
					crossDomain: true,
					url: $_server_saveDB + "?thetimestamp=" + _thetimestamp,
					success: function(data){
						console.log("回傳:" + data + "END");
						//alert(data);
						//alert('Your profile was successfully added');
						
						
						if (data.search("Done")>=0) {
							if (_lang_index === 0) {
								alert("你的密碼將會透過簡訊傳遞給你。");
							} else {
								alert("You will receive a password via SMS/text message")
							}
							
							//Redirect to Login page
								mainView.router.load({
									url: 'login.html',
									context: Template7.data.languages.lang_signuporlogin[_lang_index] 
								});
							
							
						} else {
							//已經建檔了 直接彈回 signorlogin
							alert("直接彈回 signorlogin");
							
								mainView.router.load({
									url: 'signorlogin.html',
									context: Template7.data.languages.lang_signuporlogin[_lang_index] 
								});
							
						}
						
						
						
					},
					error: function(data){
						console.log(data);
						//alert('There was an error adding your profile');
					}
				});
				
			
		} else {
			alert("Plese check your input!");
		}
		
	});
	
	//上傳圖片
	var _imageURI="";
	function uploadProfileImg() {
		var options = new FileUploadOptions();
		options.fileKey="file";
		options.fileName=_imageURI.substr(_imageURI.lastIndexOf('/')+1);
		options.mimeType="image/jpeg";
		console.log(options.fileName);
		var params = new Object();
		params.value1 = "test";
		params.value2 = "param";

		options.params = params;
		options.chunkedMode = false; 

		var ft = new FileTransfer();
		ft.upload(_imageURI, $_server_rec_img + "?thetimestamp=" + _thetimestamp , win2, fail2, options);
	}
	
	//成功上傳
        function win2(result) {
            console.log("Code = " + result.responseCode);
            console.log("Response = " + result.response);
            console.log("Sent = " + result.bytesSent);
            //alert(result.response + "\n" + JSON.stringify(result));
        }
		
	//上傳失敗
        function fail2(error) {
            alert("An error has occurred: Code = " + error.code + JSON.stringify(error));
        }
	
	
	$$("#signinCamera").on('click', function () {
		
		//啟動相機 https://github.com/apache/cordova-plugin-camera
		//Camera.PictureSourceType.CAMERA 用相機 , navigator.camera.PictureSourceType.PHOTOLIBRARY 用圖庫
		navigator.camera.getPicture(uploadPhoto, function(message) {
			alert('get picture failed,' + message);
			}, {
			quality: 70,
			destinationType: navigator.camera.DestinationType.FILE_URI,
			sourceType: Camera.PictureSourceType.CAMERA
		});
		
		
		
		//上傳相片
		function uploadPhoto(imageURI) {
			
			//顯示拍照的圖片
				$$("#myImage").show();
				$$("#myImage").attr("src" , imageURI);
				//alert("Camera 2 \n" + imageURI);
				
			_imageURI = imageURI;
			
			//若要在這上傳
			/*
            var options = new FileUploadOptions();
            options.fileKey="file";
            options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
            options.mimeType="image/jpeg";
			console.log(options.fileName);
            var params = new Object();
            params.value1 = "test";
            params.value2 = "param";
 
            options.params = params;
            options.chunkedMode = false;
 
            var ft = new FileTransfer();
            ft.upload(imageURI, $_server_rec_img , win, fail, options);
			*/
        }
		
		
		//成功上傳
        function win(result) {
            console.log("Code = " + result.responseCode);
            console.log("Response = " + result.response);
            console.log("Sent = " + result.bytesSent);
            alert(result.response + "\n" + JSON.stringify(result));
        }
		
		//上傳失敗
        function fail(error) {
            alert("An error has occurred: Code = " + error.code + JSON.stringify(error));
        }
		
		
		
	});
	
	
})




//back 離開 blog page 沒作用
$$(document).on('pageBack', '.page[data-page="blog"]', function (e) {
	/*
	mainView.router.load({url: 'home.html', force: true})
	
	mainView.router.refreshPage();
	mainView.router.refreshPreviousPage();
	*/
	/*
	mainView.router.back({
                    url: 'home.html',
                    force: true,
                    ignoreCache: true,
					context: Template7.data.languages.lang_landing[_lang_index] 
                })			
	
	
	mainView.router.load({
			url: 'home.html',
			force: true,
			context: Template7.data.languages.lang_landing[_lang_index] 
		})
	
	alert("blog Back");
	*/
});


//Blog page
$$(document).on('pageInit', '.page[data-page="blog"]', function (e) {
	
	
	
	//alert("ff");
	//不要 Android back btn to previous page  好像沒用
		/*
		mainView.router.load({
			pushState: false,
			ignoreCache: true
		})
		mainView.router.back({url: 'home.html', force: true})
		*/
		
	
	
	$_blog_title1 = '<span class="preloader"></span>';
	$_blog_title2 = '<span class="preloader"></span>';
	$_blog_content = '<span class="preloader"></span>';
	var $_blog_share_link = "";
	
	$(".blogtitle1").html($_blog_title1);
	$(".blogtitle2").html($_blog_title2);
	$(".blogcontent").html($_blog_content);
	
	
	//獲得 Query String
	var page = e.detail.page;
	//alert(page.url + " , Query String : " + page.query.bid);
	
	
	//Query Stringvar 
	/*
	query = $$.parseUrlQuery(page.url); 
	console.log("a" + query); 
	console.log("b" + query.bid);
	*/
	
	console.log($_blog_content_url + "?bid=" + page.query.bid);
	
	//讀動態 blog content 資料
	var requestBlog = $.ajax({
		type: 'GET', 
		url: $_blog_content_url + "?bid=" + page.query.bid, 
		data: { get_param: 'value' }, 
		dataType: 'json',
		success: function (data) { 
		
			//alert("!" + data.blogcontent[0].title1);
		
			$_blog_title1 = data.blogcontent[0].title1;
			$_blog_title2 = data.blogcontent[0].title2;
			$_blog_content = data.blogcontent[0].thecontent;
			$_blog_share_link = data.blogcontent[0].sharelink;
			
			
			$(".blogtitle1").html($_blog_title1);
			$(".blogtitle2").html($_blog_title2);
			$(".blogcontent").html($_blog_content);
			
			//alert("bbb2 " + $_blog_title1);
			
			/*
			 for (var i=0;i<data.blogcontent.length;++i) {
				 
			 }
			*/
			
			
			
			
		}
	});
	
	requestBlog.done(function( msg ) {
	  //alert("d" +msg);
	});
	 
	requestBlog.fail(function( jqXHR, textStatus ) {
	  //alert( "Request failed: " + textStatus );
	});
	
	
	
	//讀動態 blog more 資料
	var requestBlogmore = $.ajax({
		type: 'GET', 
		url: $_blog_content_more_url, 
		data: { get_param: 'value' }, 
		dataType: 'json',
		success: function (data) { 
		
			//alert("!" + data.blogmore[0].more);
			
			//alert("bbb2 " + $_blog_title1);
			
			_moreHtml = "";
			
			
			 for (var i=0;i<data.blogmore.length;++i) {
				_moreHtml += data.blogmore[i].more;
			 }
			 
			 //alert(_moreHtml);
			 $(".morelist").html(_moreHtml);

		}
	});
	
	
	requestBlogmore.fail(function( jqXHR, textStatus ) {
	  alert( "Request failed: " + textStatus );
	});
	
	
	$$(".btnBlogBack").on('click', function () {
		//震動
		//navigator.notification.vibrate(100);
		
		mainView.router.load({
			url: 'home.html',
			force: true,
			ignoreCache : true,
			context: Template7.data.languages.lang_landing[_lang_index] 
		});
		
	});
	
	
	$$(".btn_blogshare").on('click', function () {
		
		//alert($_blog_share_link);
		
		//Facebook does not permit you to share pre-filled text on Android, however images and urls will work.
		//不可以放圖片 image: "http://cordova.apache.org/images/cordova_bot.png",  不會跑
		//可以出現 text 跟 link (but FB 只有 link)
		var message = {
			text: "",
			url: $_blog_share_link
		};
		window.socialmessage.send(message);
		
		
		
	});
	
	
});



/*
//這是發生在 home page 離開後
$$(document).on('pageBack', '.page[data-page="home"]', function (e) {
	alert("Home Back")
});
*/


//這是避免 home 抓不到 slider  onPageBeforeInit 效果沒 onPageBeforeAnimation 這個好 
//onPageBeforeAnimation 每次動畫回來都會啟動
myApp.onPageBeforeAnimation("home", function(page){
	
	//alert("b"); 
	
	
	//Get Noti
		_notiNum = $("#notiHome").html();
		if (_notiNum>99) _notiNum = "more";
		$("#notiHome").css("background-image", "url(img/notinumber/"+ _notiNum +".png)")
		
		_notiNum = $("#notiMsg").html();
		if (_notiNum>99) _notiNum = "more";
		$("#notiMsg").css("background-image", "url(img/notinumber/"+ _notiNum +".png)")
		
		_notiNum = $("#notiOrder").html();
		if (_notiNum>99) _notiNum = "more";
		$("#notiOrder").css("background-image", "url(img/notinumber/"+ _notiNum +".png)")
		
		_notiNum = $("#notiBookmark").html();
		if (_notiNum>99) _notiNum = "more";
		$("#notiBookmark").css("background-image", "url(img/notinumber/"+ _notiNum +".png)")
		
		_notiNum = $("#notiAccount").html();
		if (_notiNum>99) _notiNum = "more";
		$("#notiAccount").css("background-image", "url(img/notinumber/"+ _notiNum +".png)")
	
	
	
	
	
	//獲得 Slider 的 json
		if ($_slider_html=="") {
			
			$.ajax({ 
				type: 'GET', 
				url: $_slider_json_url, 
				data: { get_param: 'value' }, 
				dataType: 'json',
				success: function (data) { 
					//$_slider_html = "";
					//alert(data.slider.length);
					 for (var i=0;i<data.slider.length;++i) {
						 //console.log(data.slider[i].img);
						 $_slider_html +='<div class="swiper-slide"><img src="'+ data.slider[i].img +'" /></div>';
					 }
					
					
					//alert("重抓 Slider : " + $_slider_html); 
					$("#homeSliderInit").html($_slider_html);
				}
			});
			
		}
		
		
	//獲得 Blog Slider 的 json
		//alert($_blog_slider_html);
	
		if ($_blog_slider_html=="") {
			
			$.ajax({
				type: 'GET', 
				url: $_blog_slider_json_url, 
				data: { get_param: 'value' }, 
				dataType: 'json',
				success: function (data) { 
					//$_blog_slider_html = "";
					//alert(data.slider.length);
					 for (var i=0;i<data.slider.length;++i) {
						 //console.log(data.slider[i].img);
						 //data-ignore-cache="true" data-force="true"
						 $_blog_slider_html +='<div class="swiper-slide"><a data-ignore-cache="true" data-force="true" href="'+ data.slider[i].link +'"><img src="'+ data.slider[i].img +'" /></a></div>';
					 }
					
					
					//alert("重抓 Blog Slider : " + $_blog_slider_html); 
					$("#homeBlogSliderInit").html($_blog_slider_html);
					
					var swiper = new Swiper('.swiper-blog', {
						slidesPerView: 'auto',
						spaceBetween: 5
					});
					
				}
			});
			
		} else {
			$("#homeBlogSliderInit").html($_blog_slider_html);
			var swiper = new Swiper('.swiper-blog', {
				slidesPerView: 'auto',
				spaceBetween: 5
			});
		}
	
		
		
	
	//這是避免漏字
	//alert(_lang_index +  Template7.data.languages.lang_landing[_lang_index].signuporlogin);
	if ($("#btn_signinorlogin").html()=="") {
		$("#btn_signinorlogin").html(Template7.data.languages.lang_landing[_lang_index].signuporlogin);
	}
	
	
});




//指定 home page 的 JS
$$(document).on('pageInit', '.page[data-page="home"]', function (e) {
  // Do something here when page with data-page="about" attribute loaded and initialized
  
	//alert("call home");
	
	//alert("a" + $_slider_html);
	
	/*
	if ($_blog_slider_html!="") {
		$("#homeBlogSliderInit").html($_blog_slider_html);
			var swiper = new Swiper('.swiper-blog', {
				slidesPerView: 'auto',
				spaceBetween: 5
			});
		alert("Blog Slider : " + $_blog_slider_html); 
	}
	*/
	
	
	
	if ($_slider_html!="") {
		//load live slider
		$("#homeSliderInit").html($_slider_html);
	}
	
	
	
		
	$$("#btn_signinorlogin").on('click', function () {
		
		//Hide Navi 改在 Dom 控制
		//mainView.hideNavbar();
		
		
		mainView.router.load({
			url: 'signorlogin.html',
			context: Template7.data.languages.lang_signuporlogin[_lang_index] 
		});

		
	});
	
	
	//動態 slider content
	//$$("#homeSliderInit").html('<div class="swiper-slide"><img src="img/slide2.jpg" /></div><div class="swiper-slide"><img src="img/slide1.jpg" /></div>');
	
	
	//Home Slider
	var mySwiper = myApp.swiper('.swiper-container', {
		preloadImages: true,
		pagination:'.swiper-pagination',
		paginationClickable: true,
		speed: 400,
		spaceBetween: 0
	});
	
	
	//Blog Slider  pagination: '.swiper-blog-pagination',  paginationClickable: true,
	/*
	 var swiper = new Swiper('.swiper-blog', {
		slidesPerView: 'auto',
		spaceBetween: 5
    });
	*/
	
 
	// Now you can use all slider methods like
		//mySwiper.slideNext();
  
  
})



//指定 signorlogin page 的 JS
$$(document).on('pageInit', '.page[data-page="signorlogin"]', function (e) {
	
		/*
		mainView.router.load({
			url: 'signorlogin.html',
			context: Template7.data.languages.lang_signuporlogin[_lang_index] 
		})
		*/
	//alert("call sign or login " + _lang_index);
	
	
	$$("#btn_signin").on('click', function () {
		
		//alert("Signin");
		
		//Hide Navi 改在 Dom 控制
		//mainView.hideNavbar();
		
		
		mainView.router.load({
			url: 'signin.html',
			context: Template7.data.languages.lang_signuporlogin[_lang_index] 
		})
	});
	
	
	
	
	
	$$("#btn_login").on('click', function () {
		
		
		mainView.router.load({
			url: 'login.html',
			context: Template7.data.languages.lang_signuporlogin[_lang_index] 
		})
	});
	
	
})