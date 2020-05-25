
class DOMQuestion {

    constructor(text,is_essay, options=undefined) {
                // console.log(options)
                this.text = text;
                if (is_essay) {
                    this.answer = undefined
                } else {
                    this.options = options;
                }
                this.is_essay = is_essay;
                this.input_ids = new Array();
            }

    make_dom_element(element_id) {
        var form = document.createElement("form");
        form.id = element_id; 
        var text_div = document.createElement("h3")
        text_div.textContent = this.text;
        if (this.is_essay) {
            var input = document.createElement("textarea");
            input.name = form.id;
            input.id = "input_"+"_"+element_id
            input.rols = "10"
            input.cols = "50"
            form.appendChild(input);
            this.input_ids.push(input.id)
        } else { 
            for (var i=0;i< this.options.length; i++) {
                var opt_input = document.createElement("input");
                opt_input.type = "radio";
                opt_input.name =  form.id;
                opt_input.value =  this.options[i];
                // console.log(opt_input.value)
                opt_input.id = "input"+i+"_"+element_id
                var label = document.createElement("label");
                label.for =  this.options[i];
                label.textContent =  this.options[i];
                form.appendChild(opt_input);
                form.appendChild(label);
                form.appendChild(document.createElement("br"))
                this.input_ids.push(opt_input.id);
            }
        }
        var cont = document.createElement("div");
            cont.appendChild(text_div)
            cont.appendChild(form);
            cont.class = "question"
            cont.id = element_id+"_container"

            return cont;
    }
}