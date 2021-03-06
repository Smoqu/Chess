import P5 from "p5";
import { SQUARES } from "./classes/Grid";
import Grid from "./classes/Grid";
import Square from "./classes/Square";
import { pieceType, image } from "./interfaces/pieces";
import FEN from "./utils/fen";
import { LAST_MOVES, pieces, pieceSelected } from "./classes/pieces/Piece";

const debug = document.getElementById("debug");
const debugBtn = document.getElementById("debugBtn");

debug!.style.visibility = "hidden";

debugBtn!.onclick = () => {
  debug!.style.visibility =
    debug!.style.visibility === "hidden" ? "visible" : "hidden";
};

export const blackPieces: {
  images: image[];
} = {
  images: []
};

export const whitePieces: {
  images: image[];
} = {
  images: []
};

export let grid: Grid;
export let fen: FEN;

const sketch = (p5: P5) => {
  const SIZE = 900;

  p5.preload = () => {
    const pieces: pieceType[] = [
      "bishop",
      "king",
      "knight",
      "pawn",
      "queen",
      "rook"
    ];

    for (let i = 0; i < 12; i++) {
      if (i <= 5) {
        const path = `./assets/pieces/black/${pieces[i]}_black.png`;
        blackPieces.images.push({
          image: p5.loadImage(path),
          path,
          piece: pieces[i]
        });
      } else {
        let piece = i - 6;

        const path = `./assets/pieces/white/${pieces[piece]}_white.png`;

        whitePieces.images.push({
          image: p5.loadImage(path),
          path,
          piece: pieces[piece]
        });
      }
    }
  };

  p5.setup = () => {
    const canvas = p5.createCanvas(SIZE, SIZE);
    canvas.parent("sketch");
    p5.background(255, 255, 255);

    grid = new Grid(SIZE);

    fen = new FEN(SIZE / 8);

    fen.load(SQUARES);

    pieces.forEach((piece) => {
      piece.combineMoves();
    });
  };

  p5.draw = () => {
    grid.show();
    LAST_MOVES.forEach((move) => (move.highlight = true));
    SQUARES.forEach((square: Square) => {
      square.piece?.show();
      square.showCheck();
      if (!LAST_MOVES.find((move) => move === square)) square.highlight = false;
    });
  };

  p5.mousePressed = () => {
    pieces.forEach((piece) => {
      piece.clickedOn(p5.mouseX, p5.mouseY);
    });
    if (pieceSelected) pieceSelected.clickOnSquare(p5.mouseX, p5.mouseY, fen);
  };
};

export const p5 = new P5(sketch);
