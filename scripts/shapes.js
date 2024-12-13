// Aliases
const { Bodies, Engine, Render, World } = Matter;

const sectionTag = document.querySelector('section.shapes');
const width = window.innerWidth;
const height = window.innerHeight;

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

World.add(engine.world, [bigBall]);

document.addEventListener('click', (e) => {
  const shape = createShape(e.pageX, e.pageY)
  World.add(engine.world, shape)  
});

Engine.run(engine);
Render.run(renderer);
