const http=require("http");
const app=require('./app');
const debug =require('debug');
const chkPort=val=>{
  let port =parseInt(val,10);

  if(port>=0){
    return port;
  }
  return false;
}

const onListening = ()=>{
   const addr= server.address();
   debug('listening on port ' +port);
}
//listen to provided port or else use port 3000
const port =chkPort(process.env.PORT||3000);
app.set('port',port);

const server = http.createServer(app);
server.on('error',()=>{
  console.log('error encountered');
})
server.on('listening',onListening);
server.listen(port);

