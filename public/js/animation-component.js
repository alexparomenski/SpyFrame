var nearGuard = false;

AFRAME.registerComponent( 'animation-component',{
    init:function(){
        console.log("Init component");

        const Context_AF = this;

        Context_AF.el.emit('animation-start');
    
        Context_AF.el.addEventListener('click', function(event){
            console.log('click');
            Context_AF.createCow();
        });
        Context_AF.el.addEventListener('mouseenter', function(event){
            //e1 = html enitity or element
            //object3D = three.js (rendering engine) 3D element
            Context_AF.el.object3D.scale.set(1.1,1.1,1.1);
        });
        Context_AF.el.addEventListener('mouseleave', function(event){
            Context_AF.el.object3D.scale.set(1.0,1.0,1.0);
        });
        Context_AF.el.addEventListener('animationcomplete__3', function(event){
            console.log("last animation has played");
            
        })
    },

    tick: function (time, timeDelta) {
        const Context_AF = this;
        const Player = document.getElementById("camera");
        //console.log(Player.object3D.position);
        //console.log(Context_AF.el.object3D.position);
        let Magnitude = Context_AF.findDistance();
        
        if(Magnitude < 2){
            nearGuard = true;
            console.log("You are close to the guard!");
            let guardTimer = setInterval(function(){
                if(nearGuard){
                    console.log("You've been caught");
                }
                else{
                    clearInterval(guardTimer);
                }
                
            }, 2000)
        }
        else{
            nearGuard = false; 
        }
    },
    findMagnitude : function(data){
        return Math.sqrt((Math.pow(data.x,2)) + (Math.pow(data.y,2)) + (Math.pow(data.z,2)));
    },
    findDistance : function() {
        const Context_AF = this;
        const Player = document.getElementById("cam_rig");

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
        // finding magnit
    },
    createCow : function() {
        const Context_AF = this;

        let cowElem = document.createElement('a-entity');
        cowElem.setAttribute('class','clickable');
        cowElem.setAttribute('obj-model', 'obj:assets/models/Cow.obj');
        cowElem.setAttribute('material', 'src:assets/textures/Cow.png');
        cowElem.setAttribute('delete-cow-component','');

        //random transforms
        cowElem.setAttribute('position', {x:(Math.random() * 6.0) - 3.0, y:0, z:-4 -(Math.random()*3.0)});
        const randScale = 0.2 + (Math.random() * 0.8);
        cowElem.setAttribute('scale',{x:randScale, y:randScale, z:randScale});
        cowElem.setAttribute('rotation',{x:0, y:Math.random() *360.0,z:0});

        //add to scene
        let scene = document.querySelector('a-scene');
        scene.appendChild(cowElem);
    }
});