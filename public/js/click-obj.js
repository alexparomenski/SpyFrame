AFRAME.registerComponent('click-obj', {
    init: function () 
    {
        let socket = io();
        var recieved=false;

        console.log('listening for pickup');

        const Context_AF = this;

        Context_AF.el.addEventListener('click', function(event){   
            console.log('removing');


            //sends clue is clicked on click.
            if (Context_AF.el.id=="clue"){
                if (recieved==false){
                    recieved=true;
                    socket.emit("clueClicked");
            }}

            });

 }});