
var utils = require("./util/utils");


cc.Class({
    extends: cc.Component,

    properties: {
        rotateSpeed:0.2, //人物转身速度(s)
        moveSpeed:300, //人物移动速度
        attackRange:300,//攻击范围  
        attackInterval:0.2, // 200毫秒攻击间隔(s)
        maxLife:10, //最大生命值
        life:10,    //当前生命值 10点
        deg:0,
        bullet:{
            default:null,
            type:cc.Prefab,
        },
        //角色
        role:{
            default:null,
            type:cc.Node
        },
        //状态
        status:{
            default:null,
            type:cc.Node
        },
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
       //设置层级
       // this.node.zIndex = 1000;
       //this.node.setPosition(pos);
       this.node.setPosition(origin.x,origin.y);
    },
    //开始时执行一次
    start () {
        //生命条
        this.lifeStatus =this.status.getComponent(cc.ProgressBar);
    },

    //人物转身
    rotateTo(pos){
        //获取当前的玩家相较于父节点的坐标
        var t=this, po1 =  this.node.getPosition();
         //人物
        var person = this.role;
     
        var deg = utils.dg(pos,po1);
        
          //调整人物角度
        var angle = cc.rotateTo(this.rotateSpeed,-deg);
       
        person.stopAllActions();

        return new Promise(function(resolve, reject){
            //移动完成过后。是人物进入站立动画状态
            person.runAction(cc.sequence(angle, cc.callFunc(function(){
                t.deg = deg;
                resolve();
            })))    
        })    
    },
    //人物移动  位移, 点击点
    move(pos){
        //获取当前的玩家相较于父节点的坐标
        var t=this, po1 =  this.node.getPosition();
       
        //人物转身
        t.rotateTo(pos);
 
        //计算人物移动的时间
        var playTime = po1.sub(pos).mag() / this.moveSpeed;


        //让人物移动到点击位置
        var move = cc.moveTo(playTime,pos);
        //cc.log("移动时间： ",playTime)
        //移动前停止所有动作
        this.node.stopAllActions();
        return new Promise(function(resolve, reject){
            //移动完成过后。是人物进入站立动画状态
            t.node.runAction(cc.sequence(move, cc.callFunc(function(){
               resolve();
            })))    
        })    
    },
    //开火
    shoot(dist){
        var t=this; 
        var pos = this.node.getPosition();
        console.log(this.cd);
        if(this.cd) return false;
        //发射子弹
        var node = cc.instantiate(this.bullet);
        node.parent = this.node.parent; 
        node.setPosition(pos);
        node.getComponent("bullet").init(dist)
        //定时器
        t.cd=true; 
        t.schedule(()=>{
            t.cd =false;
        },this.attackInterval)    
    },
    //每帧重复执行
    update (dt) {
     
    },
    //角色死亡
    dead(){
        this.reset();
    },
    reset(){
        this.node.stopAllActions();
        this.life = 10;
        this.lifeStatus.progress =1;
        this.node.setPosition(0,0);
    },
    //碰撞产生
    onCollisionEnter: function (other, self) {
        this.life -= 1;
        if(this.life>0){
            this.lifeStatus.progress = this.life/this.maxLife
        }else{
            this.dead();
        }
    },
    //碰撞持续
    onCollisionStay: function (other, self) {
        
    },
    //结束
    onCollisionExit: function (other, self) {
      
    }
});
