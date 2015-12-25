$(function() {
	var e = {
		system: {},
		browser: {},
		flash: {},
		connect: {},
		delay: {},
		bandWidth: {},
		sound: {},
		mic: {},
		camera: {},
		ip: {}
	},
		n = {
			system: {},
			browser: {},
			flash: {},
			connect: {},
			delay: {},
			bandWidth: {},
			sound: {},
			mic: {},
			camera: {}
		},
		t = !0,
		s = null,
		o = null,
		a = $("#plusleSwfPath").val(),
		i = function() {
			$("tbody .result").html('<span class="icon_checking">' + $.t("test.check") + "</span>")
		},
		r = function(t) {
			var s = $("." + t);
			s.find(".value").html("<span>" + e[t].value + "</span>"), s.find(".result").html(1 == e[t].returnCode ? '<span class="icon_ok">' + $.t("other.normal") + "</span>" : '<span class="icon_warn">' + n[t].msg + "</span>"), s.removeClass("unchecked").addClass("checked")
		},
		d = function() {
			var n = !0,
				t = {};
			for (var s in e) t[s] = 1 == e[s].returnCode, 1 != e[s].returnCode ? n = !1 : $(".suggestion").find("." + s).text("--");
			t.net = t.connect && t.delay && t.bandWidth, t.net && $(".suggestion").find(".net").text("--"), $(".checking_title").text($.t("other.checked")), n ? $(".main_tip").text($.t("other.resultOk")).addClass("result_ok") : ($(".main_tip").text($.t("other.resultWarn")).addClass("result_warn"), $(".row_title").remove(), $(".suggestion").css("width", "240px").find("span").show(), $(".name").addClass("finish"), $(".value").addClass("finish"))
		},
		c = function() {
			var n = JSON.stringify(e),
				t = new Image;
			t.src = "http://101.251.203.114/userTest.gif?testResult=" + n;
			for (var s, o, a = document.location.search.slice(1).split("&"), i = 0; a[i]; i++) {
				var r = a[i].split("=");
				r.length > 1 && "result" == r[0] ? (s = new Image, o = r[1] + "?testResult=") : n += "&" + a[i]
			}
			s && (o += n, s.src = o)
		},
		l = function() {
			var t = [{
				s: "Windows 3.11",
				r: /Win16/
			}, {
				s: "Windows 95",
				r: /(Windows 95|Win95|Windows_95)/
			}, {
				s: "Windows ME",
				r: /(Win 9x 4.90|Windows ME)/
			}, {
				s: "Windows 98",
				r: /(Windows 98|Win98)/
			}, {
				s: "Windows CE",
				r: /Windows CE/
			}, {
				s: "Windows 2000",
				r: /(Windows NT 5.0|Windows 2000)/
			}, {
				s: "Windows XP",
				r: /(Windows NT 5.1|Windows XP)/
			}, {
				s: "Windows Server 2003",
				r: /Windows NT 5.2/
			}, {
				s: "Windows Vista",
				r: /Windows NT 6.0/
			}, {
				s: "Windows 7",
				r: /(Windows 7|Windows NT 6.1)/
			}, {
				s: "Windows 8.1",
				r: /(Windows 8.1|Windows NT 6.3)/
			}, {
				s: "Windows 8",
				r: /(Windows 8|Windows NT 6.2)/
			}, {
				s: "Windows NT 4.0",
				r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/
			}, {
				s: "Windows ME",
				r: /Windows ME/
			}],
				s = detector.os;
			if ("windows" == s.name) {
				var o = navigator.userAgent;
				e.system.value = $.t("other.checkFail");
				for (var a in t) {
					var i = t[a];
					if (i.r.test(o)) {
						e.system.value = i.s;
						break
					}
				}
				s.version > 6 ? e.system.returnCode = 1 : (e.system.returnCode = 2, n.system.msg = $.t("other.versionOld"))
			} else "macosx" == s.name ? (e.system.value = "MacOS X " + s.fullVersion, e.system.returnCode = 1) : (e.system.value = s.name + " " + s.version, e.system.returnCode = 1);
			var r = detector.browser;
			"ie" == r.name ? (r.name = "IE", r.version <= 8 ? (e.browser.returnCode = 2, n.browser.msg = $.t("other.versionOld")) : e.browser.returnCode = 1, r.compatible && (r.fullMode <= 8 ? (e.browser.returnCode = 2, n.browser.msg = $.t("other.versionOld")) : e.browser.returnCode = 1)) : (r.name = r.name.substr(0, 1).toUpperCase() + r.name.substr(1), e.browser.returnCode = 1);
			var d = r.compatible ? r.fullMode : r.fullVersion;
			e.browser.value = r.name + " " + d;
			var c = swfobject.getFlashPlayerVersion();
			e.flash.value = c.major + "." + c.minor + "." + c.release, c.major >= 13 ? e.flash.returnCode = 1 : (e.flash.returnCode = 2, n.flash.msg = $.t("other.versionOld"))
		},
		u = function(t, s, o, a) {
			switch (e.ip.value = a, o) {
			case 4:
				e.bandWidth.value = "> 100KB/s", n.bandWidth.msg = $.t("other.bandRank1");
				break;
			case 3:
				e.bandWidth.value = "> 30KB/s", n.bandWidth.msg = $.t("other.bandRank2");
				break;
			case 2:
				e.bandWidth.value = "< 30KB/s", n.bandWidth.msg = $.t("other.bandRank3");
				break;
			default:
				e.bandWidth.value = "< 10KB/s", n.bandWidth.msg = $.t("other.bandRank4")
			}
			e.bandWidth.returnCode = o > 2 ? 1 : 2, e.connect.value = t + "ms", 1e3 > t ? e.connect.returnCode = 1 : (e.connect.returnCode = 2, n.connect.msg = $.t("other.connectLong")), e.delay.value = s + "ms", 500 > s ? e.delay.returnCode = 1 : (e.delay.returnCode = 2, n.delay.msg = $.t("other.delayLong"))
		},
		h = function(e, n) {
			setTimeout(function() {
				r(e), n(null)
			}, 500)
		},
		m = function() {
			$("#check_swf_wrap").html('<div id="check_swf"></div>'), helper.loadSwf({
				path: $("#checkSwfPath").val(),
				id: "check",
				wrapId: "check_swf"
			})
		},
		f = function() {
			var e = 10;
			$(".count_second").text(e), clearTimeout(o), clearInterval(s), $("#mic_test").find(".tab").hide().end().find(".default_tip").show(), o = setTimeout(function() {
				$("#mic_test").find(".tab").hide().end().find(".mic_unsupport").show()
			}, 1e4), s = setInterval(function() {
				$(".count_second").text(--e), 0 >= e && clearInterval(s)
			}, 1e3)
		};
	helper.pubSubInit(), 
	$.Events("startTest").on(function() {
		i(), Thenjs(function(e) {
			h("system", e)
		}).then(function(e) {
			h("browser", e)
		}).then(function(e) {
			h("flash", e)
		}).then(function(e) {
			flashInterface.startSpeedTest(), $.Events("speedTestEnd").on(function(n, t, s, o) {
				u(n, t, s, o), e(null)
			})
		}).then(function(e) {
			setTimeout(function() {
				r("connect"), e(null)
			}, 500)
		}).then(function(e) {
			h("delay", e)
		}).then(function(e) {
			h("bandWidth", e)
		}).then(function(t) {
			setTimeout(function() {
				helper.showModal($("#sound_test")), helper.loadSwf({
					path: a + "?id=sound",
					id: "sound",
					wrapId: "sound_swf_holder"
				}), $("#sound_test").on("click", ".btn", function() {
					$(this).hasClass("no_sound") ? (e.sound.value = $.t("other.noSound"), e.sound.returnCode = 2, n.sound.msg = $.t("other.soundError")) : (e.sound.value = $.t("other.hasSound"), e.sound.returnCode = 1), r("sound"), t(null)
				})
			}, 500)
		}).then(function(t) {
			helper.closeModal(), setTimeout(function() {
				helper.showModal($("#mic_test")), helper.loadSwf({
					path: a + "?id=mic",
					id: "mic",
					wrapId: "mic_swf_holder"
				}), f(), $("#mic_list").on("change", function() {
					f()
				}), $.Events("micLevelChange").on(function(e) {
					e > 5 && (clearTimeout(o), clearInterval(s), $("#mic_test").find(".tab").hide().end().find(".next_display").show())
				}), $.Events("micLoadCompelete").on(function() {
					e.mic.name = $("#mic_list")[0].item(0).innerHTML
				}), $("#mic_list").on("change", function() {
					e.mic.name = this.selectedOptions.item().innerHTML
				}), $("#mic_test").on("click", ".next_btn", function() {
					$(this).hasClass("no_mic") ? (e.mic.value = $.t("other.noSound"), e.mic.returnCode = 2, n.mic.msg = $.t("other.speakError")) : (e.mic.value = $.t("other.hasSound"), e.mic.returnCode = 1), r("mic"), t(null)
				})
			}, 500)
		}).then(function(t) {
			helper.closeModal(), setTimeout(function() {
				helper.showModal($("#camera_test")), helper.loadSwf({
					path: a + "?id=cam",
					id: "cam",
					wrapId: "camera_swf_holder"
				}), $.Events("cameraLoadCompelete").on(function() {
					e.camera.name = $("#camera_list")[0].item(0).innerHTML
				}), $("#camera_list").on("change", function() {
					e.camera.name = this.selectedOptions.item().innerHTML
				}), $("#camera_test").on("click", ".btn", function() {
					$(this).hasClass("no_view") ? (e.camera.value = $.t("other.noVideo"), e.camera.returnCode = 2, n.camera.msg = $.t("other.videoError")) : (e.camera.value = $.t("other.hasVideo"), e.camera.returnCode = 1), r("camera"), t(null)
				})
			}, 500)
		}).then(function() {
			helper.closeModal(), d(), c()
		})
	}),
	$(".setting_complete").on("click", function() {
		$(".privacy_area").html('<div id="privacy_holder"></div>'), helper.loadSwf({
			path: $("#privacySwfPath").val(),
			id: "privacy",
			wrapId: "privacy_holder"
		}), m()
	}), 
	$(".i18n a").on("click", function() {
		var e = $(this).attr("data-type"),
			n = location.search,
			t = location.href.replace(n, "").replace(location.hash, ""),
			s = !1;
		if (n.length > 0) {
			for (var o = n.slice(1).split("&"), a = 0; a < o.length; a++) o[a].indexOf("lang=") > -1 && (o[a] = "lang=" + e, s = !0);
			t = s ? t + "?" + o.join("&") : t + "?" + o.join("&") + "&lang=" + e
		} else t = t + "?lang=" + e;
		location.href = t
	}),i18n.init({}, function() {
		$("html").i18n(), l(), helper.loadSwf({
			path: a + "?id=main",
			id: "main",
			wrapId: "mainSwf"
		}), 0 == swfobject.getFlashPlayerVersion().major && (t = !1, $(".start_view .tab").hide(), $(".no_flash").show())
	});	
});