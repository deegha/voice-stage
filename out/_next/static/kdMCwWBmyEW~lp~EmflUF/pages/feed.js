(window.webpackJsonp=window.webpackJsonp||[]).push([["084e"],{"6iYV":function(e,t,a){"use strict";a.r(t);var n=a("ln6h"),r=a.n(n),c=a("dfwq"),l=a("O40h"),u=a("0iUn"),i=a("sLSF"),s=a("MI3g"),o=a("a7VT"),m=a("AT/M"),d=a("Tit0"),f=a("vYYK"),p=a("q1tI"),h=a.n(p),b=a("/MKj"),v=a("adxC"),O=a("zrwo"),g=a("e+cM"),j=a("OcYQ"),y=a("dHca"),w=a("rT79"),x=a("I3lW"),E=a.n(x),C=function(e){function t(){var e,a;Object(u.default)(this,t);for(var n=arguments.length,c=new Array(n),i=0;i<n;i++)c[i]=arguments[i];return a=Object(s.default)(this,(e=Object(o.default)(t)).call.apply(e,[this].concat(c))),Object(f.a)(Object(m.default)(a),"state",{commentText:"",textAreaHeight:20,media:{url:"",type:null,file:""}}),Object(f.a)(Object(m.default)(a),"handleTitleChange",function(e){a.setState({commentText:e.target.value})}),Object(f.a)(Object(m.default)(a),"handleFileChange",function(e){var t=e.target.files[0],n=e.target.files.length>0?URL.createObjectURL(e.target.files[0]):"";a.setState(function(e){return Object(O.a)({},e,{media:{url:n,type:1,file:t}})})}),Object(f.a)(Object(m.default)(a),"addComment",Object(l.default)(r.a.mark(function e(){var t,n,c,l,u;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=a.props,n=t.auth.user,c=t.feed,l=Object(y.a)(10),e.t0=c.id,e.t1=l,e.t2=l,e.t3=a.state.commentText,e.t4=[],e.next=9,Object(y.b)(a.state.media.file);case 9:e.t5=e.sent,e.t6=a.state.media.type,e.t7={url:e.t5,type:e.t6},e.t8={displayName:n.displayName,id:n.id,photoURL:n.photoURL},u={feedId:e.t0,id:e.t1,parent:null,superParent:e.t2,comment:e.t3,comments:e.t4,media:e.t7,auther:e.t8},a.setState({replyBox:!1,commentText:"",media:{}}),a.props.addComment(u);case 16:case"end":return e.stop()}},e)}))),a}return Object(d.default)(t,e),Object(i.default)(t,[{key:"render",value:function(){var e=this.props,t=e.feed,a=e.auth,n=e.comments,r=e.reply,c=this.state,l=c.commentText,u=c.textAreaHeight,i=c.media;return console.log(t),h.a.createElement("div",{className:E.a.container},h.a.createElement(g.h,{ogImage:t.media&&t.media.url,url:j.a,description:"".concat(t.title," - ").concat(j.d),title:"".concat(t.title," - ").concat(j.d)}),h.a.createElement("div",{className:E.a.containerInner},h.a.createElement("div",{className:E.a.wrapper},t.media&&""!==t.media.url&&h.a.createElement("div",{className:E.a.featuredImage},h.a.createElement("img",{src:t.media.url})),h.a.createElement("h1",null,t.title),""!==t.text&&h.a.createElement("p",null,t.text),t.tags&&t.tags.length>0&&h.a.createElement("div",{className:E.a.tagContainer},t.tags.map(function(e){return h.a.createElement("div",{className:E.a.tag,key:e},h.a.createElement(g.e,{title:e,readOnly:!0}))})),h.a.createElement("div",{className:E.a.writeComment},h.a.createElement("div",{className:E.a.textAreaWrapper},h.a.createElement("textarea",{value:l,onChange:this.handleTitleChange,style:{height:u},placeholder:"how do you feel about it"}),h.a.createElement("div",{className:E.a.optionsArea},h.a.createElement("input",{type:"file",onChange:this.handleFileChange}),h.a.createElement(w.a,{style:{color:"#636e72",fontSize:"20px"}}))),h.a.createElement("div",{className:E.a.replyBtn,onClick:this.addComment},"Comment")),i&&""!==i.url&&h.a.createElement("div",{className:E.a.commentImage},h.a.createElement("img",{src:i.url})),n.map(function(e){return h.a.createElement(g.b,{reply:r,auth:a,key:e.id,comment:e})}))))}}]),t}(h.a.PureComponent),k=function(e){function t(){var e,a;Object(u.default)(this,t);for(var n=arguments.length,i=new Array(n),d=0;d<n;d++)i[d]=arguments[d];return a=Object(s.default)(this,(e=Object(o.default)(t)).call.apply(e,[this].concat(i))),Object(f.a)(Object(m.default)(a),"state",{commentLoading:!1,comments:[]}),Object(f.a)(Object(m.default)(a),"addComment",function(){var e=Object(l.default)(r.a.mark(function e(t){return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a.setState(function(e){return{comments:[t].concat(Object(c.default)(e.comments))}}),a.setState({commentLoading:!0}),e.prev=2,e.next=5,Object(v.b)(t);case 5:e.sent,a.setState({commentLoading:!1}),e.next=13;break;case 9:e.prev=9,e.t0=e.catch(2),console.log(e.t0),a.setState({commentLoading:!1});case 13:case"end":return e.stop()}},e,null,[[2,9]])}));return function(t){return e.apply(this,arguments)}}()),Object(f.a)(Object(m.default)(a),"checkArray",function(e,t){e.map(function(e){if(e.id===t.parent){e.comments.unshift(t);try{var n=a.state.comments.filter(function(t){return t.id===e.superParent});Object(v.h)(e.superParent,n[0])}catch(r){console.log(r)}}else a.checkArray(e.comments,t)})}),Object(f.a)(Object(m.default)(a),"reply",function(){var e=Object(l.default)(r.a.mark(function e(t){var n;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:n=a.state.comments,a.checkArray(n,t);case 2:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()),a}return Object(d.default)(t,e),Object(i.default)(t,[{key:"componentDidMount",value:function(){var e=Object(l.default)(r.a.mark(function e(){var t;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(v.g)(this.props.slug);case 2:t=e.sent,this.setState({comments:t});case 4:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this.props,t=e.feed,a=e.auth,n=this.state.comments;return h.a.createElement(C,{comments:n,reply:this.reply,feed:t,auth:a,addComment:this.addComment})}}],[{key:"getInitialProps",value:function(){var e=Object(l.default)(r.a.mark(function e(t){var a,n,c;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.query,n=a.slug,e.prev=2,e.next=5,Object(v.e)(n);case 5:return c=e.sent,e.abrupt("return",{slug:n,feed:c});case 9:return e.prev=9,e.t0=e.catch(2),e.abrupt("return",{err:e.t0});case 12:case"end":return e.stop()}},e,null,[[2,9]])}));return function(t){return e.apply(this,arguments)}}()}]),t}(h.a.Component);t.default=Object(b.b)(function(e){return{auth:e.auth}})(k)},UaL4:function(e,t,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/feed",function(){var e=a("6iYV");return{page:e.default||e}}])}},[["UaL4","5d41","9da1","ad9d"]]]);