function openStream(){
    return navigator.mediaDevices.getUserMedia({audio:false,video:true})
}
module.exports = openStream;