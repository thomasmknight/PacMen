const pacArray = [
    ['PacMan1.png', 'PacMan2.png'],
    ['PacMan3.png', 'PacMan4.png']
];
const pacMen = []; 

function setToRandom(scale) {
    return {
        x: Math.random() * scale,
        y: Math.random() * scale
    }
}
// Factory to make a PacMan at a random position with random velocity
function makePac() {
    let velocity = setToRandom(20); 
    // console.log(velocity);
    let position = setToRandom(200);
    // console.log(position.x);
    // console.log(position.y);
    let direction = 0;
    let focus = 0;
    // Add image to div id = game
    let game = document.getElementById('game');
    let newimg = document.createElement('img');
    newimg.style.position = 'absolute';
    newimg.src = 'PacMan1.png';
    newimg.width = 100;
    newimg.style.left = position.x + "px";
    newimg.style.top = position.y + "px";
    
    // add new Child image to game
    game.appendChild(newimg);
    // return details in an object
    return {
        position,
        velocity,
        newimg,
        direction,
        focus
    }
}

function update() {
    pacMen.forEach((item) => {
        checkCollisions(item);
        item.position.x += item.velocity.x;
        item.position.y += item.velocity.y;
        item.newimg.style.left = item.position.x + "px";
        item.newimg.style.top = item.position.y + "px";
        // console.log(item.position.x);
        // console.log(item.position.y);
        
        item.focus = (item.focus + 1) % 2;
        item.newimg.src= pacArray[item.direction][item.focus];
        item.newimg.style.left = item.position.x;
        item.newimg.style.top = item.position.y;
    })
    setTimeout(update, 150);
}

function checkCollisions(item) {
    if((item.velocity.x + item.newimg.width + item.position.x) > window.innerWidth ||
    (item.velocity.x + item.position.x < 0)){ 
        item.velocity.x = (item.velocity.x * (-1));
        item.direction = (item.direction + 1) % 2;
    }
    if((item.velocity.y + item.newimg.height + item.position.y) > window.innerHeight ||
    (item.velocity.y + item.position.y < 0)){ 
        item.velocity.y = (item.velocity.y * (-1));
    }
}

function makeOne() {
    pacMen.push(makePac()); 
}

// function makeFood() {
//     var foodArray = [];
//     let food = document.createElement("food");
//     foodArray.fill(food, 0, 100);
// }
//v1 currently, the app works as expected except for the image update. look into how to update images across an array of objects
//v2 images are now updating fine, but movement has stopped for some reason
//v3 movement restored, page now functions correctly
//Look into adding a grid of food for the PacMen to eat, possibly put ghosts in the corners that change colors when special food is eaten