function initNavigation() {
    const header = document.getElementById('header');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            mobileMenuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            updateActiveNavLink(link.dataset.section);
        });
    });
    
    // Handle scroll events for header styling and active section detection
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        updateActiveSectionOnScroll();
    });
}

function updateActiveNavLink(sectionId) {
    const allLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    allLinks.forEach(link => {
        link.classList.remove('active');
        if (link.dataset.section === sectionId) 
        {
            link.classList.add('active');
        }
    });
}

function updateActiveSectionOnScroll() {
    const sections = ['home', 'about', 'game'];
    const scrollPosition = window.scrollY + 100; 
    
    for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) 
        {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight)
            {
                updateActiveNavLink(sectionId);
                break;
            }
        }
    }
}

class TicTacToeGame {
    constructor() {
        // Game state
        this.board = Array(9).fill(null);
        this.currentPlayer = 'X';
        this.winner = null;
        this.winningLine = [];
        this.gameActive = true;
        
        // DOM elements
        this.cells = document.querySelectorAll('.cell');
        this.statusDisplay = document.getElementById('gameStatus');
        this.resetBtn = document.getElementById('resetBtn');
        
        // Winning combinations (indices)
        this.winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];
        
        this.init();
    }
    
    init() {
        console.log('Tic-Tac-Toe initializing...');
        console.log('Found cells:', this.cells.length);
        
        // Add click event to each cell
        this.cells.forEach((cell, index) => {
            cell.addEventListener('click', () => this.handleCellClick(index));
            console.log(`Cell ${index} initialized`);
        });
        
        // Add reset button event
        this.resetBtn.addEventListener('click', () => this.resetGame());
        
        // Set initial status
        this.updateStatus();
        console.log('Tic-Tac-Toe initialized successfully!');
    }
    
    handleCellClick(index) {
        // Check if cell is already filled or game is over
        if (this.board[index] !== null || !this.gameActive) 
        {
            return;
        }
        
        // Update board state
        this.board[index] = this.currentPlayer;
        
        // Update cell UI
        this.updateCell(index);
        
        // Check for winner or draw
        if (this.checkWinner()) 
        {
            this.handleWin();
        } else if (this.checkDraw()) {
            this.handleDraw();
        } else {
            this.switchPlayer();
            this.updateStatus();
        }
    }

    updateCell(index) {
        const cell = this.cells[index];
        cell.textContent = this.currentPlayer;
        cell.classList.add(this.currentPlayer === 'X' ? 'x-mark' : 'o-mark');
        cell.disabled = true;
    }
    
    checkWinner() {
        for (const combination of this.winningCombinations) 
        {
            const [a, b, c] = combination;
            if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) 
            {
                this.winner = this.board[a];
                this.winningLine = combination;
                return true;
            }
        }
        return false;
    }
    
    checkDraw() {
        return this.board.every(cell => cell !== null);
    }
    
    handleWin() {
        this.gameActive = false;
        
        // Highlight winning cells
        this.winningLine.forEach(index => {
            this.cells[index].classList.add('winner');
        });
        
        // Update status
        this.statusDisplay.textContent = `Winner: ${this.winner}!`;
        this.statusDisplay.className = 'game-status status-winner';
    }
    
    handleDraw() {
        this.gameActive = false;
        this.statusDisplay.textContent = "It's a Draw!";
        this.statusDisplay.className = 'game-status status-draw';
    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }
    
    updateStatus() {
        this.statusDisplay.textContent = `Next Player: ${this.currentPlayer}`;
        this.statusDisplay.className = 'game-status status-active';
    }
    
    resetGame() {
        // Reset state
        this.board = Array(9).fill(null);
        this.currentPlayer = 'X';
        this.winner = null;
        this.winningLine = [];
        this.gameActive = true;
        
        // Reset all cells
        this.cells.forEach(cell => {
            cell.textContent = '';
            cell.disabled = false;
            cell.classList.remove('x-mark', 'o-mark', 'winner');
        });
        
        // Reset status
        this.updateStatus();
    }
}

// INITIALIZATION 

document.addEventListener('DOMContentLoaded', () => {
    // Initialize navigation
    initNavigation();
    
    // Initialize Tic-Tac-Toe game
    new TicTacToeGame();
    
    console.log('GameHub initialized successfully!');
});
