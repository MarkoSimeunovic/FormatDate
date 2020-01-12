


function isUndefined(input) {
    return input ===  void 0 || input === null; 
};

function isArray(input) {
    return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
};

function isNumber(input) {
    return typeof input === 'number' || Object.prototype.toString.call(input) === '[object Number]';
};
  

function isString(input) {
    return typeof input === 'string' || Object.prototype.toString.call(input) === '[object String]';
};

function isDate(input) {
    return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
};

function isLanguage(input) {
    return input instanceof Language || Object.prototype.toString.call(input) === '[object Language]';
};
    

function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

function daysInYear(year) {
    return isLeapYear(year) ? 366 : 365;
};


function map(arr, fn) {
    var i, arrLen = arr.length, res = new Array(arrLen);
    for (i = 0; i < arrLen; ++i) {
        res[i] = fn(arr[i], i);
    }
    return res;
};

function getStrings(array, chars = 3) {
   
   if(chars < 0) {
   	   return map(array,function(value, index) {    
       					 return value;
    });   
   }
   
   return map(array,function(value, index) {    
        	  return value.substr(0,chars);
    });
};


class Language  {


	constructor() {
        
        this.langName = "en-US";     
        this.AM = "AM";
        this.PM = "PM";
        this.GMT = "GMT";
        this.UTC = "UTC";

        this.months = [
          "January","February","March","April","May","June",
          "July","August","September","October","November","December"
        ];

        this.days = [
          "Sunday", "Monday", "Tuesday", 
          "Wednesday", "Thursday", "Friday", "Saturday"
        ];
        
        this.shortMonths =  getStrings(this.months,3);
        this.shortDays =  getStrings(this.days,3);
        

    };


};


class Languages  {

        
	addLocale(lang,set = false) {
		if(isLanguage) {
        
        	if(!this.hasLocale(lang.langName)) {
				this.langs.push(lang);
                
             } else {
                console.log("addLocale: <Language> " + lang.langName + "већ постоји.");
             }
       			 
         	 if(set) {
            	var langId = this.findLocale(lang.langName);
           		this.langID = langId;                 
         	 }
           return true;      
     	 }
         console.log("addLocale: параметар <lang> мора бити тип <Language> !");
         return false;
    };
                                  
    
    setLocale(locale) {
        
        var langId;
        
        if (isString(locale)) {
            langId =  this.findLocale(locale);
            if (langId < 0) {
            console.log("setLocale: параметар \"locale\" није валидан !");
            return false; 
            }
        
        
        } else if(isNumber(locale)) { 
            langId = locale;
            if (  langId < 0 || langId >= this.langs.length  )  { 
            console.log("setLocale: параметар \"locale\" није валидан !");
            return false; 
            }  
          
        } else if(isLanguage(locale)) { 
            langId = this.findLocale(locale.langName);
          	  if (  langId < 0 || langId >= this.langs.length  )  {
           			 addLocale(locale,true);
            }   
        } else {
        console.log("setLocale: параметар \"locale\" није валидан !");
        return false;
        } 
          

        this.langID = langId;        
                         
    };
    
    findLocale(locale) {
        if(isString(locale)) {
            var  langId, len = this.langs.length;
            for (langId = 0; langId < len; langId++) {
              	 if (this.langs[langId].langName == locale) {
                 	  return langId;
              	 }
            }
        }
        return -1;
    };
    
    hasLocale(locale) {
        if(this.findLocale(locale) < 0) {
            return false;
        }
        return true;
    };
    
    getLocale(locale) {
    	
        var langId;
                     
        if(isNumber(locale)) { 
            langId = locale;
            if (  langId < 0 || langId >= this.langs.length  )  { 
 				langId = this.langID;
            }  
 		} else if(isString(locale)) {
            langId =  this.findLocale(locale);
            if (langId < 0) {
         		 langId = this.langID;
               }
              
        } else {
      		 langId = this.langID;
        } 
    

        return this.langs[langId];
    };
    
	constructor() {
        
		var locale = new Language(); 
        
    	this.langs = [];
        
    	this.langs.push(locale);
        
        this.langID = 0;

    };


};




var myLanguages = new Languages();



function setLanguages() {

    if(!myLanguages.hasLocale("sr-Cyrl-RS")) {
       
       
        
       //myLanguages.addLocale(_localeName, set = false)
       
      
      var locale_sc = new Language();   
           
      locale_sc.langName= "sr-Cyrl-RS";
      locale_sc.AM = "АМ";
      locale_sc.PM = "ПМ";
      locale_sc.GMT = "ГМТ";
      locale_sc.UTC = "УТЦ";
      locale_sc.months = [
       "Јанаур","Фебруар","Март","Април","Мај","Јун",
       "Јул","Август","Септембар","Октобар","Новембар","Децембар"
      ];

      locale_sc.days = [
       "Недеља","Понедељак","Уторак","Среда","Четвртак","Петак","Субота"
      ];
        
      locale_sc.shortMonths =  getStrings(locale_sc.months,3);
      locale_sc.shortDays =  getStrings(locale_sc.days,3);
                 
              
      myLanguages.addLocale(locale_sc);
       
      
      var locale_sl = new Language();
      locale_sl.langName= "sr-Latn-RS";
      locale_sl.AM = "AM";
      locale_sl.PM = "PM";
      locale_sl.GMT = "GMT";
      locale_sl.UTC = "UTC";
      locale_sl.months = [
        "Janaur","Februar","Mart","April","Maj","Jun",
        "Jul","Avgust","Septembar","Oktobar","Novembar","Decembar"
     ];

      locale_sl.days = [
        "Nedelja","Ponedeljak","Utorak","Sreda","Četvrtak","Petak","Subota"
      ];
        
      locale_sl.shortMonths =  getStrings(locale_sl.months,3);
      locale_sl.shortDays =  getStrings(locale_sl.days,3);

      
      myLanguages.addLocale(locale_sl);
      
     

    }
    
    return true;

};


setLanguages();



var myDate =  new Date();
var myLangId = -1;

class dateParser  {    
 
    getFullDay(){
        return myLanguages.getLocale(myLangId).days[myDate.getDay()];
    }
    
    getShortDay(){    
         return myLanguages.getLocale(myLangId).shortDays[myDate.getDay()]; 
    }

    getDate2(){
        var val = myDate.getDate();
        return val < 10 ? "0" + val : "" + val;
        
    }
    
    getDate(){
        return "" + myDate.getDate();
    }
    
    getFullMonth(){
        return myLanguages.getLocale(myLangId).months[myDate.getMonth()];
    }
    
    getShortMonth(){    
         return myLanguages.getLocale(myLangId).shortMonths[myDate.getMonth()]; 
    }  
    
    getMonth2(){
        var val = myDate.getMonth() + 1;
        return val < 10 ? "0" + val : "" + val;
       
    }
    
    getMonth(){
        return "" + myDate.getMonth() + 1;
    } 
     

    getFullYear(){
        return "" + myDate.getFullYear();  
    }
    
    getYear3(){
        var val = "" + myDate.getFullYear();
        return val.slice(-3);  
    }
    
    getYear2(){
        var val = "" + myDate.getFullYear();
        return val.slice(-2);
    }
    
    getYear(){
        var val = "" + myDate.getFullYear();
        val[2] == "0" ? val = val.slice(-1): val = val.slice(-2);
        return val;
    }
    
    getHours24_2(){
        var val = myDate.getHours();
        return val < 10 ? "0" + val : "" + val;
    }
    
    getHours24(){
        return "" + myDate.getHours();
    }
    
    getHours12_2(){
        var val = myDate.getHours();
        if(val > 12) { 
        val-=12;
        }        
        return val < 10 ? "0" + val : "" + val;
    }
    
    getHours12(){
        var val = myDate.getHours();
        if(val > 12) { 
        val-=12;
        }   
        return "" + myDate.getHours();
    }
    
    getMinutes2(){
        var val = myDate.getMinutes();
        return val < 10 ? "0" + val : "" + val;
    }
    
    getMinutes(){
        return "" + myDate.getMinutes();
    }
    
    getSeconds2(){
        var val = myDate.getSeconds();
        return val < 10 ? "0" + val : "" + val;
    }
    
    getSeconds(){
        return "" + myDate.getSeconds();
    }
    
    getMilliseconds3(){
        var val = myDate.getMilliseconds();
        var ret = "" + val;
        if(val < 10 )  { ret =  "00" + val; }
        else if(val < 100) { ret =  "0" + val; }
        return ret.substr(0,3);
    }
    
    getMilliseconds2(){
        var val = myDate.getMilliseconds();
        var ret = "" + val;
        ret = ret.substr(0,2);
        if(val < 10 )  { ret =  "00" + val; }
        return ret.substr(0,2);
    }
    
    getMilliseconds(){
        var val = myDate.getMilliseconds();
        var ret = "" + val;
        ret = ret.substr(0,1);
    }    
   
    getTimezoneOffset3() {
        var tzOff = myDate.getTimezoneOffset(),
        fmt="",
        h,
        m,
        ms,
        hs;
        
        if(tzOff == 0) { 
            return fmt; }
        else if(tzOff < 0) {
            tzOff *= -1;
            fmt += "+";
        }else {
            fmt += "-"; }
                
        h = parseInt(tzOff/60);
        m = parseInt(tzOff%60);
        
        ms = "" + m;
        hs = "" + h;
        
        if(m < 10) { ms = "0" + ms;}
                 
        if(h < 10) { hs = "0" + hs; }
         
        fmt += "" + hs + ":" + ms;

        return fmt;
    }
    
    getTimezoneOffset2() {
        var tzOff = myDate.getTimezoneOffset(),
        fmt="",
        h,
        m,
        ms,
        hs;
        
        if(tzOff == 0) { 
            return fmt; }
        else if(tzOff < 0) {
            tzOff *= -1;
            fmt += "+";
        }else {
            fmt += "-"; }
                
        h = parseInt(tzOff/60);
        m = parseInt(tzOff%60);
        
        ms = "" + m;
        hs = "" + h;
        
        if(m < 10) { ms = "0" + ms;}
                  
        fmt += "" + hs + ":" + ms; 
        
        return fmt;
    }

    getTimezoneOffset() {
        var tzOff = myDate.getTimezoneOffset(),
        fmt="",
        h,
        m,
        ms,
        hs;
        
        if(tzOff == 0) { 
            return fmt; }
        else if(tzOff < 0) {
            tzOff *= -1;
            fmt += "+";
        }else {
            fmt += "-"; }
                
        h = parseInt(tzOff/60);
        m = parseInt(tzOff%60);
        
        ms = "" + m;
        hs = "" + h;
        
        if(m < 10) { ms = "0" + ms;}
        
          
            
        hs = "" + h; 
        fmt += hs;
        
        if(m > 0) {
            fmt += ":" + ms;
        }
        
        return fmt;    
    }
    
    getTimezoneInfo3(){
        return myLanguages.getLocale(myLangId).GMT + this.getTimezoneOffset3();
    }
    
    getTimezoneInfo2(){
        return myLanguages.getLocale(myLangId).GMT + this.getTimezoneOffset2();
    }
    
    getTimezoneInfo(){
        return myLanguages.getLocale(myLangId).GMT + this.getTimezoneOffset();
    }
    
    getAPM2() {
        var val = myDate.getHours();
        if(val > 12) { 
            return myLanguages.getLocale(myLangId).PM;
        }                
        return myLanguages.getLocale(myLangId).AM;
    }
    
    getAPM() {
        var val = myDate.getHours();
        if(val > 12) { 
            return myLanguages.getLocale(myLangId).PM.slice(0,1);
        }                
        return myLanguages.getLocale(myLangId).AM.slice(0,1);
    }
    
    getGMT() {
        return myLanguages.getLocale(myLangId).GMT;
    }
   
    getUTC() {
        return myLanguages.getLocale(myLangId).GMT;
    }
    
    parseDate(date) { 
        myDate = date;
    }
      
};



class UTCdateParser  {
    
 
    getFullDay(){
        return myLanguages.getLocale(myLangId).days[myDate.getUTCDay()];
    }
    
    getShortDay(){    
         return myLanguages.getLocale(myLangId).shortDays[myDate.getUTCDay()]; 
    }

    getDate2(){
        var val = myDate.getUTCDate();
        return val < 10 ? "0" + val : "" + val;
        
    }
    
    getDate(){
        return "" + myDate.getUTCDate();
    }
    
    getFullMonth(){
        return myLanguages.getLocale(myLangId).months[myDate.getUTCMonth()];
    }
    
    getShortMonth(){    
         return myLanguages.getLocale(myLangId).shortMonths[myDate.getUTCMonth()]; 
    }  
    
    getMonth2(){
        var val = myDate.getUTCMonth() + 1;
        return val < 10 ? "0" + val : "" + val;
       
    }
    
    getMonth(){
        return "" + myDate.getUTCMonth() + 1;
    } 
     

    getFullYear(){
        return "" + myDate.getUTCFullYear();  
    }
    
    getYear3(){
        var val = "" + myDate.getUTCFullYear();
        return val.slice(-3);  
    }
    
    getYear2(){
        var val = "" + myDate.getUTCFullYear();
        return val.slice(-2);
    }
    
    getYear(){
        var val = "" + myDate.getUTCFullYear();
        val[2] == "0" ? val = val.slice(-1): val = val.slice(-2);
        return val;
    }
    
    getHours24_2(){
        var val = myDate.getUTCHours();
        return val < 10 ? "0" + val : "" + val;
    }
    
    getHours24(){
        return "" + myDate.getUTCHours();
    }
    
    getHours12_2(){
        var val = myDate.getUTCHours();
        if(val > 12) { 
        val-=12;
        }        
        return val < 10 ? "0" + val : "" + val;
    }
    
    getHours12(){
        var val = myDate.getUTCHours();
        if(val > 12) { 
        val-=12;
        }   
        return "" + myDate.getUTCHours();
    }
    
    getMinutes2(){
        var val = myDate.getUTCMinutes();
        return val < 10 ? "0" + val : "" + val;
    }
    
    getMinutes(){
        return "" + myDate.getUTCMinutes();
    }
    
    getSeconds2(){
        var val = myDate.getUTCSeconds();
        return val < 10 ? "0" + val : "" + val;
    }
    
    getSeconds(){
        return "" + myDate.getUTCSeconds();
    }
    
    getMilliseconds3(){
        var val = myDate.getUTCMilliseconds();
        var ret = "" + val;
        if(val < 10 )  { ret =  "00" + val; }
        else if(val < 100) { ret =  "0" + val; }
        return ret.substr(0,3);
    }
    
    getMilliseconds2(){
        var val = myDate.getUTCMilliseconds();
        var ret = "" + val;
        ret = ret.substr(0,2);
        if(val < 10 )  { ret =  "00" + val; }
        return ret.substr(0,2);
    }
    
    getMilliseconds(){
        var val = myDate.getUTCMilliseconds();
        var ret = "" + val;
        ret = ret.substr(0,1);
    } 
    
    getTimezoneOffset3() {
        return "";
    }
    
    getTimezoneOffset2() {
        return "";
    }

    getTimezoneOffset() {        
        return "";    
    }
    
    getTimezoneInfo3(){
        return myLanguages.getLocale(myLangId).UTC;
    }
    
    getTimezoneInfo2(){
        return myLanguages.getLocale(myLangId).UTC;
    }
    
    getTimezoneInfo(){
        return myLanguages.getLocale(myLangId).UTC;
    }
    
    getAPM2() {
        var val = myDate.getUTCHours();
        if(val > 12) { 
            return myLanguages.getLocale(myLangId).PM;
        }                
        return myLanguages.getLocale(myLangId).AM;
    }
    
    getAPM() {
        var val = myDate.getUTCHours();
        if(val > 12) { 
            return myLanguages.getLocale(myLangId).PM.slice(0,1);
        }                
        return myLanguages.getLocale(myLangId).AM.slice(0,1);
    }
    
    getGMT() {
        return myLanguages.getLocale(myLangId).UTC;
        //return "";
    }
   
    getUTC() {
        return myLanguages.getLocale(myLangId).UTC;
    }
    
    parseDate(date) { 
        myDate = date;
    }
      
};

var nDateParser = new dateParser();
var nUTCDateParser = new UTCdateParser();


function date2str(date, format,toUTC = false) {
  
 //myDate = new Date;
  
 var myDateParser;
 
 if (toUTC) {
 	myDateParser = nUTCDateParser;
 } else {
	myDateParser = nDateParser;
 }

 myDateParser.parseDate(date);
	
         
    
   var y = format.replace(/(d+|D+|m+|M+|y+|Y+|h+|H+|s+|S+|f+|F+|z+|Z+|t+|T+|g+|G+|u+|U+)/gi, function(v) {
        
        var val = v[0];
        var valLower = val.toLowerCase();
        var vLength = v.length;
        var ret = "";
        
        if (valLower == "d") {
          
          switch(vLength) {
                
                case 1:
                    ret = myDateParser.getDate();
                    break;
                case 2:
                    ret = myDateParser.getDate2();
                    break;
                case 3:
                    ret = myDateParser.getShortDay();
                    break;    
                default:
                    ret = myDateParser.getFullDay();           
            }
        }
        
        else if (val == "M") {
            
            switch(vLength) {
            
                case 1:
                    ret = myDateParser.getMonth();
                    break;
                case 2:
                    ret = myDateParser.getMonth2();
                    break;
                case 3:
                    ret =myDateParser.getShortMonth();
                    break;    
                default:
                    ret = myDateParser.getFullMonth();           
            }
        }    
        
        else if (valLower == "y") {
            
            switch(vLength) {
            
                case 1:
                    ret = myDateParser.getYear();
                    break;
                case 2:
                    ret = myDateParser.getYear2();
                    break;
                case 3:
                    ret = myDateParser.getYear3();
                    break;    
                default:
                    ret = myDateParser.getFullYear();           
            }
        }
        
        else if (val == "h") {
            
            switch(vLength) {
                
                case 1:
                    ret = myDateParser.getHours12();
                    break;
                default:
                    ret = myDateParser.getHours12_2();
                    break;
            }
        }
        
        else if (val == "H") {
            
            switch(vLength) {
            
                case 1:
                    ret = myDateParser.getHours24();
                    break;
                default:
                    ret = myDateParser.getHours24_2();
                    break;
            }
        }
        
        else if (val == "m") {
            
            switch(vLength) {
                
                case 1:
                    ret = myDateParser.getMinutes();
                    break;
                default:
                    ret = myDateParser.getMinutes2();
                    break;
            }
        }
    
        else if (val == "s") {
            
            switch(vLength) {
                
                case 1:
                    ret = myDateParser.getSeconds();
                    break;
                default:
                    ret = myDateParser.getSeconds2();
                    break;
            }
        }
        
        else if (valLower == "f" || val == "S") {
            
            switch(vLength) {
                
                case 1:
                    ret = myDateParser.getMilliseconds();
                    break;
                case 2:
                    ret = myDateParser.getMilliseconds2();
                    break;    
                default:
                    ret = myDateParser.getMilliseconds3();
                    break;
            }
        }

        else if (val == "z") {
            
            switch(vLength) {
               
                case 1:
                    ret = myDateParser.getTimezoneOffset();
                    break;
                case 2:
                    ret = myDateParser.getTimezoneOffset2();
                    break;    
                default:
                    ret = myDateParser.getTimezoneOffset3();
                    break;
            }
        }
        
        else if (val == "Z") {
            
            switch(vLength) {
               
                case 1:
                    ret = myDateParser.getTimezoneInfo();
                    break;
                case 2:
                    ret = myDateParser.getTimezoneInfo2();
                    break;    
                default:
                    ret = myDateParser.getTimezoneInfo3();
                    break;
            }
        }

        else if (valLower == "t") {
            
            switch(vLength) {
               
                case 1:
                    ret = myDateParser.getAPM();
                    break;    
                default:
                    ret = myDateParser.getAPM2();
                    break;
            }
        } 

        else if (valLower == "g") {
                    ret = myDateParser.getGMT();
        } 

        else if (valLower == "u") {
                    ret = myDateParser.getUTC();
        }         
               
    
    
   
        return ret;
    });
        
   return y; 
}



function formatDate(date,format,isUTC = false) {

    if(!isDate(date)) {
        console.log("Први параметар мора бити тип: Date")
        return "";
    }
    if(!isString(format)){
        console.log("Други параметар мора бити тип: String")
        return "";
    }
    

   return date2str(date,format, isUTC);


};



//var my_Date = new Date();


function formatDate_Call() {


    var format = document.getElementById("dateFormat").value;

    //var dt = new Date();
    var dt = readDate();

    var ret = formatDate(dt,format);
    document.getElementById("dateGMT").value = ret;




};

function formatUTCDate_Call() {


    var format = document.getElementById("dateFormat").value;

    //var dt = new Date();
    var dt = readDate();

 

    var retu = formatDate(dt,format,true);
    document.getElementById("dateUTC").value = retu;


};


function changeLanguage(name) {

return myLanguages.setLocale(name);
};



function writeDate() {

 
   var d = new Date();
    
    document.getElementById("year").value = d.getFullYear();
    document.getElementById("month").value = d.getMonth() + 1;
    document.getElementById("day").value = d.getDate();
    
    document.getElementById("hours").value = d.getHours();
    document.getElementById("minutes").value = d.getMinutes();
    document.getElementById("seconds").value = d.getSeconds();;
    document.getElementById("milliseconds").value = d.getMilliseconds();

    myDate = d;
    

};


function readDate() {

    var d = new Date();
    
    d.setFullYear( document.getElementById("year").value );
    d.setMonth( document.getElementById("month").value - 1 );
    d.setDate( document.getElementById("day").value );
    
    d.setHours(document.getElementById("hours").value );
    d.setMinutes(document.getElementById("minutes").value );
    d.setSeconds(document.getElementById("seconds").value );;
    d.setMilliseconds(document.getElementById("milliseconds").value );

    myDate = d;
    return myDate;
};

function loadMe() {

 
document.getElementById("lang").selectedIndex=0;

writeDate();

formatDate_Call();
formatUTCDate_Call();

};

