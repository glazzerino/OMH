container = document.getElementById("builder");
var fs = require("fs");
var rsa = require("node-bignumber");
var key = new rsa.Key();
key.generate(2048, "6553");
var savepub = new rsa.Key();
savepub.n = key.n.toString(16);
savepub.e = key.e.toString(16);
console.log("Keys generated");
var savepriv = new rsa.Key();
savepriv.n = key.n.toString(16);
savepriv.e = key.e.toString(16);
savepriv.d = key.d.toString(16);

const cryptojs = require("crypto-js");
// container.id = "question_container"
var id_num_accumulator = 0;
var skeleton = new Object;
skeleton.privkey = savepriv;
skeleton.pubkey = savepub;
var form_id_num_accumulator = 0;
var inputs = new Array();

function new_essay() {
    var form = document.createElement("form");
    form.id = "form_" + form_id_num_accumulator+"h";

    var heading = document.createElement("h2");
    heading.textContent = "Edit me";
    heading.contentEditable = "true";

    var borrar_button = document.createElement("button");
    borrar_button.type = "button";
    borrar_button.id = "borrar_essay_button";
    borrar_button.textContent = "-";
    borrar_button.onclick = function () {
        container.borrarChild(form);
    };

    form.appendChild(borrar_button);
    form.appendChild(heading);

    container.appendChild(form)

}

function new_multiple_choice() {

    var form = document.createElement("form");
    form.id = "form_" + form_id_num_accumulator + "m";

    var heading = document.createElement("h2");
    heading.contentEditable = "true";
    heading.textContent = "Edit me";
    container.appendChild(document.createElement("br"))
    var { label, input } = make_option();


    var add_button = document.createElement("button");
    add_button.type = "button"
    add_button.textContent = "+";
    add_button.id = "add_button";
    add_button.onclick = function () {
        // adds new radio

        form.appendChild(document.createElement("br"));
        var { input, label } = make_option();
        form.appendChild(label);
        form.appendChild(input);

        // container.appendChild(form);
    };

    var less_button = document.createElement("button");
    less_button.type = "button";
    less_button.textContent = "-";
    less_button.id = "less_button";


    less_button.onclick = function () {
        if (form.children.length - 3 >= 2) {

            var elements = form.children;
            var last_input = form.children[form.children.length - 1];
            var last_label = form.children[form.children.length - 2];
            var last_br = form.children[form.children.length - 3];
            form.borrarChild(last_input);
            form.borrarChild(last_label);
            form.borrarChild(last_br)

        }

    };

    var delete_button = document.createElement("button");
    delete_button.type = "button";
    delete_button.textContent = "borrar";
    delete_button.id = "delete_multichoice_button";
    delete_button.onclick = function () {
        container.borrarChild(form);
    };

    var buttons = document.createElement("div");
    buttons.appendChild(add_button);
    buttons.appendChild(less_button)
    buttons.appendChild(delete_button);
    form.appendChild(buttons);
    form.appendChild(heading);

    form.appendChild(label);
    form.appendChild(input);
    container.appendChild(form)
    form_id_num_accumulator += 1;
}

function make_option() {
    var input = document.createElement("input");
    input.type = "radio";
    input.id = "input_" + id_num_accumulator;
    input.name = input.id;

    var label = document.createElement("label");
    label.for = input.name;
    label.textContent = "Edit me";
    label.contentEditable = "true";

    id_num_accumulator += 1;
    return { input, label };
}


function get_obj() {
    var elems = container.getElementsByTagName("form");
    for (var x = 0; x < elems.length; x++) {
        skeleton[elems[x].id] = new Object;
        skeleton[elems[x].id].heading = elems[x].getElementsByTagName("h2")[0].textContent;
        inputs_obj = new Object;

        var inputs = elems[x].getElementsByTagName("input");
        var labels = elems[x].getElementsByTagName("label");
        
        var type = "multi";
        if (inputs.length == 0) {
            type = "essay";
        }
        skeleton[elems[x].id]["type"] = type;

        for (var i = 0; i < inputs.length; i++) {
            var individual_input = new Object;

            if (inputs[i].type == "radio") {
                individual_input.label = labels[i].textContent;
                if (inputs[i].checked) {
                    individual_input.is_ans = true;
                } else {
                    individual_input.is_ans = false;
                }
                inputs_obj[inputs[i].id] = individual_input;
            } 
            
        }

        skeleton[elems[x].id].body = inputs_obj;

    }
    console.log(skeleton)
    document.getElementById("overlay").style.display = "block";
    var box = document.getElementById("password_box");
    box.addEventListener("keyup", function (event) {
        // Make skeleton clone without answers
        var clone = skeleton;
        delete clone.privkey;
        if (event.key === "Enter") {
            for (key in clone) {
                if (clone[key].type == "multi") {
                    for (input_elem in clone[key]) {
                        
                        //    console.log(clone[key][input_elem])
                        
                        
                    }
                }
            }

            var password = box.value;

            [data, nacl] = make_pkg(clone, password);

            var student_package = {
                exam: data,
                salt: nacl
            };
            // console.log(clone);
            fs.writeFileSync("./exam.json", JSON.stringify(student_package, null, 2), (err) => {
                if (err) {
                    console.error(err);
                    return;
                };
                console.log("File has been created");
            });
            fs.writeFileSync("./exam_key_teacher.json", JSON.stringify(skeleton, null, 2), (err) => {
                if (err) {
                    console.error(err);
                    return;
                };
                console.log("File has been created");
            });

            document.getElementById("creation_notice").style.display = "block";
        }
    });
}

function make_pkg(data, pass) {
    var exam_string = JSON.stringify(data);
    var password = pass;
    var content_string = JSON.stringify()
    var salt = cryptojs.lib.WordArray.random(128 / 8);
    var key = cryptojs.PBKDF2(password, salt, {
        keySize: 256 / 32
    });
    var encrypted = cryptojs.AES.encrypt(exam_string, key.toString()).toString();
    return [encrypted, salt];
}

