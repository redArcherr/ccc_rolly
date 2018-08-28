var global=require('global');
cc.Class({
    extends: cc.Component,

    properties: {
        stoneParticle:{
            default:null,
            type:cc.ParticleSystem
        }
    },
    onLoad:function(){
        this.myAction();
        cc.director.getCollisionManager().enabled = true;
    },
    myAction:function(){
        //大小
        let actionScale=cc.scaleTo(0.5,1);
        //随机位置
        let posx,posy;
        if(Math.random()>0.5){
            posx=(Math.random()>0.5? 1: -1)*Math.random()*400;
            posy=(Math.random()>0.5? 1: -1)*1000;
        }else{
            posx=(Math.random()>0.5? 1: -1)*400;
            posy=(Math.random()>0.5? 1: -1)*Math.random()*1000;
        }
        let actionMove=cc.moveTo(4,posx,posy);
        //actionMove.easing(cc.easeCircleActionIn());
        let callback=cc.callFunc(this.myActionCallBack,this);
        let spawn=cc.spawn(actionMove,actionScale);
        let sequence=cc.sequence(spawn,callback);
        this.node.runAction(sequence);
    },
    myActionCallBack:function(){
        if(this.node){
            this.node.destroy();
        }
    },
    onCollisionEnter: function (other,self) {
        this.stoneParticle.resetSystem();
        this.node.opacity=0;
        var self=this.node;
        setTimeout(function(){
            self.destroy();
        },500);
          
    }, 
});
