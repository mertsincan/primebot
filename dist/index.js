"use strict";var B=Object.create;var d=Object.defineProperty,x=Object.defineProperties,E=Object.getOwnPropertyDescriptor,N=Object.getOwnPropertyDescriptors,O=Object.getOwnPropertyNames,b=Object.getOwnPropertySymbols,T=Object.getPrototypeOf,l=Object.prototype.hasOwnProperty,_=Object.prototype.propertyIsEnumerable;var p=(e,o,t)=>o in e?d(e,o,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[o]=t,f=(e,o)=>{for(var t in o||(o={}))l.call(o,t)&&p(e,t,o[t]);if(b)for(var t of b(o))_.call(o,t)&&p(e,t,o[t]);return e},g=(e,o)=>x(e,N(o));var q=(e,o,t,r)=>{if(o&&typeof o=="object"||typeof o=="function")for(let s of O(o))!l.call(e,s)&&s!==t&&d(e,s,{get:()=>o[s],enumerable:!(r=E(o,s))||r.enumerable});return e};var h=(e,o,t)=>(t=e!=null?B(T(e)):{},q(o||!e||!e.__esModule?d(t,"default",{value:e,enumerable:!0}):t,e));var k=(e,o,t)=>new Promise((r,s)=>{var c=n=>{try{i(t.next(n))}catch(u){s(u)}},y=n=>{try{i(t.throw(n))}catch(u){s(u)}},i=n=>n.done?r(n.value):Promise.resolve(n.value).then(c,y);i((t=t.apply(e,o)).next())});var a=h(require("@actions/core")),m=h(require("@actions/github"));function w(){return k(this,null,function*(){var e,o,t;try{let r=a.getInput("token"),s=m.getOctokit(r),c=m.context,y=((e=c.payload.issue)==null?void 0:e.body)||"",i=((o=c.payload.issue)==null?void 0:o.number)||((t=c.payload.pull_request)==null?void 0:t.number),n=c.repo;i!==void 0&&(yield s.rest.issues.createComment(g(f({},n),{issue_number:i,body:"Thank you ! \u{1F64C}"})))}catch(r){a.setFailed(`Action failed: ${r.message}`)}})}w();
