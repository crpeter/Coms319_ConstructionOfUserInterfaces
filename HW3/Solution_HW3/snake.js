var Calc = {

    Model : {
    },
    
    
    View : {
        btnStop : {id: "btnStop", type: "button", value: "stop", onclick:""},
        btnLeft : {id: "btnLeft", type: "button", value: "turn left", onclick:""},
        btnRight : {id: "btnRight", type: "button", value: "turn right", onclick:""},
    },
    
    Controller : {
    
    },
    
    run : function() {
        Calc.attachHandlers();
        var c=document.getElementById("canvas");
        var ctx=c.getContext("2d");
        ctx.beginPath();
        ctx.moveTo(0,225);
        var done = false;
        var x = 0
        var y = 225
        while (!done) {
            setInterval(function(){ 
                ctx.lineTo(x,y);
                ctx.stroke(); 
            }, 1000);
            x++
            //y++
            if (x > 100) {
                done = true
            }
        }
        return Calc.display();
    },
    
    
    displayElement : function (element) {
      var s = "<input ";
      s += " id=\"" + element.id + "\"";
      s += " type=\"" + element.type + "\"";
      s += " value= \"" + element.value + "\"";
      s += " onclick= \"" + element.onclick + "\"";
      s += ">";
      return s;
    
    },
    
    display : function() {
      var s;
      s = "<table id=\"myTable\" border=2>"
      s += "<tr><td>";
      s += Calc.displayElement(Calc.View.btnStop);
      s += Calc.displayElement(Calc.View.btnLeft);
      s += Calc.displayElement(Calc.View.btnRight);
      s += "</tr></td></table>";
      return s;
    },

    
    
    attachHandlers : function() {
      Calc.View.btnStop.onclick = "Calc.stop()"; 
    },
    
    stop : function() {
      console.log("Hi");
    }
    
} // end of Calc;
    