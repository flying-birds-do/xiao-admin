import{f,I as m,_ as g}from"./index-4c4484af.js";import{J as x,o as V,c as b,Q as e,t as y,W as c,U as i,K as B}from"./vue-27b7826a.js";const C={class:"dialog-footer"},k=x({__name:"index",props:{dialogVisible:Boolean,Tips:String},emits:["cancel","sure"],setup(t,{emit:o}){const a=t,d=()=>{o("cancel")},r=()=>{o("sure")},_=s=>{o("cancel")};return(s,l)=>{const n=f,p=m;return V(),b(p,{modelValue:a.dialogVisible,"onUpdate:modelValue":l[0]||(l[0]=u=>a.dialogVisible=u),title:t.Tips,width:"30%",class:"xy-dialog","before-close":_},{footer:e(()=>[y("span",C,[c(n,{onClick:d},{default:e(()=>[i("取消")]),_:1}),c(n,{type:"primary",onClick:r},{default:e(()=>[i(" 确定 ")]),_:1})])]),default:e(()=>[B(s.$slots,"default",{},void 0,!0)]),_:3},8,["modelValue","title"])}}});const N=g(k,[["__scopeId","data-v-f7854bea"]]);export{N as x};