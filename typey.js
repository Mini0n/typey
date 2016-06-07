/*
* typey.js
* Simulate text typing
* github/mini0n
*/

//Checking GIT integration in ATOM Editor

/*
* typeText(id, txt, ms, cursor, cursorMs, tags;
* params:
* - id = DOM element id
* - txt = text to type
* - ms = "typing" interval (milliseconds)
* - cursor = display a cursor
* - cursorMs = Milliseconds the cursor wil blink after txt has been written.
*              If cursorMs is not an integer, e.g. "true", it will blink indefinitely.
* - tags = tags to surround the text, e.g. "<a class='class' href='url'></a>"
*/
var cursorStr = '<span class=\"typey-cursor\" style=\"font-family:monospace;font-style:normal\">|</span>';

function typeText(id, txt, ms, cursor, cursorMs, tags){
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
      cursorBlink(id, cursorMs);
      return true;
    }
  }, spd);
}

/*
* Adds a "cursorStr" into id
* params:
* - id = cursorStr parent Id
* - ms = Milliseconds the cursor wil blink.
*        If cursorMs is not an integer it will blink indefinitely.
*/
function addCursor(id, ms){
  var dom = document.getElementById(id);
  if (dom==null){ console.log('noid'); return false; }
  dom.innerHTML += cursorStr;
  cursorBlink(id, ms);
  return true;
}

/*
* Returns an array of all "cursorStr" in id
* params:
* - id = cursorStr parent Id
*/
function getCursors(id){
  var dom = document.getElementById(id);
  if (dom==null){ console.log('noid'); return false; }
  return dom.querySelectorAll('.typey-cursor');
}

/*
* Returns last "cursorStr" in id
* params:
* - id = cursorStr parent Id
*/
function getLastCursor(id){
  var curs = getCursors(id);
  if (curs && (curs.length>0)){
    return curs[curs.length-1];
  } else { return false; }
}

/*
* Removes last cursorStr found in id
* params:
* - id = cursorStr parent Id
*/
function removeCursor(id){
  var cur = getLastCursor(id);
  if (cur){
    cur.remove();
    return true;
  } else { return false; }
}

function probandoVisualStudioCode(str) {
  console.log('multiple-cursors');
  console.log("testing");
  console.log('multiple-cursors');
  console.log("git test");
}

/*
* Blinking cursor "|" implementation
* It will blink the last "cursorStr" added to id during ms miliseconds.
* params:
* - id = cursorStr parent Id
* - ms = Milliseconds the cursor wil blink.
*        If cursorMs is not an integer it will blink indefinitely.
*
* ^: It will blink the last cursor added.
*/
function cursorBlink(id, ms){
  cur = getLastCursor(id);
  if (cur){
    if (cur.id.length==0){
      cur.id = generateCurId();
    }
    var tmo = (isNaN(parseInt(ms)))? false : parseInt(ms);
    var vis = cur.style.display;
    var c = setInterval(function(){
      vis = (vis=='')? 'hidden' : '';
      cur.style.visibility = vis;
      cur = document.getElementById(cur.id);
      if (cur==null){ clearInterval(c); }
    }, 400);
    if (tmo!==false){
      setTimeout(function(){
        cur.remove();
        clearInterval(c);
      }, tmo);
    }
    return true;
  } else return false;
}

function generateCurId(){
  var r = 'typey-cursor-'+String(new Date().getTime());
  while(document.getElementById(r)!=null){
    r = 'typey-cursor-'+String(new Date().getTime());
  }
  return r;
}

// function cursorBlink(id, ms){
//   console.log('cursorBlink(\''+id+'\', '+ms+')');
//   var dom = document.getElementById(id).querySelectorAll('.typey-cursor');
//       dom = dom[dom.length-1];
//   if (dom==null){ console.log('nocur'); return; }
//   var cId = 'typey-cursor-'+String(new Date().getTime());
//   while(document.getElementById(cId)!=null){
//     cId = 'typey-cursor-'+String(new Date().getTime());
//   }
//   dom.id = cId;
//   var tmo = (isNaN(parseInt(ms)))? false : parseInt(ms);
//   var vis = dom.style.display;
//   var c = setInterval(function(){
//     vis = (vis=='')? 'hidden' : '';
//     dom.style.visibility = vis;
//     dom = document.getElementById(cId);
//     if (dom==null){ clearInterval(c); }
//   }, 400);
//   if (tmo!==false){
//     setTimeout(function(){
//       dom.remove();
//       clearInterval(c);
//     }, tmo);
//   }
//   return cId;
// }


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
