// const { render } = require("ejs");

// const socket = io();
// //emit means bhejna

// const chess=new Chess();
// const boardElement=document.querySelector('.chessboard');

// let draggedPiece = null;
// let sourceSquare = null;
// let PlayerRole= null;

// const renderBoard=()=>{
//   const board=chess.board();
//   boardElement.innerHTML='';
//   board.forEach((row,rowindex)=>{
//     row.forEach((square,squareindex)=>{
//       const squareElement=document.createElement('div');
//       squareElement.classList.add(
//         "square",
//         (rowindex+squareindex)%2==0 ? 'light':'dark'
//       );
//       squareElement.dataset.row=rowindex;
//       squareElement.dataset.col=squareindex;

//       if(square){
//         const pieceElement=document.createElement("div");
//         pieceElement.classList.add(
//           "piece",
//           square.color==="w"?"white":"black");
//           pieceElement.draggable = true; 
//           pieceElement.addEventListener("dragstart",(e)=>{
//             if(pieceElement.draggable){
//               draggedPiece=pieceElement;
//               sourceSquare={row : rowindex,col:squareindex};
//                 e.dataTransfer.setData("text/plain","");
//             }
//           });
//           pieceElement.addEventListener("dragend",(e)=>{
//             draggedPiece=null;
//             sourceSquare=null;
//           });
//           squareElement.appendChild(pieceElement)
//       }
//       squareElement.addEventListener("dragover",function(e){
//         e.preventDefault();
//       });
//       squareElement.addEventListener("drop",function(e){
//         e.preventDefault();
//         if(draggedPiece){
//           const targetSource={
//             row:parseInt(squareElement.dataset.row),
//             col:parseInt(squareElement.dataset.col),
//           };
//           handleMove(sourceSquare,targetSource);
//         }
         
//       });
//       boardElement.appendChild(squareElement);
//     });
    
//   });
  
   
// };
// const handleMove=()=>{};

// const getpieceUnicode=()=>{};

// renderBoard();
// const socket = io(); // Emit means "bhejna"

// const chess = new Chess();
// const boardElement = document.querySelector('.chessboard');

// let draggedPiece = null;
// let sourceSquare = null;
// let playerRole=null;

// const renderBoard = () => {
//   const board = chess.board();
//   boardElement.innerHTML = '';

//   if(playerRole==="b"){
//     boardElement.classList.add("flipped");
//   }
//   else{
//     boardElement.classList.remove("flipped")
//   }
//   board.forEach((row, rowIndex) => {
//     row.forEach((square, squareIndex) => {
//       const squareElement = document.createElement('div');
//       squareElement.classList.add(
//         'square',
//         (rowIndex + squareIndex) % 2 === 0 ? 'light' : 'dark'
//       );
//       squareElement.dataset.row = rowIndex;
//       squareElement.dataset.col = squareIndex;

//       if (square) {
//         const pieceElement = document.createElement("div");
//         pieceElement.classList.add(
//           "piece",
//           square.color === "w" ? "white" : "black"
//         );
//         pieceElement.innerText = getSquareId(square);  // Corrected to extract piece type

//         pieceElement.draggable=playerRole===square.color;
//         // pieceElement.draggable = true;  // Make piece draggable

//         pieceElement.addEventListener("dragstart", (e) => {
//           if (pieceElement.draggable) {
//             draggedPiece = pieceElement;
//             sourceSquare = { row: rowIndex, col: squareIndex };
//             e.dataTransfer.setData("text/plain", "");
//           }
//         });

//         pieceElement.addEventListener("dragend", (e) => {
//           draggedPiece = null;
//           sourceSquare = null;
//         });

//         squareElement.appendChild(pieceElement);
//       }

//       squareElement.addEventListener("dragover", (e) => {
//         e.preventDefault();
//       });

//       squareElement.addEventListener("drop", (e) => {
//         e.preventDefault();
//         if (draggedPiece) {
//           const targetSquare = {
//             row: parseInt(squareElement.dataset.row),
//             col: parseInt(squareElement.dataset.col),
//           };
//           handleMove(sourceSquare, targetSquare);
//         }
//       });

//       boardElement.appendChild(squareElement);
//     });
//   });
// };


// const handleMove = () => {
//   const move={
//     from:`${String.fromCharCode(97+ source.col)}${8-source.row}`,
//     to:`${String.fromCharCode(97+ target.col)}${8-target.row}`,
//     promotion:"q"
//   };
//   socket.emit("move",move);
// }

// const getSquareId = (piece) => {
//   const uniCode={
//   p: '♟️', // Pawn
//   r: '♜', // Rook
//   n: '♞', // Knight
//   b: '♝', // Bishop
//   q: '♛', // Queen
//   k: '♚', // King
//   P: '♙', // White Pawn
//   R: '♖', // White Rook
//   N: '♘', // White Knight
//   B: '♗', // White Bishop
//   Q: '♕', // White Queen
//   K: '♔', // White King
//   }
//   return uniCode[piece.type] || "";
  
// };
// socket.on("playerrole", function (role) {
//   playerRole = role;
//   renderBoard();
// });

// socket.on("spectatorrole", function () {
//   playerRole = null;
//   renderBoard();
// });

// socket.on("boardstate", function (fen) {
//   chess.load(fen);
//   renderBoard();
// });

// socket.on("move", function (move) {
//   chess.move(move);
//   renderBoard();
// });

// renderBoard();  // Initial render



const socket = io();
const chess = new Chess();
const boardElement = document.querySelector('.chessboard');

let draggedPiece = null;
let sourceSquare = null;
let playerRole = null;

const renderBoard = () => {
  const board = chess.board();
  boardElement.innerHTML = '';

  // Flip the board for black player
  if (playerRole === "b") {
    boardElement.classList.add("flipped");
  } else {
    boardElement.classList.remove("flipped");
  }

  board.forEach((row, rowIndex) => {
    row.forEach((square, squareIndex) => {
      const squareElement = document.createElement('div');
      squareElement.classList.add(
        'square',
        (rowIndex + squareIndex) % 2 === 0 ? 'light' : 'dark'
      );
      squareElement.dataset.row = rowIndex;
      squareElement.dataset.col = squareIndex;

      if (square) {
        const pieceElement = document.createElement("div");
        pieceElement.classList.add(
          "piece",
          square.color === "w" ? "white" : "black"
        );
        pieceElement.innerText = getSquareId(square);
        pieceElement.draggable = playerRole === square.color;

        pieceElement.addEventListener("dragstart", (e) => {
          if (pieceElement.draggable) {
            draggedPiece = pieceElement;
            sourceSquare = { row: rowIndex, col: squareIndex };
            e.dataTransfer.setData("text/plain", "");
          }
        });

        pieceElement.addEventListener("dragend", (e) => {
          draggedPiece = null;
          sourceSquare = null;
        });

        squareElement.appendChild(pieceElement);
      }

      squareElement.addEventListener("dragover", (e) => {
        e.preventDefault();
      });

      squareElement.addEventListener("drop", (e) => {
        e.preventDefault();
        if (draggedPiece) {
          const targetSquare = {
            row: parseInt(squareElement.dataset.row),
            col: parseInt(squareElement.dataset.col),
          };
          handleMove(sourceSquare, targetSquare);
        }
      });

      boardElement.appendChild(squareElement);
    });
  });
};

const handleMove = (source, target) => {
  const move = {
    from: `${String.fromCharCode(97 + source.col)}${8 - source.row}`,
    to: `${String.fromCharCode(97 + target.col)}${8 - target.row}`,
    promotion: "q", // Default to promoting to queen
  };

  const moveResult = chess.move(move);  // Attempt to move on the board

  if (moveResult) {
    socket.emit("move", move);  // Emit the move if it's valid
    renderBoard();  // Re-render the board
  } else {
    console.log("Invalid move");
  }
};

const getSquareId = (piece) => {
  const uniCode = {
    p: '♟️', // Pawn
    r: '♜', // Rook
    n: '♞', // Knight
    b: '♝', // Bishop
    q: '♛', // Queen
    k: '♚', // King
    P: '♙', // White Pawn
    R: '♖', // White Rook
    N: '♘', // White Knight
    B: '♗', // White Bishop
    Q: '♕', // White Queen
    K: '♔', // White King
  };
  return uniCode[piece.type] || "";
};

socket.on("playerrole", function (role) {
  playerRole = role;
  renderBoard();
});

socket.on("spectatorrole", function () {
  playerRole = null;
  renderBoard();
});

socket.on("boardstate", function (fen) {
  chess.load(fen);
  renderBoard();
});

socket.on("move", function (move) {
  chess.move(move);
  renderBoard();
});

renderBoard();  // Initial render

