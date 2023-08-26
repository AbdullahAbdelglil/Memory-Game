// all thing belong to splash screen
let ctrl_btn_span=document.querySelector(".control-button span");
let ctrl_btn_input=document.querySelector(".control-button input");
let info_name =document.querySelector(".info_container .name");
let info_tries =document.querySelector(".info_container .tries");
let splash_screen =document.querySelector(".control-button");
let loser_screen=document.querySelector(".loser-screen");
let player_name;
function getname()
{
player_name=ctrl_btn_input.value;
}getname();

ctrl_btn_span.onclick=function()
{
    if(player_name === '') 
    alert("Enter Your Name To Start 😠");
    else
    {
    ctrl_btn_span.innerHTML="Loading ";
    setInterval(()=>{ctrl_btn_span.innerHTML+="."},500);
    setTimeout(()=>{splash_screen.remove()},2000);
    setTimeout(()=>{
        info_name.innerHTML+=player_name; 
        counetDown(1);
    },2000);
    ctrl_btn_input.value='';
    }
}

//Game Varibels
let duration = 1000;

let blocks_container = document.querySelector(".game_container");

let blocks = Array.from(blocks_container.children);

let orderRange = [...Array(blocks.length).keys()];
shuffle(orderRange);
// add order Css property to blocks
blocks.forEach((block,index)=>{
    block.style.order=orderRange[index];

    block.addEventListener('click',function (){
        flib_block(block);
    })
})

//creat shuffel array
function shuffle(array)
{
    let l = array.length-1,
    tmp,
    random;
    while(l > 0)
    {
        random = Math.floor(Math.random()*l);
        tmp = array[l];
        array[l] = array[random];
        array[random] = tmp;
        l--;
    }
    return array;
}
//fleb bloock function
function flib_block(selectedBlock){
    // add class is flipped

    selectedBlock.classList.add("is-flipped");

    // collect all flipped classess

    let FlippedBlocks = blocks.filter(flippedBlock=>flippedBlock.classList.contains("is-flipped"));

    if(FlippedBlocks.length === 2)
    {
        // stop clicking for all blocks
        stopClicking();
        // check matched blocks
        checkMatchedBlocks(FlippedBlocks[0],FlippedBlocks[1]);
    }
} 

function stopClicking(){
    blocks_container.classList.add("no-clicking");
    setTimeout((()=>{
        blocks_container.classList.remove("no-clicking");
    }),duration);
}

let counter = 0;
let succesCounter=0;
function checkMatchedBlocks(first,second){
    
    let tries_elm = document.querySelector(".tries span");
    
    if(first.dataset.tech===second.dataset.tech)
    {
        succesCounter++;

        first.classList.remove("is-flipped");
        second.classList.remove("is-flipped");

        first.classList.add("has-match");
        second.classList.add("has-match");
        setTimeout(()=>{
            document.getElementById("success").play();
        },50)
    }
    else
    {
        setTimeout(()=>{
            document.getElementById("fail").play();
        },50)
        counter++;
        setTimeout(()=>{
        tries_elm.innerHTML=counter; 
        first.classList.remove("is-flipped");
        second.classList.remove("is-flipped");
        },duration);

            
        
    }
    if(succesCounter===10)
{
    clearInterval(countDownInterval);
    setTimeout(()=>{
        document.getElementById("complete").play();
    },duration);
    setTimeout(()=>{
        playAgainScreen();
    },duration*2);
    
}
}

let countDownInterval;
sec=60;
function counetDown(time){
    countDownInterval=setInterval(()=>{
        sec--;
        if(time==0&&sec==0)
        {
        clearInterval(countDownInterval);
        setTimeout(()=>{
            loser();
            document.querySelector("#loser").play();
        },duration);
        setTimeout(()=>{
            playAgainScreen();
        },3000);

        }
        document.querySelector(".timer #min").innerHTML=`0${time} : `;
        document.querySelector(".timer #sec").innerHTML= (sec>=10) ? `${sec}`:`0${sec}`;
        if(sec==0){
        time--;
        sec=60;
        }
        if(time==0&&sec==4){
            document.getElementById("timer").play();
        }
    },duration);
}
function playAgainScreen(){
    setTimeout(()=>{
        document.querySelector(".repet-screen").style.display="block";
    },2000);
    stopClicking();
}
function playAgain(){
    document.querySelector("#yes").innerHTML="Loading ";
    setInterval(()=>{
        document.querySelector("#yes").innerHTML+=".";
    },500)
    setTimeout(()=>{
        location.reload();
    },1500);
}
function cansel(){
        document.querySelector(".repet-screen").style.display="none";
        stopClicking();
}
function loser(){
        loser_screen.style.display="block";
        setTimeout(()=>{loser_screen.style.display="none";},2500);
        blocks_container.classList.add("no-clicking");
        
}