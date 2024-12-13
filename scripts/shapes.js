// Aliases
const { Bodies, Engine, MouseConstraint, Render, World } = Matter;

const sectionTag = document.querySelector('section.shapes');
const width = window.innerWidth;
const height = window.innerHeight;

const wallOptions = {
  isStatic: true,
  render: {
    visible: false,
  }
};

// Engine: the computation and math behind 
const engine = Engine.create();
// Renderer: this draw the engine
const renderer = Render.create({
  element: sectionTag,
  engine,
  options: {
    background: '#000',
    wireframes: false,
    pixelRatio: window.devicePixelRatio,
    height,
    width,

  }
});

const mouseControl = MouseConstraint.create(engine, {
  element: sectionTag,
  constraint: {
    render: {
      visible: false,
    }
  }
});

const createShape = (x, y) => {
  return Bodies.circle(x, y, 20 + 20 * Math.random(),  {
    render: {
      fillStyle: 'red',
    }
  })
}

const bigBall = Bodies.circle(width / 2, height / 2, 250, {
  isStatic: true,
  render: {
    fillStyle: '#ffffff',
  }
});

const ground = Bodies.rectangle(width / 2, height + 50, width + 100, 100, wallOptions);

const ceiling = Bodies.rectangle(width / 2, - 50, width + 100, 100, wallOptions);

const leftWall = Bodies.rectangle(-50, height / 2, 100, height + 100, wallOptions);

const rightWall = Bodies.rectangle(width + 50, height / 2, 100, height + 100, wallOptions);

World.add(engine.world, [
  bigBall, 
  ceiling,
  ground,
  leftWall,
  mouseControl,
  rightWall,
]);

document.addEventListener('click', (e) => {
  const shape = createShape(e.pageX, e.pageY)
  World.add(engine.world, shape)  
});

Engine.run(engine);
Render.run(renderer);
