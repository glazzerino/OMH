container = document.getElementById("builder");
var id_num_accumulator = 0;
var extract = new Object;


function new_multiple_choice() {
    var form = document.createElement("form");
    var heading = document.createElement("h2");
    heading.contentEditable = "true";
    heading.textContent = "Heading";

    var input = document.createElement("input");
    input.type = "radio";
    input.id = "input_" + id_num_accumulator;
    input.name = input.id;

    var label = document.createElement("label");
    label.for = input.name;
    label.textContent = "New";
    label.contentEditable = "true";
    id_num_accumulator += 1;

    var add_btn = document.createElement("button");
    add_btn.type = "button";
    add_btn.textContent = "+";
    add_btn.onclick = function() { //JS no me deja asignar una funcion no anonima
        console.log("testing")
    };

    form.appendChild(heading);
    form.appendChild(input);
    form.appendChild(label)
    form.appendChild(add_btn);

    container.appendChild(form);
}
// function new_radio() {
//     console.log("dawda");
// }
