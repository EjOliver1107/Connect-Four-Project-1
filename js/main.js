/*----- constants -----*/
const lookup = {
    '1': '#5af287',
    '-1': '#C600EB',
    'null': 'white'
};



/*----- app's state (variables) -----*/
let board;
let turn;
let winner;

/*----- cached element references -----*/
const slots = document.querySelectorAll('td');
const message = document.querySelector('footer h1');
const rows = document.querySelectorAll('tr');
// const column = document.querySelector('td div')
/*----- event listeners -----*/
document.querySelector('table').addEventListener('click', handleMove);


/*----- functions -----*/
for(let i = 0; i < slots.length; i++){
    slots[i].addEventListener('click', (evt) => {
        console.log(`${evt.target.parentElement.rowIndex}`, `${evt.target.cellIndex}`);
    });
}

init();

function init() {
    board = [
        [null, null, null ,null ,null , null , null],
        [null, null, null ,null ,null , null , null],
        [null, null, null ,null ,null , null , null],
        [null, null, null ,null ,null , null , null],
        [null, null, null ,null ,null , null , null],
        [null, null, null ,null ,null , null , null],
    ];
    turn = 1;
    handleMove();
}
function handleMove(evt) {
    let location = []
    let column = evt.target.cellIndex;
    let row = []
    
    for (i = 5; i > -1; i--){
        if (board[i][column] === null && turn === 1) {
            // location.push(rows[i].children[cell])
            slots.style.backgroundColor = lookup['1'];
            turn *= -1
        }
    }
    board[i][cell] = turn;
    render(location);
}
 




function render () {

}