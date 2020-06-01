
rsa = require("node-bignumber")
fs = require("fs")
class Submission {
    constructor(quiz) {
        this.quiz = quiz;
        this.save = new Object();
    }
    retrieve() {
        console.log("retrieving..")
        var pubdata = fs.readFileSync("pubkey.json");
        var pubkey_json = JSON.parse(pubdata);
        var pubkey = new rsa.Key();
        pubkey.setPublic(pubkey_json.n, pubkey_json.e);
        console.log(pubkey)
        for (var i = 0; i < this.quiz.input_ids.length; i++) {
            var input = document.getElementById(this.quiz.input_ids[i]);
            if (input.type == "textarea" || input.checked) {
                var value = input.value;
                this.save[input.name] = pubkey.encrypt(value);
                console.log(this.save)
            }
        }
        console.log("lmao")
        fs.writeFileSync("./submission.json", JSON.stringify(this.save, null, 2), (err) => {
            if (err) {
                console.error(err);
                return;
            };
            console.log("File has been created");
        });
    }
}