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
    },
    //生成随机颜色
    getRandomColor(){
        var colorList = [
            [255, 235, 148],
            [204, 225, 152],
            [151, 206, 162],
            [131, 204, 210],
            [129, 200, 237],
            [116, 181, 228],
            [164, 171, 214],
            [207, 167, 205],
            [244, 180, 208],
            [242, 156, 159],
            [245, 177, 153],
            [250, 205, 137],
            [187, 188, 222],
            [254, 229, 157],
            [237, 188, 214],
            [221, 231, 141],
            [163, 214, 202],
            [245, 177, 170],
        ]

    return colorList[getRandom(0, colorList.length - 1)]
    }
}


module.exports = utils;