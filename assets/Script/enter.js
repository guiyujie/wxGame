cc.Class({
    extends: cc.Component,

    properties: {
    
    },

    // use this for initialization
    onLoad: function () {
      
    },
    //进入游戏场景
    enter:function(){
        cc.director.loadScene('game');
        
    },
    // called every frame
    update: function (dt) {

    },
});
