var utils = require("./util/utils");


cc.Class({
    extends: cc.Component,

    properties: {
        timer:0,
        //缓存引用
        cache:{
             default:{},
        },
        //摄像机
        camera:{
            default:null,
            type:cc.Camera
        },
        //玩家
        player:{
            default:null,
            type:cc.Node
        },
        //僵尸数量
        zombieNum:50,
        //僵尸
        zombies:[],
        //僵尸,预制资源
        zombie:{
            default: null,
            type: cc.Prefab,
        },
       
        //点击位置:
        clickPos:{
            default:null,
            type:cc.Node
        },
        //移动位置
        movePos:{
            default:null,
            type:cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:
    genZombie(){        
        var t=this;
        var node = cc.instantiate(this.zombie); 
        
        node.parent = this.node;
        //僵尸被点击
        node.on(cc.Node.EventType.TOUCH_START, function (event){
            event.stopPropagation();
            var location = event.getLocation();

       
            var pos =  t.camera.getCameraToWorldPoint(t.node.convertToNodeSpaceAR(location));
            //角色角度转身然后攻击
            t.cache.player.rotateTo(pos).then(()=>{
                t.cache.player.shoot(pos);
            })
        });
        node.on(cc.Node.EventType.TOUCH_END,function (event){
             event.stopPropagation();
        });
        //添加zombie组件
        var com = node.addComponent("zombie");
        //随机初始化出身位置
        var x = utils.random(com.visualRange-this.node.width/2,this.node.width/2-com.visualRange);
        var y = utils.random(com.visualRange-this.node.height/2,this.node.height/2-com.visualRange);
        node.setPosition(x,y);

        this.zombies.push(node);
    },

    onLoad () {
        var t=this;
        window.MapInfo= {
            width:this.node.width,
            height:this.node.height
        }
        //  获取屏幕尺寸
        //随机生产僵尸
        for(var i=0;i<this.zombieNum;i++){
            this.genZombie();
        }

        //缓存实例
        this.cache.player = this.player.getComponent('player');    
       
        //添加事件
        this.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            
   
            //检测地块点击区域是否可以移动


            //获取地图上的坐标 相较于锚点  
            var location = event.getLocation();

       
            var tempPlayer =  this.camera.getCameraToWorldPoint(this.node.convertToNodeSpaceAR(location));

           
            //获取摄像机的位置
            
            /* 
             var tempPlayer =  this.node.convertToNodeSpaceAR(location);

            var camera = this.camera.getPosition();

            tempPlayer.x  = parseInt(tempPlayer.x + camera.x - (winSize.width-visibleSize.width)/2,10);
            tempPlayer.y  = parseInt(tempPlayer.y + camera.y - (winSize.height-visibleSize.height)/2,10);
            */ 
            /*
            思路1:  获取当前点击位置,相较于parent 节点的 位置
              this.node.parent.convertTouchToNodeSpaceAR(event)
            */ 
                

            //调用玩家移动方法
            this.cache.player.move(tempPlayer);

        }, this);
    },

    start () {

    },

    update (dt) {
       
    },
});
