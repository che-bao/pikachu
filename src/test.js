const string = `
.skin *{box-sizing: border-box;margin:0;padding: 0;}  
.skin *::before,.skin *::after{box-sizing: border-box;} 
 
.skin{
    position:relative;
    background-color:#ffe600;
    min-height: 50vh;
}
.nose{
    border: 10px solid red;
    border-color: black transparent transparent transparent;
    width: 0px;
    height: 0px;
    position:relative;
    left: 50%;
    top: 145px;
    margin-left: -10px;
    z-index: 2;
}

@keyframes wave {
    0%{transform: rotate(0deg);}
    33%{transform: rotate(5deg);}
    66%{transform: rotate(-5deg);}
    100%{transform: rotate(0deg);}
}
.nose:hover{
    transform-origin: 50% 100%;
    animation: wave 300ms infinite linear;
}

.yuan{
    position: absolute;
    width: 20px;
    height: 6px;
    top: -16px;
    left: -10px;
    border-radius: 10px 10px 0 0;
    background-color: black;
}

.eye{
    border: 2px solid black;
    width: 64px;
    height: 64px;
    position: absolute;
    left: 50%;
    top: 100px;
    margin-left: -32px;
    background-color: #2e2e2e;
    border-radius: 50%;
}
.eye::before{
    content: '';
    display: block;
    border: 2px solid black;
    width: 30px;
    height: 30px;
    background-color: white;
    border-radius: 50%;
    position: relative;
    left: 10px;
}
.eye.left{
    transform: translateX(-100px);
}
.eye.right{
    transform: translateX(100px);
}

.mouth{
    
    width: 200px;
    height: 200px;
    position: absolute;
    left: 50%;
    top:170px;
    margin-left: -100px;
}

.mouth .up{
    position: relative;
    top: -30px;
    z-index: 1;

}
.mouth .up .lip{
    border: 3px solid black;
    height: 30px;
    width: 80px;
    border-top-color: transparent;
    position:relative;
    position: absolute;
    left: 50%;
    margin-left: -40px;
    background-color: #ffe600;
}
.mouth .up .lip.left{
    border-radius: 0 0 0 50px;
    transform: rotate(-20deg) translateX(-43px);   
}

.mouth .up .lip.right{   
    border-radius: 0 0 50px 0;
    transform: rotate(20deg) translateX(43px);
}
.mouth .up .lip::before{
    content: '';
    display: block;
    width: 7px;
    height: 30px;
    position:absolute;
    bottom:0;
    background-color: #ffe600;
}
.mouth .up .lip.left::before{
    right: -6px;
}
.mouth .up .lip.right::before{
    left: -6px;
}

.mouth .down{
    height: 180px;
    position: absolute;
    top: 0px;
    width: 100%;
    overflow: hidden;
}

.mouth .down .yuan1{
    border: 3px solid black;
    width: 150px;
    height: 1000px;
    position: absolute;
    bottom: 0;
    left: 50%;
    margin-left: -75px;
    border-radius: 75px/300px;
    background-color:#9b000a;
    overflow: hidden;
}
.mouth .down .yuan1 .yuan2{
    background-color:#ff485f;
    width: 200px;
    height: 300px;
    position: absolute;
    bottom: -155px;
    left: 50%;
    margin-left: -100px;
    border-radius: 100px;
}

.face{
    position: absolute;
    left: 50%;
    border: 3px solid black;
    width: 88px;
    height: 88px;
    top: 200px;
    margin-left: -44px;
    z-index: 2;
    border-radius: 50%;
    background-color: #ff0000;
}
.face.left{
    transform: translateX(-180px);
}
.face.right{
    transform: translateX(180px); 
}
`
const demo = document.querySelector('#demo')
const demo2 = document.querySelector('#demo2')




const player = {
    n : 1,
    id : undefined,
    time : 50,
    init : ()=>{
        demo.innerText = string.substring(0,player.n)
        demo2.innerHTML = string.substring(0,player.n)
        player.bindEvents()
        player.play()    
    },
    events:{
        '#btnPause':'pause',
        '#btnPlay':'play',
        '#btnSlow':'slow',
        '#btnNormal':'normal',
        '#btnFast':'fast'
    },
    bindEvents : ()=>{
        for(let key in player.events){
            if(player.events.hasOwnProperty(key)){  //防止遍历到原型链上继承的key，Object.prototype.x=1
            const value = player.events[key]
            document.querySelector(key).onclick = player[value]
            }
        }
    },
     run : ()=>{
        player.n += 1 
        if(player.n > string.length){
            window.clearInterval(player.id)
            return
        }
        
        demo.innerText = string.substring(0,player.n)
        demo2.innerHTML = string.substring(0,player.n)
        demo.scrollTop = demo.scrollHeight
    },
    play : ()=>{
        player.id = setInterval(player.run,player.time)
    },
    pause : ()=>{

        window.clearInterval(player.id)
    },
    slow : ()=>{
        player.pause()
        player.time = 150
        player.play()
    },
    normal : ()=>{
        player.pause()
        player.time = 50
        player.play()
    },
    fast : ()=>{
        player.pause()
        player.time = 0
        player.play()
    }
}

player.init()
