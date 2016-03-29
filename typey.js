


/* 
* typeText(id, txt, ms, cursor, cursorTime, tags;
* params:
* - id = DOM element id
* - txt = text to type
* - ms = "typing" interval (milliseconds)
* - cursor = display a cursor
* - cursorTime = Milliseconds the cursor wil blink after txt has been written.
*                If cursorTime is not an integer it will blink indefinitely.
* - tags = tags to surround txt, e.g. "<a class='class' href='url'></a>"
*/
var cursorStr = '<span class=\"typey-cursor\" style=\"font-family:monospace;font-style:normal\">|</span>';

function typeText(id, txt, ms, cursor, cursorTime, tags){
  var dom = document.getElementById(id);
  if (dom==null){ return false; }
  var spd = (isNaN(parseInt(ms)))? 80 : parseInt(ms);
  var txt = String(txt);
  var pos = 0, t = '', h = dom.innerHTML;
  var f = setInterval(function(){
    var c = txt.charAt(pos).replace('<','&lt;').replace('>','&gt;');               
    t += c.replace(' ','&#32;').replace('\n','<br>');
    t = (cursor)? t.replace(cursorStr,'')+cursorStr : t;
    dom.innerHTML = (tags!=null)? h+tags.replace('></','>'+t+'</') : h+t;
    pos++;
    if (pos == txt.length){ 
      clearInterval(f);
      cursorBlink(id, cursorTime);
      return true;
    }
  }, spd);
}

/*
* Removes last cursorStr found in id
* - id = cursorStr parent Id
*/
function removeCursor(id){
  var dom = document.getElementById(id).querySelectorAll('.typey-cursor');
      dom = dom[dom.length-1];
  if (dom==null){ console.log('nocur'); return; }
  dom.remove();
}

/*
* Adds a "cursorStr" into id
* - id = cursorStr parent Id
* - ms = Milliseconds the cursor wil blink.
*        If cursorTime is not an integer it will blink indefinitely.
*/
function addCursor(id, ms){
  var dom = document.getElementById(id);
  if (dom==null){ console.log('noid'); return; }
  dom.innerHTML += cursorStr;
  cursorBlink(id, ms);
}

/*
* Blinking cursor "|" implementation
* Add a "cursorStr" anywhere, pass it's container Id and it will blink it.^
* - id = cursorStr parent Id
* - ms = Milliseconds the cursor wil blink.
*        If cursorTime is not an integer it will blink indefinitely.
*
* ^: It will blink the last cursor added.
*/
function cursorBlink(id, ms){
  console.log('cursorBlink(\''+id+'\', '+ms+')');
  var dom = document.getElementById(id).querySelectorAll('.typey-cursor');
      dom = dom[dom.length-1];
  if (dom==null){ console.log('nocur'); return; }
  var cId = 'typey-cursor-'+String(new Date().getTime());
  while(document.getElementById(cId)!=null){
    cId = 'typey-cursor-'+String(new Date().getTime());
  }
  dom.id = cId;
  var tmo = (isNaN(parseInt(ms)))? false : parseInt(ms);
  var vis = dom.style.display;
  var c = setInterval(function(){
    vis = (vis=='')? 'hidden' : '';
    dom.style.visibility = vis;
    dom = document.getElementById(cId);
    if (dom==null){ clearInterval(c); }
  }, 400);
  if (tmo!==false){
    setTimeout(function(){ 
      dom.remove();
      clearInterval(c); 
    }, tmo);
  }
  return cId;
}


/*
* Deletes letter by letter last occurrence of txt in parent with id = id
*
*
*
*
*
*/
function unTypeText(id, txt, ms){
  console.log('> unTypeText('+id+', \''+txt+'\', '+ms+');');
  var dom = document.getElementById(id);
  console.log(dom.innerText);
  if ((dom==null)||(txt==null)||(txt.length==0)){ console.log('no'); return false; }
  if (dom.innerText.lastIndexOf(txt)==-1){ console.log('nof'); return false; }
  var spd = (isNaN(parseInt(ms))) ? 80 : parseInt(ms);

  var t = '', h = dom.innerHTML;
  console.log(h);
  // dom.innerText += dom.innerText;


  // var pos = (last==true)? h.lastIndexOf(txt) : h.indexOf(txt);
  // console.log(dom.innerText.replace('\n','<br>').replace(' ','&nbsp;'));
  // for (i=0;i<=txt.length;i++){
  //   console.log(i);
  //   t = h.slice(0,pos+txt.length-i) + h.slice(pos+txt.length,h.length);
  //   console.log(t);
  // }
}