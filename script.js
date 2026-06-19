// Theme toggle
document.getElementById('themeToggle').onclick=()=>{
document.body.classList.toggle('light');
localStorage.setItem('theme',document.body.className);
};

// Restore theme from localStorage
if(localStorage.getItem('theme')==='light'){
document.body.classList.add('light');
}

// Smooth scroll navigation
document.querySelectorAll('a[href^="#"]').forEach(a=>{
a.onclick=e=>{
e.preventDefault();
document.querySelector(a.getAttribute('href')).scrollIntoView({behavior:'smooth'});
};
});

// Scroll animations - fade in elements on scroll
const observerOptions={threshold:0.1,rootMargin:'0px 0px -100px 0px'};
const observer=new IntersectionObserver((entries)=>{
entries.forEach(entry=>{
if(entry.isIntersecting){
entry.target.style.opacity='1';
entry.target.style.transform='translateY(0)';
observer.unobserve(entry.target);
}
});
},observerOptions);

document.querySelectorAll('.card, section').forEach(el=>{
el.style.opacity='0';
el.style.transform='translateY(20px)';
el.style.transition='opacity 0.6s ease, transform 0.6s ease';
observer.observe(el);
});

// Active nav link on scroll
window.addEventListener('scroll',()=>{
let current='';
document.querySelectorAll('section').forEach(section=>{
const sectionTop=section.offsetTop;
if(pageYOffset>=sectionTop-250){
current=section.getAttribute('id');
}
});
document.querySelectorAll('nav a[href^="#"]').forEach(a=>{
a.style.color='var(--text)';
if(a.getAttribute('href').slice(1)===current){
a.style.color='var(--accent)';
}
});
});

// Intro typing for speech bubble
function typeSequence(el, phrases, speed=60, pause=900){
	let pi=0;
	function typePhrase(){
		const text=phrases[pi];
		let i=0;
		el.textContent='';
		const t=setInterval(()=>{
			el.textContent+=text.charAt(i++);
			if(i>text.length){
				clearInterval(t);
				pi=(pi+1)%phrases.length;
				setTimeout(typePhrase,pause);
			}
		},speed);
	}
	typePhrase();
}

const introEl=document.querySelector('.intro-text');
if(introEl){
	// start after a short delay so page loads nicely
	setTimeout(()=>{
		typeSequence(introEl,["Hello!","I'm Satyam Sharma.","Welcome to my portfolio."],50,1100);
	},600);
}

// Animate role text with rotation
function rotateRoles(el, roles, speed=2500){
	let ri=0;
	function rotateRole(){
		const role=roles[ri];
		el.style.opacity='0';
		setTimeout(()=>{
			el.textContent=role;
			el.style.transition='opacity 0.6s ease';
			el.style.opacity='1';
			ri=(ri+1)%roles.length;
			setTimeout(rotateRole,speed);
		},300);
	}
	rotateRole();
}

const roleEl=document.querySelector('#role-text');
if(roleEl){
	roleEl.style.transition='opacity 0.6s ease';
	rotateRoles(roleEl,["AI Engineer and Backend Developer","Backend Developer and AI Engineer"],2500);
}
