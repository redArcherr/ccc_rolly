var global=require('global');
cc.Class({
    extends: cc.Component,

    properties: {
       
    },
    onLoad:function(){
        cc.director.getCollisionManager().enabled = true;
        //cc.director.getCollisionManager().enabledDebugDraw = true;
    },
    onCollisionEnter: function (other,self) {
        if(global.state==="start"){
            other.tag === 0 ? global.stone++ :  global.state="gameover";
        }  
    }
});
