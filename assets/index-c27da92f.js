import{y as m,b as g,_ as f}from"./index-3976036e.js";/* empty css                  */import{J as b,o as x,c as V,Q as e,t as y,W as c,U as i,K as C}from"./vue-4048d110.js";const T={class:"dialog-footer"},v=b({__name:"index",props:{dialogVisible:Boolean,Tips:String},emits:["cancel","sure"],setup(t,{emit:o}){const l=t,d=()=>{o("cancel")},r=()=>{o("sure")},_=s=>{o("cancel")};return(s,a)=>{const n=g,p=m;return x(),V(p,{modelValue:l.dialogVisible,"onUpdate:modelValue":a[0]||(a[0]=u=>l.dialogVisible=u),title:t.Tips,width:"30%",class:"xy-dialog","before-close":_},{footer:e(()=>[y("span",T,[c(n,{onClick:d},{default:e(()=>[i("取消")]),_:1}),c(n,{type:"primary",onClick:r},{default:e(()=>[i(" 确定 ")]),_:1})])]),default:e(()=>[C(s.$slots,"default",{},void 0,!0)]),_:3},8,["modelValue","title"])}}});const h=f(v,[["__scopeId","data-v-0dc8c2ba"]]);export{h as x};
