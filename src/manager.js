var container = document.getElementById("container")

class Question {
    constructor(question,is_essay,options=undefined,) {
        if (!is_essay) {
            this.options = options;
            this.question = question;
        } else {
            this.question = question;
        }
        this.is_essay = is_essay;
    }
}
//peliminary testing
questions = new Array();
//mockup questions
test1 = new Question("Briefly describe the fourth state of matter",is_essay=true); 
test2 = new Question("Most electronegative element?",false,["Fr","Xe","He","Ar"]); 
test3 = new Question("Mascotas",false,["perro","gato"])
test4 = new Question("Gas noble",false,["He","Fr","O"]);
questions.push(test1)
questions.push(test2)
questions.push(test3)
// questions.push(test4)
form_ids = new Array(); // Stores all forms' ids to iterate through them later
//HTML Rendering
// Name convention is form_N where N is the number (1..n) of the question
var container = document.getElementById("container");
if (test1.is_essay) {console.log("essay!")}
for (var i=0;i<questions.length;i++) {
    var form = document.createElement("form");
    var form_id = "form_"+(i+1)
    var question_text = document.createElement("h3")
    question_text.textContent = questions[i].question
    form.appendChild(question_text);
    form.id = form_id
    if (questions[i].is_essay) {
        var textarea = document.createElement("textarea");
        textarea.name = form_id
        form.appendChild(textarea)
    } else {
        for (var x=0;x<questions[i].options.length;x++) {
            var input_id = "radio_button_"+(String.fromCharCode(97+i));
            var label = document.createElement("label");
            label.for = input_id
            var input = document.createElement("input")
            input.type = "radio";
            input.id = input_id;
            input.name = form_id;
            input.value = String.fromCharCode(97+x);
            label.textContent = questions[i].options[x];
            form.appendChild(input)
            form.appendChild(label)
            form.appendChild(document.createElement("br"))
        }
    }
    var form_container = document.createElement("div")
    form_ids.push(form_id);
    form_container.appendChild(form)
    container.appendChild(form_container)
}

var responses = {};
function collectResponses() {
    var fs = require("fs");
    console.log(document.getElementsByName("form_1").value)
    for (var i=0;i< form_ids.length; i++) {
        var response_obj = new Object;
        var question_inputs = document.getElementsByName(form_ids[i]);
        for (var x=0;x<question_inputs.length;x++) {
            if (question_inputs[x].type == "radio" && question_inputs[x].checked) {
                response_obj["response"] = question_inputs[x].value;
                break //when we get our only possible response for a multi-option question and we shall
                    // move onto the next question 
            } else {
                response_obj["response"] = question_inputs[x].value
            }
        }
        responses[form_ids[i]] = response_obj;
    }
    console.log(JSON.parse(JSON.stringify(responses,null,2)))
    fs.writeFile("text.json",JSON.stringify(responses,null,2), function(err) {
        if (err) {
            console.log(err)
        }
    });
}