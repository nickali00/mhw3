/* TODO: inserite il codice JavaScript necessario a completare il MHW! */

function assignSpace()
{
  if(event.currentTarget.attributes[2].nodeValue=="one")
  {
    pulisci("one");
    sel[0]=event.currentTarget.attributes[1].nodeValue;
  }else if(event.currentTarget.attributes[2].nodeValue=="two")
  {
   pulisci("two");
   sel[1]=event.currentTarget.attributes[1].nodeValue;
  }else{
    pulisci("three");
    sel[2]=event.currentTarget.attributes[1].nodeValue;
  }
  const new_img = document.createElement('img');
  new_img.className = "checkbox";
  new_img.src = 'http://nicolaaliuni.altervista.org/nceck.png';
  event.currentTarget.classList.remove('sel');
  event.currentTarget.classList.add('selcol');
  event.currentTarget.children[1].remove();
  event.currentTarget.appendChild(new_img);
  event.currentTarget.removeEventListener('click', assignSpace);
  selezionato();
}


function attivoev(){
  let boxes = document.querySelectorAll('.choice-grid .cont');
  for (const box of boxes)
  {
    box.addEventListener('click', assignSpace);
    freeBoxes.push(box);
  }

   boxes = document.querySelectorAll('.sel');
  for (const box of boxes)
  {
    box.addEventListener('click', assignSpace);
    freeBoxes.push(box);
  }

}


function pulisci(i){
  let colo = document.querySelectorAll('.selcol');
  for (const b of colo)
  {
    if(b.attributes[2].nodeValue==i)
    {

      b.classList.remove('selcol');
      b.classList.add('cont');

    }

  }



  let boxes = document.querySelectorAll('.choice-grid .cont');
  for (const box of boxes)
  {
    const new_img = document.createElement('img');
     new_img.src = 'http://nicolaaliuni.altervista.org/cech.png';
      new_img.className = "checkbox";
    if(box.attributes[2].nodeValue==i)
    {
      box.classList.remove('cont');
      box.classList.add('sel');
      box.children[1].remove();
      box.appendChild(new_img);
      box.addEventListener('click', assignSpace);
      freeBoxes.push(box);
    }

  }

}


let sem;
 function selezionato()
 {

   if(sel[1]!=null && sel[0]!=null && sel[2]!=null )
   {
     if( sel[0]===sel[1]){
       sem=0;
     }else if (sel[0]===sel[2]) {
       sem=0;
     }else if (sel[1]===sel[2]) {
       sem=1;
     }else{
       sem=0;
     }
    document.getElementById("bt").disabled = false;
   }
 }


 function risultato()
 {
   document.getElementById("reset").disabled = false;

     const resultContainer = document.querySelector('.conten');
     const header = document.createElement('h1');
     header.textContent="titolo: "+RESULTS_MAP[sel[sem]].title;
     resultContainer.appendChild(header);
     const header2 = document.createElement('p');
     header2.textContent=" descrizione: "+RESULTS_MAP[sel[sem]].contents;
     resultContainer.appendChild(header2);

   // Rimuovi gli event listener restanti
   for (const box of freeBoxes)
   {
     box.removeEventListener('click', assignSpace);
   }
   document.getElementById("bt").disabled = true;
 }

 function puliscisel()
{
  let boxes = document.querySelectorAll('.choice-grid .sel');
  for (const box of boxes)
  {
    box.classList.remove('sel');
    box.classList.add('cont');
  }
}
 function reset()
 {

  document.getElementById("reset").disabled = true;

  pulisci("one");
  pulisci("two");
  pulisci("three");
  puliscisel();
  attivoev();
  const resultContainer = document.querySelector('.conten');
  resultContainer.innerHTML = '';
  sel[0]=null;
  sel[1]=null;
  sel[2]=null;

   window.scrollTo(0, 0);
 }
function onText(text) {
  let boxes = document.querySelectorAll('.choice-grid .cont');
 let i=0;
  for (const box of boxes)
  {
  	 const j=imgcasuale(text.mhw3[i].ruolo);
    // console.log(j);
     const header = document.createElement('img');
     header.src=text.mhw3[j].img;
     box.appendChild(header);

     const header2 = document.createElement('img');
     header2.src='http://nicolaaliuni.altervista.org/cech.png';
     header2.classList.add('checkbox');
     box.appendChild(header2);
     i++;
  }
}


const freeBoxes = [];
let sel= new Array();
let numimg= new Array();
let puntatore=0;
document.getElementById("bt").disabled = true;
document.getElementById("reset").disabled = true;
let button2 = document.querySelector("#bt")
button2.addEventListener("click", risultato);
let button = document.querySelector("#reset")
button.addEventListener("click", reset);
prendoapi();

attivoev();

/*##################  codice nuovo  ########################à*/

function onResponse(response) {
  return response.json();
}

function prendoapi()
{
 fetch('http://nicolaaliuni.altervista.org/mhw2/api.php').then(onResponse).then(onText);
}

function imgcasuale(r)
{
  let sem=0
  let num;
  while (sem===0) {
    if(r==="alapiccola")
    {
      num=Math.floor(Math.random() * 9); //0 - 8
    }else if (r==="centro") {
      num=Math.floor(Math.random() * 9)+9; //9-17
    }else {
      num=Math.floor(Math.random() * 9)+18; //18 -26
    }

    if(puntatore===0)
    {
      sem=1;
    }else{
      let trovato=0;
      for(let i=0;i<puntatore;i++)
      {
        if(numimg[i]===num)
        {
          trovato=1;
        }
      }
      if(trovato===0)
      {
        sem=1;
      }
    }
  }
  numimg[puntatore]=num;
  puntatore++;
  return num;
}




function authenticate() {
    return gapi.auth2.getAuthInstance()
        .signIn({scope: "https://www.googleapis.com/auth/youtube.readonly"})
        .then(function() { console.log("Sign-in successful"); },
              function(err) { console.error("Error signing in", err); });
  }
  function loadClient() {
    gapi.client.setApiKey("AIzaSyCBUgTTXlq73TIV_0LIwJNCUjCE5QodoSA");
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(function() { console.log("GAPI client loaded for API"); },
              function(err) { console.error("Error loading GAPI client for API", err); });
  }
  gapi.load("client:auth2", function() {
    gapi.auth2.init({client_id: "912032878615-jn9nujkuenmen9ojgkuv65lf1fipb1tn.apps.googleusercontent.com"});
  });


  function getvideo() {
    // See https://developers.google.com/youtube/v3/docs/playlistitems/list
    var request = gapi.client.youtube.search.list({
        part:'snippet,id',
        order:'date',
        maxResults:'10',
		channelId:'UCWJ2lWNubArHWmf3FIHbfcQ'
    });
    request.execute(function(response) {
      if ('error' in response) {
        displayMessage(response.error.message);
      } else {
        const resultContainer = document.querySelector('.video');
    		for(let i=0;i<response.items.length;i++)
    		{
     			const header = document.createElement('iframe');
    			header.src="https://www.youtube.com/embed/"+response.items[i].id.videoId;
    			resultContainer.appendChild(header);
     		}

      }
    });
  }
