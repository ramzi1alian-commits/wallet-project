(function(global){"use strict";
const ones=["","واحد","اثنان","ثلاثة","أربعة","خمسة","ستة","سبعة","ثمانية","تسعة"],teens=["عشرة","أحد عشر","اثنا عشر","ثلاثة عشر","أربعة عشر","خمسة عشر","ستة عشر","سبعة عشر","ثمانية عشر","تسعة عشر"],tens=["","","عشرون","ثلاثون","أربعون","خمسون","ستون","سبعون","ثمانون","تسعون"];
function under100(n){if(n<10)return ones[n];if(n<20)return teens[n-10];return n%10?ones[n%10]+" و"+tens[Math.floor(n/10)]:tens[n/10]}
function under1000(n){if(n<100)return under100(n);const h=["","مائة","مائتان","ثلاثمائة","أربعمائة","خمسمائة","ستمائة","سبعمائة","ثمانمائة","تسعمائة"][Math.floor(n/100)];return n%100?h+" و"+under100(n%100):h}
function words(n){n=Math.floor(Number(n));if(!n)return"صفر";if(n<1000)return under1000(n);const th=Math.floor(n/1000),rest=n%1000;let s=th===1?"ألف":th===2?"ألفان":under1000(th)+" آلاف";if(rest)s+=" و"+under1000(rest);return s}
global.Tafqeet={toWords:function(value,currency){const n=Number(value)||0;const unit=currency==="USD"?"دولار أمريكي":currency==="SAR"?"ريال سعودي":"ريال يمني";return words(n)+" "+unit}};
})(window);