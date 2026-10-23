import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const root=path.resolve(import.meta.dirname,'..');
const dist=path.join(root,'dist');
const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(d=>d.isDirectory()?walk(path.join(dir,d.name)):[path.join(dir,d.name)]);
assert(fs.existsSync(dist),'Run pnpm build before validation.');
const files=walk(dist),htmlFiles=files.filter(f=>f.endsWith('.html'));
const htmlByPath=new Map(htmlFiles.map(f=>[f,fs.readFileSync(f,'utf8')]));
const errors=[];
let references=0;
const decode=s=>s.replaceAll('&amp;','&').replaceAll('&#39;',"'").replaceAll('&quot;','"');
for(const [file,html] of htmlByPath){
  assert(html.includes('<title>'),`Missing title: ${file}`);
  const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
  if(new Set(ids).size!==ids.length)errors.push(`Duplicate HTML id: ${file}`);
  for(const m of html.matchAll(/\b(?:href|src)="([^"]*)"/g)){
    const value=decode(m[1]);
    if(!value||/^(?:https?:|mailto:|tel:|data:|\/\/)/i.test(value))continue;
    references++;
    const [url,fragment]=value.split('#');
    let target=url.split('?')[0];
    let resolved=target?path.resolve(path.dirname(file),decodeURIComponent(target)):file;
    if(!resolved.startsWith(dist+path.sep)&&resolved!==dist){errors.push(`Escaping link ${value} in ${file}`);continue;}
    if(fs.existsSync(resolved)&&fs.statSync(resolved).isDirectory())resolved=path.join(resolved,'index.html');
    if(!fs.existsSync(resolved)){errors.push(`Missing local target ${value} in ${path.relative(dist,file)}`);continue;}
    if(fragment&&htmlByPath.has(resolved)&&!htmlByPath.get(resolved).includes(`id="${fragment}"`))errors.push(`Missing anchor ${value} in ${path.relative(dist,file)}`);
  }
}
const read=name=>JSON.parse(fs.readFileSync(path.join(root,'src/data',name+'.json'),'utf8'));
const papers=read('publications'),members=read('members'),gallery=read('gallery'),news=read('news');
const site=read('site');
site.featuredPaperIds.forEach(id=>assert(papers.some(p=>p.id===id),`Unknown featured paper ${id}`));
site.homeAlbumIds.forEach(id=>assert(gallery.some(g=>g.id===id),`Unknown home album ${id}`));
for(const [name,items,key] of [['papers',papers,'id'],['members',members,'name'],['gallery',gallery,'id']])assert(new Set(items.map(i=>i[key])).size===items.length,`Duplicate ${name} keys`);
papers.forEach(p=>{assert(p.title&&p.citation&&p.details,'Incomplete publication');assert(['Published','Accepted','In review'].includes(p.status),'Unknown publication status');assert(['Journal','Conference'].includes(p.kind),'Unknown publication kind');});
news.forEach(n=>assert(/^\d{4}-\d{2}$/.test(n.date)&&n.text,'Invalid news item'));
for(const image of [...members.map(m=>m.image),read('professor').image,...gallery.flatMap(g=>g.images),'images/chips.png']){
  const file=path.join(dist,image);assert(fs.existsSync(file),`Missing image ${image}`);
  const bytes=fs.readFileSync(file);
  assert(bytes.length>100&& !bytes.subarray(0,100).toString().includes('<html'),`Invalid image ${image}`);
}
assert.equal(errors.length,0,errors.join('\n'));
console.log(`PASS: ${htmlFiles.length} HTML pages, ${references} local references, ${papers.length} publications, ${members.length} members, ${news.length} updates, ${gallery.length} albums.`);
