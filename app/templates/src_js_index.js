import "../css/base.css";
if(process.env.NODE_ENV === 'production') {
    var fundebug=require("fundebug-javascript");
    fundebug.apikey = "9efdb3ad90f729cd51ed2c5ee7f09fa7c0d900a92abaff0b696a7398a1e9f9ec";
}