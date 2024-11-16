
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
    if (text.includes("comment tu vas")) {
      p = document.createElement("p");
      p.classList.add("replay");
      p.innerText = "bien merci";

      texts.appendChild(p);

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
      p = document.createElement("p");
      p.classList.add("replay");
      p.innerText = "opening youtube channel";
      texts.appendChild(p);
      console.log("opening youtube");
      window.open("http://192.168.0.147:8000/iot/0/", "_blank", "location=no");
    }


    p = document.createElement("p");
  }
});

recognition.addEventListener("end", () => {
  recognition.start();
});

recognition.start();
