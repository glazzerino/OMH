//Exam startup routine


// document.getElementById("test").appendChild(form);
class Quiz {
    constructor(questions) {
        this.questions = questions;
        this.question_ids = new Array; // easier dom element lookup
        this.input_ids = new Array;
    }
    //Pide el nombre del contenedor de DOM para agregar los elementos de get_dom_element de los objetos DOMQuestion
    append_to_dom(doc) {
        for (var i=0;i<this.questions.length; i++) {
            var id = "form_"+i;
            var item = this.questions[i].make_dom_element(id);
            doc.appendChild(item);
            this.question_ids.push(id);
            for (var x=0;x<this.questions[i].input_ids.length; x++) {
                this.input_ids.push( this.questions[i].input_ids[x]);
            }
        }
    }
}
//Question definitions
var q1 = new DOMQuestion("Question",false,["This","That"])
var q2 = new DOMQuestion("Most electronegative element?", false, ["Br","Ne","O","Fr"])
var q3 = new DOMQuestion("Briefly describe a bird",true,undefined);
var q4 = new DOMQuestion("Metal widely used in batteries",false,["Iron","Copper","Chrome","Lithium"])


function start() { 
    var quiz = new Quiz([q1,q2,q3,q4]);
    var doc = document.getElementById("container")
    quiz.append_to_dom(doc);
    var sub = new Submission(quiz);
    
}


function encrypt() {
    sub.retrieve();
}

