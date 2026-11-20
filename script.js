// Change this to your WhatsApp number: country code + number, no + or spaces
var WHATSAPP="916291434742";
var CAFE_NAME="Sandip Cafe House";

var MENU={
  "Coffee":[["Espresso","Rich and short",90],["Cappuccino","Silky milk foam",150],["Cold coffee","Blended with ice cream",170],["Filter coffee","South Indian style",110]],
  "Cha":[["Masala cha","Ginger and cardamom",60],["Lemon cha","Light and fresh",70],["Green tea","With a hint of mint",80],["Bhar cha","Served in a clay cup",50]],
  "Snacks":[["Veg sandwich","Grilled, with green chutney",120],["Chicken roll","Egg-wrapped, spicy",160],["French fries","Crispy, with dip",110],["Brownie","Warm, with chocolate sauce",130]]
};
var tabs=document.querySelector('.tabs'),list=document.getElementById('items');
function show(cat){
  Array.prototype.forEach.call(tabs.children,function(b){b.setAttribute('aria-selected',b.textContent===cat)});
  list.innerHTML='';
  MENU[cat].forEach(function(i){
    var li=document.createElement('li');
    li.innerHTML='<div class="row"><span></span><span></span></div><div class="d"></div>';
    li.querySelectorAll('span')[0].textContent=i[0];
    li.querySelectorAll('span')[1].textContent='₹'+i[2];
    li.querySelector('.d').textContent=i[1];
    list.appendChild(li);
  });
}
Object.keys(MENU).forEach(function(c){
  var b=document.createElement('button');
  b.type='button';b.setAttribute('role','tab');b.textContent=c;
  b.onclick=function(){show(c)};
  tabs.appendChild(b);
});
show('Coffee');

var form=document.getElementById('bookForm'),msg=document.getElementById('formMsg');
function pad(n){return n<10?'0'+n:''+n}
var now=new Date(),today=now.getFullYear()+'-'+pad(now.getMonth()+1)+'-'+pad(now.getDate());
form.elements.date.min=today;

function say(t,err){msg.textContent=t;msg.className='msg'+(err?' err':'')}

form.addEventListener('submit',function(e){
  e.preventDefault();
  var f=form.elements,name=f.name.value.trim(),phone=f.phone.value.trim(),
      digits=phone.replace(/\D/g,''),date=f.date.value,time=f.time.value;
  if(!name){say('Please enter your name.',true);f.name.focus();return}
  if(digits.length<8){say('Please enter a valid phone number.',true);f.phone.focus();return}
  if(!date||date<today){say('Please pick a date from today onwards.',true);f.date.focus();return}
  if(!time){say('Please pick a time.',true);f.time.focus();return}
  var p=date.split('-'),nice=new Date(p[0],p[1]-1,p[2]).toLocaleDateString('en-IN',{weekday:'short',day:'numeric',month:'short',year:'numeric'});
  var text='Hello '+CAFE_NAME+', I would like to book a table.\n'+
    'Name: '+name+'\nPhone: '+phone+'\nDate: '+nice+'\nTime: '+time+'\nGuests: '+f.guests.value+
    (f.note.value.trim()?'\nNote: '+f.note.value.trim():'');
  var a=document.createElement('a');
  a.href='https://wa.me/'+WHATSAPP+'?text='+encodeURIComponent(text);
  a.target='_blank';a.rel='noopener';
  document.body.appendChild(a);a.click();a.remove();
  say('Thank you, '+name+'! Please press Send in WhatsApp to finish your booking request.',false);
});
