const socket = io('/')
console.log(ROOM_ID);
console.log(document.getElementById('user').innerText);
console.log(editor.getValue())
console.log(USER);

var language;
document.getElementById('editor').style.fontSize='20px';

//document.getElementById('language').selectedIndex=4;
var submit=document.getElementById('submit_button');
var result=document.getElementById('resultBox');
var details=document.getElementById('detailBox');
var inputs=document.getElementById('inputBox');
//var categories_ques=document.getElementById('categories_ques');

var i=0;

const boilerplate={
    cpp14:"#include<bits/stdc++.h>\nusing namespace std;\nint main()\n{\n    cout<<\"hello \\n\";\n}",
    cpp17:"#include<bits/stdc++.h>\nusing namespace std;\nint main()\n{\n    cout<<\"hello \\n\";\n}",
    c:"#include <stdio.h>\n\nint main()\n{\n    printf(\"Hello World\");\n\n    return 0;\n}\n",
    java:'public class MyClass {\n' +
    '    public static void main(String args[]) {\n' +
    '      int x=10;\n' +
    '      int y=25;\n' +
    '      int z=x+y;\n' +
    '\n' +
    '      System.out.println("Sum of x+y = " + z);\n' +
    '    }\n' +
    '}',
    python:'x=10;\ny=25;\nz=x+y;\n\nprint ("sum of x+y =", z);'
}
editor.setValue(boilerplate.cpp14);

document.getElementById('language').click(function(event){
     console.log(document.getElementById('language'));
       
});

//for showing question categories to interviewer only.


function setLanguage(language)
{

    if(language==='C++14')
    {
    
        editor.setValue(boilerplate.cpp14);
        editor.session.setMode("ace/mode/c_cpp");
        socket.emit('currentLanguage','cpp14');
    }
    else if(language==='C++17')
    {
     editor.setValue(boilerplate.cpp17);
     editor.session.setMode("ace/mode/c_cpp");
     socket.emit('currentLanguage','cpp17');
        
    }
    else if(language==='C')
    {
        editor.setValue(boilerplate.c);
        editor.session.setMode("ace/mode/objectivec");
        socket.emit('currentLanguage','c');
    
     }
    else if(language==='Java')
    {
        editor.setValue(boilerplate.java);
        editor.session.setMode("ace/mode/java");
        socket.emit('currentLanguage','java');
    
    }
    else
    {
     editor.setValue(boilerplate.python);
     editor.session.setMode("ace/mode/python");
     socket.emit('currentLanguage','python3');
    
    }
 

}

//for setting default
setLanguage('C');
setLanguage('C++14');

function input_button()
{
  document.getElementById('editor').style.height='1160%';
    var x=document.getElementById('input_output');
    x.style.top='900%';
    setTimeout(function() {
        var y=document.getElementById('inputBox');
        y.style.visibility='visible';
         document.getElementById('close_button').style.visibility='visible';

        
      }, 500);
    
    

}
function output_button()
{
    var x=document.getElementById('input_output');
    x.style.top='900%';
    setTimeout(function() {
        var y=document.getElementById('resultBox');
        y.style.visibility='visible';
        document.getElementById('close_button').style.visibility='visible';
        
      }, 500);
    
    

}
function details_button()
{
    var x=document.getElementById('input_output');
    x.style.top='900%';
    setTimeout(function() {
        var y=document.getElementById('detailBox');
        y.style.visibility='visible';
        document.getElementById('close_button').style.visibility='visible';
        
      }, 500);
    
    

}

function navClick()
{
  setTimeout(function() {
    document.getElementById('input_output').style.top='1200%';
    document.getElementById('close_button').style.visibility='hidden';
    document.getElementById('detailBox').style.visibility='hidden';
     document.getElementById('input_button').classList.remove('active');
     document.getElementById('output_button').classList.remove('active');
     document.getElementById('details_button').classList.remove('active');
     document.getElementById('inputBox').style.visibility='hidden';
    document.getElementById('resultBox').style.visibility='hidden';
    

    
  }, 500);

  

}

function languageChange(){
    language=document.getElementById('language').value;
    socket.emit('selectIndex',language);
   setLanguage(language);  
   console.log(language);
   
}
function inputChange(){
    console.log('change ho rha');
    var input=document.getElementById('inputBox').value;
   // console.log(input);
    socket.emit('inputChange',input);
    
}

function closeMeeting()
{
  console.log('close');
  socket.emit('disconnect');
  window.location.href = "http://localhost:8000";
  

}

submit.addEventListener('click',function()
{
    console.log("button was clicked");
    var code=editor.getValue();
    //console.log(code);
  var text=JSON.stringify(code);
  //console.log(text);
  text=document.getElementById('inputBox').value;
 //text=JSON.stringify(text);
 //socket.emit('codeSubmit','submit'); 
 socket.emit('submitCode',{"input":text,"code":code});
  


});

document.addEventListener("keypress", (e)=> {
    setTimeout(function() {
        transmitCode()
        inputChange()
      }, 500);
});

document.addEventListener('keyup', function(event) { 
    setTimeout(function() {
        transmitCode()
        inputChange()
      }, 500);
}) 


// socket.emit('join-room',ROOM_ID)


    
// socket.on('user-connected',msg=>{
//         transmitCode();
//         console.log("koi connect hua hai");
//     })

socket.on('editor-change', code=>{
    editor.setValue(code.text);
    document.getSelection().removeAllRanges();
})
// socket.on('codeSubmit',msg=>{
//     var code=editor.getValue();
//     var text=document.getElementById('input').value;

//     socket.emit('submitCode',{"input":text,"code":code});
// })
socket.on('inputChange',input=>{
  //  console.log('socket me aaya');
        document.getElementById('inputBox').value=input;
})

socket.on('selectIndex',language=>{
    var sel=document.getElementById('language');
    var opts = sel.options;
  for (var opt, j = 0; opt = opts[j]; j++) {
    if (opt.value == language) {
      sel.selectedIndex = j;
      setLanguage(language);
      break;
    }
  }
    
});
$(".dropdown-menu li a").on('click',function(){
  var tabId=$(this).parents('div.tab-pane').attr('id');
  console.log('i m here'+tabId);
  var selText = $(this).text();///User selected value...****
  swal("Want To Change Question", {
    buttons: {
      cancel: "No",
      Yes: true,
    },
  })
  .then((value) => {
    switch (value) {
   
      case "Yes":
        tabId='quesSec'+tabId[8];
        socket.emit('category',selText,tabId);
  document.getElementById(tabId).innerHTML="";
        break;
      default:
        break;
    }
  });
  
});

socket.on('codeResult',response=>{
 var content=response;
 var output=response.output;
 var statusCode=response.statusCode;
 var memory=response.memory;
 var cpuTime=response.cpuTime;

    result.textContent=output;
    details.textContent="Status Code :"+statusCode+"\r\n"+"Memory :"+memory+'\r\n'+"CpuTime :"+cpuTime; 
     
    
 console.log(response);

})
socket.on('changeQues',(ques,tabId)=>{
  console.log(ques);
  document.getElementById(tabId).innerText=ques;
  $("pre").each(function(){
    $(this).html($(this).html().replace(/input/g,"<span class='green'>INPUT</span>"));
    $(this).html($(this).html().replace(/output/g,"<span class='red'>OUTPUT</span>"));
});
})

$(document).ready(function() {
    // var tabs = $("#container-1").tabs();
    // var tabCounter = 1;
    $("#questabs").on('click','.dropdown-menu li a',function(){
      var tabId=$(this).parents('div.tab-pane').attr('id');
      console.log('i m here'+tabId);
      var selText = $(this).text();///User selected value...****
      swal("Want To Change Question", {
        buttons: {
          cancel: "No",
          Yes: true,
        },
      })
      .then((value) => {
        switch (value) {
       
          case "Yes":
            tabId='quesSec'+tabId[8];
            socket.emit('category',selText,tabId);
      document.getElementById(tabId).innerHTML="";
            break;
          default:
            break;
        }
      });
      
    });
    $("pre").each(function(){
      $(this).html($(this).html().replace(/input/g,"<span class='green'>INPUT</span>"));
      $(this).html($(this).html().replace(/output/g,"<span class='red'>OUTPUT</span>"));
  });
    $('#add_tab').click( function(){
       socket.emit('add_ques_tab');
    });
}); 

socket.on('add_ques_tab_event',function(){
  var current_idx = $("#ex1 li").length + 1;
        console.log(current_idx);
        $("#ex1").append("<li>"+
        "<a "+
          "id='ex1-tab-"+current_idx+"'"+
          "data-toggle='tab'"+
          "href='#question"+current_idx+"'"+
          ""+
          "><span style='color: white;'>Question-"+current_idx+"</span></a"+
        ">"+
      "</li>");
      var str='';
      if(user==="Interviewer")
      str='<div style="width: 100%;" class="text-left">'+
      '<div class="btn-group" >'+
      '<button type="button" class="btn btn-primary dropdown-toggle" style="margin-left: 8px;" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'+
      'Categories <span class="caret"></span>'+
      '</button>'+
      '<ul class="dropdown-menu">'+
                 '<li><a href="#">Implementation</a></li>'+
                 '<li><a href="#">Dynamic Programming</a></li>'+
                 '<li><a href="#">Graphs</a></li>'+
               '</ul>'+
             '</div>'+
             '</div>'
      $("#questabs").append('<div  class="tab-pane fade"  id="question'+current_idx+'" >'+
      '<div class="row" style="display: flex; padding: 12px; background-color: #282829">'+
           str+
       '</div>'+
       '<div>'+
           '<p>'+
               '<pre id="quesSec'+current_idx+'">'+
               'You can add a question here'+
               '</pre>'+     
           '</p>'+
       '</div>'+
'</div>')
})
function transmitCode(){
    console.log("called")
    socket.emit('editor-change',{text : editor.getValue()})
}



/*****************************************Note Section****************/

if(USER=="Interviewer")
{
  document.getElementById("note-pannel").style.display="none";
}
function generateNote()
{
var notes=document.getElementById("note-area").value;
var doc2=new jsPDF();
doc2.setFontSize(14);
doc2.text(notes,20,20);
doc2.save("notes.pdf");
}



/*************************Note section end********* */
//chat section 

var message = document.getElementById('typing-box'),
user=document.getElementById('user').innerText,
btn = document.getElementById('send')
;



socket.on('message-from-others', function(data){
  
  var html = '<div class="message-box others-message-box">' +
        '<div class="message others-message"> <strong>'+data.user+':</strong> ' + data.message + ' </div>' +
        '<div class="separator"></div>' +
      '</div>';
  
      
  document.getElementById("message-area").innerHTML += html;
})

socket.on('previous_chats',data=>{
  var html;
  for(var i=0;i<data.length;i++)
   { html = '<div class="message-box others-message-box">' +
        '<div class="message others-message"> <strong>'+data[i].user+':</strong> ' + data[i].message + ' </div>' +
        '<div class="separator"></div>' +
      '</div>';
      document.getElementById("message-area").innerHTML += html;

    }
      
  

})




function sendMessage() {
  var message = document.getElementById("typing-box").value;
  if(message!="")
  {
  var html = '<div class="message-box my-message-box">' +
          '<div class="message my-message"> <strong>'+user+':</strong> ' + message + ' </div>' +
          '<div class="separator"></div>' +
        '</div>';
        
  document.getElementById("message-area").innerHTML += html;
  document.getElementById("typing-box").value = "";
  
  socket.emit('codeboard-message', {
    message: message,
    user: user
   }
    );
  }
}
message.addEventListener("keyup",function(event){
  if(event.keyCode===13)
  {
    event.preventDefault();
    btn.click();
  }
});

  


//......................................................Video call section....................
const videoGrid1= document.getElementById('video-grid1')
const videoGrid2= document.getElementById('video-grid2')
var myId;





const peers={}
// const myPeer= new Peer(undefined,{
//     host: '/',
//     port: '3001'
// })

var myPeer=new Peer();
var myid;


 const myVideo=document.createElement('video')
 var my_video_visible=true;
 var my_audio=true;

 function camera()
  {
   if(my_video_visible==true)
    {
      myVideo.style.display="none";
      document.getElementById('video_handler').src="/camera_off.png";  
      document.getElementById('default_image').style.visibility="visible";
   }
   else
   {
    myVideo.style.display="block";
    document.getElementById('video_handler').src="/camera_on.png";
    document.getElementById('default_image').style.visibility="hidden";
   }
    my_video_visible=!my_video_visible;
  
    socket.emit('othersVideoStatus',my_video_visible);

 }
 
 socket.on('othersVideoStatus',(status)=>{
   if(status==true)
   {
     console.log(videoGrid2);
     document.getElementById('othersVideo').video="true";
     document.getElementById('default_image_other').style.visibility="hidden";
   }
   else
   {
     console.log(videoGrid2);
     document.getElementById('othersVideo').video="false";
     document.getElementById('default_image_other').style.visibility="visible";
   }
 })

 function audio()
 {
   if(my_audio==true)
   {
    document.getElementById('audio_handler').src="/audio_off.png";  
   }
   else
   {
    document.getElementById('audio_handler').src="/audio_on.png";  
   }
    my_audio=!my_audio;
    socket.emit('others_audio_status',my_audio);
 }

  socket.on('others_audio_status',(status)=>{
    //console.log("aa rha hai");
    if(status)
    {
      document.getElementById('othersVideo').muted=false;
    
    }
    else
    {
      document.getElementById('othersVideo').muted=true;
    
    }
  })

 
  myVideo.muted=true
navigator.mediaDevices.getUserMedia({
         video:true,
     audio:true
   }).then(stream=>{
    myVideo.setAttribute('id','myVideo');  //my video in my tab
    //document.getElementById('myVideo').style.position='absolute';
     addVideoStream(myVideo,stream,1)

  myPeer.on('call',call=>{
      call.answer(stream)
     const video=document.createElement('video')
     console.log(i);
     var z='othersVideo'+i;
     console.log(z);
     video.id='othersVideo'; //my video in others tab
    //  document.getElementById(z).style.position="absolute";
    //  document.getElementById(z).style.left=i*20+"%";
      
     call.on('stream',userVideoStream=>{
         addVideoStream(video,userVideoStream,2)
     })



  })

  socket.on('user-connected',userId=>{
    
     connectToNewUser(userId,stream)
     transmitCode();
     socket.emit('peerId',myId);
    console.log('User-connected:'+userId)
})

})

socket.on('peerId',(id)=>{
  
  
   

})
socket.on('user-disconnected',userId =>{
    if(peers[userId])peers[userId].close()
    document.getElementById('default_image_other').style.visibility="hidden";   
 

})


socket.on('change_i',(j)=>{
  i=j;
});

myPeer.on('open',id=>{
    myId=id;
    console.log('id'+id);
    socket.emit('join-room',ROOM_ID,id,Name);

})

//to get others name who joined
socket.on('name',(name)=>{
  console.log(name);
  othersName=name;
  document.getElementById('othersname').textContent=name;
  socket.emit('othersname',Name);

})
//meeting controls
if(user==="Interviewer")
{
  document.getElementById('meeting_controls').textContent="End Interview";
}
else
{
  document.getElementById('meeting_controls').textContent="Leave Interview";
}

socket.on('othersname',(name)=>{
  othersName=name;
  document.getElementById('othersname').textContent=name;
  console.log(name);
})

function connectToNewUser(userId,stream){
    const call = myPeer.call(userId,stream)
    const video=document.createElement('video')
 //   video.setAttribute('id','othersVideo');
 i+=1;
 
 socket.emit('change_i',i);

//  var z='othersVideo'+i;
//  console.log(z);
  video.id='othersVideo'; //others video in my tab
//  document.getElementById(z).style.position="absolute";
//  document.getElementById(z).style.left=i*20+"%";
 
     
    call.on('stream',userVideoStream=>{
        addVideoStream(video,userVideoStream,2)
    })
    call.on('close',()=>{
        video.remove()
    })
    
    peers[userId]=call
}


function addVideoStream(video,stream,c){

    video.srcObject=stream
    video.addEventListener('loadedmetadata',()=>{
        video.play()
    })
    if(c==1)
    videoGrid1.append(video)
    else
    videoGrid2.append(video);
}
/****************************************Screen share************* */

const stop=document.getElementById("stop");
const start=document.getElementById("start");
var videoElement=document.getElementById("screen-video");
var screenPeer=new Peer();
var myScreenId;
var otherScreenId;
screenPeer.on('open',(id)=>{
   myScreenId=id;
   socket.emit('screenId',(id));
    
})
var interviewerId;
socket.on('screenId',(id)=>{
 
  socket.emit('otherScreenId',myScreenId);
  
})
socket.on('otherScreenId',(id)=>{
      
   otherScreenId=id;


})


          var displayMediaOptions={
              video:{
                  cursor:'always'
              },
              audio:false
          }
          start.addEventListener("click",function(e){
            startCapture();
        })
        stop.addEventListener("click",function(e){
            stopCapture();
        },false)
    
        async function startCapture(){
            try{
             var stream=await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
                
             const call = myPeer.call(otherScreenId,stream);
           
            }catch(err){
                console.error("Error"+err);
            }
        }
        function stopCapture(e){
          let tracks=videoElement.srcObject.getTracks();
          tracks.forEach(track =>track.stop()) 
           socket.emit('stop-share',{
             src : null,
             user :user
           })
              //videoElement.srcObject=null;
             
        }
        myPeer.on('call',call=>{
          call.answer()
         const video=document.createElement('video')
         console.log(i);
         var z='othersVideo'+i;
         console.log(z);
        // video.id='othersVideo'; //my video in others tab
        //  document.getElementById(z).style.position="absolute";
        //  document.getElementById(z).style.left=i*20+"%";
          
         call.on('stream',userVideoStream=>{
             addVideoStream1(video,userVideoStream);
         })
    
    
    
      })
    
      function addVideoStream1(video,stream){

        video.srcObject=stream
        video.addEventListener('loadedmetadata',()=>{
            video.play()
        })
                videoElement.append(video)
        
    }    

        
