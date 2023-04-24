<html>
<body>
<form action="https://script.google.com/macros/s/AKfycbwjuXIwwQcGX7ANEB1pT5pG2YnyehoU_1AblXLeRxFPJoelRNmIy2LDY_sSIdAe6tHtrw/exec" method='post'>
  <input type="text" name="name" placeholder="Name"><br>
  <input type="text" name="job" placeholder="Job"><br>
  <input type="email" name="email" placeholder="Email"><br>
 <input type="submit" name="submit" value="Submit"><br>
</form>
</body>
</html>
let app = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1TF68MxUFe9-Dc43EnWYx3xVXKcxgjwr1y9zhrGG5Pyw/edit#gid=0");
let sheet=app.getSheetName("Sheet1");
function doPost(e){
  try{
   let obj=JSON.parce(e.postData.contents);
  let dcode=Utilities.base64Decode(obj.base64);
  let blob=Utilities.newBlob(dcode,obj.type,obj.name);
  let newfile=DriveApp.createFile(blob);
  let link=newfile.setSharing(DriveApp.Access.ANYONE_WITH_LINK,DriveApp.Permission.VIEW).getDownloadUrl();
  let lr=sheet.getlastRow();
  sheet.getRange(lr+1,1).setFormula('=IMAGE("${link}")');
   return ContentService.createTextOutput("image uploaded")
  }catch(err){ 
  return ContentService.createTextOutput(err)
  }
  
}
