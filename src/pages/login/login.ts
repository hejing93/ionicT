import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { BaseUI } from '../../common/baseUI';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage extends BaseUI {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public rest: RestProvider,
    public storage:Storage,
    public toastCtrl:ToastController
  ) {
    super(); //调用父类的构造函数 constructor
  }
  username: any;//用户名
  password: any;//密码
  code: any;//验证码
  errorMessage: any;//错误信息

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.createCode();
  }

  /**
   *
   *登录按钮
   * @memberof LoginPage
   */
  butLogin() {
    var loading = super.showLoading(this.loadingCtrl, "登陆中...");
    this.rest.login(this.username, this.password,this.code)
      .subscribe(
        f => {
          // console.log(f);
         /*  if (f["Status"] == "OK") {
            //处理登录成功的页面跳转
            //你也可以存储接口返回的 token
            this.storage.set('UserId', f["UserId"]);
            loading.dismiss();
            this.dismiss();
          }
          else {
            loading.dismiss();
            super.showToast(this.toastCtrl, f["StatusContent"]);
          } */
        },
        error => this.errorMessage = <any>error);
  }
  dismiss(){

  }
  
  /**
   *生成验证码
   *
   * @memberof LoginPage
   */
  createCode() {
    var seed = new Array(
      'abcdefghijklmnopqrstuvwxyz',
      'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      '0123456789'
    ); //创建需要的数据数组
    var idx, i;
    var result = ''; //返回的结果变量
    for (i = 0; i < 4; i++) //根据指定的长度
    {
      idx = Math.floor(Math.random() * 3); //获得随机数据的整数部分-获取一个随机整数
      result += seed[idx].substr(Math.floor(Math.random() * (seed[idx].length)), 1);//根据随机数获取数据中一个值
    }
    // return result; //返回随机结果
    this.code = result;
  }
}