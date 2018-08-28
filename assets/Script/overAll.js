cc.Class({
    extends: cc.Component,

    properties: {
        audio:{
            default:null,
            type: cc.AudioClip
        }
    },
    onLoad: function () {
        cc.game.addPersistRootNode(this.node);
        this.sound=cc.audioEngine.play(this.audio, true, 1);
    },
    
});
