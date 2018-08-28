var global = require('global');
cc.Class({
    extends: cc.Component,

    properties: {
      
    },

    onLoad:function(){
        global.start="start";
        global.stone=0;
        global.score=0;
        cc.director.preloadScene("game",(err)=>{
            if(err){
                cc.log("load scene error"+err);
            }else{
                cc.log("game场景加载完毕");
            }      
        });
    },
    buttonClick:function(){
        cc.director.loadScene("game");
    }

    
});
