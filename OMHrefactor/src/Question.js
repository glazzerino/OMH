class Question {
    constructor(text,is_essay, options) {
        // console.log(options)
        if (is_essay) {
            this.text = text;
            this.answer = "unfilled";
        } else {
            this.options = options;
        }
        this.is_essay = is_essay;
    }
}