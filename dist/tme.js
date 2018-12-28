
let mtn = ['0703', '0706' , '0803', '0806' , '0810', '0813', '0814', '0816' , '0903' ]
let glo = ['0705', '0805', '0807', '0811', '0815', '0905' ];
let airtel = [ '0701', '0708', '0802', '0808', '0812', '0902' ];
let etisalat = [ '0809', '0817', '0818', '0909' ];
let starcome = ['07028', '07029', '0819' ];
let visaphone = ['07025', '07026', '0704' ];
let networks = [mtn, glo, airtel, etisalat, starcome,visaphone];

function check(input,prefix) {
  let matchFound = false
  let index = null;
  for(let x=0; x <= prefix.length -1; x++){
    console.log(prefix[x])
    if(input.length >= 4 && /^\d+$/.test(input)){
      if(input.length === 4){
        console.log(prefix[x])
        prefix[x].forEach((fix) => {
          if (input === fix) {
            matchFound = true;
            index = x;
            console.log(x)
          }
        } )
      }
    
      else if(input.length > 4){
            let digit = input.slice(0,4);
            let digit2 = input.slice(0,5);
             prefix[x].forEach((fix) => {
            if (digit === fix) {
              matchFound = true;
              index = x
              console.log(x)
            }
            else if (digit2 === fix && fix.length === 5){
              matchFound = true;
              index = x;
              console.log(x)
            }
          } )
        }
    
      else{
          matchFound = false;
        }
    }
  }
  
 switch(index){
   case 0: return 'MTN';
   case 1: return 'GLO';
   case 2: return 'AIRTEL';
   case 3: return 'ETISALAT';
   case 4: return 'STARCOME';
   case 5: return  'VISAPHONE';
   default: return  null;
 }

}


var num = '00000';
let result = check(num,networks);
console.log(result);
