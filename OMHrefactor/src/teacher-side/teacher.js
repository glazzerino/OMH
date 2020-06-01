container = document.getElementById("builder");
// container.id = "question_container"
var id_num_accumulator = 0;
var skeleton = new Object;
var form_id_num_accumulator = 0;
var inputs = new Array();

function new_essay() {
    var form = document.createElement("form");
    form.id = "form_" + form_id_num_accumulator;

    var heading = document.createElement("h2");
    heading.textContent = "Edit me";
    heading.contentEditable = "true";

    var remove_button = document.createElement("button");
    remove_button.type = "button";
    remove_button.id = "remove_essay_button";
    remove_button.textContent = "-";
    remove_button.onclick = function () {
        container.removeChild(form);
    };

    form.appendChild(remove_button);
    form.appendChild(heading);

    container.appendChild(form)

}

function new_multiple_choice() {

    var form = document.createElement("form");
    form.id = "form_" + form_id_num_accumulator;

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
        // adds new checkbox
        // console.log("lmao")
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
            form.removeChild(last_input);
            form.removeChild(last_label);
            form.removeChild(last_br)

        }

    };

    var delete_button = document.createElement("button");
    delete_button.type = "button";
    delete_button.textContent = "remove";
    delete_button.id = "delete_multichoice_button";
    delete_button.onclick = function () {
        container.removeChild(form);
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
                individual_input.label = labels[i].textContent; // <- multi-choice only, since there are no other input types
                if (inputs[i].type == "checkbox") {
                    if (inputs[i].checked) {
                        individual_input.is_ans = true;
                    } else {
                        individual_input.is_ans = false;
                    }
                }
                inputs_obj[inputs[i].id] = individual_input;
            }
            skeleton[elems[x].id].body = inputs_obj;        
    }
    console.log(skeleton);
}
