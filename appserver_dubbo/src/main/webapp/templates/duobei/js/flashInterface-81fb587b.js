var flashInterface=function(){var e=null,t=null,n=null,i=null;return{init:function(a){if("main"==a)e=swfobject.getObjectById(a);else if("sound"==a)t=swfobject.getObjectById(a);else if("mic"==a){n=swfobject.getObjectById(a);var c=this.getMicNames(),o=$("#mic_list"),s="";if(c.length>0){for(var r=0;r<c.length;r++)s+='<option value="'+r+'">'+c[r]+"</option>";o.html(s),o.on("change",function(){var e=this.value;flashInterface.switchMicrophone(e)}),$.Events("micLoadCompelete").fire()}else s='<p class="no_device_tip">'+$.t("modalMic.noMic")+"</p>",o.remove(),$(".mic_list").html(s)}else if("cam"==a){i=swfobject.getObjectById(a);var l=this.getCameraNames(),o=$("#camera_list"),s="";if(l.length>0){for(var r=0;r<l.length;r++)s+='<option value="'+r+'">'+l[r]+"</option>";o.html(s),o.on("change",function(){var e=this.value;flashInterface.switchCamera(e)}),$.Events("cameraLoadCompelete").fire()}else s='<p class="no_device_tip">'+$.t("modalCam.noCam")+"</p>",o.remove(),$(".camera_list").html(s)}},test:function(){e&&e.test()},startSpeedTest:function(){e&&e.startSpeedTest()},getMicNames:function(){return n.getMicNames()},getCurrentMicInfo:function(){return n.getCurrentMicInfo()},setTempMic:function(e){n&&n.setTempMic(e)},getCameraNames:function(){return i.getCameraNames()},switchCamera:function(e){i&&i.switchCamera(e)},switchMicrophone:function(e){n&&n.switchMicrophone(e)}}}();