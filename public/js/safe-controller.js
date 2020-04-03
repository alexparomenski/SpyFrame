var openSafe= false;
AFRAME.registerComponent('safe-controller', {
    init : function(){
        let socket = io();
        safe = document.querySelector('#safe_object')
        light = document.querySelector('#lockLight')
        socket.on('sendUnlock', function (data){
            openSafe=true;
            console.log('Can Unlock');
            light.setAttribute("material", "opacity:0.7");
        });

        socket.on('sendLock', function (data){
            openSafe=false;
            light.setAttribute("material", "opacity:0.0");
        });
         
        this.el.addEventListener('click', evt => {
            if (openSafe==true){   
            safe.setAttribute('animation-mixer', "clip: DoorOpen; crossFadeDuration: .1; loop: once; timeScale: 1");}
        });
        this.el.addEventListener('animation-finished', evt => {
            console.log(safe.getAttribute('animation-mixer').clip);
            if (safe.getAttribute('animation-mixer').clip=="DoorOpen")
            {
                safe.setAttribute('animation-mixer', "clip: Open; crossFadeDuration: .1; loop: repeat; timeScale: 0");
            }
            console.log(safe.getAttribute('animation-mixer').clip);
        });
    

    },
    tick: function(){
        
    }
});