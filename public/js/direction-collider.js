AFRAME.registerComponent('direction-collider', {
    dependencies: ['raycaster'],
    init : function(){
      //  console.log("init component");
        var raycaster;
        collided=null;
        face = (0,0,0);
        dist = 1;
        lastpos = new THREE.Vector3();
        lastpos.set(0,0,0);

        this.el.addEventListener('raycaster-intersection', evt => {
            collided = evt.detail.els[0]
            //console.log(collided)
            face = this.el.components.raycaster.getIntersection(collided).face;
            dist = this.el.components.raycaster.getIntersection(collided).distance;
          });
        this.el.addEventListener('raycaster-intersection-cleared', evt => {
            collided = null;
            face = (0,0,0);
          });
    },
    tick: function(){
        vec = new THREE.Vector3();
        var Oplayer = document.querySelector("a-camera[id='cam_object']");
        var position = new THREE.Vector3();
        position = Oplayer.object3D.getWorldPosition(position);

        vec.x = position.x-lastpos.x;
        vec.y = position.y-lastpos.y;
        vec.z = position.z-lastpos.z;
        vec.x*=100;
        vec.y*=100;
        vec.z*=-100;
       // console.log(vec);
        vec = Oplayer.object3D.worldToLocal(vec);

        var rot = new THREE.Vector3();
        rot.x=0;
        
        if (vec.x!=0 || vec.z!=0)
        {
            rot.y=Math.atan2(vec.x,vec.z)*(180 / (Math.PI));
        }
        
        rot.z=0;
        if (rot.y!=0)
        {
            this.el.setAttribute('rotation', rot);
        }
        
        

        //console.log(rot.y);

        if (collided!=null) {
            console.log("collided!");
            var norm = new THREE.Vector3();
            norm = face.normal;
            norm.x=-norm.x;
            norm.y=-norm.y;
            norm.z=-norm.z;
            norm.x *= (dist-0.6);
            norm.y *= (dist-0.6);
            norm.z *= (dist-0.6);
           // console.log(face.normal);
            
            console.log(position);
            position.x+=norm.x;
            position.y+=norm.y;
            position.z+=norm.z;
         //   console.log(position);
          //  console.log(position);
            position.y=0;
            Oplayer.setAttribute('position', position);
        }
        lastpos = Oplayer.object3D.getWorldPosition(position);  
    }
});