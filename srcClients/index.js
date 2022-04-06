

function openStream(){
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

const socket = io.connect("http://localhost:3000/");


peer.on("open", peerId => {
  document.getElementById("my_peer_id").textContent = peerId
  const fullname = document.getElementById("fullname_header").textContent
  const email = document.getElementById("email_header").textContent

socket.emit("nguoi_dung_join_room", {fullname,email,peerId});
})

document.getElementById("btn_call").addEventListener("click",e=>{
    
    const id = document.getElementById("input_peer_id").value;
    openStream().then(stream=>{
      playVideo(stream,"local_Video");
      const call = peer.call(id,stream);
      call.on("stream",remotStream=>{
        playVideo(remotStream,"friend_Video");
      })
  })
})

peer.on("call", call=>{
  openStream().then(stream=>{
    playVideo(stream,"local_Video");
    call.answer(stream);
    call.on("stream",remotStream=>{
      playVideo(remotStream,"friend_Video");
    })
  })
})

socket.on("server_gui_danh_sach_online", allUser =>{
  console.log(allUser);
});