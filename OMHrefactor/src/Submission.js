rsa = require("node-bignumber")
class Submission {
    constructor(quiz) {
        this.quiz = quiz;
        this.save = new Object();
    }

    retrieve() {
        
        for (var i=0; i<this.quiz.input_ids.length; i++) {
            var input = document.getElementById(this.quiz.input_ids[i]);
            if (input.type == "textarea" || input.checked) {
                this.save[input.name] = input.value;
            }
        }
        console.log(this.save);
        
    }
    

}