// Globle Declaration 

let elem = document.getElementsByClassName("fa-copy");
let keyValue = document.getElementById("encode-key-value");
let KeyInput = document.getElementById("key-input");
let keyArray = [];
let encodeOutput = document.getElementById("encode-output");
let decodeInput = document.getElementById("decode-input");
let lstCount;
let grtCount;
let logicTest = [];
let _2ndLogicValue = [];
let _3rdLogicValue = [];
let finalAsciiEncodeValue = [];
let decodeAciiValue = [];
let finalAsciiDecodeValue = [];
let keyAsciiValue = [];
let logicCode = [220,221,222,223,224,225,226,227,228,229,230];

// key generating function 

function generateKey() {
    let keyAni = document.getElementById("key-ani"); 
    if(keyValue.innerHTML == "none") {
       // do nothing...
    }
    else {
        keyAni.classList.remove("fa-copy");
    }
    
    for(i=0; i<19; i++) {  // total key
        var rand = 48 + Math.floor((Math.random() * 74)); // random ascii key between 48 to 122 
        var key = String.fromCharCode(rand); // assign ascii key into character 
        if((rand >= 48  &&  rand <= 57) || (rand >=65 && rand <= 90) || (rand >= 97 && rand <= 122)) { // check if it is number or lower or upper character 
            if(i == 4 || i == 9 || i == 14) { 
                keyArray[i] = '-';
            }
            else {
                keyArray[i] = key;
            }
        }
        else {
            i--;
            //console.log(rand + " " + key + " " + "other character");
        }
    }
    keyValue.innerHTML = "";
    keyValue.style.color = "white";
    let j = 0;
    
    function typingAnimation() {
        if(j < keyArray.length) {
            keyValue.innerHTML += keyArray[j];
            j++;
            keyAni.classList.add("key-loading");
            setTimeout(typingAnimation, 100);
        }
        else {
            keyAni.classList.add("fas");
            keyAni.classList.add("fa-copy");
            keyAni.classList.remove("key-loading");
            elem[0].addEventListener("click", copy);
        }
    }
    typingAnimation();
}



function copy() {
    KeyInput.value = keyValue.innerHTML; 
    KeyInput.select();
    document.execCommand("copy");
}


function encode() {
    let encodeInput = document.getElementById("encode-input").value;
    let encodeInputLength = encodeInput.length;
    let keyArrayLength = keyArray.length;
    let encodeValue = [];
    let encodeAsciiValue = [];
    let j = 0;
    let finalEncodeOut = [];
    let checkRange;
    let _2ndLogicTest;
    let _3rdLogicTest;
    let incr = 0;
 

    if(keyValue.innerHTML == "none") {
        generateKey();
    }

    for(i=0; i< keyArrayLength; i++) {
        keyAsciiValue[i] = keyArray[i].charCodeAt();  
    }

    for(i=0; i < encodeInputLength; i++ ) {
        encodeValue[i] = encodeInput[i];
    }
    
    for(i=0; i< encodeInputLength; i++) {
        encodeAsciiValue[i] = encodeValue[i].charCodeAt();
    }

    

    for(i = 0, l = 0; l < encodeInputLength; i++, l++) {

        if(j >= keyArrayLength) {
            j = 0;
        }
 
        finalAsciiEncodeValue[i] = Math.round((encodeAsciiValue[l] * keyAsciiValue[j]) / keyAsciiValue[keyArrayLength - j - 1]);
        j++;




        if(finalAsciiEncodeValue[i] >= 33 && finalAsciiEncodeValue[i] <= 126) {
            finalEncodeOut[i] = String.fromCharCode(finalAsciiEncodeValue[i]); 
        }
        else if(finalAsciiEncodeValue[i] > 126) {
            for(grtCount = 1; true ; grtCount++) {
                _2ndLogicTest =  (grtCount * keyAsciiValue[4]);
                checkRange = finalAsciiEncodeValue[i] - _2ndLogicTest;

                if(checkRange >= 33 && checkRange <= 126) {
                    finalEncodeOut[i] = String.fromCharCode(178);
                    i++;
                    incr++;
                    finalEncodeOut[i] = String.fromCharCode(logicCode[grtCount]);
                    i++;
                    incr++; 
                    finalEncodeOut[i] = String.fromCharCode(checkRange);
                    break;
                }
                else {
                    console.log("2nd logic not working....");
                }
            }
        }

        else if(finalAsciiEncodeValue[i] < 33) {
            for(lstCount = 1; true ; lstCount++) {
                _3rdLogicTest = lstCount * keyAsciiValue[4];
                checkRange = finalAsciiEncodeValue[i] + _3rdLogicTest;

                if(checkRange >= 33 && checkRange <= 126) {
                    finalEncodeOut[i] = String.fromCharCode(179);
                    i++;
                    incr++;
                    finalEncodeOut[i] = String.fromCharCode(logicCode[lstCount]);
                    i++;
                    incr++;
                    finalEncodeOut[i] = String.fromCharCode(checkRange); 
                    break;
                }
                else {
                    console.log("3rd logic not working....");
                }
            }
        }

        else {
            // no code
            console.log("not working..." + finalAsciiEncodeValue[i]);
            break;
        } 

    }


    encodeOutput.innerHTML = "";

    let count = 0;

    function encodeOutputAni() {
        encodeAni = document.getElementById("encode-btn-ani");
        encodeOutputCopy = document.getElementById("encode-output-copy");
        if(count < finalEncodeOut.length) {
            encodeOutput.style.display = "block";
            encodeOutput.innerHTML += finalEncodeOut[count];
            count++;
            encodeAni.classList.add("loading-ani");
            setTimeout(encodeOutputAni, 10);
        }
        else {
            encodeOutputCopy.classList.add("fas");
            encodeOutputCopy.classList.add("fa-copy");
            encodeAni.classList.remove("loading-ani");
            elem[1].addEventListener("click", copyEncodeOutput);
        }
    }
    encodeOutputAni();

}

function copyEncodeOutput() {
    decodeInput.value = encodeOutput.firstChild.nodeValue;
    decodeInput.select();
    document.execCommand("copy");
}


function decode() {
    let decodeKeyInfo = document.getElementById("decode-key-info");
    let decodeInputLength = decodeInput.value.length;
    let keyArrayLength = KeyInput.value.length;
    let decodeKeyAsciiValue = [];
    let decodeValue = [];
    let decodeAciiValue = [];
    let finalDecodeOut = [];
    let decodeKeyArray = [];
    let j = 0;
    let decodeOutput = document.getElementById("decode-output");
    let testCode = [220,221,222,223,224,225,226,227,228,229,230];
    let logic;




    if(KeyInput.value == "") {
        decodeKeyInfo.innerHTML = "The key field is required.";
    }
    else if((KeyInput.value[4] != '-') && (KeyInput.value[9] != '-') && (KeyInput.value[14] != '-')) {
        decodeKeyInfo.innerHTML = "The Key is not valid.";
    }
    else {
        decodeKeyInfo.innerHTML = "";
    }



    for(i =0; i < decodeInputLength; i++) {
        decodeValue[i] = decodeInput.value[i];
        console.log(decodeValue);
    }
    for(i = 0; i < decodeInputLength; i++) {
        decodeAciiValue[i] = decodeValue[i].charCodeAt();
        console.log(decodeAciiValue);
    }
    for(i = 0; i < keyArrayLength; i++) {
        decodeKeyAsciiValue[i] = KeyInput.value[i].charCodeAt();
        console.log(decodeKeyAsciiValue);
    }


    for(i = 0, l = 0; i < decodeInput.value.length; i++, l++) {
        if(decodeInput.value[i] == String.fromCharCode(178)) {
            i++;
            for(k=1; k<testCode.length; k++) {
                if(decodeInput.value[i] == String.fromCharCode(testCode[k])) {
                    logic = k;
                    i++;
                    break;
                }
            }

            decodeAciiValue[i] = decodeAciiValue[i] + (logic * decodeKeyAsciiValue[4]);

            if(j >= keyArrayLength) {
                j = 0;
            }

            finalAsciiDecodeValue[l] = Math.round((decodeAciiValue[i] * decodeKeyAsciiValue[keyArrayLength - j - 1]) / decodeKeyAsciiValue[j]);
            j++;

            finalDecodeOut[l] = String.fromCharCode(finalAsciiDecodeValue[l]);

        }

        else if(decodeInput.value[i] == String.fromCharCode(179)) {
            i++;
            for(k=1; k<testCode.length; k++) {
                if(decodeInput.value[i] == String.fromCharCode(testCode[k])) {
                    logic = k;
                    i++;
                    break;
                }
            }

            decodeAciiValue[i] = decodeAciiValue[i] - (logic * decodeKeyAsciiValue[4]);

            if(j >= keyArrayLength) {
                j = 0;
            }

            finalAsciiDecodeValue[l] = Math.round((decodeAciiValue[i] * decodeKeyAsciiValue[keyArrayLength - j - 1]) / decodeKeyAsciiValue[j]);
            j++;

            finalDecodeOut[l] = String.fromCharCode(finalAsciiDecodeValue[l]);
        }

        else {
            if(j >= keyArrayLength) {
                j = 0;
            }
    
            finalAsciiDecodeValue[l] = Math.round((decodeAciiValue[i] * decodeKeyAsciiValue[keyArrayLength - j - 1]) / decodeKeyAsciiValue[j]);
            j++;

            finalDecodeOut[l] = String.fromCharCode(finalAsciiDecodeValue[l]);
        } 


        
    }

    decodeOutput.innerHTML = "";

    let count = 0;

    function decodeOutputAni() {
        let decodeAni = document.getElementById("decode-btn-ani");

        if(count < finalDecodeOut.length) {
            decodeOutput.style.display = "block";
            decodeOutput.innerHTML += finalDecodeOut[count];
            count++;
            decodeAni.classList.add("loading-ani");
            setTimeout(decodeOutputAni, 50);
        }
        else {
            decodeAni.classList.remove("loading-ani");
            decoding.innerHTML = "Decoding...";
        }
    }

    console.log("finalAciiDecodeValue : " + finalAsciiDecodeValue);

    decodeOutputAni();
    

}

