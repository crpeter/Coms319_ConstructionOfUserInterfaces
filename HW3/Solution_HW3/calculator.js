var Calc = {

Model : {
    int : first = -1,
    int : second = 1,
    int : state = 0,
    int : val = -1,
    string : valStr = '',
},


View : {
  textRow : {id: "textRow", type: "text", value: "", onclick:""},
  btnC : {id: "btnC", type: "button", value: 'C', onclick:""},
  btnMR : {id: "btnMR", type: "button", value: 'MR', onclick:""},
  btnMP : {id: "btnMP", type: "button", value: 'M+', onclick:""},
  btnMM : {id: "btnMM", type: "button", value: 'M-', onclick:""},
  btnMC : {id: "btnMC", type: "button", value: 'MC', onclick:""},


  btnDiv : {id: "btnDiv", type: "button", value: '/', onclick:""},
  btnMult : {id: "btnMult", type: "button", value: '*', onclick:""},
  btnMinus : {id: "btnMinus", type: "button", value: '-', onclick:""},
  btnPlus : {id: "btnPlus", type: "button", value: '+', onclick:""},
  buttonDot : {id: "buttonDot", type: "button", value: '.', onclick:""},
  buttonEqual : {id: "buttonEqual", type: "button", value: '=', onclick:""},
  button0 : {id: "button0", type: "button", value: 0, onclick:""},
  button1 : {id: "button1", type: "button", value: 1, onclick:""},
  button2 : {id: "button2", type: "button", value: 2, onclick:""},
  button3 : {id: "button3", type: "button", value: 3, onclick:""},
  button4 : {id: "button4", type: "button", value: 4, onclick:""},
  button5 : {id: "button5", type: "button", value: 5, onclick:""},
  button6 : {id: "button6", type: "button", value: 6, onclick:""},
  button7 : {id: "button7", type: "button", value: 7, onclick:""},
  button8 : {id: "button8", type: "button", value: 8, onclick:""},
  button9: {id: "button9", type: "button", value: 9, onclick:""}
},

Controller : {
},

run : function() {
  Calc.attachHandlers();
  //console.log(Calc.display());
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
  s += "<tr><td>" + Calc.displayElement(Calc.View.textRow) + "</td></tr>";
  s += "<tr><td>"
  s += Calc.displayElement(Calc.View.button7);
  s += Calc.displayElement(Calc.View.button8);
  s += Calc.displayElement(Calc.View.button9);
  s += Calc.displayElement(Calc.View.btnPlus);
  s += "</td></tr>"
  s += "<tr><td>"
  s += Calc.displayElement(Calc.View.button4);
  s += Calc.displayElement(Calc.View.button5);
  s += Calc.displayElement(Calc.View.button6);
  s += Calc.displayElement(Calc.View.btnMinus);
  s += "</td></tr>"
  s += "<tr><td>"
  s += Calc.displayElement(Calc.View.button1)
  s += Calc.displayElement(Calc.View.button2);
  s += Calc.displayElement(Calc.View.button3);
  s += Calc.displayElement(Calc.View.btnMult);
  s += "</td></tr>"
  s += "<tr><td>"
  s += Calc.displayElement(Calc.View.button0)
  s += Calc.displayElement(Calc.View.buttonDot);
  s += Calc.displayElement(Calc.View.buttonEqual);
  s += Calc.displayElement(Calc.View.btnDiv);
  s += "</td></tr>"
  s += "<tr><td>"
  s += Calc.displayElement(Calc.View.btnC)
  s += Calc.displayElement(Calc.View.btnMR);
  s += Calc.displayElement(Calc.View.btnMP);
  s += Calc.displayElement(Calc.View.btnMM);
  s += "</td></tr>"
  s += "<tr><td>"
  s += Calc.displayElement(Calc.View.btnMC)
  s += "</td></tr>"
  s += "</table>";
  return s;
},

attachHandlers : function() {
    Calc.View.btnMinus.onclick = "Calc.minus()"; 
    Calc.View.btnPlus.onclick = "Calc.plus()"; 
    Calc.View.btnMult.onclick = "Calc.times()"; 
    Calc.View.btnDiv.onclick = "Calc.divide()"; 
    Calc.View.buttonEqual.onclick = "Calc.equals()"
    Calc.View.buttonDot.onclick = "Calc.decimal()"

    Calc.View.btnC.onclick = "Calc.clear()"
    Calc.View.btnMR.onclick = "Calc.mr()"
    Calc.View.btnMC.onclick = "Calc.mc()"
    Calc.View.btnMP.onclick = "Calc.mp()"
    Calc.View.btnMM.onclick = "Calc.mm()"


    Calc.View.button0.onclick = "Calc.buttonHandler(0)"
    Calc.View.button1.onclick = "Calc.buttonHandler(1)"; 
    Calc.View.button2.onclick = "Calc.buttonHandler(2)"; 
    Calc.View.button3.onclick = "Calc.buttonHandler(3)"; 
    Calc.View.button4.onclick = "Calc.buttonHandler(4)"; 
    Calc.View.button5.onclick = "Calc.buttonHandler(5)"; 
    Calc.View.button6.onclick = "Calc.buttonHandler(6)"; 
    Calc.View.button7.onclick = "Calc.buttonHandler(7)"; 
    Calc.View.button8.onclick = "Calc.buttonHandler(8)"; 
    Calc.View.button9.onclick = "Calc.buttonHandler(9)"; 
},

buttonHandler : function(val) {
    if (self.val != -1) {
        valStr = ''
    }
    valStr += val
    document.getElementById("textRow").value = valStr
},

mr : function() {
    if (val != -1) {
        document.getElementById("textRow").value = first
    }
},

mc : function() {
    val = -1
},

mp : function() {
    if (val != -1) {
        document.getElementById("textRow").value = parseFloat(valStr) + first
        first = parseFloat(valStr) + first
    }
},

mm : function() {
    if (val != -1) {
        document.getElementById("textRow").value = first - parseFloat(valStr)
        first = first - parseFloat(valStr)
    }
},

clear : function() {
    state = -1
    first = -1
    second = -1
    val = -1
    valStr = ''
    document.getElementById("textRow").value = valStr
},

decimal : function() {
    valStr += '.'
},

minus : function() {
    state = 0
    if (first == -1) {
        first = parseFloat(valStr)
    }
    valStr = ''
    document.getElementById("textRow").value = ''

    document.getElementById("btnMinus").style.color = "red"
    document.getElementById("btnPlus").style.color = "black"
    document.getElementById("btnMult").style.color = "black"
    document.getElementById("btnDiv").style.color = "black"
},
plus : function() {
    state = 1
    if (first == -1) {
        first = parseFloat(valStr)
    }
    valStr = ''
    document.getElementById("textRow").value = ''

    document.getElementById("btnMinus").style.color = "black"
    document.getElementById("btnMult").style.color = "black"
    document.getElementById("btnDiv").style.color = "black"
    document.getElementById("btnPlus").style.color = "red"
},
times : function() {
    state = 2
    if (first == -1) {
        first = parseFloat(valStr)
    }
    valStr = ''
    document.getElementById("textRow").value = ''

    document.getElementById("btnMinus").style.color = "black"
    document.getElementById("btnPlus").style.color = "black"
    document.getElementById("btnDiv").style.color = "black"
    document.getElementById("btnMult").style.color = "red"
},
divide : function() {
    state = 3
    if (first == -1) {
        first = parseFloat(valStr)
    }
    valStr = ''
    document.getElementById("textRow").value = ''

    document.getElementById("btnMinus").style.color = "black"
    document.getElementById("btnPlus").style.color = "black"
    document.getElementById("btnMult").style.color = "black"
    document.getElementById("btnDiv").style.color = "red"
},

equals : function() {
    second = parseFloat(valStr)
    console.log("first: ", first, "second: ", second)
    switch (state) {
        case 0:
            document.getElementById("textRow").value = first - second
            val = first - second
            first = val
            second = -1
            break
        case 1:
            document.getElementById("textRow").value = first + second
            val = first + second
            first = val
            second = -1
            break
        case 2:
            document.getElementById("textRow").value = first * second
            val = first * second
            first = val
            second = -1
            break
        case 3:
            document.getElementById("textRow").value = first / second
            val = first / second
            first = val
            second = -1
            break
    }

}

} // end of Calc;