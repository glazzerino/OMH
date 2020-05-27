container = document.getElementById("builder");
// container.id = "question_container"
var id_num_accumulator = 0;
var skeleton = new Object;
var form_id_num_accumulator = 0;

function new_multiple_choice() {
    var question_body = new Object // This var stores question heading and options for an individual question
    // var inputs_arr = new Array;

    var form = document.createElement("form");
    var heading = document.createElement("h2");

    form.id = "form_"+form_id_num_accumulator;
    // form.class = "question_form"
    heading.contentEditable = "true";
    heading.textContent = "Edit me";

    

    var { input, label } = make_option();
    question_body["options"] = new Array;
    question_body["options"].push(label.textContent);
    var add_btn = document.createElement("button");

    add_btn.type = "button";
    add_btn.id = "add_button";
    add_btn.textContent = "+";
    add_btn.onclick = function() { //JS no me deja asignar una funcion no anonima
        id_num_accumulator += 1;
        var { input, label } = make_option();
        form.appendChild(document.createElement("br"));
        form.appendChild(input);
        form.appendChild(label);
    };

    form.appendChild(heading);
    
    form.appendChild(add_btn);
    form.appendChild(document.createElement("br"));
    form.appendChild(input);
    form.appendChild(label);
    console.log(question_body)

    container.appendChild(form);
    form_id_num_accumulator += 1;
}

function make_option() {
    var input = document.createElement("input");
    input.type = "checkbox";
    input.id = "input_" + id_num_accumulator;
    input.name = input.id;
    var label = document.createElement("label");
    label.for = input.name;
    label.textContent = "Edit me";
    label.contentEditable = "true";
    id_num_accumulator += 1;
    return { input, label };
}
// function new_radio() {
//     console.log("dawda");
// }
