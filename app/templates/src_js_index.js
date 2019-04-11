import "../css/base.css";
if(process.env.NODE_ENV === 'production') {
    var fundebug=require("fundebug-javascript");
    fundebug.apikey = "";
}