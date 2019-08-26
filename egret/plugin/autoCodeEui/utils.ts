var wingapi = require("wing");
module.exports = {
    log,
    err
}
function log(msg:string){
	wingapi.window.showInformationMessage(msg);
}

function err(msg:string)
{
    wingapi.window.showErrorMessage(msg);
}
