
  var cardsArray = []; 

  function fetchJSon(){
    const getJSON = async url => {
      try {
        const response = await fetch(url);
        if(!response.ok) 
          throw new Error(response.statusText);
    
        const data = await response.json(); 
        return data; 
      } catch(error) {
        return error;
      }
    }
    
    getJSON("https://www.dev.bangbang.agency/fullstack/getimages.php")
        .then(data => {
          cardsArray.push(data);
        }).catch(error => {
          console.error(error);
        });
  }
  
  function gameEngine(){
    var cardsChosenArray = [];
    var cardsToUseArray = [];
    var pairs = 9;

    for(var i = 0; i < pairs; i++){
      var randomArray = Math.floor(Math.random() * 3);
      cardsChosenArray = cardsArray[0][randomArray].companies;

      var randomNumber = Math.floor(Math.random() * cardsChosenArray.length);
      cardsToUseArray.push(cardsChosenArray[randomNumber]);
    }
    
    var gameGrid = cardsToUseArray.concat(cardsToUseArray).sort(function () {      
      return 0.5 - Math.random();
    });

    var maxGuesses = 9;
    var currentGuesses = 0; 
    var firstGuess = '';
    var secondGuess = '';
    var count = 0;
    var previousTarget = null;
    var delay = 1200;

    var game = document.getElementById('game');
    var grid = document.createElement('section');
    grid.setAttribute('class', 'grid');
    game.appendChild(grid);
    
    gameGrid.forEach(function (item) {
      var name = item.name, img = item.picture;  
      var card = document.createElement('div');
      card.classList.add('card');
      card.dataset.name = name;
    
      var front = document.createElement('div');
      front.classList.add('front');
    
      var back = document.createElement('div');
      back.classList.add('back');
      back.style.backgroundImage = 'url(' + img + ')';
    
      grid.appendChild(card);
      card.appendChild(front);
      card.appendChild(back);
    });
  
    var match = function match() {
      if(currentGuesses == maxGuesses){
        endGame();
      }
      var selected = document.querySelectorAll('.selected');
      selected.forEach(function (card) {
        card.classList.add('match');
      });
    };
  
    var resetGuesses = function resetGuesses() {
      firstGuess = '';
      secondGuess = '';
      count = 0;
      previousTarget = null;
    
      var selected = document.querySelectorAll('.selected');
      
      selected.forEach(function (card) {
        card.classList.remove('selected');
      });
    };

    grid.addEventListener('click', function (event) {        
      var clicked = event.target;
      if (clicked.nodeName === 'SECTION' || 
          clicked === previousTarget || 
          clicked.parentNode.classList.contains('selected') || 
          clicked.parentNode.classList.contains('match')) {
            return;
      }
    
      if (count < 2) {
        count++;
        if (count === 1) {
          firstGuess = clicked.parentNode.dataset.name;
          clicked.parentNode.classList.add('selected');
        } else {
          secondGuess = clicked.parentNode.dataset.name;
          clicked.parentNode.classList.add('selected');
        }

        if (firstGuess && secondGuess) {
          if (firstGuess === secondGuess) {
            setTimeout(match, delay);
            currentGuesses++
            }
          setTimeout(resetGuesses, delay);
        }
        previousTarget = clicked;
      }
    });

    function endGame(){
      var finalTime = timer.innerHTML;        
      window.open("https://twitter.com/share?url= Memory JavaScript FTW em: " + finalTime + "!! Congratz") 
      location.reload();
    }
  }
  
  //game timer
  var second = 0, minute = 0;
  var timer = document.getElementById("clock");
  var interval;
  function startTimer(){
      interval = setInterval(function(){
        timer.innerHTML = minute+" mins "+second+" secs";
        second++;
        if(second == 60){
          minute++;
          second = 0;
          }
        },1000);
  }

  function hideButton(ele) {
    var x = document.getElementById(ele);
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

  