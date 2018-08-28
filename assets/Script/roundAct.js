cc.Class({
    extends: cc.Component,

    properties: {
      
    },

    onLoad:function(){
        this.myAction();
    },
    myAction:function(){
        let action = cc.scaleTo(3,2);//1秒变成2倍大小(默认是线性的放大，即匀速放大)
        action.easing(cc.easeCircleActionIn());//缓动动作
        let callback=cc.callFunc(this.myActionCallBack,this);
        let sequence=cc.sequence(action,callback);
        this.node.runAction(sequence); 
    },
    myActionCallBack:function(){
        this.node.destroy();
    },
    start () {

    },

});
