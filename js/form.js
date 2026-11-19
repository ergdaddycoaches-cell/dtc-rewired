const FORM_ENDPOINT = "https://xmr6-ssay-w0v9.n7e.xano.io/api:606h79Zh/copy-requests";

(function(){
  const form=document.getElementById('f'), card=document.getElementById('card'), go=document.getElementById('go'), formerr=document.getElementById('formerr');
  const req=[['first','Enter your first name.'],['last','Enter your last name.'],['email','Enter your work email.'],['company','Enter your company name.'],
    ['locator','Enter the web address of your locator.'],['street','Enter a street address.'],['city','Enter a city.'],['region','Enter a state or province.'],
    ['postal','Enter a ZIP or postal code.'],['country','Enter a country.']];
  function setErr(id,msg){const el=document.getElementById(id),e=document.getElementById(id+'-err');
    el.setAttribute('aria-invalid',msg?'true':'false');if(msg)el.setAttribute('aria-describedby',id+'-err');else el.removeAttribute('aria-describedby');e.textContent=msg||''}
  function normUrl(v){v=v.trim();if(!v)return '';if(!/^https?:\/\//i.test(v))v='https://'+v;
    try{const u=new URL(v);return u.hostname.includes('.')?u.href:''}catch(e){return ''}}
  function check(){let first=null;
    for(const [id,msg] of req){const v=document.getElementById(id).value.trim();let m=v?'':msg;
      if(!m&&id==='email'&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v))m='That email address doesn’t look complete. Check for a missing @ or domain.';
      if(!m&&id==='locator'&&!normUrl(v))m='That doesn’t look like a web address. Try something like yourbrand.com/find-a-doctor.';
      setErr(id,m);if(m&&!first)first=id}
    return first}
  form.addEventListener('input',e=>{if(e.target.getAttribute('aria-invalid')==='true')check()});
  form.addEventListener('submit',async e=>{
    e.preventDefault();formerr.textContent='';
    const bad=check();if(bad){document.getElementById(bad).focus();return}
    if(document.getElementById('website').value)return;
    const data=Object.fromEntries(new FormData(form));delete data.website;
    data.locator_url=normUrl(data.locator_url);
    document.getElementById('tname').textContent=data.first_name.trim();
    if(!FORM_ENDPOINT){document.getElementById('pv').hidden=false;done();return}
    go.disabled=true;go.textContent='Sending…';
    try{const r=await fetch(FORM_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(data)});
      if(!r.ok)throw new Error();done()}
    catch(err){formerr.textContent='Your request didn’t go through. Please try again, or email colin@dancecardrx.com.';go.disabled=false;go.textContent='Claim your copy'}
  });
  function done(){card.classList.add('done');const t=document.getElementById('thanks');t.focus();card.scrollIntoView({block:'start'})}
})();
