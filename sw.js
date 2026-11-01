const V='obiettivi-v3',FILES=['./','./index.html','./manifest.json','./firebase-config.js','./icon-192.png','./icon-512.png','./icon-maskable-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);
 if(r.method!='GET'||(u.origin!=location.origin&&!r.url.startsWith('https://www.gstatic.com/firebasejs/')))return;
 e.respondWith(fetch(r,{cache:'no-cache'}).then(res=>{if(res.ok||res.type=='opaque'){const c=res.clone();caches.open(V).then(x=>x.put(r,c))}return res}).catch(()=>caches.match(r).then(m=>m||caches.match('./index.html'))))});
