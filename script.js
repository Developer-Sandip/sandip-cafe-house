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
