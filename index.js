
createExperience();
projectView();



function projectView(){
  Array.from(document.getElementsByClassName('hint')).forEach((item, i) => {
    //item = tr[class="hint"]
    item.previousElementSibling.addEventListener("click", function(){
      //fermeture de tout autre "hint" "éventuelle"
      Array.from(document.getElementsByClassName('hint')).forEach((item, i) => {
        let prev = item.previousElementSibling;
        if(prev != this && prev.classList.contains('selected')){
          prev.classList.remove('selected');
          let svgTrans = prev.lastElementChild.lastElementChild.style.transform;
          let deg = parseInt(svgTrans.substr(7,2));
          (deg) ? deg = (deg+45)%90 : deg = 45;
          svgTrans = 'rotate('+deg+'deg)';
        }
        item.style.display = "none";
      });
      if(this.classList.contains('selected')){
        this.classList.remove('selected');
      }else{
        item.style.display ="table-row";
        this.classList.add('selected');
        this.scrollIntoView({
           behavior: 'smooth',
           block: 'center',
           inline: 'center'
       });
      }
      let svgTrans = this.lastElementChild.lastElementChild.style.transform;
      let deg = parseInt(svgTrans.substr(7,2));
      (deg || typeof deg == "NaN") ? deg = (deg+45)%90 : deg = 45;
      this.lastElementChild.lastElementChild.style.transform = 'rotate('+deg+'deg)';
    });
  });
  //Rendre Camouflable les partie
  Array.from(document.getElementsByClassName('Title')).forEach((item, i) => {
    item.addEventListener('click', function(){
      let next = this.nextElementSibling;
      if(getComputedStyle(next).height == "0px"){
        this.lastElementChild.style.transform='rotate(90deg)';
        next.classList.remove("close");
      }else{
        this.lastElementChild.style.transform='rotate(0deg)'
        next.classList.add("close");
      }
    });
  });
}

function createExperience(){
  let tabPro = document.getElementById('Exp-Row');
  for (let e in exp) {
    // console.log(exp[e]);
    //info global
    let tr = document.createElement('tr');
    //Date
    let td = document.createElement('td');
    td.classList.add('date');
    td.innerHTML = exp[e]["DateDébut"]
    if(exp[e]["DateFin"]){
      td.innerHTML = td.innerHTML+"-"+exp[e]["DateFin"];

    }
    tr.appendChild(td);
    //Description simple
    td = document.createElement('td');
    td.classList.add("desc");
    let p = document.createElement("p");
    p.innerHTML = exp[e]["Titre"];
    let img = document.createElement('img');
    img.setAttribute("src", "./svg/add.svg");
    img.setAttribute("alt", "more");
    td.appendChild(p);
    td.appendChild(img);
    tr.appendChild(td);

    //info plus précise
    let trhint = document.createElement('tr');
    trhint.classList.add("hint");
    td = document.createElement('td');
    td.classList.add('skill');
    let ul = document.createElement("ul");
    ul.setAttribute('class', 'skill');
    let li = document.createElement('li');
    li.classList.add('title');
    li.innerHTML = "Compétences Développés :";
    ul.appendChild(li);
    for(let l in exp[e]["Compétences"]){
      exp[e]["Compétences"][l].forEach((item, i) => {
        li = document.createElement('li');
        li.classList.add(l);
        li.innerHTML = item;
        if(typeof item == "object"){
          let subUL = document.createElement('ul');
          for(let l2 in item){
            li.innerHTML = l2+" :";
            item[l2].forEach((item, i) => {
              let subLi = document.createElement('li');
              subLi.innerHTML = item;
              subUL.appendChild(subLi);
            });
            li.appendChild(subUL);
          }
        }
        ul.appendChild(li)
      });
    }
    td.appendChild(ul);
    trhint.appendChild(td);
    td = document.createElement('td');
    td.classList.add('desc');
    ul = document.createElement('ul');
    li = document.createElement('li');
    li.classList.add('title');
    li.innerHTML = "Description :";
    ul.appendChild(li);
    li = document.createElement('li');
    p = document.createElement('p');
    p.innerHTML = exp[e]["Description"];
    li.appendChild(p);
    ul.appendChild(li);
    td.appendChild(ul);
    trhint.appendChild(td);

    tabPro.appendChild(tr);
    tabPro.appendChild(trhint);
  }
}
