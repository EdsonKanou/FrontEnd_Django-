async function postJSON(donnees) {
  try {
    const reponse = await fetch("http://192.168.8.101:8000/iot/1/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(donnees),
    });

    const resultat = await reponse.json();
    console.log("Réussite :", resultat);
  } catch (erreur) {
    console.error("Erreur :", erreur);
  }
}

const data = {
  nom: 'ampouleREact',
  position: 'salon',
  state: 1,
};
const dataoff = {
  nom: 'ampouleREact',
  position: 'salon',
  state: 0,
};



const texts = document.querySelector(".texts");

window.SpeechRecognition =
window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;

var p = document.createElement("p");


recognition.addEventListener("result", (e) => {
texts.appendChild(p);
const text = Array.from(e.results)
  .map((result) => result[0])
  .map((result) => result.transcript)
  .join("");

p.innerText = text;
if (e.results[0].isFinal) {
  if (text.includes("lucie")||
    text.includes("Lucie")||
    text.includes("lucy")) {
    p = document.createElement("p");
    p.classList.add("replay");
    p.innerText = "oui bonjour ";
    postJSON(dataoff);
    texts.appendChild(p);

  }
  if (text.includes("STOP")||
    text.includes("eteins")||
    text.includes("arrete")||
    text.includes("sombre")||
    text.includes("bloque")||
    text.includes("off")||
    text.includes("arrête")||
    text.includes("éteins")||
    text.includes("éteindre")) {
    p = document.createElement("p");
    p.classList.add("replay");
    p.innerText = "OKAY C'EST ETIENT";
    postJSON(dataoff);

    texts.appendChild(p);

  }
  if (text.includes("la salle est sombre")||
    text.includes("active")||
    text.includes("lumière")||
    text.includes("on")||
    text.includes("allumer")||
    text.includes("noir")||
    text.includes("off")) {
    p = document.createElement("p");
    p.classList.add("replay");
    p.innerText = "okay j'allume";
    postJSON(data);

    texts.appendChild(p);

  }
  if (text.includes("ampoule")) {
      postJSON(data);
      }
  if (
    text.includes("yo") ||
    text.includes("bonjour")
  ) {


      p = document.createElement("p");
    //   fetch(`http://127.0.0.1:5000/search/${text}`).then(
    //   (res) => {
    //     const resultat = res.json()
    //     resultat.then((value) =>{
    //       const reponse =  value.message
    //       console.log(reponse)
    //       p.classList.add("replay");
    //       p.innerText = reponse;
    //     } )
    //   }
    // ).catch()

    async function search(htmlElem) {
      const response = await fetch(`http://127.0.0.1:5000/speechss/${text}`);
      const resultat = await response.json();
      const reponse = resultat.message;
      htmlElem.classList.add("replay");
      htmlElem.innerText = reponse;
    }

    search(p);

    texts.appendChild(p);
    utterance.text =reponse;
    SpeechSynthesis.speak(utterance);
  }
  if (text.includes("ampoule")) {
      postJSON(dataoff);

    p = document.createElement("p");
    p.classList.add("replay");
    p.innerText = "etat de l'ampoule change";
    //texts.appendChild(p);
    //console.log("opening youtube");
    //window.open("http://192.168.0.147:8000/iot/0/", "_blank", "location=no");
  }


  p = document.createElement("p");
}
});

recognition.addEventListener("end", () => {
recognition.start();
});

recognition.start();
