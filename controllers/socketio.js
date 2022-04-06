const allUser = [];
module.exports = function socketioControl(io){
    io.on('connection', socket => {
        console.log("have a connect ",socket.id);
        socket.on("nguoi_dung_join_room",user=>{
            socket.email = user.email;
            allUser.push(user);
            socket.emit("Sever_cap_nhap_list_online",allUser)
            socket.broadcast.emit("Sever_cap_nhap_list_online",allUser)
        })
        socket.on("disconnect",()=>{
            const index = allUser.findIndex(user=>user.email===socket.email);
            allUser.splice(index,1);
            socket.broadcast.emit("Sever_cap_nhap_list_online",allUser)
        })
      });
    
}