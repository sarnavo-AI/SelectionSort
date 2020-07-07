const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const generateArray = document.getElementById('array-generate');
const toggleBtn = document.getElementById('toggle-btn');

canvas.height = 450;
canvas.width = 800;

let strokeWidth = 2.5;
let lineGap = 5;
let strokeColor = "#F2F2F2";

let array = [];
let arrayIndex = 0;

let cancelReq;

let i = 0;
let j = i + 1;
let pos = i;

arrayIndex = 0;

function animate() {

    

    for(let a = i; a < array.length - 1; a++) {

        c.clearRect(0, 0, canvas.width, canvas.height);

        if(i < array.length - 1) {
            if(array[pos] > array[j]) {
                pos = j;
            }
            j++;
            if(j >= array.length) {
                let temp = array[i];
                array[i] = array[pos];
                array[pos] = temp;
                i++;
                j = i + 1;
                pos = i;
            }
        }
    
        for(let i = 2; i < canvas.width; i += lineGap) {
            c.beginPath();
            c.moveTo(i, 0);
            c.lineTo(i, array[arrayIndex]);
            c.lineWidth = strokeWidth;
            c.strokeStyle = strokeColor;
            c.stroke();
            arrayIndex++;
        }
        arrayIndex = 0;
    }  

    if(i >= array.length - 1) {
        clearInterval(cancelReq);
    }  
}

generateArray.addEventListener('click', () => {
    clearInterval(cancelReq);
    c.clearRect(0, 0, canvas.width, canvas.height);
    toggleBtn.textContent = 'START';
    array = [];
    i = 0;
    j = i + 1;
    pos = i;
    arrayIndex = 0;
    for(let i = 2; i < canvas.width; i += lineGap) {
        c.beginPath();
        c.moveTo(i, 0);
        array.push(Math.random() * canvas.height);
        c.lineTo(i, array[arrayIndex]);
        c.lineWidth = strokeWidth;
        c.strokeStyle = strokeColor;
        c.stroke();
        arrayIndex++;
    }

});

toggleBtn.addEventListener('click', () => {
    if(toggleBtn.textContent == 'START') {
        toggle();
    }
    else if(toggleBtn.textContent == 'PLAY') {
        toggle();
    }
    else {
        toggleBtn.textContent = 'PLAY';
        clearInterval(cancelReq);
    }

});

function toggle() {
    toggleBtn.textContent = 'PAUSE';
    clearInterval(cancelReq);
    animate();
    cancelReq = setInterval(animate, 0.1);
}

/*
for(let i = 0; i < array.length - 1; i++) {
    let pos = i;
    for(let j = i + 1; j < array.length; j++) {
        if(array[pos] > array[j]) {
            pos = j;
        }
    }
    let temp = array[i];
    array[i] = array[pos];
    array[pos] = temp;
}
*/