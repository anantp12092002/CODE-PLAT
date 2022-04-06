$( "#createbutton" ).click(function() {
    
    const Url ='/createroom';
    const pwd = $("#createpwd").val();
    const data={
        roomid: ROOM_ID,
        password: pwd
    }
   
   
    $.ajax({
        url:Url,
        type:"POST",
        data:data,
        success: function(result){
            alert(result);
            location.reload();
        },
        error: function(error){
            console.log(error)
        }
    });
  });


  $( "#joininterviewerbutton" ).click(function() {
    
    const Url ='/joininterviewer';
    const pwd = $("#joinpwd").val();
    const roomid = $("#inputroomidi").val();
    const name =$("#interviewername").val();
    const data={
        roomid: roomid,
        password: pwd
    }
    
    
    
    $.ajax({
        url:Url,
        type:"POST",
        data:data,
        success: function(result){
            
            if(result.localeCompare("ok")==0)
            //window.location.replace("/"+roomid+"/interviewer");
            
            window.location.replace("/"+roomid+"/interviewer/"+pwd+"/"+name);
            else{alert(result);
            location.reload();
            }

        },
        error: function(error){
            console.log(error)
        }
    });
  });


  $( "#joincandidatebutton" ).click(function() {
    
    const Url ='/joincandidate';
    
    const roomid = $("#inputroomidc").val();
    const name =$("#candidatename").val();
    const data={
        roomid: roomid,
    }
    
    
    
    $.ajax({
        url:Url,
        type:"POST",
        data:data,
        success: function(result){
            
            if(result.localeCompare("ok")==0)
            window.location.replace("/"+roomid+"/candidate/"+name);
            
            else{ alert(result);
             location.reload();
            }
        },
        error: function(error){
            console.log(error)
        }
    });
  });