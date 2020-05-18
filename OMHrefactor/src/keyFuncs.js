var rsa = require("node-bignumber");
var fs = require("fs");
function keys_test() {

    var key = new rsa.Key();
    key.generate(2048,"65537");
    var savepub = new rsa.Key();
    savepub.n = key.n.toString(16);
    savepub.e = key.e.toString(16);
    console.log(savepub);
    var savepriv = new rsa.Key();
    savepriv.n = key.n.toString(16);
    savepriv.e = key.e.toString(16);
    savepriv.d = key.d.toString(16);
    // key.setPrivate()

    //Save public key
    fs.writeFileSync("./pubkey.json", JSON.stringify(savepub,null,2), (err) => {
        if (err) {
            console.error(err);
            return;
        };
        console.log("File has been created");
    });

    //Save private key
    fs.writeFileSync("./privkey.json", JSON.stringify(savepriv,null,2), (err) => {
        if (err) {
            console.error(err);
            return;
        };
        console.log("File has been created");
    });

    var pubdata = fs.readFileSync("pubkey.json");
    var privdata = fs.readFileSync("privkey.json")
    var pubkey_json = JSON.parse(pubdata);
    var privkey_json = JSON.parse(privdata)

    //parsed keypair testing
    var test_pubkey = new rsa.Key();
    var test_privkey = new rsa.Key();
    test_pubkey.setPublic(pubkey_json.n, pubkey_json.e);
    test_privkey.setPrivate(privkey_json.n, privkey_json.e, privkey_json.d);
    
    var msg = "aLorem ipsum this that blabla superman was wrong in Bat v Sup movie"
    console.log(msg)
    var encrypted = test_pubkey.encrypt(msg);
    console.log(encrypted)
    var decrypted = test_privkey.decrypt(encrypted)
    console.log(decrypted.toString())
    

}
