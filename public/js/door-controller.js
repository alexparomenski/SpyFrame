AFRAME.registerComponent('door-controller', {
    init : function(){
        door = document.querySelector('#door_object')
        door.setAttribute('animation-mixer', "clip: Closed; crossFadeDuration: 0; loop: once; timeScale: 1");
        this.el.addEventListener('click', evt => {
            if (door.getAttribute('animation-mixer').clip=="Closed")
            {
                door.setAttribute('class', "facility");
                door.setAttribute('animation-mixer', "clip: DoorOpen; crossFadeDuration: 0; loop: once; timeScale: 1");
            }
            else if (door.getAttribute('animation-mixer').clip=="Open")
            {
                door.setAttribute('class', "facility");
                door.setAttribute('animation-mixer', "clip: DoorClose; crossFadeDuration: 0; loop: once; timeScale: 1");
            }
        });
        this.el.addEventListener('animation-finished', evt => {
            //console.log(door.getAttribute('animation-mixer').clip);
            if (evt.detail.action._clip.name=="DoorOpen")
            {
                door.setAttribute('class', "");
                door.setAttribute('animation-mixer', "clip: Open; crossFadeDuration: 0; loop: repeat; timeScale: 1");
            }
            if (evt.detail.action._clip.name=="DoorClose")
            {
                door.setAttribute('class', "facility");
                door.setAttribute('animation-mixer', "clip: Closed; crossFadeDuration: 0; loop: repeat; timeScale: 1");
            }
            if (evt.detail.action._clip.name=="Open")
            {
                door.setAttribute('class', "");
                door.setAttribute('animation-mixer', "clip: Open; crossFadeDuration: 0; loop: once; timeScale: 1");
            }
            if (evt.detail.action._clip.name=="Closed")
            {
                door.setAttribute('class', "facility");
                door.setAttribute('animation-mixer', "clip: Closed; crossFadeDuration: 0; loop: once; timeScale: 1");
            }
            console.log(evt.detail.action._clip.name);
        });
    },
    tick: function(){
        console.log(door.getAttribute('animation-mixer').clip);
    }
});