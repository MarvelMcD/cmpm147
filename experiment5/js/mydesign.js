/* exported getInspirations, initDesign, renderDesign, mutateDesign */


function getInspirations() {
    return [
      {
        name: "Smile", 
        assetUrl: "https://cdn.glitch.global/9484b7fc-6937-43fc-8f83-6b7e8ac386d7/smile.png?v=1715150648482",
        credit: "https://www.pngwing.com/en/free-png-sprqh"
      },
      {
        name: "Hands", 
        assetUrl: "https://cdn.glitch.global/9484b7fc-6937-43fc-8f83-6b7e8ac386d7/hands.webp?v=1715150453943",
        credit: "https://www.rawpixel.com/search/hands?page=1&path=_topics&sort=curated"
      },
      {
        name: "Target", 
        assetUrl: "https://cdn.glitch.global/9484b7fc-6937-43fc-8f83-6b7e8ac386d7/target.webp?v=1715150254983",
        credit: "https://objectshowfanonpedia.fandom.com/wiki/Target_(Logo_Battle)"
      },
      {
        name: "cs_militia", 
        assetUrl: "https://cdn.glitch.global/9484b7fc-6937-43fc-8f83-6b7e8ac386d7/militia.webp?v=1715150091628",
        credit: "Kristoffer Zetterstrand, 2002 https://zetterstrand.com/works/2002-paintings/"
      },
      {
        name: "de_aztec Painting", 
        assetUrl: "https://cdn.glitch.global/9484b7fc-6937-43fc-8f83-6b7e8ac386d7/cspaint.jpg?v=1715148016240",
        credit: "Kristoffer Zetterstrand, 2002 https://zetterstrand.com/works/2002-paintings/"
      },
    ];
  }
  
  // function initDesign(inspiration) {
  //   resizeCanvas(inspiration.image.width / 4, inspiration.image.height / 4);
  //   return {};
  // }
  
  // function renderDesign(design, inspiration) {
    
  // }
  
  // function mutateDesign(design, inspiration, rate) {}
  ////////////////////////////////////////////////////////////
  
  function initDesign(inspiration) {
    let design = {
      bg: 128,
      fg: []
    };
    
    for(let i = 0; i < 400; i++) {
      design.fg.push({
        x: random(width),
        y: random(height),
        diameter: random(min(width, height) / 2),
        fill: random(255)
      });
    }
    
    return design;
  }
  
  function renderDesign(design, inspiration) {
    background(design.bg);
    noStroke();
    
    for(let circle of design.fg) {
      fill(circle.fill, 128);
      ellipse(circle.x, circle.y, circle.diameter);
    }
  }
  
  function mutateDesign(design, inspiration, rate) {
    design.bg = mut(design.bg, 0, 255, rate);
    
    for(let circle of design.fg) {
      circle.fill = mut(circle.fill, 0, 255, rate);
      circle.x = mut(circle.x, 0, width, rate);
      circle.y = mut(circle.y, 0, height, rate);
      circle.diameter = mut(circle.diameter, 0, min(width, height) / 2, rate);
    }
  }
  
  
  function mut(num, min, max, rate) {
    return constrain(randomGaussian(num, (rate * (max - min)) / 10), min, max);
  }
  
  
  