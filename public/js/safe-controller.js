AFRAME.registerComponent('safe-controller', {
    init : function(){
        safe = document.querySelector('#safe_object')
        this.el.addEventListener('click', evt => {
            safe.setAttribute('animation-mixer', "clip: DoorOpen; crossFadeDuration: .1; loop: once");
        });
        this.el.addEventListener('animation-finished', evt => {
            console.log(safe.getAttribute('animation-mixer').clip);
            if (safe.getAttribute('animation-mixer').clip=="DoorOpen")
            {
                safe.setAttribute('animation-mixer', "clip: Open; crossFadeDuration: .1; loop: repeat, timescale: 0");
            }
            console.log(safe.getAttribute('animation-mixer').clip);
        });
    },
    tick: function(){
        
    }
});