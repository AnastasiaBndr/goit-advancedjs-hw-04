import{a as b,i as u,S as w}from"./assets/vendor-C9vNCoLC.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function o(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(e){if(e.ep)return;e.ep=!0;const s=o(e);fetch(e.href,s)}})();let O=15;const l=new URLSearchParams({image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:O});b.defaults.baseURL="https://pixabay.com/api/?key=38590711-cd4e1138b2603dfebaf6d7de9&";async function P(r,t=1){if(r.length===0)return Promise.reject("Sorry, there are no images matching your search query. Please try again!");l.set("q",r.trim().toLowerCase()),l.set("page",t);try{return(await b.get(l.toString())).data}catch(o){u.error({message:`${o}`,closeOnClick:!0,position:"topRight",displayMode:0,progressBar:!1})}}function q(r){return r.map(({comments:o,downloads:i,likes:e,tags:s,largeImageURL:a,previewURL:C,views:S})=>`<li class="gallery-item">
                    <a class="gallery-link" href="${a}">
                    <img
                        class="gallery-image"
                        src="${C}"
                        alt="${s}"
                        />
                    </a>
                    <div class="image-descriptions-container">
                        <div class="small-descriptions-container">
                            <p>Likes</p>
                            <p>${e}</p>
                        </div>
                        <div class="small-descriptions-container">
                            <p>Views</p>
                            <p>${S}</p>
                        </div>
                        <div class="small-descriptions-container">
                            <p>Comments</p>
                            <p>${o}</p>
                        </div>
                        <div class="small-descriptions-container">
                            <p>Downloads</p>
                            <p>${i}</p>
                        </div>
                    </div>
                    </li>
    `).join("")}const x=document.querySelector("form"),p=document.querySelector(".gallery"),$=document.querySelector('input[type="text"]'),m=document.querySelector(".loader"),n=document.querySelector(".load-more-button"),M={closeOnClick:!0,position:"topRight",displayMode:0,progressBar:!1,backgroundColor:"#EF4040",messageColor:"white",iconColor:"white",maxWidth:"432px"},{closeOnClick:k,position:h,displayMode:f,progressBar:g,backgroundColor:B,messageColor:E,iconColor:y,maxWidth:v}=M;let d,c;const R=()=>{c+=1,m.classList.add("visible"),L(c)},T=r=>{r.preventDefault(),c=1,p.innerHTML="",m.classList.add("visible"),L(c)};x.addEventListener("submit",T);n.addEventListener("click",R);function L(r){d&&d.refresh(),n.classList.remove("visible"),setTimeout(function(){P($.value,r).then(t=>{if(t.hits.length===0)throw new Error("Sorry, there are no images matching your search query. Please try again!");let o=0;r>1&&(o=p.firstChild.getBoundingClientRect().height*2),p.insertAdjacentHTML("beforeend",q(t.hits)),window.scrollBy({top:o,behavior:"smooth"}),d=new w(".gallery a",{captions:!0,captionSelector:"img",captionPosition:"outside",captionDelay:250,overlayOpacity:.8,styles:"../css/styles.css",captionsData:"alt"}),t.total-t.hits.length*r>t.hits.length?n.classList.add("visible"):(n.classList.remove("visible"),u.info({message:"We're sorry, but you've reached the end of search results.",iconColor:y,maxWidth:v,closeOnClick:k,position:h,displayMode:f,progressBar:g}))}).catch(t=>u.error({message:`${t.message?t.message:t}`,closeOnClick:!0,position:h,displayMode:f,progressBar:g,backgroundColor:B,messageColor:E,iconColor:y,maxWidth:v})).finally(m.classList.remove("visible"))},1e3)}
//# sourceMappingURL=index.js.map
