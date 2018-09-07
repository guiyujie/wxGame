
var utils = require("./util/utils");

cc.Class({
    extends: cc.Component,

    properties: {
        //出生位置
        brithPos:{
            x:0,
            y:0
        },
        //目标
        target:{
            default:null,
            type:cc.Node
        },
        rotateSpeed:0.4, //转身速度
        moveSpeed:200, //移动速度
        visualRange:300,//视野范围  
        hatredRange: 100, //仇恨范围
        attackRange:10,//攻击范围  
        attackInterval:1, // 1秒攻击间隔
        life:10, //生命值 10点
    },

    //巡逻 视野范围内无敌人时的逻辑
    patrol (){

        //检查是否有正在进行的动作
        var count = this.node.getNumberOfRunningActions();
        
        if(count>0) return;

        //选取范围内的点,进行移动
        var point = {};
        point.x  = utils.random(this.brithPos.x-this.visualRange,this.brithPos.x+this.visualRange);
        point.y  = utils.random(this.brithPos.y-this.visualRange,this.brithPos.y+this.visualRange);

        this.move(point).then(function(){
            //继续巡逻
            this.patrol();
        }.bind(this));   
       
    },
    //移动
    move (p){
        var t=this;
        var p1 =  this.node.getPosition();
        var deg = utils.dg(p,p1);

        var zombie = this.node.getChildByName("zombie");


        //调整角度
        var angle = cc.rotateTo(this.rotateSpeed,-deg);
        
        zombie.stopAllActions();
        zombie.runAction(angle)

        //计算移动的时间
        var playTime = p1.sub(p).mag() / this.moveSpeed;


        //移动到位置
        var move = cc.moveTo(playTime,p);
       
        //移动前停止所有动作
        this.node.stopAllActions();
        return new Promise(function(resolve, reject){
            //移动完成过后。是玩家进入站立动画状态
            t.node.runAction(cc.sequence(move, cc.callFunc(function(){
               resolve();
            })))    
        })
    },

    //攻击 进入仇恨范围的逻辑
    attack (){
        var tPos = this.target.getPosition();
        //if(tPos.)
    },
    onLoad () {
      
    },

    start () {
       //记录出生位置
       this.brithPos = this.node.getPosition();
       //开始巡逻
       this.patrol();
    },

    //每帧的逻辑
    
    update (dt) {
        //如果存在攻击目标
        if(this.target){
            this.attack();
          
        }

    }
});
