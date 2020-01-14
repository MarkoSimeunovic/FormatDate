


function isUndefined(input) {
    return input ===  void 0 || input === null; 
};


function isArray(input) {
    return !isUndefined(input) &&  ( input instanceof Array || Object.prototype.toString.call(input) === '[object Array]' );
};

function isNumber(input) {
    return !isUndefined(input) &&  ( typeof input === 'number' || Object.prototype.toString.call(input) === '[object Number]' );
};

function isNaN(input) {
return  isNumber(input) && ( "" + input === "NaN" | input === Number.POSITIVE_INFINITY || input === Number.NEGATIVE_INFINITY );
};
  
function isString(input) {
    return !isUndefined(input) &&  ( typeof input === 'string' || Object.prototype.toString.call(input) === '[object String]' );
};

function isDate(input) {
    return !isUndefined(input) &&  ( input instanceof Date || Object.prototype.toString.call(input) === '[object Date]' );
};

function isLanguage(input) {
    return !isUndefined(input) &&  ( input instanceof Language || Object.prototype.toString.call(input) === '[object Language]' );
};
    

function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

function daysInYear(year) {
    return isLeapYear(year) ? 366 : 365;
};

function daysInMonth(year,month) {

    if(!isNumber(year) ||!isNumber(month) || month < 0 || month > 11) {
        return 0;
    }

    switch(month) {
        case 1:
            return isLeapYear(year) ? 29: 28;

        case 3:
        case 5:
        case 8:
        case 10:
            return 30;

        default:
            return 31;
    }

};

function daysInMonthFast(month, isLeap = false) {

    if(!isNumber(month) || month < 0 || month > 11) {
        return 0;
    }

    switch(month) {
        case 1:
            return isLeap ? 29: 28;

        case 3:
        case 5:
        case 8:
        case 10:
            return 30;

        default:
            return 31;
    }

};


function readNumber(str,follback) {

    var num = parseInt(str) ;

    if(!isNaN(num)) {
        return num;   
    }

    return follback;
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

 
var dateValues = {
    isLeap: false,
    year: 1000,
    month: 0,
    day: 0,
    hours : 0,
    minutes : 0,
    seconds: 0,
    milliseconds: 0
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


var myLangId = -1;


class loocalDateParams {

    constructor(date) {

        this.date = date.getDate();
        this.month = date.getMonth();
        this.year = date.getFullYear();
        this.hours = date.getHours();
        this.minutes = date.getMinutes();
        this.seconds = date.getSeconds();
        this.milliseconds = date.getMilliseconds();
        this.TimezoneOffset = date.getTimezoneOffset();

    }
};

class universalDateParams {

    constructor(date) {

        this.date = date.getUTCDate();
        this.month = date.getUTCUTCUTCMonth();
        this.year = date.getUTCUTCFullYear();
        this.hours = date.getUTCHours();
        this.minutes = date.getUTCMinutes();
        this.seconds = date.getUTCSeconds();
        this.milliseconds = date.getUTCMilliseconds();
        this.TimezoneOffset = date.getTimezoneOffset();

    }
};

class dateParser  {    
 
    getFullDay() {
        return myLanguages.getLocale(myLangId).days[this.day];
    }
    
    getShortDay() {    
         return myLanguages.getLocale(myLangId).shortDays[this.day]; 
    }

    getDate2() {
        var val = this.date;
        return val < 10 ? "0" + val : "" + val;
        
    }
    
    getDate() {
        return "" + this.date;
    }
    
    getFullMonth() {
        return myLanguages.getLocale(myLangId).months[this.month];
    }
    
    getShortMonth() {    
         return myLanguages.getLocale(myLangId).shortMonths[this.month]; 
    }  
    
    getMonth2() {
        var val = this.month + 1;
        return val < 10 ? "0" + val : "" + val;
       
    }
    
    getMonth() {
        return "" + this.month + 1;
    } 
     

    getFullYear() {
        return "" + this.year;  
    }
    
    getYear3() {
        var val = "" + this.year;
        return val.slice(-3);  
    }
    
    getYear2() {
        var val = "" + this.year;
        return val.slice(-2);
    }
    
    getYear() {
        var val = "" + this.year;
        val[2] == "0" ? val = val.slice(-1): val = val.slice(-2);
        return val;
    }
    
    getHours24_2() {
        var val = this.hours;
        return val < 10 ? "0" + val : "" + val;
    }
    
    getHours24() {
        return "" + this.hours;
    }
    
    getHours12_2() {
        var val = this.hours;
        if(val > 12) { 
        val-=12;
        }        
        return val < 10 ? "0" + val : "" + val;
    }
    
    getHours12() {
        var val = this.hours;
        if(val > 12) { 
        val-=12;
        }   
        return "" + this.hours;
    }
    
    getMinutes2() {
        var val = this.minutes;
        return val < 10 ? "0" + val : "" + val;
    }
    
    getMinutes() {
        return "" + this.minutes;
    }
    
    getSeconds2() {
        var val = this.seconds;
        return val < 10 ? "0" + val : "" + val;
    }
    
    getSeconds() {
        return "" + this.seconds;
    }
    
    getMilliseconds3() {
        var val = "" + this.milliseconds;
        val = val.substr(0,3);
        if(val.length == 2) { val += "0";}
        if(val.length == 1) { val += "00";} 
        return val;
    }
    
    getMilliseconds2() {
        var val = "" + this.milliseconds;
        val = val.substr(0,2);
        if(val.length == 1) { val += "0";}
        return val;
        
    }
    
    getMilliseconds() {
        var val = "" + this.milliseconds;
        return val.substr(0,1);
    } 
   
    getTimezoneOffset3() {
        var tzOff = this.timezoneOffset,
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
        var tzOff = this.timezoneOffset,
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
        var tzOff = this.timezoneOffset,
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
    
    getTimezoneInfo3() {
        return myLanguages.getLocale(myLangId).GMT + this.getTimezoneOffset3();
    }
    
    getTimezoneInfo2() {
        return myLanguages.getLocale(myLangId).GMT + this.getTimezoneOffset2();
    }
    
    getTimezoneInfo() {
        return myLanguages.getLocale(myLangId).GMT + this.getTimezoneOffset();
    }
    
    getAPM2() {
        var val = this.hours;
        if(val > 11) { 
            return myLanguages.getLocale(myLangId).PM;
        }                
        return myLanguages.getLocale(myLangId).AM;
    }
    
    getAPM() {
        var val = this.hours;
        if(val > 11) { 
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

        if(!isDate(date)) {
            date = new Date()
        } 

        this.day = date.getDay();
        this.date = date.getDate();
        this.month = date.getMonth();
        this.year = date.getFullYear();
        this.hours = date.getHours();
        this.minutes = date.getMinutes();
        this.seconds = date.getSeconds();
        this.milliseconds = date.getMilliseconds();
        this.timezoneOffset = date.getTimezoneOffset();
    }

    constructor(date) {

        this.parseDate(date);
    }

      
};



class UTCdateParser  {
    
 
    getFullDay() {
        return myLanguages.getLocale(myLangId).days[this.day];
    }
    
    getShortDay() {    
         return myLanguages.getLocale(myLangId).shortDays[this.day]; 
    }

    getDate2() {
        var val = this.date;
        return val < 10 ? "0" + val : "" + val;
        
    }
    
    getDate() {
        return "" + this.date;
    }
    
    getFullMonth() {
        return myLanguages.getLocale(myLangId).months[this.month];
    }
    
    getShortMonth() {    
         return myLanguages.getLocale(myLangId).shortMonths[this.month]; 
    }  
    
    getMonth2() {
        var val = this.month + 1;
        return val < 10 ? "0" + val : "" + val;
       
    }
    
    getMonth() {
        return "" + this.month + 1;
    } 
     

    getFullYear() {
        return "" + this.year;  
    }
    
    getYear3() {
        var val = "" + this.year;
        return val.slice(-3);  
    }
    
    getYear2() {
        var val = "" + this.year;
        return val.slice(-2);
    }
    
    getYear() {
        var val = "" + this.year;
        val[2] == "0" ? val = val.slice(-1): val = val.slice(-2);
        return val;
    }
    
    getHours24_2() {
        var val = this.hours;
        return val < 10 ? "0" + val : "" + val;
    }
    
    getHours24() {
        return "" + this.hours;
    }
    
    getHours12_2() {
        var val = this.hours;
        if(val > 12) { 
        val-=12;
        }        
        return val < 10 ? "0" + val : "" + val;
    }
    
    getHours12() {
        var val = this.hours;
        if(val > 12) { 
        val-=12;
        }   
        return "" + this.hours;
    }
    
    getMinutes2() {
        var val = this.minutes;
        return val < 10 ? "0" + val : "" + val;
    }
    
    getMinutes() {
        return "" + this.minutes;
    }
    
    getSeconds2() {
        var val = this.seconds;
        return val < 10 ? "0" + val : "" + val;
    }
    
    getSeconds() {
        return "" + this.seconds;
    }

    getMilliseconds3() {
        var val = "" + this.milliseconds;
        val = val.substr(0,3);
        if(val.length == 2) { val += "0";}
        if(val.length == 1) { val += "00";} 
        return val;
    }
    
    getMilliseconds2() {
        var val = "" + this.milliseconds;
        val = val.substr(0,2);
        if(val.length == 1) { val += "0";}
        return val;
        
    }
    
    getMilliseconds() {
        var val = "" + this.milliseconds;
        return val.substr(0,1);
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
    
    getTimezoneInfo3() {
        return myLanguages.getLocale(myLangId).UTC;
    }
    
    getTimezoneInfo2() {
        return myLanguages.getLocale(myLangId).UTC;
    }
    
    getTimezoneInfo() {
        return myLanguages.getLocale(myLangId).UTC;
    }
    
    getAPM2() {
        var val = this.hours;
        if(val > 11) { 
            return myLanguages.getLocale(myLangId).PM;
        }                
        return myLanguages.getLocale(myLangId).AM;
    }
    
    getAPM() {
        var val = this.hours;
        if(val > 11) { 
            return myLanguages.getLocale(myLangId).PM.slice(0,1);
        }                
        return myLanguages.getLocale(myLangId).AM.slice(0,1);
    }
    
    getGMT() {
        return myLanguages.getLocale(myLangId).UTC;
    }
   
    getUTC() {
        return myLanguages.getLocale(myLangId).UTC;
    }
    
    parseDate(date) { 

        if(!isDate(date)) {
            date = new Date()
        }

        this.day = date.getUTCDay();
        this.date = date.getUTCDate();
        this.month = date.getUTCMonth();
        this.year = date.getUTCFullYear();
        this.hours = date.getUTCHours();
        this.minutes = date.getUTCMinutes();
        this.seconds = date.getUTCSeconds();
        this.milliseconds = date.getUTCMilliseconds();

    }

    constructor(date) {

        this.parseDate(date);
    }
      
};

var nDateParser = new dateParser();
var nUTCDateParser = new UTCdateParser();


function date2str(date, format,toUTC = false) {
  
  
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
    if(!isString(format)) {
        console.log("Други параметар мора бити тип: String")
        return "";
    }
    

   return date2str(date,format, isUTC);


};





function formatDate_Call() {


    var format = document.getElementById("dateFormat").value;

    var dt = readDate();

    var ret = formatDate(dt,format);
    document.getElementById("dateGMT").value = ret;




};

function formatUTCDate_Call() {


    var format = document.getElementById("dateFormat").value;

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
   

    dateValuesChanged();
      
};


function readDate() {

    var d = new Date();

   
    var num = readNumber( document.getElementById("year").value , 1000);

        d.setFullYear( num );

    num = readNumber( document.getElementById("month").value, 2) - 1;

        d.setMonth( num );

    num = readNumber( document.getElementById("day").value, 1);

        d.setDate( num );

    num = readNumber( document.getElementById("hours").value, 0);

        d.setHours( num );

    num = readNumber( document.getElementById("minutes").value, 0);

        d.setMinutes( num );

    num = readNumber( document.getElementById("seconds").value, 0);
 
        d.setSeconds( num );

    num = readNumber(document.getElementById("milliseconds").value, 0);

        d.setMilliseconds(num);

    return d;
};


function yearChanged() {

    var str =  document.getElementById("year").value;

    if(str.length == 0) {
        str="1000";

    } else if(str.length > 4) {
        str = str.substr(0,4);

    } 

    var num = readNumber( str , 1000);

    if(num < 1000) {
        num = 1000; 
    }  else if(num > 9999) {
        num = 9999;
    }

    dateValues.year = num;
    dateValues.isLeap = isLeapYear(num);
    
    if(dateValues.month == 1) {
        dayChanged();
    }

    
    document.getElementById("year").value = num;

};

function monthChanged() {

    var str =  document.getElementById("month").value;

    if(str.length == 0) {
        str="1";

    } else if(str.length > 2) {
        str = str.substr(0,2);

    } 

    var num = readNumber( str , 1);

    if(num < 1) {
        num = 1; 
    } else if(num > 12) {
        num = 12;
    }

    dateValues.month = num - 1;
    
     if(dateValues.month == 1) {
            dayChanged();
        }

    document.getElementById("month").value = num;

};

function dayChanged() {

    var str =  document.getElementById("day").value;

    if(str.length == 0) {
        str="1";

    } else if(str.length > 2) {
        str = str.substr(0,2);

    }

    var num = readNumber( str , 1);

    var max = daysInMonthFast(dateValues.month, dateValues.isLeap);;

    if(num < 1) {
        num = 1; 
    } else if(num > max) {
        num = max;
    }
    
    dateValues.day = num;
    document.getElementById("day").value = num;

};

function hoursChanged() {

    var str =  document.getElementById("hours").value;

    if(str.length == 0) {
        str="0";

    } else if(str.length > 2) {
        str = str.substr(0,2);

    } 

    var num = readNumber( str , 0);

    if(num < 0) {
        num = 0; 
    } else if(num > 23) {
        num = 23;
    }
    
    dateValues.hours = num;
    document.getElementById("hours").value = num;

};

function minutesChanged() {

    var str =  document.getElementById("minutes").value;

    if(str.length == 0) {
        str="0";

    } else if(str.length > 2) {
        str = str.substr(0,2);

    }

    var num = readNumber( str , 0);

    if(num < 0) {
        num = 0; 
    } else if(num > 60) {
        num = 60;
    }

    dateValues.minutes = num;
    document.getElementById("minutes").value = num;
 
};

function secondsChanged() {

    var str =  document.getElementById("seconds").value;

    if(str.length == 0) {
        str="0";

    } else if(str.length > 2) {
        str = str.substr(0,2);

    } 

    var num = readNumber( str , 0);

    if(num < 0) {
        num = 0; 
    } else if(num > 60) {
        num = 60;
    }

    dateValues.seconds = num;
    document.getElementById("seconds").value = num;

};

function millisecondsChanged() {

    var str =  document.getElementById("milliseconds").value;

    if(str.length == 0) {
        str="0";

    } else if(str.length > 3) {
        str = str.substr(0,3);

    }

    var num = readNumber( str , 0);

    if(num < 0) {
        num = 0; 
    }

    dateValues.milliseconds = num;
    document.getElementById("milliseconds").value = num;

};

function dateValuesChanged() {
    
    yearChanged();
    monthChanged();
    dayChanged();
    hoursChanged();
    minutesChanged();
    secondsChanged();
    millisecondsChanged(); 
    
}

function loadMe() {

 
    document.getElementById("lang").selectedIndex=0;

    writeDate();

    formatDate_Call();
    formatUTCDate_Call();

};