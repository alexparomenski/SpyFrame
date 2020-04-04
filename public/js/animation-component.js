var nearGuard = false;
var lastPosition = 0;
var caught = false;
AFRAME.registerComponent( 'animation-component',{
    init:function(){
        console.log("Init component");
        
        const Context_AF = this;
        const PlayText = document.getElementById("play");
        const Player = document.getElementById("cam_object");
        const End = document.getElementById("end");
        Context_AF.el.emit('animation-start');


        // Play again if you get caught by the guard
        PlayText.addEventListener('click', function(event){
            End.setAttribute('scale', '0 0 0');
            caught = false;
            Player.setAttribute('position', '0 0 0');
        });

        PlayText.addEventListener('mouseenter', function(event){
            PlayText.object3D.scale.set(1.1,1.1,1.1);
            PlayText.setAttribute('text', 'color:#228B22;');
        });
        PlayText.addEventListener('mouseleave', function(event){
            PlayText.object3D.scale.set(1.0,1.0,1.0);
            PlayText.setAttribute('text', 'color:white;');
        });

        Context_AF.el.addEventListener('animationcomplete__3', function(event){
            console.log("last animation has played");
            
        })
        Context_AF.el.addEventListener('animationcomplete__2', function(event){
            console.log("rotated");
            
        })
    },

    tick: function (time, timeDelta) {
        var sound = document.querySelector('#guard');
        const Context_AF = this;
        const Player = document.getElementById("cam_object");
        const Danger = document.getElementById("danger");
        const End = document.getElementById("end");

        let Magnitude = Context_AF.findDistance();
        Context_AF.findDirection();
        if(Magnitude < 2 && !caught){
            Danger.setAttribute('scale', '1 1 1');
            nearGuard = true;
            console.log("You are close to the guard!");
            // playing sound
            sound.components.sound.playSound();
            let guardTimer = setInterval(function(){
                if(nearGuard && !caught){
                    console.log("You've been caught");
                    End.setAttribute('scale', '1 1 1');
                    Danger.setAttribute('scale', '0 0 0');
                    caught = true;
                    Player.setAttribute('position', '0 1000.2 2');
                }
                else{
                    clearInterval(guardTimer);
                }
                
            }, 2000)
        }
        else{
            Danger.setAttribute('scale', '0 0 0');
            nearGuard = false; 
        }
    },

    // MATH FUNCTIONS 
    findMagnitude : function(data){
        return Math.sqrt((Math.pow(data.x,2)) + (Math.pow(data.y,2)) + (Math.pow(data.z,2)));
    },
    findDotProduct: function(dataA, dataB){
        return (dataA.x * dataB.x) + (dataA.y * dataB.y) +(dataA.z * dataB.z);
    },
    findDistance : function() {
        const Context_AF = this;
        const Player = document.getElementById("cam_object");

        //creating vectors
        let Guard_Pos = Context_AF.el.object3D.position;
        let Player_Pos = Player.object3D.position;

        //Subtracting the two vectors 
        let Distance_Between = new THREE.Vector3();
        Distance_Between.copy(Guard_Pos).sub(Player_Pos);

        //finding the magnitude
        let Magnitude = Context_AF.findMagnitude(Distance_Between);
        

        return Magnitude;

    },

    findDirection : function() {
        const Context_AF = this; 
        // current position of the guard
        let Guard_Pos = Context_AF.el.object3D.position;
        // finding magnitudes of Guard pos and last Guard pos 
        let Current_Mag = Context_AF.findMagnitude(Guard_Pos);
        let Previous_Mag = Context_AF.findMagnitude(lastPosition);
        // finding dot product
        let Dot_Product = Context_AF.findDotProduct(Guard_Pos,lastPosition);
        // calculating the angle 
        let Angle = Math.acos(Dot_Product / Current_Mag * Previous_Mag);
        Angle = Angle * (180 / Math.PI);
        lastPosition = Context_AF.el.object3D.position;
        //console.log(Angle);
        

    },
    
});