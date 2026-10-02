import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
// Build from current source only; embed the existing static files without a page rewrite.
const files=['index.html','app.js','enhancements.js','style.css','enhancements.css','favicon.svg'];
const assets={};for(const name of files)assets['/'+name]=await readFile(name,'utf8');
const screenshot=await readFile('dist/client/screenshot.jpeg').catch(()=>null);
await rm('dist',{recursive:true,force:true});await mkdir('dist/server',{recursive:true});await mkdir('dist/.openai',{recursive:true});
await writeFile('dist/server/api.js',await readFile('cloud-worker.mjs'));
await writeFile('dist/server/index.js',`import {handleAPI} from './api.js';\nconst assets=${JSON.stringify(assets)};\nexport default {async fetch(request,env){const url=new URL(request.url);if(url.pathname.startsWith('/api/'))return handleAPI(request,env);const name=url.pathname==='/'?'/index.html':url.pathname;if(name==='/places-art.jpg'||name==='/places-night.jpg')return Response.redirect('https://loveu-changsha-lets-go.github.io'+name,302);if(!(name in assets))return new Response('Not found',{status:404});const type=name.endsWith('.html')?'text/html':name.endsWith('.css')?'text/css':name.endsWith('.svg')?'image/svg+xml':'text/javascript';return new Response(assets[name],{headers:{'Content-Type':type+'; charset=utf-8','Cache-Control':'no-cache','Referrer-Policy':'no-referrer'}});}};\n`);
await writeFile('dist/.openai/hosting.json',await readFile('.openai/hosting.json'));
if(screenshot){await mkdir('dist/client',{recursive:true});await writeFile('dist/client/screenshot.jpeg',screenshot);}
