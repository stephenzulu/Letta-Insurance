/* ═══════════════════════════════════════════
   LETTA INSURANCE BROKERS - GLOBAL JS
   ═══════════════════════════════════════════ */

// Preloader
function hidePreloader(){const p=document.getElementById('preloader');if(p)p.classList.add('hidden')}
window.addEventListener('load',()=>setTimeout(hidePreloader,300));
document.addEventListener('DOMContentLoaded',()=>setTimeout(hidePreloader,1200));
setTimeout(hidePreloader,2500);

// Scroll: navbar, back-to-top, social float
window.addEventListener('scroll',()=>{
    const s=window.scrollY>60;
    const nav=document.querySelector('.navbar-custom');
    const btn=document.getElementById('backToTop');
    const social=document.getElementById('socialFloat');
    if(nav) nav.classList.toggle('scrolled',s);
    if(btn) btn.classList.toggle('show',s);
    if(social) social.classList.toggle('show',s);
});

// Theme toggle (persisted)
document.addEventListener('DOMContentLoaded',()=>{
    const toggle=document.getElementById('themeToggle');
    let theme='light';
    try{theme=localStorage.getItem('libl-theme')||'light'}catch(e){}
    if(theme==='dark') document.documentElement.setAttribute('data-theme','dark');
    if(toggle){
        toggle.addEventListener('click',()=>{
            const isDark=document.documentElement.getAttribute('data-theme')==='dark';
            if(isDark){document.documentElement.removeAttribute('data-theme');try{localStorage.setItem('libl-theme','light')}catch(e){}}
            else{document.documentElement.setAttribute('data-theme','dark');try{localStorage.setItem('libl-theme','dark')}catch(e){}}
        });
    }
});

// Scroll reveal
document.addEventListener('DOMContentLoaded',()=>{
    const obs=new IntersectionObserver(entries=>{
        entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')});
    },{threshold:.08,rootMargin:'0px 0px -30px 0px'});
    document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
});

// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded',()=>{
    document.querySelectorAll('a[href^="#"]').forEach(a=>{
        a.addEventListener('click',function(e){
            e.preventDefault();
            const t=document.querySelector(this.getAttribute('href'));
            if(t)t.scrollIntoView({behavior:'smooth',block:'start'});
            const nc=document.querySelector('.navbar-collapse');
            if(nc&&nc.classList.contains('show'))try{bootstrap.Collapse.getInstance(nc).hide()}catch(ex){}
        });
    });
});

// Toast notifications
function showToast(msg, type='success'){
    const existing=document.querySelector('.toast-msg');
    if(existing) existing.remove();
    const toast=document.createElement('div');
    toast.className=`toast-msg toast-${type}`;
    toast.textContent=msg;
    document.body.appendChild(toast);
    requestAnimationFrame(()=>toast.classList.add('show'));
    setTimeout(()=>{toast.classList.remove('show');setTimeout(()=>toast.remove(),400)},4000);
}

// ═══════════════════════════════════════════
// EMAIL JS - Send actual emails
// ═══════════════════════════════════════════
// SETUP INSTRUCTIONS:
// 1. Go to https://www.emailjs.com and create a free account
// 2. Add an Email Service (Gmail, Outlook, etc.) - note your SERVICE_ID
// 3. Create an Email Template with variables: {{from_name}}, {{from_email}}, {{phone}}, {{service}}, {{message}}
// 4. Note your TEMPLATE_ID
// 5. Go to Account > API Keys and note your PUBLIC_KEY
// 6. Replace the values below:

const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';      // Replace with your EmailJS public key
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';      // Replace with your EmailJS service ID
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';    // Replace with your EmailJS template ID

function initContactForm(){
    const form=document.getElementById('contactForm');
    if(!form) return;

    // Initialize EmailJS
    if(typeof emailjs!=='undefined' && EMAILJS_PUBLIC_KEY!=='YOUR_PUBLIC_KEY'){
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }

    form.addEventListener('submit',function(e){
        e.preventDefault();

        const btn=form.querySelector('.btn-submit');
        const origText=btn.innerHTML;
        btn.innerHTML='<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
        btn.disabled=true;

        const data={
            from_name: form.querySelector('[name="name"]').value,
            from_email: form.querySelector('[name="email"]').value,
            phone: form.querySelector('[name="phone"]').value || 'Not provided',
            service: form.querySelector('[name="service"]').value || 'Not specified',
            message: form.querySelector('[name="message"]').value,
            to_email: 'jchandika@lettainsurancebrokerslimited.com'
        };

        // Check if EmailJS is configured
        if(typeof emailjs==='undefined' || EMAILJS_PUBLIC_KEY==='YOUR_PUBLIC_KEY'){
            // Fallback: open mailto link
            const subject=encodeURIComponent('Website Inquiry: '+data.service);
            const body=encodeURIComponent(
                'Name: '+data.from_name+'\n'+
                'Email: '+data.from_email+'\n'+
                'Phone: '+data.phone+'\n'+
                'Service: '+data.service+'\n\n'+
                'Message:\n'+data.message
            );
            window.open('mailto:jchandika@lettainsurancebrokerslimited.com?subject='+subject+'&body='+body);
            showToast('Opening your email client...','success');
            btn.innerHTML=origText;
            btn.disabled=false;
            form.reset();
            return;
        }

        // Send via EmailJS
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, data)
        .then(function(){
            showToast('Message sent successfully! We will get back to you shortly.','success');
            form.reset();
        })
        .catch(function(err){
            console.error('EmailJS Error:',err);
            showToast('Failed to send. Please try again or email us directly.','error');
        })
        .finally(function(){
            btn.innerHTML=origText;
            btn.disabled=false;
        });
    });
}

document.addEventListener('DOMContentLoaded', initContactForm);
