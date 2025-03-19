// 2048.jsx
export const generateBoard = () => {
    const board = Array.from({ length: 4 }, () => Array(4).fill(0));
    placeRandom(board);
    placeRandom(board);
    return board;
};

export const placeRandom = (board) => {
    const emptyCells = [];
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (board[row][col] === 0) {
                emptyCells.push({ row, col });
            }
        }
    }
    if (emptyCells.length > 0) {
        const { row, col } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        board[row][col] = Math.random() < 0.9 ? 2 : 4;
    }
};

export const isGameOver = (board) => {
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (board[row][col] === 0) return false;
            if (col < 3 && board[row][col] === board[row][col + 1]) return false;
            if (row < 3 && board[row][col] === board[row + 1][col]) return false;
        }
    }
    return true;
};

export const arraysEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

const mergeCells = (cells) => {
    cells = cells.filter(cell => cell !== 0);
    let score = 0;
    for (let i = 0; i < cells.length - 1; i++) {
        if (cells[i] === cells[i + 1]) {
            cells[i] *= 2;
            score += cells[i];
            cells.splice(i + 1, 1);
        }
    }
    while (cells.length < 4) cells.push(0);
    return { cells, score };
};

export const moveUp = (board) => {
    const newBoard = board.map(row => [...row]);
    let mergeScore = 0;
    for (let col = 0; col < 4; col++) {
        let cells = [];
        for (let row = 0; row < 4; row++) {
            if (newBoard[row][col] !== 0) cells.push(newBoard[row][col]);
        }
        const result = mergeCells(cells);
        mergeScore += result.score;
        for (let row = 0; row < 4; row++) {
            newBoard[row][col] = result.cells[row] || 0;
        }
    }
    return { board: newBoard, mergeScore };
};

export const moveDown = (board) => {
    const newBoard = board.map(row => [...row]);
    let mergeScore = 0;
    for (let col = 0; col < 4; col++) {
        let cells = [];
        for (let row = 3; row >= 0; row--) {
            if (newBoard[row][col] !== 0) cells.push(newBoard[row][col]);
        }
        const result = mergeCells(cells);
        mergeScore += result.score;
        for (let row = 3; row >= 0; row--) {
            newBoard[row][col] = result.cells[3 - row] || 0;
        }
    }
    return { board: newBoard, mergeScore };
};

export const moveLeft = (board) => {
    const newBoard = board.map(row => [...row]);
    let mergeScore = 0;
    for (let row = 0; row < 4; row++) {
        let cells = [];
        for (let col = 0; col < 4; col++) {
            if (newBoard[row][col] !== 0) cells.push(newBoard[row][col]);
        }
        const result = mergeCells(cells);
        mergeScore += result.score;
        for (let col = 0; col < 4; col++) {
            newBoard[row][col] = result.cells[col] || 0;
        }
    }
    return { board: newBoard, mergeScore };
};

export const moveRight = (board) => {
    const newBoard = board.map(row => [...row]);
    let mergeScore = 0;
    for (let row = 0; row < 4; row++) {
        let cells = [];
        for (let col = 3; col >= 0; col--) {
            if (newBoard[row][col] !== 0) cells.push(newBoard[row][col]);
        }
        const result = mergeCells(cells);
        mergeScore += result.score;
        for (let col = 3; col >= 0; col--) {
            newBoard[row][col] = result.cells[3 - col] || 0;
        }
    }
    return { board: newBoard, mergeScore };
};

export const getCellColor = (cell) => {
    const colorMap = {
        2: 'bg-red-100 text-black',
        4: 'bg-red-200 text-black',
        8: 'bg-red-300 text-white',
        16: 'bg-red-400 text-white',
        32: 'bg-red-500 text-white',
        64: 'bg-red-600 text-white',
        128: 'bg-blue-500 text-white',
        256: 'bg-blue-600 text-white',
        512: 'bg-blue-700 text-white',
        1024: 'bg-green-500 text-white',
        2048: 'bg-green-600 text-white',
        4096: 'bg-green-700 text-white',
        8192: 'bg-green-800 text-white',
        16384: 'bg-green-900 text-white'
    };
    return colorMap[cell] || 'bg-gray-200 text-gray-400';
};