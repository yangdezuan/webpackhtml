import '../css/index.scss';
import { clearInterval } from 'timers';
const _index = {
  init(){
    this.Events(); //流程操作步骤
  },
  Events(){
    const that = this;
    let dialog = $('.dialog');
    let j_drop_open = $('.btn-way-drop');
    let j_fill_in = $(".j_fill_in");
    // 其它绑定方式
    j_drop_open.click(() =>{
      dialog.css({opacity: 1, zIndex: 999});
    });

    //关闭dialog
    dialog.on('click', (e) => {
      if(e.target.nodeName == 'SECTION'){
        $(e.target).css({ opacity: 0});
        setTimeout(()=>{
          $(e.target).css({zIndex: -1 });
        }, 600);
      }
    });

    //绑定成功后5s跳转到问卷调查页
    if(j_fill_in.length){
      if(!that.getCookie('succ')){
        let count = 10;
        j_fill_in.text(count + 'S');
        let time = setInterval(() => {
          count--;
          if (count == 0) {
            window.clearInterval(time);
            window.location.href = $(".j_fill_in").attr("href");
            j_fill_in.text("去填写");
          }
          j_fill_in.text(count + 'S');
        }, 1000);
        that.setCookie('succ', 1, 1);
      }else{
        j_fill_in.text("去填写");
      }
    }
  },
  DownLoad(){
    if (this.isAndroid() && $('.j_download_Btn').length > 0) {
    } else {
    }
  },
  isAndroid() {
    var u = navigator.userAgent
    if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
        return true
    }
    return false
  },
  setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
        var expires = "expires=" + d.toUTCString();
        var domain = location.hostname || "xx.com";
        document.cookie =
            cname +
            "=" +
            cvalue +
            ";" +
            expires +
            ";path=/;domain=." +
            domain +
            ";" +
            expires;
    },
    getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(";");
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == " ") {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    },
    delCookie(name) {
      var exp = new Date();
      exp.setTime(exp.getTime() - 1);
      var expires = "expires=" + exp.toUTCString();
      var domain = location.hostname || "xxx.com.cn";
      var cval = this.getCookie(name);
      document.cookie =
          name +
          "=" +
          cval +
          ";" +
          expires +
          ";path=/;domain=." +
          domain +
          ";" +
          expires;
  },
}




$(function(){
  _index.init();
});
