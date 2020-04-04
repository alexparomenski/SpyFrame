var openSafe= false;
AFRAME.registerComponent('safe-controller', {
    init : function(){
        let socket = io();
        safe = document.querySelector('#safe_object')
        light = document.querySelector('#lockLight')

        // restart game screen variables 
        const Credits = document.getElementById("credits");
        const Play_again = document.getElementById("play_again");
        const Player = document.getElementById("cam_object");

        Play_again.addEventListener('click', function(event){
            // to starting page 
            var url = "http://localhost:8080";
            window.location.href = url;
        });
        Play_again.addEventListener('mouseenter', function(event){
            //e1 = html enitity or element
            //object3D = three.js (rendering engine) 3D element
            Play_again.object3D.scale.set(1.1,1.1,1.1);
            Play_again.setAttribute('text', 'color:#228B22;');
        });
        Play_again.addEventListener('mouseleave', function(event){
            Play_again.object3D.scale.set(1.0,1.0,1.0);
            Play_again.setAttribute('text', 'color:white;');
        });

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
                //show the credits
                Credits.setAttribute('scale', '1 1 1');
                Player.setAttribute('position', '0 1000.2 2');
            }
            console.log(safe.getAttribute('animation-mixer').clip);
        });
    

    },
    tick: function(){
        
    }
});