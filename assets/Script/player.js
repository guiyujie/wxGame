
var utils = require("./util/utils");


cc.Class({
    extends: cc.Component,

    properties: {
        rotateSpeed:0.2, //人物转身速度
        moveSpeed:300, //人物移动速度
        attackRange:300,//攻击范围  
        attackInterval:0.2, // 1秒攻击间隔
        life:10, //生命值 10点
    },


    //人物移动  位移, 点击点
    move(pos){

        //获取当前的玩家相较于父节点的坐标
        var t=this, po1 =  this.node.getPosition();

        var person = this.node.getChildByName("person");
     
        var deg = utils.dg(pos,po1);
        
        //设置层级
        this.node.zIndex = 1000;

       // cc.log("自定义旋转角度: ",deg);

        //调整玩家角度
        var angle = cc.rotateTo(this.rotateSpeed,-deg);
        
        person.stopAllActions();
        person.runAction(angle)

        //计算玩家移动的时间
        var playTime = po1.sub(pos).mag() / this.moveSpeed;


        //让玩家移动到点击位置
        var move = cc.moveTo(playTime,pos);
        //cc.log("移动时间： ",playTime)
        //移动前停止所有动作
        this.node.stopAllActions();
        return new Promise(function(resolve, reject){
            //移动完成过后。是玩家进入站立动画状态
            t.node.runAction(cc.sequence(move, cc.callFunc(function(){
               resolve();
            })))    
        })
           
    },
    //开火
    shoot(){

    },

    //装载,只执行一次
    onLoad () {
      var  that = this;
     
      this.initPos();
    },
    initPos(){
       //初始玩家的位置 到地图中央
       //var winSize = cc.winSize; 
       //获取屏幕坐标的点
       var origin = cc.view.getVisibleOrigin();

       //var pos = cc.v2(origin.x+winSize.width/2, origin.y+winSize.height/2);
     
       //this.node.setPosition(pos);
       this.node.setPosition(origin.x,origin.y);
    },
    //开始时执行一次
    start () {

    },
    //每帧重复执行
    update (dt) {

    },
    //碰撞产生
    onCollisionEnter: function (other, self) {
        this.life-=1;
    },
    //碰撞持续
    onCollisionStay: function (other, self) {
        console.log('on collision stay');
    },
    //结束
    onCollisionExit: function (other, self) {
        console.log('on collision exit');
    }
});
