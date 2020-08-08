function gameBoard(el, scoreEl) {
  this.el = document.querySelector(el);
  this.scoreEl = document.querySelector(scoreEl);
  this.score = 0;
  this.oddColoredGridDataset = '';
  this.rowCount = 4;
  this.colCount = 4;
  this.colorValues = getRandomColors()
  this.updateScore();
  this.generateGrid();
  this.colorBoard();
  this.bindEvents();
}


gameBoard.prototype.generateGrid = function() {
  const fragment = document.createDocumentFragment();
  for( var r=0; r< this.rowCount; r++) {
    const row = document.createElement("div");
    row.classList.add('row');
    for (var c =0; c< this.colCount; c++) {
      const col = document.createElement("div");
      col.classList.add('col');
      col.dataset["cell"] = r + ':' + c;
      row.appendChild(col);
    }; 
    fragment.appendChild(row);
  }
  this.el.appendChild(fragment);
}

gameBoard.prototype.updateScore = function() {
  this.scoreEl.innerHTML = 'Your Score : ' + this.score;
}

gameBoard.prototype.colorBoard = function() {
  var gridCols = document.querySelectorAll('.col')
  gridCols.forEach(element => 
    element.style.background = this.colorValues.color
  );
  var randomRow = Math.floor(Math.random() * this.rowCount);
  var randomCol = Math.floor(Math.random() * this.colCount);
  this.randomGrid = document.querySelector(`[data-cell="${randomRow + ":" +randomCol}"]`)
  this.randomGrid.style.background = this.colorValues.oddColor;
  this.oddColoredGridDataset = randomRow + ':' + randomCol
}

gameBoard.prototype.clearBoard = function() {
  this.el.innerHTML = '';
}

gameBoard.prototype.bindEvents = function(){
  this.el.addEventListener('click', e => {
    if(e.target.dataset.cell == this.oddColoredGridDataset) {
      this.score++;
      this.updateScore();
      this.rowCount++;
      this.colCount++;
      this.clearBoard();
      this.generateGrid();
      this.colorValues = getRandomColors()
      this.colorBoard();
    } else {
      this.el.classList.add('shake');
      setTimeout(() =>{
        this.el.classList.remove('shake');
        this.score = 0;
        this.updateScore();
        this.rowCount = 4;
        this.colCount = 4;
        this.clearBoard();
        this.generateGrid();
        this.colorValues = getRandomColors()
        this.colorBoard();
      },1000);
    }
  });
}

const getRandomColors = function(){
  var ratio = 0.618033988749895;
  var hue = (Math.random() + ratio) % 1;
  var saturation = Math.round(Math.random() * 100) % 85;
  var lightness = Math.round(Math.random() * 100) % 85;
  var color = 'hsl(' + Math.round(360 * hue) + ',' + saturation + '%,' + lightness + '%)';
  var oddColor = 'hsl(' + Math.round(360 * hue) + ',' + saturation + '%,' + (lightness + 5) + '%)';
  return {
      color,
      oddColor
  }
}


// sads