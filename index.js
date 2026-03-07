function BIN(){
    const textos = document.getElementById("textos");
    const TEXTO1 = document.getElementById("TEXT1");
    let texto = textos.value;
let ascii = [];
let binario = [];

for (let i = 0; i < texto.length; i++) {
    let codigo = texto.charCodeAt(i); // ASCII
    ascii.push(codigo);

    binario.push(codigo.toString(2).padStart(8, "0")); // binario 8 bits
}

console.log(ascii + " <-- Código ASCII");
console.log(binario + " <-- Binario");
TEXTO1.textContent = binario;
}

function CLEAR(){
    const TEXTO1 = document.getElementById("TEXT1");
    const TEXTO2 = document.getElementById("TEXT2");
    const TEXTO3 = document.getElementById("TEXT3");
    TEXTO1.textContent = "";
    TEXTO2.textContent = "";
    TEXTO3.textContent = "";
    console.clear();
    const textos = document.getElementById("textos");
    textos.value = "";
}

function MORS(){
    const TEXTO2 = document.getElementById("TEXT2");
    const textos = document.getElementById("textos");
    let texto = textos.value.toLowerCase();
let morse = [];

const morseCode = {
    a: ".-", b: "-...", c: "-.-.", d: "-..", e: ".",
    f: "..-.", g: "--.", h: "....", i: "..", j: ".---",
    k: "-.-", l: ".-..", m: "--", n: "-.", o: "---",
    p: ".--.", q: "--.-", r: ".-.", s: "...", t: "-",
    u: "..-", v: "...-", w: ".--", x: "-..-", y: "-.--",
    z: "--..",
    "0": "-----","1": ".----","2": "..---","3": "...--",
    "4": "....-","5": ".....","6": "-....","7": "--...",
    "8": "---..","9": "----.",
    "=": "-...-", " ": "/", "+": ".-.-.", "-": "-....-", "*": "..-",
    "/": "-..-.", "(": "-.--.", ")": "-.--.-"
};

for (let i = 0; i < texto.length; i++) {
    morse.push(morseCode[texto[i]] || "?");
}

console.log(morse.join(" ") + " <-- Código Morse");
TEXTO2.textContent = morse.join(" ");
}

function SUPER(){
    const TEXTO3 = document.getElementById("TEXT3");

const textos = document.getElementById("textos");
let texto = textos.value.toLowerCase();

let ascii = [];
let binario = [];
let morse = [];
let SUPER = [];
let SUPER1 = [];

const morseCode = {
a: ".-", b: "-...", c: "-.-.", d: "-..", e: ".",
f: "..-.", g: "--.", h: "....", i: "..", j: ".---",
k: "-.-", l: ".-..", m: "--", n: "-.", o: "---",
p: ".--.", q: "--.-", r: ".-.", s: "...", t: "-",
u: "..-", v: "...-", w: ".--", x: "-..-", y: "-.--",
z: "--..",
"0": "-----","1": ".----","2": "..---","3": "...--",
"4": "....-","5": ".....","6": "-....","7": "--...",
"8": "---..","9": "----.",
" ": "/"
};

const BINMORSE = {
".-":"01100001","-...":"01100010","-.-.":"01100011","-..":"01100100",
".":"01100101","..-.":"01100110","--.":"01100111","....":"01101000",
"..":"01101001",".---":"01101010","-.-":"01101011",".-..":"01101100",
"--":"01101101","-.":"01101110","---":"01101111",".--.":"01110000",
"--.-":"01110001",".-.":"01110010","...":"01110011","-":"01110100",
"..-":"01110101","...-":"01110110",".--":"01110111","-..-":"01111000",
"-.--":"01111001","--..":"01111010","/":""
};

const morseToBin = {
".":"0",
"-":"1"
};

for (let i = 0; i < texto.length; i++) {

let char = texto[i];
let morseChar = morseCode[char]; // <- nombre distinto

morse.push(morseChar || "?");

let codigo = texto.charCodeAt(i);
ascii.push(codigo);

binario.push(codigo.toString(2).padStart(8,"0"));

if (morseChar){
let bin = [...morseChar].map(s => morseToBin[s]).join("");
SUPER1.push(bin);
}else{
SUPER1.push("?");
}

SUPER.push(BINMORSE[morseChar] || "?");

}

console.log("Morse:", morse.join(" "));
console.log("Super:", SUPER.join(" "));
console.log("Super1:", SUPER1.join(" "));
TEXTO3.textContent = SUPER1.join(" ");
}

let audioContext;
let analyser;
let data;

async function iniciar(){

    const stream = await navigator.mediaDevices.getUserMedia({audio:true});

    audioContext = new AudioContext();

    const source = audioContext.createMediaStreamSource(stream);

    analyser = audioContext.createAnalyser();
    source.connect(analyser);

    data = new Uint8Array(analyser.frequencyBinCount);

    detectar();

}

function detectar(){
    let bit1 = Math.round(Math.random());

        let osc = audioContext.createOscillator();

        osc.frequency.value = bit1 === 1 ? 400 : 400;

        osc.connect(audioContext.destination);

        osc.start();

    setTimeout(()=>{
            osc.stop();
        },150);
    setInterval(()=>{

        analyser.getByteFrequencyData(data);

        let suma = 0;

        for(let i=0;i<data.length;i++){
            suma += data[i];
        }

        let promedio = suma / data.length;

        let bit = promedio > 20 ? 1 : 0;
        bit = bit === 1 ? 0 : 1;
        
        document.getElementById("bitDetectado").textContent =
        "Bit detectado: " + bit;
    },100);

}

function generarBit(){

    let bit = Math.round(Math.random());

    let osc = audioContext.createOscillator();

    osc.frequency.value = bit === 1 ? 900 : 400;

    osc.connect(audioContext.destination);

    osc.start();

    setTimeout(()=>{
        osc.stop();
    },100);
    bit = bit === 1 ? 0 : 1;
    document.getElementById("bitGenerado").textContent =
    "Último bit generado: " + bit;
    console.log(bit);       
}

function REDIRECT(){
   window.location.href = "https://es.pornhub.com"
}
