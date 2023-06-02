'use strict';
let isUrlTrue = new RegExp("我的+[G-g]+algame资源")
	.test($("title")
		.text()); //是否域名正确
if (isUrlTrue && $("#zan-header")[0] != undefined && window.location.href.indexOf(".jpg") == -1) { // 并且不是通知站
	let settingHtml = `
				<aside id="zan_custom-wyyxhyf_setting_page">
					<div class="panel panel-zan aos-init aos-animate" aos="fade-up" aos-duration="2000">
						<div class="panel-heading">
							设置界面
						</div>
						<div class="panel-body custom">
							<!-- 自动登录 -->
							<label><input type="checkbox" name="setOpen" value="autoLogin">自动登录：</label>
							<br>&nbsp;账户:<input type="text" class="form-controla">
							<br>&nbsp;密码:<input type="password" class="form-controla">
							<!-- 右键菜单 -->
							<strong>右键类:</strong>
							<br><label><br>&nbsp;<input type="checkbox" name="setOpen" value="rightRemake">右键菜单快捷刷新</label>
							<br><label><br>&nbsp;<input type="checkbox" name="setOpen" value="showringtimg">完整右键图片</label>
							<br><label><br>&nbsp;<input type="checkbox" name="setOpen" value="dowImg">图片下载</label>
							<br>&nbsp;下载页面自动关闭等待时长：<input type="number" name="downloadCloseWindowTime" class="form-controla">
							<br><p style="color: #797979;">&nbsp;下载背景轮播图时，会同时打开许多页面，注意性能消耗</p>
							<input type="button" value="保存并关闭" class="save btn btn-inverse-primary pull-left">
						</div>
					</div>
				</aside>
				`
	let barHtml = ` 
			<li id="wyyxhyf_setting_page"
				class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children">
				<a href="javascript:void(0)">
					<i class="fa fa-code"></i>插件设置
				</a>
			</li>
		`
	$("body")
		.prepend("<style>" + allCss + "</style>")
	let dleayTime = localStorage.downloadCloseWindowTime_wyyxhyf == undefined ? 1.5 : localStorage.downloadCloseWindowTime_wyyxhyf;
	if (localStorage.openSetting_wyyxhyf != undefined) { // 设置菜单是否为空
		if (localStorage.loginWord_wyyxhyf != undefined && $("#zan_login-5 input[id=log]") != undefined && JSON.parse(localStorage.openSetting_wyyxhyf)
			.indexOf("autoLogin") != -1) { //自动登录
			$("#zan_login-5 input[id=log]")
				.val(localStorage.loginWord_wyyxhyf);
			$("#zan_login-5 input[id=pwd]")
				.val(localStorage.passWord_wyyxhyf)
			$("#rememberme,#zan_login-5 button[name=submit]")
				.click()
		}
		if (JSON.parse(localStorage.openSetting_wyyxhyf)
			.indexOf("rightRemake") != -1) { //右键快捷刷新
			$(".ring>.menuItem:eq(1)")
				.text("刷新")
				.attr("href", "javascript:void(0)")
				.click(function () {
					location.reload();
				})
		}
		if (JSON.parse(localStorage.openSetting_wyyxhyf)
			.indexOf("showringtimg") != -1) { //完整右键图片
			$(".ring>.menuItem:eq(2)")
				.text("显示完整图")
				.attr("href", "javascript:void(0)")
				.click(function () {
					let img = $("#overlay>.large")
						.css("background-image");
					if (img.indexOf(".jpg") != -1) {
						img = img.slice(_.add(img.indexOf('("'), 2), img.length - 2);
						$("#overlay>.small")
							.attr("src", img)
							.css({
								"opacity": 1,
								"width": "100vw",
								"height": "auto"
							})
						$(".large")
							.css("background-image", "url()")
						let mutationObserver = new MutationObserver(function (mutations) {
							mutations.forEach(function (mutation) {
								if (!$('#gal')
									.hasClass('open')) {
									console.log("close")
									let url = window.location.origin + "/wp-content/themes/mygalgame/ui/images/rpic.png"
									$("#overlay>.small")
										.attr("src", url)
										.css("opacity", 0)
									$(".large")
										.css("background-image", "url(" + img + ")")
								}
							});
						});
						/**Element**/
						mutationObserver.observe($('#gal')[0], {
							attributes: true,
							characterData: true,
							childList: true,
							subtree: true,
							attributeOldValue: true,
							characterDataOldValue: true
						});
					}
				})
		}

		let dom = $("#article-list>div").each(function (indexInArray, valueOfElement) {
			console.log($(valueOfElement).children("div span"))
		});

		if (window.location.href.indexOf("submit") != -1 && window.location.href.indexOf("%23") != -1) {
			// window.open()
			//多tag搜索

		}

		if (JSON.parse(localStorage.openSetting_wyyxhyf)
			.indexOf("dowImg") != -1) {
			let dowButton = `
					<a href="javascript:void(0)" class="dowButton_wyyxhyf btn btn-inverse-primary pull-left">下载</a>
				`
			let dowButtonTwe = `
				<a href="javascript:void(0)" class="dowButtonTwe_wyyxhyf btn btn-inverse-primary pull-left">下载图片</a>
			`
			$(".ring>.menuItem:eq(3)") // 背景轮播图下载
				.text("下载轮播图")
				.attr("href", "javascript:void(0)")
				.click(function () {
					let lbtImg = [];
					$("section.hidden-xs>ul.cb-slideshow span")
						.each(function (i, e) {
							let img = $(e)
								.css("background-image");
							img = img.slice(_.add(img.indexOf('("'), 2), img.length - 2);
							lbtImg.push(img)
						});
					lbtImg.forEach(function (v) {
						window.open(v + "?from=mygalgame&delay=" + dleayTime)
					})
				})
			$("#article-list>.clearfix>.hidden-xs>.alert")
				.append(dowButton);
			$(".dAnim")
				.prepend(dowButtonTwe);
			$("a.dowButtonTwe_wyyxhyf")
				.click(function (e) {
					let img = $($(e)[0]["currentTarget"])
						.siblings(".highslide-image")
						.children("img")
						.attr("src")
					window.open(img + "?from=mygalgame&delay=" + dleayTime)
				})
			$("a.dowButton_wyyxhyf")
				.click(function (e) {
					let img = $($(e)[0]["currentTarget"])
						.siblings(".bottom_to_top")
						.children("a")
						.children(".img")
						.children("img")
						.attr("src")
					downloadImg(img)
				})
			// 上面是封面图下载
			// 下面是右键图下载
			$(".ring>.menuItem:eq(0)")
				.text("下载完整图")
				.attr("href", "javascript:void(0)")
				.click(function () {
					let img = $("#overlay>.large")
						.css("background-image");
					img = img.slice(_.add(img.indexOf('("'), 2), img.length - 2);
					if (img.indexOf(".jpg") == -1) {
						img = $("#overlay>.small")
							.attr("src")
					}
					window.open(img + "?from=mygalgame&delay=" + dleayTime)
				})

			function downloadImg(imgurl) {
				try {
					let image = new Image()
					image.setAttribute('crossOrigin', 'anonymous')
					image.onload = function () {
						let canvas = document.createElement('canvas')
						canvas.width = image.width
						canvas.height = image.height

						let context = canvas.getContext('2d')
						context.drawImage(image, 0, 0, image.width, image.height)
						let url = canvas.toDataURL('image/png')
						let a = document.createElement('a')
						// 创建一个单击事件
						let event = new MouseEvent('click')
						a.download = "mygalgameImage.jpg" || '下载图片名称'
						a.href = url

						// 触发a的单击事件
						a.dispatchEvent(event)
					}

					image.src = imgurl
				} catch (err) {
					window.open(imgurl + "?from=mygalgame&delay=" + dleayTime)
				}
			}
		}
	}
	$("#menu-caidan")
		.append(barHtml); //添加菜单项large
	$("#wyyxhyf_setting_page")
		.click(function () {

			sessionStorage.setItem("thispage_wyyxhyf", $("#menu-caidan .current-menu-item")
				.index())
			$("#menu-caidan li")
				.each(function (i) { // 顶部导航条显示
					$(this)
						.removeClass("current-menu-item")
				})
			$("#wyyxhyf_setting_page")
				.addClass("current-menu-item");

			if ($("#zan_custom-wyyxhyf_setting_page")[0] == undefined) {
				$("#zan-bodyer .row")
					.fadeOut(500);
				$("#zan-bodyer>.container")
					.append(settingHtml);
				if (localStorage.openSetting_wyyxhyf != undefined) $.each(JSON.parse(localStorage
					.openSetting_wyyxhyf),
					function (i, d) {
						$("#zan_custom-wyyxhyf_setting_page *[type=checkbox][value=" + d + "]")
							.click()
					})
				$("#zan_custom-wyyxhyf_setting_page *[type=text]")
					.val(localStorage.loginWord_wyyxhyf)
				$("#zan_custom-wyyxhyf_setting_page *[type=password]")
					.val(localStorage.passWord_wyyxhyf)
				if (localStorage.downloadCloseWindowTime_wyyxhyf != undefined) {
					$("#zan_custom-wyyxhyf_setting_page *[name=downloadCloseWindowTime]")
						.val(localStorage.downloadCloseWindowTime_wyyxhyf)
				} else {
					$("#zan_custom-wyyxhyf_setting_page *[name=downloadCloseWindowTime]")
						.val(1.5)
				}

				$("#zan_custom-wyyxhyf_setting_page input.save")
					.click(function () {
						$("#zan_custom-wyyxhyf_setting_page,#zan_custom-wyyxhyf_setting_page *")
							.off() //结束监听
						localStorage.setItem("loginWord_wyyxhyf", $("#zan_custom-wyyxhyf_setting_page *[type=text]")
							.val());
						localStorage.setItem("downloadCloseWindowTime_wyyxhyf", $(
							"#zan_custom-wyyxhyf_setting_page *[name=downloadCloseWindowTime]")
							.val());
						localStorage.setItem("passWord_wyyxhyf", $(
							"#zan_custom-wyyxhyf_setting_page *[type=password]")
							.val());
						let openSet = new Array();
						$('#zan_custom-wyyxhyf_setting_page input[name="setOpen"]:checked')
							.each(
								function () { //设置启用的功能
									openSet.push($(this)
										.val());
								});
						localStorage.setItem("openSetting_wyyxhyf", JSON.stringify(openSet))
						$("#wyyxhyf_setting_page")
							.removeClass("current-menu-item");
						$("#menu-caidan li:eq(" + sessionStorage.getItem("thispage_wyyxhyf") +
							")")
							.addClass("current-menu-item")
						sessionStorage.thispage_wyyxhyf = undefined;
						location.reload();
					})
			}

		})
} else if (readUrlGetdata(window.location.href)
	.from == 'mygalgame') {
	$(function () {
		let image = new Image()
		// 解决跨域 Canvas 污染问题
		image.setAttribute('crossOrigin', 'anonymous')
		image.onload = function () {
			let canvas = document.createElement('canvas')
			canvas.width = image.width
			canvas.height = image.height

			let context = canvas.getContext('2d')
			context.drawImage(image, 0, 0, image.width, image.height)
			let url = canvas.toDataURL('image/png')
			let a = document.createElement('a')
			// 创建一个单击事件
			let event = new MouseEvent('click')
			a.download = "mygalgameImage.jpg" || '下载图片名称'
			a.href = url

			// 触发a的单击事件
			a.dispatchEvent(event)
			setTimeout(function () {
				window.close()
			}, readUrlGetdata(window.location.href)["delay"] * 1000)
		}
		image.src = jQuery("img")
			.attr("src")
	})
} else if (isUrlTrue) { //是通知站
	let truePageUrl = $("font")
		.text()
		.substring($("font")
			.text()
			.indexOf("：") + 1);
	if (new RegExp("^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$")
		.test(truePageUrl) && window
			.location.origin.indexOf("mmgal")) {
		truePageUrl = "https://www." + truePageUrl;
		window.open(truePageUrl, "_self")
	} else {
		console.log("没有捕获到域名");
	}
}

function readUrlGetdata(url) {
	if (url.split("?")[1] != undefined) {
		let str = url;
		let arr = str.split("?")[1].split("&"); //先通过？分解得到？后面的所需字符串，再将其通过&分解开存放在数组里
		let obj = {};
		for (let i of arr) {
			obj[i.split("=")[0]] = i.split("=")[1]; //对数组每项用=分解开，=前为对象属性名，=后为属性值
		}
		return obj
	} else {
		return {}
	}
}
