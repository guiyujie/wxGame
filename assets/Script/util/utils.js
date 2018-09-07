var utils = {
    //获取二个点之间的角度
    dg(p,p1){
        var x = p.x - p1.x;
        var y = p.y - p1.y;

        var dg = Math.atan2(y, x); //弧度
        var deg = dg *(180/Math.PI); //角度 -180 至180 之间

        return deg;
    },
    //生成随机数
    random(minNum,maxNum){
        switch(arguments.length){ 
            case 1: 
                return parseInt(Math.random()*minNum+1,10); 
            break; 
            case 2: 
                return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
            break; 
                default: 
                    return 0; 
                break; 
        } 
    }
}


module.exports = utils;