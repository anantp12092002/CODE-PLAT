//const { text } = require("body-parser");

var star1=document.querySelectorAll("#first");
var star2=document.querySelectorAll("#second");
var star3=document.querySelectorAll("#third");
var star4=document.querySelectorAll("#fourth");
var rate1=0,rate2=0,rate3=0,rate4=0;
function changeClass(p,star){
    
  for(let ie=0;ie<=p;ie++)
  {
     star[ie].className="fa fa-star checked";
  }
  for(let ie=p+1;ie<=4;ie++)
  {
    star[ie].className="fa fa-star";
  }
}
star1[0].addEventListener('click',function(){
  changeClass(0,star1);
  rate1=1;
})

star1[1].addEventListener('click',function(){
  changeClass(1,star1);
  rate1=2;
});
star1[2].addEventListener('click',function(){
  changeClass(2,star1);
  rate1=3;
});
star1[3].addEventListener('click',function(){
  changeClass(3,star1);
  rate1=4;
})
star1[4].addEventListener('click',function(){
  changeClass(4,star1);
  rate1=5;
})

star2[0].addEventListener('click',function(){
  changeClass(0,star2);
    rate2=1;
})

star2[1].addEventListener('click',function(){
  changeClass(1,star2);
  rate2=2;
});
star2[2].addEventListener('click',function(){
  changeClass(2,star2);
  rate2=3;
});
star2[3].addEventListener('click',function(){
  changeClass(3,star2);
  rate2=4;
})
star2[4].addEventListener('click',function(){
  changeClass(4,star2);
  rate2=5;
})

star3[0].addEventListener('click',function(){
  changeClass(0,star3);
  rate3=1;
})

star3[1].addEventListener('click',function(){
  changeClass(1,star3);
  rate3=2;
});
star3[2].addEventListener('click',function(){
  changeClass(2,star3);
  rate3=3;
});
star3[3].addEventListener('click',function(){
  changeClass(3,star3);
  rate3=4;
})
star3[4].addEventListener('click',function(){
  changeClass(4,star3);
  rate3=5;
})

star4[0].addEventListener('click',function(){
    changeClass(0,star4);
    rate4=1;
  })
  
  star4[1].addEventListener('click',function(){
    changeClass(1,star4);
    rate4=2;
  });
  star4[2].addEventListener('click',function(){
    changeClass(2,star4);
    rate4=3;
  });
  star4[3].addEventListener('click',function(){
    changeClass(3,star4);
    rate4=4;
  })
  star4[4].addEventListener('click',function(){
    changeClass(4,star4);
    rate4=5;
  })




console.log(star1.length);
/*******************************************************score section*****************************************************/


console.log(USER);
if(USER=="Candidate")
{
 document.getElementById("score-pannel").style.display="none";
}
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    this.classList.toggle("active");

    /* Toggle between hiding and showing the active panel */
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
  
 
}

function generatePdf()
{
var detail_solving=document.getElementById('detail_solving').value;
var detail_quality=document.getElementById('detail_quality').value;
var detail_proficiency=document.getElementById('detail_proficiency').value;
var detail_commnunication=document.getElementById('detail_commnunication').value;
console.log(detail_solving);
var rate_text="";

var doc=new jsPDF();
doc.setFontSize(14);
var text0='PERFORMANCE REPORT';
doc.text(text0,60,10);

var text1='PROBLEM SOLVING:- '+detail_solving;
doc.text(text1,20,30);
rate_text=rate2+' out of 5';
doc.text(rate_text,150,35);
var text2='CODE QUALITY:- '+detail_quality;
doc.text(text2,20,50);
rate_text=rate1+' out of 5';
doc.text(rate_text,150,55);
var text3='LANGUAGE PROFIENCIENCY:- '+detail_proficiency;

//console.log(doc);
doc.text(text3,20,70);
rate_text=rate3+' out of 5';
doc.text(rate_text,150,75);
var text4='TECHNICAL COMMUNICATION:- '+detail_commnunication;
doc.text(text4,20,90);
rate_text=rate4+' out of 5';
doc.text(rate_text,150,95);
doc.save("output.pdf");
}

/****************************************************************score section end ************************************/

