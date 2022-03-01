const grid = document.querySelector('.grid');
const scoreDsiplay = document.getElementById('score')
const width = 8
const squares = []
let score = 0



const candyColors = [
    'red',
    'yellow',
    'orange',
    'purple',
    'green',
    'blue',
]


// Creat Board
function createBoard(){
    for(let i = 0; i < width*width; i++){
        const square = document.createElement('div');
        let randomColor = Math.floor(Math.random() * candyColors.length)
        square.style.backgroundColor = candyColors[randomColor]
        square.setAttribute('draggable', true)
        square.setAttribute('id', i)
        grid.appendChild(square)
        squares.push(square)
    }
}
createBoard()

// Drag the candies

let colorBeingDragged
let colorBeingReplaced
let squareIdBeingReplaced
let squareIdBeingDragged

squares.forEach(square => square.addEventListener('dragstart', dragStart))
squares.forEach(square => square.addEventListener('dragend', dragEnd))
squares.forEach(square => square.addEventListener('dragover', dragover))
squares.forEach(square => square.addEventListener('dragenter', dragEnter))
squares.forEach(square => square.addEventListener('dragleave', dragLeave))
squares.forEach(square => square.addEventListener('drop', dragDrop))

function dragStart(){
    colorBeingDragged = this.style.backgroundColor
    squareIdBeingDragged = parseInt(this.id)
    
    console.log(colorBeingDragged)
    console.log(this.id,'dragStart')
}
function dragover(e){
    e.preventDefault()
    console.log(this.id,'dragover')
    
}
function dragEnter(e){
    e.preventDefault()
    
    console.log(this.id,'dragEnter')
    
}
function dragLeave(){
    console.log(this.id,'dragLeave')
    
}
function dragDrop(){
    console.log(this.id,'dragDrop')
    colorBeingReplaced = this.style.backgroundColor
    squareIdBeingReplaced = parseInt(this.id)
    squares[squareIdBeingDragged].style.backgroundColor = colorBeingReplaced
    squares[squareIdBeingReplaced].style.backgroundColor = colorBeingDragged
    
}
function dragEnd(){
    console.log(this.id,'dragEnd')
    // what is a valid move ?

    let validMoves = [
        squareIdBeingDragged -1,
        squareIdBeingDragged -width,
        squareIdBeingDragged +1,
        squareIdBeingDragged +width,
    ]

    let valiMove = validMoves.includes(squareIdBeingReplaced)

    if (squareIdBeingReplaced && valiMove){
        squareIdBeingReplaced = null
    } else if (squareIdBeingReplaced && !valiMove){
        squares[squareIdBeingReplaced].style.backgroundColor = colorBeingReplaced
        squares[squareIdBeingDragged].style.backgroundColor = colorBeingDragged
    }else squares[squareIdBeingDragged].style.backgroundColor = colorBeingDragged

    
}

//check for Three

function checkRowForThree(){
    for (i=0; i <= 61 ;i++ ){
        let rowOfThree = [i , i+1 ,i+2]
        let decidedColor = squares[i].style.backgroundColor
        const isBlank = squares[i].style.backgroundColor ===''
        const notValid = [6,7,14,15,22,23,30,31,38,39,46,47,54,55]

        if (notValid.includes(i)) continue

        if(rowOfThree.every(index =>squares[index].style.backgroundColor === decidedColor && !isBlank )){
            score += 3
            scoreDsiplay.innerHTML = score

            rowOfThree.forEach(index => {
                squares[index].style.backgroundColor = ''
            })
        }

    }
}

function checkcolumnForThree(){
    for (i=0; i <= 47 ;i++ ){
        let columnOfThree = [i , i+width ,i+width*2]
        let decidedColor = squares[i].style.backgroundColor
        const isBlank = squares[i].style.backgroundColor ===''

        if(columnOfThree.every(index =>squares[index].style.backgroundColor === decidedColor && !isBlank )){
            score += 3
            scoreDsiplay.innerHTML = score

            columnOfThree.forEach(index => {
                squares[index].style.backgroundColor = ''
            })
        }

    }
}

//check for Four

function checkRowForFour(){
    for (i=0; i <= 60 ;i++ ){
        let rowOfFour = [i , i+1 ,i+2, i+3]
        let decidedColor = squares[i].style.backgroundColor
        const isBlank = squares[i].style.backgroundColor ===''
        const notValid = [5,6,7,13,14,15,21,22,23,29,30,31,37,38,39,45,46,47,53,54,55]

        if (notValid.includes(i)) continue

        if(rowOfFour.every(index =>squares[index].style.backgroundColor === decidedColor && !isBlank )){
            score += 4
            scoreDsiplay.innerHTML = score
            rowOfFour.forEach(index => {
                squares[index].style.backgroundColor = ''
            })
        }

    }
}
function checkcolumnForFour(){
    for (i=0; i <= 40 ;i++ ){
        let columnOfFour = [i , i+width ,i+width*2,i+width*3]
        let decidedColor = squares[i].style.backgroundColor
        const isBlank = squares[i].style.backgroundColor ===''

        if(columnOfFour.every(index =>squares[index].style.backgroundColor === decidedColor && !isBlank )){
            score += 4
            scoreDsiplay.innerHTML = score
            columnOfFour.forEach(index => {
                squares[index].style.backgroundColor = ''
            })
        }

    }
}

function moveDown(){
    for(i=0; i < 55; i++){
        
        if (squares[i+width].style.backgroundColor ===''){
            console.log(i)
            squares[i + width].style.backgroundColor = squares[i].style.backgroundColor
            squares[i].style.backgroundColor = ''

            const firstRow = [0,1,2,3,4,5,6,7]
            const isFirstRow = firstRow.includes(i)
            if(isFirstRow && squares[i].style.backgroundColor===''){
                let randomColor = Math.floor(Math.random()*candyColors.length)
                squares[i].style.backgroundColor = candyColors[randomColor]
            }
        }
    }
}
window.setInterval(() => {
    checkRowForFour(),checkcolumnForFour(),
    checkRowForThree(),checkcolumnForThree(),
    moveDown()
},100)
