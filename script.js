document.addEventListener("DOMContentLoaded", (event)=>{
  const gridContainer = document.getElementById('grid-container');
  const smallGridContainer = document.getElementById('small-grid-container');
  
  const elements = [
    {
        time: 2,
        type: 'water',
        shape: [[0,0,0],
                [1,1,1],
                [0,0,0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'town',
        shape: [[0,0,0],
                [1,1,1],
                [0,0,0]],
        rotation: 0,
        mirrored: false        
    },
    {
        time: 1,
        type: 'forest',
        shape: [[1,1,0],
                [0,1,1],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'farm',
        shape: [[0,0,0],
                [1,1,1],
                [0,0,1]],
            rotation: 0,
            mirrored: false  
        },
    {
        time: 2,
        type: 'forest',
        shape: [[0,0,0],
                [1,1,1],
                [0,0,1]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'town',
        shape: [[0,0,0],
                [1,1,1],
                [0,1,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'farm',
        shape: [[0,0,0],
                [1,1,1],
                [0,1,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 1,
        type: 'town',
        shape: [[0,0,0],
                [0,1,1],
                [0,1,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 1,
        type: 'town',
        shape: [[1,1,1],
                [1,1,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 1,
        type: 'farm',
        shape: [[1,1,0],
                [0,1,1],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 1,
        type: 'farm',
        shape: [[0,1,0],
                [1,1,1],
                [0,1,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'water',
        shape: [[1,1,1],
                [1,0,0],
                [1,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'water',
        shape: [[1,0,0],
                [1,1,1],
                [1,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'forest',
        shape: [[1,1,0],
                [0,1,1],
                [0,0,1]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'forest',
        shape: [[1,1,0],
                [0,1,1],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'water',
        shape: [[1,1,0],
                [1,1,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
  ]
  const mountainCoordinates = [
    {
      x:1,
      y:1
    },
    {
      x:8,
      y:3
    },
    {
      x:3,
      y:5
    },
    {
      x:9,
      y:8
    },
    {
      x:5,
      y:9
    }
  ]
  const missions = [
    {
      "title": "Edge of the forest",
      "description": "You get one point for each forest field adjacent to the edge of your map."
    },
    {
      "title": "Sleepy valley",
      "description": "For every row with three forest fields, you get four points."
    },
    {
      "title": "Watering potatoes",
      "description": "You get two points for each water field adjacent to your farm fields."
    },
    {
      "title": "Borderlands",
      "description": "For each full row or column, you get six points."
    },
    {
      "title": "Tree line",
      "description": "You get two points for each of the fields in the longest vertically uninterrupted continuous forest. If there are two or more tree lines with the same longest length, only one counts."
    },
    {
      "title": "Wealthy town",
      "description": "You get three points for each of your village fields adjacent to at least three different terrain types."
    },
    {
      "title": "Magicians' valley",
      "description": "You get three points for your water fields adjacent to your mountain fields."
    },
    {
      "title": "Watering canal",
      "description": "For each column of your map that has the same number of farm and water fields, you will receive four points. You must have at least one field of both terrain types in your column to score points."
    },
    {
      "title": "Empty site",
      "description": "You get two points for empty fields adjacent to your village fields."
    },
    {
      "title": "Row of houses",
      "description": "For each field in the longest village fields that are horizontally uninterrupted and contiguous you will get two points."
    },
    {
      "title": "Odd numbered silos",
      "description": "For each of your odd numbered full columns you get 10 points."
    },
    {
      "title": "Rich countryside",
      "description": "For each row with at least five different terrain types, you will receive four points."
    }
  ]
  const seasons = [
    "Spring(A,B)",
    "Summer(B,C)",
    "Autumn(C,D)",
    "Winter(D,A)"
  ]

  const elementMoveSound = 'sound/elementMoveSound.mp3';
  const roateSound = 'sound/rotate.mp3';
  const flipSound = 'sound/flip.mp3';
  const setElementSound = 'sound/setElement.mp3';
  const bgm = 'sound/bgm.mp3';

  const springScoreBoard = document.querySelector('#spring');
  const summerScoreBoard = document.querySelector('#summer');
  const autumnScoreBoard = document.querySelector('#autumn');
  const winterScoreBoard = document.querySelector('#winter');
  const totalScoreDiv = document.querySelector('#total-score');
  const surroundedMountainScoreDiv = document.querySelector('#surrounded-mountain-score');
  const missionBoards = document.querySelectorAll('.rectangle');
  const currentSeasonText = document.querySelector('#current-season');
  const elapsedTimeText = document.querySelector('#elapsed-time');
  const rotateButton = document.querySelector('#button-rotate');
  const flipButton = document.querySelector('#button-flip');
  const timeRequired = document.querySelector('#time-required');
  const timeRemaining = document.querySelector('#time-remaining');
  const modalOverlay = document.querySelector('#modal-overlay');
  const modal = document.querySelector('#modal');

  let currentElement = getRandomElement();
  let currentColor = getColorFromElement(currentElement);
  let currentShape = getShapeFromElement(currentElement);
  let remainingTime = 28;
  let seasonalTime = 7;
  let currentSeason = 0; //(0: spring, 1: summer, 2: autumn, 3:winter)
  let currentMissions = chooseRandomMissions(missions) //current 4 missions
  let totalScore = 0;
  let surroundedMountainScore = 0;
  let scores = {
    'spring': 0,
    'summer': 0,
    'autumn': 0,
    'winter': 0
  }
  let scoresForEachMissions = [0, 0, 0, 0]
  let gameOver = false;


  //main grid
  for (let i = 0; i < 11; i++) {
      for (let j = 0; j < 11; j++) {
          const cell = document.createElement('div');
          cell.classList.add('cell');
          cell.setAttribute('x', j);
          cell.setAttribute('y', i);
          cell.addEventListener('click', setElement)
          cell.addEventListener('mouseover', highlightCell)
          cell.addEventListener('mouseout', resetCell)
          gridContainer.appendChild(cell);
      }
    }
  //small grid
  for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
          const cell = document.createElement('div');
          cell.classList.add('cell');
          cell.setAttribute('x', 100+j);
          cell.setAttribute('y', i);
          smallGridContainer.appendChild(cell);
      }
  }
  //set the mountains
  mountainCoordinates.forEach(e => {
    const cell = getCellByCoordinates(e.x, e.y);
    cell.style.backgroundColor = "brown"
    cell.style.backgroundImage = `url("assets/tiles/mountain.png")`;
  })

  document.addEventListener('keydown', function(event) {
    if (event.key === 'r') {
        rotate(); 
    }
  });
  document.addEventListener('keydown', function(event) {
    if (event.key === 'f') {
        flip(); 
        console.log(event);
    }
  });
  rotateButton.addEventListener('click', ()=>{
    rotate();
  })
  flipButton.addEventListener('click', ()=>{
    flip();
  })

  const bgmAudio = new Audio(bgm);
  // bgmAudio.play();
  init();


  //functions
  function init(){
    showCurrentElement();
    updateRequiredTime();
    updateScoreInformation();
    updateMissionBoard();
    updateCurrentSeasonText();
    activateCurrentMissions();
    updateElapsedTimeText();
    console.log(currentMissions);
  }

  function setElement(event){
    scores.springScore += 1;
    const cell = event.target;
    const x = Number(cell.getAttribute('x'));
    const y = Number(cell.getAttribute('y'));
    let is_available_area = true;
    for(let i = -1; i <= 1; i++){
      for(let j = -1; j <= 1; j++){
        const neighborCell = getCellByCoordinates(x+j, y+i);
        if(currentShape[i+1][j+1] == 1 && neighborCell != null && neighborCell.style.backgroundColor != ""){
          is_available_area = false;
          j = 2; i = 2; // Forced to exit double loop
        }
        if(neighborCell == null && currentShape[i+1][j+1] == 1){
          is_available_area = false;
        }
      }
    }

    if(is_available_area){
      for(let i = -1; i <= 1; i++){
        for(let j = -1; j <= 1; j++){
          const neighborCell = getCellByCoordinates(x+j, y+i);
          if(neighborCell != null && currentShape[i+1][j+1] == 1){
            neighborCell.style.backgroundColor = currentColor
            setTileToCell(neighborCell);
          }
        }
      }
      const audio = new Audio(setElementSound);
      audio.play();
      update()
    }
  }

  function highlightCell(event) {
    const cell = event.target;
    const x = Number(cell.getAttribute('x'));
    const y = Number(cell.getAttribute('y'));
    let is_available_area = true;
    
    for(let i = -1; i <= 1; i++){
      for(let j = -1; j <= 1; j++){
        const neighborCell = getCellByCoordinates(x+j, y+i);
        if(currentShape[i+1][j+1] == 1 && neighborCell != null && neighborCell.style.backgroundColor != ""){
          is_available_area = false;
          j = 2; i = 2; // Forced to exit double loop
        }
        if(neighborCell == null && currentShape[i+1][j+1] == 1){
          is_available_area = false;
        }
      }
    }

    if(is_available_area){
      for(let i = -1; i <= 1; i++){
        for(let j = -1; j <= 1; j++){
          const neighborCell = getCellByCoordinates(x+j, y+i);
          if(neighborCell != null && currentShape[i+1][j+1] == 1){
            neighborCell.style.border = `2px solid ${currentColor}`
          }
        }
      }
      const audio = new Audio(elementMoveSound);
      audio.play();
    }
  }

  function resetCell(event) {
    const cell = event.target;
    const x = Number(cell.getAttribute('x'));
    const y = Number(cell.getAttribute('y'));
    for(let i = -1; i <= 1; i++){
      for(let j = -1; j <= 1; j++){
        const neighborCell = getCellByCoordinates(x+j, y+i);
        if(neighborCell != null){
          neighborCell.style.border = ""
        }
      }
    }
  }

  function getCellByCoordinates(x, y) {
    const cell = document.querySelector(`.cell[x="${x}"][y="${y}"]`);
    return cell;
  }

  function getRandomElement(){
    const randomIndex = Math.floor(Math.random() * elements.length);
    return elements[randomIndex];
  }

  function getShapeFromElement(element){
    const rotation = element.rotation;
    const mirrored = element.mirrored;
    let shape = element.shape;
    for(let i = 0; i < rotation; i++){
      shape = rotateShape(shape);
    }
    if(mirrored){
      shape = invertShape(shape)
    }

    return shape;
  }

  function getColorFromElement(element){
    const type = element.type;
    switch(type){
      case 'water': return 'aqua';
      case 'farm': return 'yellow';
      case 'forest': return 'green';
      case 'town' : return 'red';
    }
  }

  function rotateShape(shape){
    let newShape = [];
    for (let i = 0; i < 3; i++) {
      newShape[i] = [];
      for (let j = 0; j < 3; j++) {
          newShape[i][j] = 0;
      }
    }
    for(let i = 0; i < 3; i++){
      for(let j = 0; j < 3; j++){
        newShape[i][j] = shape[j][3-i-1]
      }
    }
    return newShape;
  }

  function invertShape(shape){
    let newShape = [];
    for (let i = 0; i < 3; i++) {
      newShape[i] = [];
      for (let j = 0; j < 3; j++) {
          newShape[i][j] = 0;
      }
    }
    for(let i = 0; i < 3; i++){
      for(let j = 0; j < 3; j++){
        newShape[i][j] = shape[i][3-j-1]
      }
    }
    return newShape;
  }

  function update(){
    updateRemainingTime();
    scoring(remainingTime);
    updateScoreInformation();
    currentElement = getRandomElement();
    updateRequiredTime()
    currentColor = getColorFromElement(currentElement);
    currentShape = getShapeFromElement(currentElement);
    showCurrentElement();
    console.log(scoresForEachMissions);
    if(gameOver){
      finishGame();
    }
  }

  function chooseRandomMissions(missions) {
    const shuffledMissions = missions.slice().sort(() => Math.random() - 0.5);
    const selectedMissions = shuffledMissions.slice(0, 4);

    return selectedMissions;
  }

  function updateSeason(){
    currentSeason++;
    if(currentSeason < 4){
      updateCurrentSeasonText();
      activateCurrentMissions();
    }
  }
  
  function updateCurrentSeasonText(){
    currentSeasonText.textContent = "Current Season: " + seasons[currentSeason];
  }

  function updateMissionBoard(){
    currentMissions.forEach((mission, index) => {
      const path = getImagePathForMission(mission['title']);
      const missionBoard = missionBoards[index];
      missionBoard.style.backgroundImage = `url(${path})`;
    })
  }

  function activateCurrentMissions(){
    deactivateAllMissions();
    const currentMission1 = currentSeason;
    const currentMission2 = currentSeason+1 < 4 ? currentSeason+1 : 0 
    missionBoards[currentMission1].classList.add('active-mission');
    missionBoards[currentMission2].classList.add('active-mission');
  }

  function deactivateAllMissions(){//remove active-mission class from all rectangle element
    missionBoards.forEach(missionBoard => {
      missionBoard.classList.remove('active-mission');
    })
  }

  function getImagePathForMission(title){
    switch(title){
      case "Edge of the forest": return "img/EdgeOfTheForest.png"; 
      case "Sleepy valley": return "img/SleepyValley.png";
      case "Watering potatoes": return "img/WateringPotatoes.png";
      case "Borderlands": return "img/Borderlands.png";
      case "Tree line": return "img/TreeLine.png";
      case "Wealthy town": return "img/WealthyTown.png";
      case "Watering canal": return "img/WateringCanal.png";
      case "Magicians' valley": return "img/MagiciansValley.png";
      case "Empty site": return "img/EmptySite.png";
      case "Row of houses": return "img/RowOfHouses.png";
      case "Odd numbered silos": return "img/OddNumberedSilos.png";
      case "Rich countryside": return "img/RichCountryside.png";
    }
  }

  function updateScoreInformation(){
    springScoreBoard.textContent = "SpringScore  " + scores['spring'] + " points";
    summerScoreBoard.textContent = "SummerScore  " + scores['summer'] + " points";
    autumnScoreBoard.textContent = "AutumnScore  " + scores['autumn'] + " points";
    winterScoreBoard.textContent = "WinterScore  " + scores['winter'] + " points";
    totalScore = scores['spring'] + scores['summer'] + scores['autumn'] + scores['winter'];
    totalScoreDiv.textContent = "Total: " + totalScore + " points";
    surroundedMountainScoreDiv.textContent = "Surrounded Mountain: " + surroundedMountainScore + " points";
  }

  function scoring(remainingTime){
    if((remainingTime == 21 || remainingTime == 20) && currentSeason == 0){
      calcScore(currentMissions[0], 'spring', 0);
      calcScore(currentMissions[1], 'spring', 1);
      SurroundedMountain('spring');
      updateSeason()
    }
    else if((remainingTime == 14 || remainingTime == 13) && currentSeason == 1){
      calcScore(currentMissions[1], 'summer', 1);
      calcScore(currentMissions[2], 'summer', 2);
      SurroundedMountain('summer');
      updateSeason()
    }
    else if((remainingTime == 7 || remainingTime == 6) && currentSeason == 2){
      calcScore(currentMissions[2], 'autumn', 2);
      calcScore(currentMissions[3], 'autumn', 3);
      SurroundedMountain('autumn');
      updateSeason()
    }
    else if((remainingTime == 0 || remainingTime == -1) && currentSeason == 3){
      calcScore(currentMissions[3], 'winter', 3);
      calcScore(currentMissions[0], 'winter', 0);
      SurroundedMountain('winter');
      updateSeason()
    }
  }

  function calcScore(mission, season, missionNumber){
    switch(mission['title']){
      case "Edge of the forest": EdgeOfTheForest(season, missionNumber); break;
      case "Sleepy valley": SleepyValley(season, missionNumber); break;
      case "Watering potatoes": WateringPotatoes(season, missionNumber); break;
      case "Borderlands": Borderlands(season, missionNumber); break;
      case "Tree line": TreeLine(season, missionNumber); break;
      case "Wealthy town": WealtyTown(season, missionNumber); break;
      case "Magicians' valley": MagiciansVally(season, missionNumber); break;
      case "Watering canal": WateringCanel(season, missionNumber); break;
      case "Empty site": EmptySite(season, missionNumber); break;
      case "Row of houses": RowOfHouses(season, missionNumber); break;
      case "Odd numbered silos": OddNumbersilos(season, missionNumber); break;
      case "Rich countryside": RichCountryside(season, missionNumber); break;
    }
  }
 
  //functions for missions
  function EdgeOfTheForest(season, missionNumber){
  for(let y = 0; y < 11; y++){
    if(y == 0 || y == 10){
      for(let x = 0; x < 11; x++){
        cell = getCellByCoordinates(x, y);
        if(cell.style.backgroundColor == 'green'){
          scores[season] += 1;
          scoresForEachMissions[missionNumber] += 1;
        }
      }
    }else{
      if(getCellByCoordinates(0, y).style.backgroundColor == 'green'){
        scores[season] += 1;
        scoresForEachMissions[missionNumber] += 1;
      }
      if(getCellByCoordinates(10, y).style.backgroundColor == 'green'){
        scores[season] += 1;
        scoresForEachMissions[missionNumber] += 1;
      }
    }
  }
  }
  function SleepyValley(season, missionNumber){
  for(let y = 0; y < 11; y++){
    let forestCount = 0;
    for(let x = 0; x < 11; x++){
      if(getCellByCoordinates(x, y).style.backgroundColor == 'green'){
        forestCount++;
      }
      if(forestCount == 3){
        scores[season] += 4;
        scoresForEachMissions[missionNumber] += 4;
        break;
      }
    }
  }
  }
  function WateringPotatoes(season, missionNumber){
  for(let y = 0; y < 11; y++){
    for(let x = 0; x < 11; x++){
      if(getCellByCoordinates(x, y).style.backgroundColor == 'aqua'){
        upColor = null;
        downColor = null;
        rightColor = null;
        leftColor = null;

        up = getCellByCoordinates(x, y-1);
        down = getCellByCoordinates(x, y+1);
        right = getCellByCoordinates(x+1, y);
        left = getCellByCoordinates(x-1, y);

        if(up != null){
          upColor = up.style.backgroundColor;
        }
        if(down != null){
          downColor = down.style.backgroundColor;
        }
        if(right != null){
          rightColor = right.style.backgroundColor;
        }
        if(left != null){
          leftColor = left.style.backgroundColor;
        }

        if(upColor == 'yellow' || downColor == 'yellow' || rightColor == 'yellow' || leftColor  == 'yellow'){
          scores[season] += 2;
          scoresForEachMissions[missionNumber] += 2;
        }
      }
      
    }
  }
  }
  function Borderlands(season, missionNumber){
  //check row
  for(let y = 0; y < 11; y++){
    is_full = true;
    for(let x = 0; x < 11; x++){
      if(getCellByCoordinates(x, y).style.backgroundColor == ""){
        is_full = false;
      }
    }
    if(is_full){
      scores[season] += 6;
      scoresForEachMissions[missionNumber] += 6;
    }
  }

  //check column
  for(let x = 0; x < 11; x++){
    is_full = true;
    for(let y = 0; y < 11; y++){
      if(getCellByCoordinates(x, y).style.backgroundColor == ""){
        is_full = false;
      }
    }
    if(is_full){
      scores[season] += 6;
      scoresForEachMissions[missionNumber] += 6;
    }
  }
  }
  function TreeLine(season, missionNumber){
    const countArray = [0]
    for(let x = 0; x < 11; x++){
      const colorArray = []
      for(let y = 0; y < 11; y++){
        colorArray.push(getCellByCoordinates(x, y).style.backgroundColor);
      }
      countArray.push(maxConsecutiveLength(colorArray, 'green'));
    }
    const maxCount = Math.max(...countArray);
    scores[season] += 2*maxCount;
    scoresForEachMissions[missionNumber] += 2*maxCount;
  }
  function WealtyTown(season, missionNumber){
  for(let y = 0; y < 11; y++){
    for(let x = 0; x < 11; x++){
      if(getCellByCoordinates(x, y).style.backgroundColor == "red"){
        const colorList = getAroundCellColors(x, y);
        const newColorList = colorList.filter(e => e != "");
        const colorSet = new Set(newColorList);

        if(colorSet.size >= 3){
          scores[season] += 3;
          scoresForEachMissions[missionNumber] += 3;
        }
      }
    }
  }
  }
  function MagiciansVally(season, missionNumber){
  mountainCoordinates.forEach(coordinate => {
    x = coordinate.x;
    y = coordinate.y;
    up = getCellByCoordinates(x, y-1);
    down = getCellByCoordinates(x, y+1);
    right = getCellByCoordinates(x+1, y);
    left = getCellByCoordinates(x-1, y);
    const aroundCells = [up, down, right, left];
    aroundCells.forEach(cell => {
      if(cell.style.backgroundColor == "aqua"){
        scores[season] += 3;
        scoresForEachMissions[missionNumber] += 3;
      }
    })
  })
  }
  function WateringCanel(season, missionNumber){
  for(let x = 0; x < 11; x++){
    const column = [];
    for(let y = 0; y < 11; y++){
      const cellColor = getCellByCoordinates(x, y).style.backgroundColor;
      column.push(cellColor);
    }
    const waterCount = column.filter(e => e == "aqua").length;
    const farmCount = column.filter(e => e == "yellow").length;
    if(waterCount > 0 && farmCount > 0 && waterCount == farmCount){
      scores[season] += 4;
      scoresForEachMissions[missionNumber] += 4;
    }
  }
  }
  function EmptySite(season, missionNumber){
    for(let y = 0; y < 11; y++){
      for(let x =0; x < 11; x++){
        if(getCellByCoordinates(x, y).style.backgroundColor == ""){
          const colorList = getAroundCellColors(x, y);
          if(colorList.includes("red")){
            scores[season] += 2;
            scoresForEachMissions[missionNumber] += 2;
          }
        }
      }
    }
  }
  function RowOfHouses(season, missionNumber){
    const villageLengthes = []
    for(let y = 0; y < 11; y++){
      const rowColors = []
      for(let x = 0; x < 11; x++){
        rowColors.push(getCellByCoordinates(x, y).style.backgroundColor);
      }
      villageLengthes.push((maxConsecutiveLength(rowColors, "red")));
    }
    const maxLength = Math.max(...villageLengthes);
    const maxLengthcount = villageLengthes.filter(e => e == maxLength).length;
    scores[season] += 2 * maxLength * maxLengthcount;
    scoresForEachMissions[missionNumber] += 2*maxLength * maxLengthcount;
  }
  function OddNumbersilos(season, missionNumber){
    for(let x = 0; x < 11; x+=2){
      let isFull = true;
      for(let y = 0; y < 11; y++){
        if(getCellByCoordinates(x, y).style.backgroundColor == ""){
          isFull = false;
        }
      }
      if(isFull){
        scores[season] += 10;
        scoresForEachMissions[missionNumber] += 10;
      }
    }
  }
  function RichCountryside(season, missionNumber){
    for(let y = 0; y < 11; y++){
      const rowColor = [];
      for(let x = 0; x < 11; x++){
        rowColor.push(getCellByCoordinates(x, y).style.backgroundColor);
      }
      const rowColorSet = new Set(rowColor);
      console.log((rowColorSet))
      console.log((rowColorSet.size))
      if(rowColorSet.size == 5){
        console.log(rowColorSet);
        scores[season] += 4;
        scoresForEachMissions[missionNumber] += 4;
      }
    }
  }
  function SurroundedMountain(season){
    mountainCoordinates.forEach(coordinate => {
      const x = coordinate.x;
      const y = coordinate.y;
      const colorList = getAroundCellColors(x, y);
      if(colorList.filter(e => e == "").length == 0){
        scores[season] += 1;
        surroundedMountainScore += 1;
      }
    })
  }

  function getAroundCellColors(x, y){
    upColor = "";
    downColor = "";
    rightColor = "";
    leftColor = "";

    up = getCellByCoordinates(x, y-1);
    down = getCellByCoordinates(x, y+1);
    right = getCellByCoordinates(x+1, y);
    left = getCellByCoordinates(x-1, y);

    if(up != null){
      upColor = up.style.backgroundColor;
    }
    if(down != null){
      downColor = down.style.backgroundColor;
    }
    if(right != null){
      rightColor = right.style.backgroundColor;
    }
    if(left != null){
      leftColor = left.style.backgroundColor;
    }

    return [upColor, downColor, rightColor, leftColor];
  }
   ///////////////////////////////////
  function rotate(){
    currentElement.rotation += 1;
    if(currentElement.rotation > 3){
      currentElement.rotation = 0;
    }
    currentShape = getShapeFromElement(currentElement);
    showCurrentElement();
    const audio = new Audio(roateSound);
    audio.play();
  }

  function flip(){
    currentElement.mirrored = !currentElement.mirrored;
    currentShape = getShapeFromElement(currentElement);
    showCurrentElement();
    const audio = new Audio(flipSound);
    audio.play();
  }

  function showCurrentElement(){
    for(let i = 0; i < 3; i++){
      for(let j = 0; j < 3; j++){
        const small_cell = getCellByCoordinates(j+100, i);
        small_cell.style.backgroundColor = ""
        small_cell.style.backgroundImage = "none";
        if(small_cell != null && currentShape[i][j] == 1){
          small_cell.style.backgroundColor = currentColor
          setTileToCell(small_cell);
        }
      }
    }
  }

  function setTileToCell(cell){
    let tilePath = "";
    switch(currentColor){
      case 'red': tilePath = 'assets/tiles/village.png'; break;
      case 'green': tilePath = 'assets/tiles/forest.png'; break;
      case 'yellow': tilePath = 'assets/tiles/farm.png'; break;
      case 'aqua': tilePath = 'assets/tiles/water.png'; break;
    }
    cell.style.backgroundImage = `url(${tilePath})`
  }

  function updateRequiredTime(){
    timeRequired.textContent = currentElement.time;
  }

  function updateRemainingTime(){
    remainingTime = remainingTime - Number(currentElement.time);
    timeRemaining.textContent = remainingTime;
    updateSeasonalTime(currentElement.time);
    if(remainingTime <= 0){
      remainingTime = 0;
      timeRemaining.textContent = remainingTime;
      gameOver = true;
    }
  }

  function updateSeasonalTime(requiredTime){
    seasonalTime = seasonalTime - requiredTime > 0 ? seasonalTime - requiredTime : 7 + (seasonalTime - requiredTime);
    updateElapsedTimeText();
  }

  function updateElapsedTimeText(){
    elapsedTimeText.textContent = "Elapsed time in current season: " + seasonalTime + "/7";
  }

  function finishGame(){
    updateModal();
    modalOverlay.style.display = 'block';
    modal.style.display = 'block';
  }

  function updateModal(){
    const scoreMissionA = document.querySelector('#score-mission-a');
    const scoreMissionB = document.querySelector('#score-mission-b');
    const scoreMissionC = document.querySelector('#score-mission-c');
    const scoreMissionD = document.querySelector('#score-mission-d');
    const scoreSurroundedMountain = document.querySelector('#score-surrounded-mountain');
    const totalScoreText = document.querySelector('#score-total');

    scoreMissionA.textContent = currentMissions[0]['title'] + ": " + scoresForEachMissions[0] + " points"
    scoreMissionB.textContent = currentMissions[1]['title'] + ": " + scoresForEachMissions[1] + " points"
    scoreMissionC.textContent = currentMissions[2]['title'] + ": " + scoresForEachMissions[2] + " points"
    scoreMissionD.textContent = currentMissions[3]['title'] + ": " + scoresForEachMissions[3] + " points"
    scoreSurroundedMountain.textContent = "Surrounded Mountain: " + surroundedMountainScore + " points"
    totalScoreText.textContent = "total: " + totalScore + " points"
  }

  function maxConsecutiveLength(arr, target) {
    let maxCount = 0;
    let currentCount = 0;
  
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === target) {
        currentCount++;
        maxCount = Math.max(maxCount, currentCount);
      } else {
        currentCount = 0;
      }
    }
  
    return maxCount;
  }
})