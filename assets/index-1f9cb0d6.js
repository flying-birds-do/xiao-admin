import{G as c,v as r,q as d,_}from"./index-4c4484af.js";/* empty css                 */import{J as i,a as m,$ as u,o as h,q as b,W as e,t as y,Q as f,u as v}from"./vue-27b7826a.js";const w={class:"table-warp"},x={class:"table-pub-card"},g=i({__name:"index",setup(C){const o=m([{label:"操作人员",prop:"name",type:"input",props:{placeholder:"操作人员"},list:[]},{label:"状态",prop:"show",type:"select",props:{placeholder:"状态",list:[{label:"正常",value:"正常"},{label:"异常",value:"异常"}]}},{label:"时间",prop:"date",type:"datetimerange",props:{clearable:!0,"value-format":"yyyy-MM-dd HH:mm:ss"}}]),l=function(s){console.log(s),t=t.reverse()};let t=u([{id:"1",name:"admin",path:"小鱼仔",show:"显示",date:"2023-04-03",place:"北京"},{id:"1",name:"张三",show:"显示",date:"2023-01-13",place:"上海"},{id:"2",name:"温昂",show:"显示",date:"2023-04-03",place:"苏州"},{id:"3",name:"dashboard",show:"正常",date:"2023-04-03",place:"北京"},{id:"4",name:"admin",show:"异常",date:"2023-04-03",place:"北京"},{id:"5",name:"dsde",show:"显示",date:"2023-03-24",place:"上海"}]);return(s,q)=>{const n=c,a=r,p=d;return h(),b("section",w,[e(n,{id:"commodityInquiry1",ref:"conditions","search-conditions":o.value,"is-query":!0,"is-reset":!0,"is-expand":!1,onScreenChange:l},null,8,["search-conditions"]),y("div",x,[e(p,{data:v(t),style:{width:"100%"},class:"table-style-warp"},{default:f(()=>[e(a,{label:"日志编号",prop:"id"}),e(a,{label:"操作人员",prop:"name"}),e(a,{label:"状态显示",prop:"show"}),e(a,{label:"时间",prop:"date"}),e(a,{label:"操作地点",prop:"place"})]),_:1},8,["data"])])])}}});const H=_(g,[["__scopeId","data-v-44551915"]]);export{H as default};
