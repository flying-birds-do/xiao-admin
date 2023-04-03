import{L as n,i as h,_ as S,E as k,a as L}from"./index-4c4484af.js";import{_ as A,a as F,b as B,c as I}from"./4-01098cb6.js";import{J as T,$ as y,a as i,h as E,o,q as s,t as e,F as f,a9 as _,W as P,Q as v,V as l,c as M,ay as O,az as D}from"./vue-27b7826a.js";const V=T({name:"analysis",setup(){const t=["#5470C6","#91CC75","#EE6666"],r=y({option:{color:t,tooltip:{trigger:"axis",axisPointer:{type:"cross"}},grid:{right:"20%"},toolbox:{feature:{dataView:{show:!0,readOnly:!1},restore:{show:!0},saveAsImage:{show:!0}}},legend:{data:["Evaporation","Precipitation","Temperature"]},xAxis:[{type:"category",axisTick:{alignWithLabel:!0},data:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]}],yAxis:[{type:"value",name:"Evaporation",position:"right",alignTicks:!0,axisLine:{show:!0,lineStyle:{color:t[0]}},axisLabel:{formatter:"{value} ml"}},{type:"value",name:"Precipitation",position:"right",alignTicks:!0,offset:80,axisLine:{show:!0,lineStyle:{color:t[1]}},axisLabel:{formatter:"{value} ml"}},{type:"value",name:"温度",position:"left",alignTicks:!0,axisLine:{show:!0,lineStyle:{color:t[2]}},axisLabel:{formatter:"{value} °C"}}],series:[{name:"Evaporation",type:"bar",data:[2,4.9,7,23.2,25.6,76.7,135.6,162.2,32.6,20,6.4,3.3]},{name:"Precipitation",type:"bar",yAxisIndex:1,data:[2.6,5.9,9,26.4,28.7,70.7,175.6,182.2,48.7,18.8,6,2.3]},{name:"Temperature",type:"line",yAxisIndex:2,data:[2,2.2,3.3,4.5,6.3,10.2,20.3,23.4,23,16.5,12,6.2]}]},optionMian:{legend:{top:"bottom"},toolbox:{show:!0,feature:{mark:{show:!0},dataView:{show:!0,readOnly:!1},restore:{show:!0},saveAsImage:{show:!0}}},series:[{name:"Nightingale Chart",type:"pie",radius:[50,250],center:["50%","50%"],roseType:"area",itemStyle:{borderRadius:8},data:[{value:40,name:"rose 1"},{value:38,name:"rose 2"},{value:32,name:"rose 3"},{value:30,name:"rose 4"},{value:28,name:"rose 5"},{value:26,name:"rose 6"},{value:22,name:"rose 7"},{value:18,name:"rose 8"}]}]},optionBroken:{color:["#80FFA5","#00DDFF","#37A2FF","#FF0087","#FFBF00"],title:{text:"Gradient Stacked Area Chart"},tooltip:{trigger:"axis",axisPointer:{type:"cross",label:{backgroundColor:"#6a7985"}}},legend:{data:["Line 1","Line 2","Line 3","Line 4","Line 5"]},toolbox:{feature:{saveAsImage:{}}},grid:{left:"3%",right:"4%",bottom:"3%",containLabel:!0},xAxis:[{type:"category",boundaryGap:!1,data:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]}],yAxis:[{type:"value"}],series:[{name:"Line 1",type:"line",stack:"Total",smooth:!0,lineStyle:{width:0},showSymbol:!1,areaStyle:{opacity:.8,color:new n(0,0,0,1,[{offset:0,color:"rgb(128, 255, 165)"},{offset:1,color:"rgb(1, 191, 236)"}])},emphasis:{focus:"series"},data:[140,232,101,264,90,340,250]},{name:"Line 2",type:"line",stack:"Total",smooth:!0,lineStyle:{width:0},showSymbol:!1,areaStyle:{opacity:.8,color:new n(0,0,0,1,[{offset:0,color:"rgb(0, 221, 255)"},{offset:1,color:"rgb(77, 119, 255)"}])},emphasis:{focus:"series"},data:[120,282,111,234,220,340,310]},{name:"Line 3",type:"line",stack:"Total",smooth:!0,lineStyle:{width:0},showSymbol:!1,areaStyle:{opacity:.8,color:new n(0,0,0,1,[{offset:0,color:"rgb(55, 162, 255)"},{offset:1,color:"rgb(116, 21, 219)"}])},emphasis:{focus:"series"},data:[320,132,201,334,190,130,220]},{name:"Line 4",type:"line",stack:"Total",smooth:!0,lineStyle:{width:0},showSymbol:!1,areaStyle:{opacity:.8,color:new n(0,0,0,1,[{offset:0,color:"rgb(255, 0, 135)"},{offset:1,color:"rgb(135, 0, 157)"}])},emphasis:{focus:"series"},data:[220,402,231,134,190,230,120]},{name:"Line 5",type:"line",stack:"Total",smooth:!0,lineStyle:{width:0},showSymbol:!1,label:{show:!0,position:"top"},areaStyle:{opacity:.8,color:new n(0,0,0,1,[{offset:0,color:"rgb(255, 191, 0)"},{offset:1,color:"rgb(224, 62, 76)"}])},emphasis:{focus:"series"},data:[220,302,181,234,210,290,150]}]}}),c=i(),u=i(),m=i(),g=y([{name:"用户总量",mount:400},{name:"购买量",mount:600},{name:"访问人数",mount:80},{name:"信息总数",mount:100},{name:"今日活动量",mount:232},{name:"离开日期",mount:60}]),p=y(["呷哺呷哺关停88家门店","互联网红海,失业人数剧增","大学生脱不下的长衫,到底是哪里出了问题?","内卷的时代,不卷我们如何生存","回村创业,回村啃老?我们到底在做什么","当生存环境变得不适合繁育后代,动物就会停止","可能我们以后想要成为怎样的人才"]),d=i([{url:A,title:"可爱"},{url:F,title:"浪漫"},{url:B,title:"优秀"},{url:I,title:"快乐"}]),a=()=>{c.value=document.getElementById("myChart"),h(c.value).setOption(r.option)},x=()=>{u.value=document.getElementById("main"),h(u.value).setOption(r.optionMian)},C=()=>{m.value=document.getElementById("broken"),h(m.value).setOption(r.optionBroken)};return E(()=>{a(),x(),C()}),{...r,totalmount:g,newsArr:p,imgArr:d}}});const b=t=>(O("data-v-97a95b5a"),t=t(),D(),t),$={class:"analysis-warp"},J=b(()=>e("div",{class:"analysis-top-warp"},[e("div",{id:"myChart",style:{width:"600px",height:"600px"}}),e("div",{id:"main",style:{width:"500px",height:"600px"}})],-1)),N={class:"data-warp"},W={class:"news-notice-warp"},G={class:"news-notice-warp"},H=["src"],j={text:"2xl",justify:"center"},q={class:"news-data-warp"},z=b(()=>e("div",{id:"broken",style:{height:"300px"},class:"bottom-canvas"},null,-1));function Q(t,r,c,u,m,g){const p=L,d=k;return o(),s("section",$,[J,e("div",N,[e("div",W,[(o(!0),s(f,null,_(t.newsArr,a=>(o(),s("div",{key:a,class:"text item"},l(a),1))),128))]),e("div",G,[P(d,{interval:5e3,arrow:"always"},{default:v(()=>[(o(!0),s(f,null,_(t.imgArr,a=>(o(),M(p,null,{default:v(()=>[e("img",{src:a.url,alt:""},null,8,H),e("h3",j,l(a.title),1)]),_:2},1024))),256))]),_:1})]),e("div",q,[e("ul",null,[(o(!0),s(f,null,_(t.totalmount,a=>(o(),s("li",{key:a.mount},[e("span",null,l(a.mount),1),e("p",null,l(a.name),1)]))),128))])])]),z])}const X=S(V,[["render",Q],["__scopeId","data-v-97a95b5a"]]);export{X as default};