//var neoCollection = getNeoAPI();
getDate();

function getNeoAPI(){

}

function getDate(){
    var date = new Date().toISOString().substring(0,10);
    console.log(date);
}