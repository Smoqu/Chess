import Piece from "./Piece";
import { file } from "../../interfaces/grid";
import Square from "../Square";
import { queenMoves } from "./movements/moves";

export default class Queen extends Piece {
  constructor(
    readonly color: "black" | "white",
    readonly position: { file: file; rank: number },
    readonly size: number,
    readonly square: Square
  ) {
    super("queen", square, color, position, size);
  }

  private diagonal() {
    const topLeft: Square[] = [];
    const topRight: Square[] = [];
    const bottomRight: Square[] = [];
    const bottomLeft: Square[] = [];

    return { topLeft, topRight, bottomLeft, bottomRight };
  }

  public combineMoves() {
    const { topLeft, topRight, bottomLeft, bottomRight } = this.diagonal();

    const moves = [...topLeft, ...topRight, ...bottomLeft, ...bottomRight];

    this.availablesMoves = moves;

    return moves;
  }
}

Object.assign(Queen.prototype, queenMoves);
