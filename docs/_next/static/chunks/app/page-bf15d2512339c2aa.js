(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{9494:function(e,l,s){Promise.resolve().then(s.bind(s,5281))},5281:function(e,l,s){"use strict";s.r(l),s.d(l,{default:function(){return T}});var t=s(7437),r=s(3167),n=s(1367);function o(){for(var e=arguments.length,l=Array(e),s=0;s<e;s++)l[s]=arguments[s];return(0,n.m6)((0,r.W)(l))}let a=e=>{let{className:l,...s}=e;return(0,t.jsx)("svg",{className:o(l),...s,viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,t.jsx)("path",{stroke:"rgb(226 232 240)",strokeWidth:2,d:"M15.795 11.272L7.795 16.272C6.79593 16.8964 5.5 16.1782 5.5 15L5.5 5.00002C5.5 3.82186 6.79593 3.1036 7.795 3.72802L15.795 8.72802C16.735 9.31552 16.735 10.6845 15.795 11.272Z",fill:"currentcolor"})})},u=e=>{let{className:l,...s}=e;return(0,t.jsx)("svg",{className:o(l),...s,xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,t.jsx)("path",{d:"M20 6 9 17l-5-5"})})},c=e=>{let{className:l,...s}=e;return(0,t.jsxs)("svg",{className:o(l),...s,xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,t.jsx)("circle",{cx:"12",cy:"16",r:"1"}),(0,t.jsx)("rect",{width:"18",height:"12",x:"3",y:"10",rx:"2"}),(0,t.jsx)("path",{d:"M7 10V7a5 5 0 0 1 9.33-2.5"})]})},i=e=>{let{className:l,...s}=e;return(0,t.jsxs)("svg",{className:o(l),...s,xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,t.jsx)("path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"}),(0,t.jsx)("path",{d:"M3 3v5h5"})]})},d=e=>{let{className:l,...s}=e;return(0,t.jsxs)("svg",{className:o(l),...s,xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"3",strokeLinecap:"round",children:[(0,t.jsx)("path",{d:"M18 6 6 18"}),(0,t.jsx)("path",{d:"m6 6 12 12"})]})},b=e=>{let{className:l,...s}=e;return(0,t.jsx)("svg",{className:o(l),...s,fill:"currentColor",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 490 490",children:(0,t.jsx)("polygon",{points:"11.387,490 245,255.832 478.613,490 489.439,479.174 255.809,244.996 489.439,10.811 478.613,0 245,234.161 11.387,0 0.561,10.811 234.191,244.996 0.561,479.174"})})},h=e=>{let{className:l,...s}=e;return(0,t.jsx)("svg",{className:o(l),...s,fill:"currentColor",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 490 490",children:(0,t.jsx)("rect",{y:"230",width:"490",height:"30"})})},x={unchecked:"unchecked",checked:"checked",skipped:"skipped"};function g(e){let{children:l,disabled:s,onClick:r,bonus:n,checked:a,skipped:u,...c}=e,i=x.unchecked;return a?i=x.checked:u&&(i=x.skipped),(0,t.jsxs)("button",{onClick:r,"data-state":i,className:o("hover:bg-white/90 rounded-lg text-4xl font-bold w-14 h-14 flex items-center justify-center relative",a&&"opacity-30",u&&"opacity-60",n?"ring-inset ring ring-offset-2 ring-black bg-white":"bg-white/90"),disabled:s,...c,children:[u&&(0,t.jsx)(h,{className:"h-full w-full absolute -z-10"}),a&&(0,t.jsx)(b,{className:"h-full w-full absolute -z-10"}),l]})}var v=s(2265);function m(e){let{children:l}=e;return(0,t.jsx)("div",{"data-testid":"total",className:"bg-white/70 rounded-lg text-4xl font-bold w-12 h-12 flex items-center justify-center",children:l})}let w={completed:"completed",unlocked:"unlocked",locked:"locked"};function f(e){let{lockedBySomeoneElse:l,completedRow:s,...r}=e,n="h-6 w-6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute",a=(0,t.jsx)(c,{className:o(n,"-rotate-12")}),i=w.unlocked;return s?(a=(0,t.jsx)(u,{className:n}),i=w.completed):l&&(a=(0,t.jsx)(d,{className:n}),i=w.locked),(0,t.jsx)("button",{"data-testid":"lock","data-state":i,disabled:s,...r,className:o("bg-white/70 rounded-full h-10 w-10 p-1.5 mx-2 duration-300 relative",l&&"opacity-20",!l&&!s&&"opacity-50 [transform:rotateY(180deg)]",s&&""),children:a})}var j=s(5249),p=s(2020);let k=e=>{switch(e){case 1:return 1;case 2:return 3;case 3:return 6;case 4:return 10;case 5:return 15;case 6:return 21;case 7:return 28;case 8:return 36;case 9:return 45;case 10:return 55;case 11:return 66;case 12:return 78;default:return 0}},N={red:"red",yellow:"yellow",green:"green",blue:"blue"},y={[N.red]:[{value:2,bonus:!1},{value:3,bonus:!0},{value:4,bonus:!1},{value:5,bonus:!1},{value:6,bonus:!0},{value:7,bonus:!1},{value:8,bonus:!1},{value:9,bonus:!0},{value:10,bonus:!1},{value:11,bonus:!1},{value:12,bonus:!1}],[N.yellow]:[{value:2,bonus:!1},{value:3,bonus:!1},{value:4,bonus:!1},{value:5,bonus:!0},{value:6,bonus:!1},{value:7,bonus:!1},{value:8,bonus:!0},{value:9,bonus:!1},{value:10,bonus:!1},{value:11,bonus:!0},{value:12,bonus:!1}],[N.green]:[{value:12,bonus:!1},{value:11,bonus:!0},{value:10,bonus:!1},{value:9,bonus:!1},{value:8,bonus:!1},{value:7,bonus:!0},{value:6,bonus:!1},{value:5,bonus:!1},{value:4,bonus:!0},{value:3,bonus:!1},{value:2,bonus:!1}],[N.blue]:[{value:12,bonus:!1},{value:11,bonus:!1},{value:10,bonus:!0},{value:9,bonus:!1},{value:8,bonus:!0},{value:7,bonus:!1},{value:6,bonus:!1},{value:5,bonus:!0},{value:4,bonus:!1},{value:3,bonus:!1},{value:2,bonus:!1}]},C=[{id:0,color:N.red,className:"bg-red-800"},{id:1,color:N.yellow,className:"bg-yellow-500"},{id:2,color:N.green,className:"bg-green-700"},{id:3,color:N.blue,className:"bg-blue-800"},{id:4,color:N.green,className:"bg-green-700"},{id:5,color:N.red,className:"bg-red-800"},{id:6,color:N.blue,className:"bg-blue-800"},{id:7,color:N.yellow,className:"bg-yellow-500"},{id:8,color:N.red,className:"bg-red-800"},{id:9,color:N.yellow,className:"bg-yellow-500"},{id:10,color:N.blue,className:"bg-blue-800"},{id:11,color:N.green,className:"bg-green-700"}],A={userActions:[],[N.red]:[],[N.yellow]:[],[N.green]:[],[N.blue]:[],bonus:[],failed:0},L=(e=>{for(let l of(e.use={},Object.keys(e.getState())))e.use[l]=()=>e(e=>e[l]);return e})((0,p.Ue)()((0,j.mW)(e=>({...A,checkTile:(l,s,t)=>e(e=>({...W(e,l,s,t),userActions:[...e.userActions,{color:l,value:t,bonus:s}]})),roundFailed:()=>e(e=>({failed:e.failed+1,userActions:[...e.userActions,{failed:!0}]})),undo:()=>e(e=>{let l=[...e.userActions];return{...B(e,l.at(-1)),userActions:l.slice(0,-1)}})}),{store:"QwixxStore",enabled:!0}))),B=(e,l)=>{if("failed"in l)return{failed:e.failed-1};if(!l.bonus){let s=e[l.color].at(-1);return y[l.color].find(e=>{let{value:l}=e;return l===s}),{[l.color]:e[l.color].slice(0,-1)}}let s=e.bonus.at(-1),t={bonus:e.bonus.slice(0,-1),[s.color]:e[s.color].slice(0,-1)};return{...t,[l.color]:t[l.color].slice(0,-1)}},W=(e,l,s,t)=>{if(s){let s=C[e.bonus.length],r={...e,[l]:[...e[l],t],bonus:[...e.bonus,s]},n=r[s.color].at(-1),o=n?y[s.color].findIndex(e=>{let{value:l}=e;return l===n}):-1,a=y[s.color][o+1];return a?W(r,s.color,a.bonus,a.value):r}return{...e,[l]:[...e[l],t]}},M=e=>L(l=>{let s=l[e],t=y[e].at(-1),r=s.includes(t.value);return k(s.length+(r?1:0))}),_=()=>M(N.red)+M(N.yellow)+M(N.green)+M(N.blue)+-5*L.use.failed();function E(e){let{color:l,tiles:s,className:r,...n}=e,u=L.use.checkTile(),c=L(e=>e[l]),[i,d]=(0,v.useState)(!1),b=s.at(-1),h=c.at(-1),x=c.includes(b.value);return(0,t.jsxs)("section",{className:o(r,"flex py-2 pl-6 pr-2 gap-1 rounded-lg relative items-center"),...n,children:[(0,t.jsx)(a,{className:"absolute h-8 w-8 top-1/2 -translate-y-1/2 text-black left-0 -ml-5"}),s.map(e=>{let{value:r,bonus:n}=e,o=c.includes(r),a=!c.includes(r)&&s.findIndex(e=>{let{value:l}=e;return l===h})>s.findIndex(e=>e.value===r),d=b.value===r&&c.length<5;return(0,t.jsx)(g,{checked:o,skipped:a||i&&!c.includes(r),disabled:o||a||i||d,bonus:n,onClick:()=>u(l,n,r),children:r},r)}),(0,t.jsx)(f,{lockedBySomeoneElse:i,completedRow:x,onClick:()=>d(!i)}),(0,t.jsx)(m,{children:M(l)})]})}let F={checked:"checked",unchecked:"unchecked"};function S(e){let{checked:l,className:s}=e;return(0,t.jsx)("div",{"data-testid":"bonus-box","data-state":l?F.checked:F.unchecked,className:o(s,"border-[6px] shadow border-white rounded font-bold w-8 h-8 flex items-center justify-center"),children:l&&(0,t.jsx)(d,{className:"text-white"})})}function I(){let e=L(e=>{let{bonus:l}=e;return l.map(e=>{let{id:l}=e;return l})});return(0,t.jsx)("div",{"data-testid":"bonus",className:"flex border-2 border-slate-400 rounded-lg items-center p-4",children:C.map((l,s)=>(0,t.jsxs)(v.Fragment,{children:[(0,t.jsx)(S,{checked:e.includes(l.id),className:l.className}),s<C.length-1&&(0,t.jsx)(a,{className:"h-4 w-4 mx-0.5 text-black"})]},l.id))})}function O(){let e=L.use.failed(),l=L.use.roundFailed(),s=e>=4;return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("button",{onClick:()=>l(),disabled:s,className:o("border-4 border-slate-400 text-slate-400 font-bold h-10 px-5 rounded",s&&"opacity-40"),children:"Worp mislukt"}),[1,2,3,4].map(l=>(0,t.jsx)("div",{"data-testid":"failed-button",className:"bg-white border-4 border-slate-300 h-10 w-10 rounded flex items-center justify-center",children:l<=e&&(0,t.jsx)(d,{className:"text-slate-700 hover:visible hover:opacity-40"})},l)),(0,t.jsx)("div",{"data-testid":"failed-total",className:"flex items-center justify-center bg-white h-10 w-10 rounded ml-4 font-bold",children:-5*e})]})}function T(){let e=L.use.userActions(),l=L.use.undo();return(0,t.jsxs)("div",{className:"p-8 bg-slate-200 rounded-xl space-y-2",children:[(0,t.jsx)(E,{color:N.red,tiles:y.red,className:"bg-red-800 text-red-800"}),(0,t.jsx)(E,{color:N.yellow,tiles:y.yellow,className:"bg-yellow-500 text-yellow-600"}),(0,t.jsx)(E,{color:N.green,tiles:y.green,className:"bg-green-700 text-green-700"}),(0,t.jsx)(E,{color:N.blue,tiles:y.blue,className:"bg-blue-800 text-blue-800"}),(0,t.jsx)(I,{}),(0,t.jsxs)("footer",{className:"flex items-center p-2 gap-4",children:[(0,t.jsx)(O,{}),(0,t.jsx)("button",{"data-testid":"undo",onClick:()=>l(),disabled:0===e.length,className:o("bg-white h-10 w-10 rounded flex items-center justify-center ml-auto",e.length>0?"hover:bg-white/50":"opacity-30"),children:(0,t.jsx)(i,{className:o("text-slate-700")})}),(0,t.jsxs)("div",{className:"bg-white/70 rounded-lg text-4xl px-4 font-bold h-12 flex items-center justify-center",children:[(0,t.jsx)("span",{className:"text-slate-400 ml-auto font-bold text-xl",children:"Totaal"}),(0,t.jsx)("span",{"data-testid":"score",className:"text-black w-16 text-right",children:_()})]})]})]})}}},function(e){e.O(0,[74,971,69,744],function(){return e(e.s=9494)}),_N_E=e.O()}]);