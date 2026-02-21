let player = "";

function start(){
  player = document.getElementById("playerName").value;
  if(!player) return;

  localStorage.setItem("player",player);
  document.getElementById("login").classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");
  document.getElementById("playerLabel").innerText="Player: "+player;

  loadCharacters();
  changeMode();
}

function loadCharacters(){
fetch("characters.json")
.then(r=>r.json())
.then(data=>{
  const list=document.getElementById("chars");
  list.innerHTML="";
  data.forEach(c=>{
    const div=document.createElement("div");
    div.className="card";
    div.innerHTML=`
      <img src="${c.image}">
      <h4>${c.name}</h4>
      <p>${c.power}</p>`;
    div.onclick=()=>addToTeam(div.innerHTML);
    list.appendChild(div);
  });
});
}

function changeMode(){
  const mode=document.getElementById("mode").value;
  const form=document.getElementById("formation");
  form.innerHTML="";
  for(let i=0;i<mode;i++){
    const s=document.createElement("div");
    s.className="slot";
    s.onclick=()=>s.innerHTML="";
    form.appendChild(s);
  }
  loadTeam();
}

function addToTeam(html){
  const slots=document.querySelectorAll(".slot");
  for(let s of slots){
    if(!s.innerHTML){
      s.innerHTML=html;
      saveTeam();
      return;
    }
  }
}

function saveTeam(){
  const mode=document.getElementById("mode").value;
  const team=[];
  document.querySelectorAll(".slot").forEach(s=>team.push(s.innerHTML));
  localStorage.setItem("team_"+player+"_"+mode,JSON.stringify(team));
}

function loadTeam(){
  const mode=document.getElementById("mode").value;
  const data=JSON.parse(localStorage.getItem("team_"+player+"_"+mode)||"[]");
  const slots=document.querySelectorAll(".slot");
  data.forEach((d,i)=>{
    if(slots[i]) slots[i].innerHTML=d;
  });
}

window.onload=()=>{
  const saved=localStorage.getItem("player");
  if(saved){
    document.getElementById("playerName").value=saved;
  }
}
