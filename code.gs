function myFunction() {
  
  SpreadsheetApp.getUi()
     .alert('Running APICALL');
  //APICALL("https://covid-19-data.p.rapidapi.com/country/code?format=json&code=it", ["x-rapidapi-host:covid-19-data.p.rapidapi.com", "x-rapidapi-key:758dfeea74msh500859a61312ea5p103492jsn2662315def68"])
  //APICALL("https://capable-hangout-272301.appspot.com/data/confirmed/country/india&us&canada/date/04-02-2020&04-03-2020&04-05-2020", [])
  
  //APICALL("https://capable-hangout-272301.appspot.com/data/death/province/date/04-01-2020",[])
  
  //APICALL("", ["x-rapidapi-host: aerisweather1.p.rapidapi.com","x-rapidapi-key: 758dfeea74msh500859a61312ea5p103492jsn2662315def68"])

  APICALL("https://gplaystore.p.rapidapi.com/applicationDetails?lang=en&id=net.luxteam.sacal", ["x-rapidapi-host gplaystore.p.rapidapi.com","x-rapidapi-key 758dfeea74msh500859a61312ea5p103492jsn2662315def68"])
}



function APICALL(endpoint, header){
  var dataresponse, content;
  Logger.log(endpoint);
  Logger.log(header);
  if(header.length>0){

    var whole_header = "";
    
    for(var i = 0; i < header.length; i++){
     whole_header += header[i] + "|";
    }
    
    whole_header = whole_header.split("|");
    
    for(var i = 0; i < whole_header.length - 1; i++){
      var temp = whole_header[i].split(":");
      
      whole_header[i] = '"' + temp[0].trim() + '":' + '"' + temp[1].trim() + '"';
 
    }
    
    
    whole_header = whole_header.join();
    whole_header = '{' + whole_header.substring(0, whole_header.length - 1) + '}';
    var temp_header = JSON.parse(whole_header);
    var options = {
      "async": true,
      "crossDomain": true,
      "method" : "GET"
    }
    
    options["headers"] = temp_header;
      
    
    
    dataresponse = UrlFetchApp.fetch(endpoint, options);
    content = dataresponse.getContentText();
    
    //Logger.log(content);
    
  
}
  else{
    Logger.log(content);

    dataresponse = UrlFetchApp.fetch(endpoint);
    content = dataresponse.getContentText();
    
  }
  
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheets = ss.getSheets();
    var sheet = ss.getActiveSheet();
    
    var content_json = JSON.parse(content);
    let rows = [];
    var data;

  var col = content_json[0];
  var column = [];
  for(key in col){
    column.push(key);
  }
  
  Logger.log(column);
  dataRange = sheet.getRange(1, 1, 1, column.length);
  dataRange.setValues([column]);
  
   for (i = 0; i < content_json.length; i++) {
    data = content_json[i];
     var temp_data = [];
     for(key in data){
       temp_data.push(data[key]);
       
     }
    rows.push(temp_data);
  }

  dataRange = sheet.getRange(2, 1, rows.length, temp_data.length);
  dataRange.setValues(rows);
    
}

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('API Call')
      .addItem('Run API Call', 'myFunction')
  .addToUi();
}
