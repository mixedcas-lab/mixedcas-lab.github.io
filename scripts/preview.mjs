import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'../dist');
const port=Number(process.env.PORT||4173);
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'application/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp'};
if(!fs.existsSync(root)){console.error('Build first: pnpm build');process.exit(1);}
http.createServer((req,res)=>{
  try{
    const url=new URL(req.url,'http://localhost');
    let file=path.resolve(root,'.'+decodeURIComponent(url.pathname));
    if(file!==root&&!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
    if(fs.existsSync(file)&&fs.statSync(file).isDirectory()){
      if(!url.pathname.endsWith('/')){res.writeHead(302,{Location:url.pathname+'/'+url.search});res.end();return;}
      file=path.join(file,'index.html');
    }
    if(!fs.existsSync(file)){res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'});res.end(fs.readFileSync(path.join(root,'404.html')));return;}
    res.writeHead(200,{'Content-Type':types[path.extname(file).toLowerCase()]||'application/octet-stream'});fs.createReadStream(file).pipe(res);
  }catch{res.writeHead(400);res.end('Bad request');}
}).listen(port,'127.0.0.1',()=>console.log(`MCAS preview: http://127.0.0.1:${port}/`));
