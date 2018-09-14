
var utils = require("./util/utils");

cc.Class({
    extends: cc.Component,

    properties: {
        vec2:{
            default:null,
            type:cc.Vec2
        },
        moveSpeed:500, //移动速度
        moveRange:300,     //移动距离
    },
    onLoad () {
      
    },
    
    start () {
        
    },
    //手动初始化
    init(d){
        var t=this, s =  this.node.getPosition();
        //角度
        this.node.rotation = -utils.dg(d,s);
        //向量
        this.vec2 = d.sub(s).normalize();
    },
    //每帧的逻辑
    update (dt) {
        if(!this.vec2) return;
        this.node.x += this.vec2.x * this.moveSpeed *dt;
        this.node.y += this.vec2.y * this.moveSpeed *dt;
        //屏幕外销毁
        if(this.node.x<-window.MapInfo.width/2 || this.node.x>window.MapInfo.width/2 || this.node.y<-window.MapInfo.height/2 || this.node.y>window.MapInfo.height/2){
            this.node.destroy();
        }
    },
    //碰撞产生
    onCollisionEnter: function (other, self) {
        //销毁
        self.node.destroy();
    }
});
