
//Exam startup routine
var cryptojs = require("crypto-js");
var fs = require("fs");
var exam = new Object;
function check_password() {
    var pubdata = fs.readFileSync("./exam.json");
    var pkg = JSON.parse(pubdata);
    var text = document.getElementById("password_box");

    var password = text.value;
    var key = cryptojs.PBKDF2(password, pkg.salt, {
        keySize: 256 / 32
    });
    var decrypted = cryptojs.AES.decrypt(pkg.exam, key.toString()).toString();
    var str = "";
    for (var n = 0; n < decrypted.length; n += 2) {
        // console.log(decrypted)
        str += String.fromCharCode(parseInt(decrypted.substr(n, 2), 16));
    }
    try {
        exam = JSON.parse(str);
        // console.log(exam)
        document.getElementById("password_div").style.display = "none";
        start(exam);
    } catch (e) {
        console.error(e)
        alert("Constraseña incorrecta");
    }
}
//forgive me father for i have sinned

class Quiz {
    constructor() {
        this.questions = new Array;
        this.question_ids = new Array; // easier dom element lookup
        this.input_ids = new Array;
    }
    //Pide el nombre del contenedor de DOM para agregar los elementos de get_dom_element de los objetos DOMQuestion
    append_to_dom(doc) {
        for (var i = 0; i < this.questions.length; i++) {
            var id = "form_" + i;
            var item = this.questions[i].make_dom_element(id);
            doc.appendChild(item);
            this.question_ids.push(id);
            for (var x = 0; x < this.questions[i].input_ids.length; x++) {
                this.input_ids.push(this.questions[i].input_ids[x]);
            }
        }
    }

    add_question(question) {
        this.questions.push(question);
    }
}
console.log(exam);

var sub = new Submission();
function start(exam) {
    var quiz = new Quiz();

    console.log(exam)
    for (key in exam) {
        if (key.charAt(0) == "f") {
            if (exam[key].type == "multi") {

                var options = new Array;
                for (input_key in exam[key].body) {

                    if (input_key.charAt(0) == "i") { // <- found an input
                        options.push(exam[key].body[input_key].label);
                        console.log(exam[key].body[input_key].label);
                    }
                }
                var new_question = new DOMQuestion(exam[key].heading, false, options)
                quiz.add_question(new_question);
            } else { // Essay type
                var new_question = new DOMQuestion(exam[key].heading,true, undefined);
                quiz.add_question(new_question);
            }
        }
    }
    // var quiz = new Quiz(exam);
    var doc = document.getElementById("container")
    quiz.append_to_dom(doc);
    sub.set_quiz(quiz);
    console.log(exam)

}


function encrypt() {
    sub.retrieve();
}   

