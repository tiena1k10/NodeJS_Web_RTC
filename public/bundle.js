
function openStream(audio){
    if(audio===true)
    return navigator.mediaDevices.getUserMedia({audio:true,video:true})
    return navigator.mediaDevices.getUserMedia({audio:false,video:true})
  }

  function playVideo(stream, idVideo){
    var video = document.getElementById(`${idVideo}`);
    video.srcObject = stream;
    video.onloadedmetadata = function(e) {
      video.play();
    };
  }
  

  var peer = new Peer();
  
  const socket = io("http://localhost:3000/");
  const email = document.getElementById("email_header").textContent
  const fullname = document.getElementById("fullname_header").textContent
  
  peer.on("open", peerId => {
    console.log(peerId);
    socket.emit("nguoi_dung_join_room", {fullname,email,peerId});
    
  })


    socket.on("Sever_cap_nhap_list_online", allUser =>{
      $(".list_online_ul").empty();
      //document.querySelector(".list_online_ul").innerHTML = "";
      allUser.forEach(user => {
      
        $(".list_online_ul").append(`<li class="li_tagname">${user.fullname} ${user.email} <button onclick=call_peer(this.id) id="${user.peerId}" class="btn">call</button></li>`);
    });

});
  
  function call_peer(id){
    console.log(id);
    openStream(false).then(stream=>{
          playVideo(stream,"local_Video");
        })
    openStream(true).then(stream=>{
      const call = peer.call(id,stream);
      call.on("stream",remotStream=>{
          playVideo(remotStream,"friend_Video");
      })
    })
  }
  



// // PEEEEEEEEEEEER

peer.on("call", call=>{
  console.log("co cuoc goi den");
  openStream(false).then(stream=>{
      playVideo(stream,"local_Video");
      
  })
  openStream(true).then(stream=>{
    call.answer(stream);
    call.on("stream",remotStream=>{
        playVideo(remotStream,"friend_Video");
    })
  })
})




  