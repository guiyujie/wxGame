var utils = require("./util/utils");


cc.Class({
    extends: cc.Component,

    properties: {
        timer:0,
        //摄像机
        camera:{
            default:null,
            type:cc.Node
        },
        //玩家
        player:{
            default:null,
            type:cc.Node
        },
        //僵尸数量
        zombieNum:50,
        //僵尸
        zombies:[
            
        ],

        //预制资源
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
        var node = cc.instantiate(this.zombie); 
        node.parent = this.node;
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

        //随机生产僵尸
        for(var i=0;i<this.zombieNum;i++){
            this.genZombie();
        }

       
        //点击
        this.node.on(cc.Node.EventType.TOUCH_START, function (event){
            t.timer = 0;
        });
        
        //添加事件
        this.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            

            //获取场景尺寸 待优化
            var winSize = cc.winSize;
            var visibleSize = cc.view.getVisibleSize(); 
            
            
            //检测地块点击区域是否可以移动


            //获取地图上的坐标 相较于锚点  
            var location = event.getLocation();


            var tempPlayer =  this.node.convertToNodeSpaceAR(location);

            //获取摄像机的位置
            
            var camera = this.camera.getPosition();

            tempPlayer.x  = parseInt(tempPlayer.x + camera.x - (winSize.width-visibleSize.width)/2,10);
            tempPlayer.y  = parseInt(tempPlayer.y + camera.y - (winSize.height-visibleSize.height)/2,10);
        
            /*
            思路1:  获取当前点击位置,相较于parent 节点的 位置
              this.node.parent.convertTouchToNodeSpaceAR(event)
            */ 
                

            //获取事件点击坐标 
            if(this.clickPos){
                this.clickPos.setPosition(tempPlayer);
                this.clickPos.active = true; //激活节点
                this.clickPos.getComponent(cc.Label).string = [tempPlayer.x,tempPlayer.y].join(",");   
            }      
            //cc.log("点击局部坐标： ",tempPlayer.x,tempPlayer.y)

            //调用玩家移动方法
            this.player.getComponent('player').move(tempPlayer).then(function(){
                if(t.clickPos){
                    t.clickPos.active = false;//关闭节点
                }
            })

        }, this);
    },

    start () {

    },

    update (dt) {
       this.timer += dt; 
    },
});
