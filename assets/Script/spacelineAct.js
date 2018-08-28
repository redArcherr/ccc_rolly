cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onLoad:function(){
        this.myAction();
    },
    myAction:function(){
        //移动和角度部分
        let posx,posy;
        if(Math.random()>0.5){
            posx=(Math.random()>0.5? 1: -1)*Math.random()*320;
            posy=(Math.random()>0.5? 1: -1)*1000;
        }else{
            posx=(Math.random()>0.5? 1: -1)*1000;
            posy=(Math.random()>0.5? 1: -1)*Math.random()*1000;
        }
        let direction=cc.pNormalize(cc.pSub(cc.v2(posx,posy),this.node.position));
        let angle=cc.pAngleSigned(direction,cc.v2(0,0));
        this.node.rotation=(180/Math.PI)*angle;
        //动画部份
        let actionMov=cc.moveTo(2,posx,posy);
        actionMov.easing(cc.easeCubicActionIn());
        let callback=cc.callFunc(this.myActionCallBack,this);
        let sequence=cc.sequence(actionMov,callback);
        this.node.runAction(sequence);
    },
    myActionCallBack:function(){
        this.node.destroy();
    },

    update: function (dt) {
      
    },
});
