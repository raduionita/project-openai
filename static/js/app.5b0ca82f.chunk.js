(this.webpackJsonp=this.webpackJsonp||[]).push([[0],{109:function(e,t,n){"use strict";n.d(t,"a",(function(){return v}));var r=n(59),a=n.n(r),s=n(30),o=n.n(s),c=n(139),u=n(3),i=n(76),l=n(9),p=n(0),f=n(82),d=n(90),m=n(89),h=n(2),g=new m.OpenAIApi(new m.Configuration({apiKey:"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"}));function v(){var e=Object(p.useState)([]),t=a()(e,2),n=t[0],r=t[1],s=Object(p.useState)(!0),m=a()(s,2),v=m[0],x=m[1];Object(p.useEffect)((function(){var e=!1;return function(){var t,n;return o.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:if(!e){a.next=2;break}return a.abrupt("return");case 2:return a.next=4,o.a.awrap(d.a.getItem("@messages"));case 4:t=a.sent,n=JSON.parse(t||"[]"),console.log("useEffect:reload",t),n.length?r(n):r([{_id:"1",text:"Let's  begin!",createdAt:new Date,user:{_id:"2",name:"Kayleen",avatar:"https://placeimg.com/140/140/tech"}}]);case 8:case"end":return a.stop()}}),null,null,null,Promise)}().catch((function(e){return console.error(e)})),function(){e=!0}}),[]),Object(p.useEffect)((function(){return o.a.async((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("useEffect:update",n),e.next=3,o.a.awrap(d.a.setItem("@messages",JSON.stringify(n)));case 3:case"end":return e.stop()}}),null,null,null,Promise).catch((function(e){return console.error(e)})),function(){!0}}),[n]);var b=function(e){var t,n,a;return o.a.async((function(s){for(;;)switch(s.prev=s.next){case 0:return x(!0),t=e[0],s.prev=2,s.next=5,o.a.awrap(g.createCompletion("text-ada-001",{prompt:t.text,max_tokens:24,temperature:.9,top_p:.3,frequency_penalty:.5,presence_penalty:0,user:"1"}));case 5:a=s.sent,console.log("newCompletion",null==(n=a.data.choices[0].text)?void 0:n.trim()),r((function(e){return f.a.append(e,[{_id:String(Math.random()*Math.random()).substr(2),text:a.data.choices[0].text,createdAt:new Date,user:{_id:"2",name:"Kayleen",avatar:"https://placeimg.com/140/140/tech"}}])})),s.next=13;break;case 10:s.prev=10,s.t0=s.catch(2),s.t0.response?console.error("newCompletion",s.t0.response.status,s.t0.response.data):console.error("newCompletion",s.t0.message);case 13:return s.prev=13,x(!1),s.finish(13);case 16:case"end":return s.stop()}}),null,null,[[2,10,13,16]],Promise)},w=Object(p.useCallback)((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];o.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return console.log("onSend",JSON.stringify(e)),r((function(t){return f.a.append(t,e)})),t.next=4,o.a.awrap(b(e));case 4:case"end":return t.stop()}}),null,null,null,Promise)}),[]);return Object(h.jsxs)(u.a,{style:{flex:1,backgroundColor:"#fff"},children:[Object(h.jsx)(f.a,{messages:n,isTyping:v,onSend:function(e){return w(e)},user:{_id:"1",name:"Me",avatar:"https://placeimg.com/140/140/people"},showUserAvatar:!0,showAvatarForEveryMessage:!0,renderUsernameOnMessage:!0}),"android"===l.a.OS&&Object(h.jsx)(i.a,{behavior:"padding"}),Object(h.jsx)(c.a,{style:"auto"})]})}},140:function(e,t,n){e.exports=n(195)}},[[140,1,2]]]);
//# sourceMappingURL=app.5b0ca82f.chunk.js.map