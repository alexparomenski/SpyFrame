AFRAME.registerComponent('doorpad-controller', {
    schema: {
        input: {type: 'number', default: -1}
    },

    init : function(){
        inputs = [0,0,0,0];
    },
    tick: function(){
        if (this.data.input!=-1)
        {
            this.addKey(this.data.input);
        }
    },

    addKey: function(a){
        for(i=0;i<3;i++)
        {
            inputs[i]=inputs[i+1];
        }
        inputs[3]=a;
        this.data.input=-1;
        console.log(inputs);

        if (inputs[0]==0 
            && inputs[1]==1 
            && inputs[2]==2 
            && inputs[3]==3)
        {
            door = document.querySelector('#door_object');
            if (door.getAttribute('animation-mixer').clip=="Closed")
            {
                door.setAttribute('class', "facility");
                door.setAttribute('animation-mixer', "clip: DoorOpen; crossFadeDuration: 0.1; loop: once; timeScale: 1");
            }
            else if (door.getAttribute('animation-mixer').clip=="Open")
            {
                door.setAttribute('class', "facility");
                door.setAttribute('animation-mixer', "clip: DoorClose; crossFadeDuration: 0.1; loop: once; timeScale: 1");
            }
        }
    }

});