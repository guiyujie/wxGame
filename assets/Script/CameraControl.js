// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

cc.Class({
    extends: cc.Component,

    properties: {

        target:{
            default:null,
            type:cc.Node
        },
        //地图尺寸
        mapSize:{
            default:null
        },
        //窗口尺寸
        winSize:{
            default:null
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
       //获取地图尺寸
       this.mapSize = {
           x:this.node.parent.width,
           y:this.node.parent.height
       }

       
       this.winSize = {
           x:cc.view.getVisibleSize().width,
           y:cc.view.getVisibleSize().height
       }

       this.limitArea={
           l:this.winSize.x/2-this.mapSize.x/2,
           r:this.mapSize.x/2-this.winSize.x/2,
           t:this.winSize.y/2-this.mapSize.y/2,
           b:this.mapSize.y/2-this.winSize.y/2
       }

    },
    start () {

    },

    update (dt) {
        var pos =  this.target.getPosition();

        //修正4个边的临界值
        if(pos.x < this.limitArea.l ){
            pos.x = this.limitArea.l
        }

        if(pos.x > this.limitArea.r){
            pos.x = this.limitArea.r
        }

        if(pos.y < this.limitArea.t ){
            pos.y = this.limitArea.t
        }

        if(pos.y > this.limitArea.b){
            pos.y = this.limitArea.b
        }

        this.node.position = pos;
    },
});
