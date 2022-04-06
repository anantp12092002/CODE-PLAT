const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const {v4:uuidV4} = require('uuid')
const bodyParser = require("body-parser")
var fs=require('fs')
var request = require('request');
const { captureRejectionSymbol } = require('events')
const { join } = require('path')

var currentLanguage='cpp14';



var program = {

        clientId:"126b0727644f6a29367df1ac3f03588d",
        clientSecret:"b7050cdede2a8e18aa25723dbc57865a14126a1ec601fb831fc41aae8eb81408",
        script: "<?php echo \"hello\"; ?>",
        language: "cpp14",
        versionIndex:"0" ,
        stdin:""

};

// request({
//     url: 'https://api.jdoodle.com/v1/execute',
//     method: "POST",
//     json: program

// },
// function (error, response, body) {

//     console.log('error:', error);
//     console.log('statusCode:', response && response.statusCode);
//     console.log('body:', body);
// });

app.set('view engine','ejs');
//app.use("/public", express.static('public'));

app.use(express.static(__dirname+"/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.get('/',(req,res)=>{
//     res.redirect(`/${uuidV4()}`)
// })

// app.get('/:room',(req,res)=>{
//     res.render('front',{roomId:req.params.room})
// })

var chats=[];
var roomInfo=new Map();

// join ka pratical///////////
app.get('/',(req,res)=>{
    res.render('join',{roomId:uuidV4(),user : "NONE",name:""});
})
//////////////////////////////


let pwdMap = new Map();

app.post('/createroom',(req,res)=>{
    if(req.body.password==="")
    {
        res.end("Enter the password properly")
    }

   pwdMap.set(req.body.roomid,req.body.password);
  //console.log("YYY");
   res.end("room created successfully!!");
})

app.post('/joininterviewer',(req,res)=>{

  //  console.log(pwdMap.get(req.body.roomid));
    if(!pwdMap.has(req.body.roomid))
    res.end("no such room!!");

   else if(pwdMap.get(req.body.roomid).localeCompare(req.body.password)!=0)
    res.end("incorrect password!!");

    else res.end("ok");

 })

 app.post('/joincandidate',(req,res)=>{

   // console.log(pwdMap.get(req.body.roomid));
    if(!pwdMap.has(req.body.roomid))
    res.end("no such room!!");

    else res.end("ok");

 })



// app.get('/',(req,res)=>{
//     res.redirect(`/${uuidV4()}/interviewer`)
// })

app.get('/:room',(req,res)=>{
    res.redirect(`/${req.params.room}/candidate`);
})


app.get('/:room/interviewer/:pwd/:name',(req,res)=>{
    var ques='You can add a question here';
    if(pwdMap.get(req.params.room).localeCompare(req.params.pwd)!=0)
    res.redirect('/');
    console.log(roomInfo.get(req.params.room));
    var questions=['Add a question here'];
    if(roomInfo.has(req.params.room))
     questions=roomInfo.get(req.params.room).questions;
    res.render('front',{roomId:req.params.room, user:'Interviewer',quesDes:questions,name:req.params.name});

})


app.get('/:room/candidate/:name',(req,res)=>{
    var questions=['Add a question here'];
   if(roomInfo.has(req.params.room))
   questions=roomInfo.get(req.params.room).questions;
    res.render('front',{roomId:req.params.room,user:'Candidate',quesDes:questions,name:req.params.name})
});



io.on('connection',socket=>{


    //console.log('hello');
    socket.on('join-room',(roomId,userId,name)=>{
            console.log('name '+name);
            socket.to(roomId).emit('name',name);
            socket.on('screenId',(id)=>{
                socket.to(roomId).emit('screenId',id);
            })
            socket.on('otherScreenId',(id)=>{
                socket.to(roomId).emit('otherScreenId',id);
            })

            socket.on('othersname',(name)=>{
                socket.to(roomId).emit('othersname',name);
            })
            console.log("room:"+roomId +"socket id: "+socket.id)
            socket.join(roomId);
            socket.to(roomId).emit('user-connected',userId);
            io.to(socket.id).emit('previous_chats', chats);
            if(io.sockets.adapter.rooms.get(roomId).size==1);
            roomInfo.set(roomId,{counter:1,questions:['Add a Question here']});
            socket.on('disconnect',()=>{
                socket.to(roomId).broadcast.emit('user-disconnected',userId)
            })


            //console.log(user);

            socket.on('othersVideoStatus',(status)=>{
                socket.to(roomId).emit('othersVideoStatus',status);
            })
            socket.on('others_audio_status',(status)=>{
                socket.to(roomId).emit('others_audio_status',status);

            })
            socket.on('codeboard-message', function(data){
                // console.log(data);
                chats.push(data);
                socket.broadcast.to(roomId).emit('message-from-others', data);
                //console.log(chats);
            })
            socket.on('stream',function(data){
                socket.broadcast.to(roomId).emit('others-stream',data);
            })

            socket.on('category',(selText,tabId)=>{
                console.log('hello');
                var num=Math.floor((Math.random() * 2) + 1);
                var ques=''+fs.readFileSync('./problems_db/'+selText+'/p'+num);
                var tabnum=tabId[7]-'0';
                var counter=roomInfo.get(roomId).counter;
                var questions=roomInfo.get(roomId).questions;
                if(tabnum<=counter)
                {
                    questions[tabnum-1]=ques;
                }
                else
                {
                    counter++;
                    questions.push(ques);
                }
                roomInfo.set(roomId,{counter:counter,questions:questions});
                //console.log(tabnum)
                //console.log(counter);
                //console.log(questions);
             //   socket.to(roomId).emit('changeQues',ques,tabId);
                io.to(roomId).emit('changeQues',ques,tabId);
            })
             socket.on('change_i',(i)=>{
                 socket.to(roomId).emit('change_i',i);
             })

            socket.on('editor-change',(code)=>{

               // console.log(code)
                 socket.to(roomId).emit('editor-change',code)
            })
            socket.on('inputChange',(input)=>{
               // console.log(input);
                socket.to(roomId).emit('inputChange',input)

            })
            socket.on('add_ques_tab',function(){
                console.log('here')
              //  socket.to(roomId).emit('add_ques_tab_event');
                io.to(roomId).emit('add_ques_tab_event');
            })
            socket.on('selectIndex',(language)=>{
                 socket.to(roomId).emit('selectIndex',language)
            })
            socket.on('currentLanguage',(language)=>{
                currentLanguage=language;
            })
            // socket.on('codeSubmit',(msg)=>{
            //     socket.to(roomId).emit('codeSubmit',msg)
            // })
            socket.on('submitCode',(input_code)=>{
              //  console.log(input_code);
              console.log(input_code.code);
                program.script=input_code.code;
                program.language=currentLanguage;
                program.stdin=input_code.input;
                  request({
               url: 'https://api.jdoodle.com/v1/execute',
            method: "POST",
                json: program

},
function (error, response, body) {

    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);
    console.log('body:', body);
    socket.emit('codeResult',body);
   // result.textContent=body;
   io.to(roomId).emit('codeResult',body);
});






            })
    })
})


let port=process.env.PORT;
if(port==null||port=="")
{
  port=8000;
}

prompt()

server.listen(port);




// Client ID
// 126b0727644f6a29367df1ac3f03588d
// Client Secret
// b7050cdede2a8e18aa25723dbc57865a14126a1ec601fb831fc41aae8eb81408
