var global=require('global');
cc.Class({
    extends: cc.Component,

    properties: {
        
    },
    onLoad:function(){
        this.myAction();
    },
    myAction:function(){   
        this.node.rotation=Math.floor(Math.random()*360);
        let action=cc.scaleTo(2.5,2);
        action.easing(cc.easeCircleActionIn());
        let callback=cc.callFunc(this.myActionCallBack,this);
        let sequence=cc.sequence(action,callback);
        this.node.runAction(sequence);
        
    },
    myActionCallBack:function(){
        if(global.state==="start"){
            global.score++;
        }
        this.node.destroy();
    },

});
