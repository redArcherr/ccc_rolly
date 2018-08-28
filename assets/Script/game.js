var global=require('global');
cc.Class({
    extends: cc.Component,

    properties: {
        moveBallNode:{
            default:null,
            type:cc.Node
        },
        roundActPrefab:{
            default:null,
            type:cc.Prefab
        },
        spaceLinePrefab:{
            default:null,
            type:cc.Prefab
        },
        rwalls:{
            default:[],
            type:cc.Prefab
        },
        stonePrefab:{
            default:null,
            type:cc.Prefab
        },
        scoreLabel:{
            default:null,
            type:cc.Label
        },
        stoneLabel:{
            default:null,
            type:cc.Label
        },
        endNode:{
            default:null,
            type:cc.Node
        },
        moveBoxNode:{
            default:null,
            type:cc.Node
        }
    },

    // use this for initialization
    onLoad: function () {
          
    },
    start:function(){
        if(global.state==="start"){
            this.addTouchEvent();
            this.bgAction();
            this.r=250;//半径
            this.num=-90;//移动变化量
            this.roundActFatherNode=cc.find("Canvas/root/background");//动画父节点
            this.rwallFatherNode=cc.find("Canvas/root/collision");//障碍及宝石父节点
            this.endNode.x=-1203;
        }    
    },
    //小球移动事件
    addTouchEvent:function(){
        //半径274
        this.node.on(cc.Node.EventType.TOUCH_MOVE,(event)=>{
            let delta = event.touch.getDelta();
            this.moveBoxNode.x += delta.x;
            //Math.floor(delta.x) > 0?this.num +=4.5:this.num -=4.5;
            this.moveBallNode.x =Math.cos(this.moveBoxNode.x*Math.PI/180)*this.r;
            this.moveBallNode.y =Math.sin(this.moveBoxNode.x*Math.PI/180)*this.r;
        });
    },
    //创建背景、障碍、钻石
    bgAction:function(){
        //背景圆
        setInterval(()=>{
            if(this.roundActFatherNode){
                let roundAct=cc.instantiate(this.roundActPrefab);
                roundAct.parent=this.roundActFatherNode;
                roundAct.position=this.roundActFatherNode.position;
            }          
        },900); 
        ////spaceLine 
        // setInterval(()=>{
        //     let spaceLine=cc.instantiate(this.spaceLinePrefab);
        //     spaceLine.parent=this.roundActFatherNode;
        //     spaceLine.position=this.roundActFatherNode.position;
        // },200); 
        
        //障碍
        setInterval(()=>{
            if(this.rwallFatherNode){
                let rwallindex=Math.floor(Math.random()*this.rwalls.length);
                let rwall=cc.instantiate(this.rwalls[rwallindex]);
                rwall.parent = this.rwallFatherNode;
                rwall.position = this.rwallFatherNode.position;
                if(rwallindex===4){
                    setTimeout(()=>{
                        rwall.rotation=rwall.rotation+60;
                    },1500);
                }
                if(rwallindex===8){
                    setTimeout(()=>{
                        rwall.rotation=rwall.rotation+30;
                    },1500);
                }
            } 
        },2800);
        //钻石
        setInterval(()=>{
            if(this.rwallFatherNode){
                let stone = cc.instantiate(this.stonePrefab);
                stone.parent = this.rwallFatherNode;
                stone.position = this.rwallFatherNode.position;
            }           
        },4200); 
        
    },
    
    //游戏结束
    gameOver:function(){
        global.state="gameover";
        this.endNode.position=this.node.position;
    },

    //重新开始 button
    reStart:function(){
        global.score=0;
        global.stone=0;
        global.state="start";
        cc.director.loadScene("game");
    }, 

    // called every frame
    update: function (dt) {
        //计分
        this.scoreLabel.string = global.score;
        this.stoneLabel.string = global.stone;

        //gameover
        if(global.state==="gameover"){
            this.gameOver();
        }
    },
});
