const { useState } = React;
const { Calculator, CheckCircle, XCircle, Lightbulb, RotateCcw, Home, Award } = lucide;

const App = () => {
  const [screen, setScreen] = useState('home');
  const [topic, setTopic] = useState('');
  const [mode, setMode] = useState('');
  const [stage, setStage] = useState('keywords');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [checkWork, setCheckWork] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const topics = {
    perimeter: { name: 'Perimeter', color: 'blue', icon: '📏', formula: '2 × (length + width)', units: 'cm, m' },
    area: { name: 'Area', color: 'green', icon: '⬛', formula: 'Length × Width', units: 'cm², m²' },
    volume: { name: 'Volume', color: 'purple', icon: '📦', formula: 'Length × Width × Height', units: 'cm³, m³' }
  };

  const keywordQuestions = {
    perimeter: [
      { text: 'Sarah wants to put a fence around her garden', answer: 'perimeter', explanation: '"Around" tells us this is perimeter' },
      { text: 'A picture frame needs ribbon going round the edge', answer: 'perimeter', explanation: '"Round" and "edge" are perimeter keywords' },
      { text: 'Calculate the border length needed for the carpet', answer: 'perimeter', explanation: '"Border" means distance around' },
      { text: 'How much edging is needed for the lawn?', answer: 'perimeter', explanation: '"Edging" goes around - perimeter' },
      { text: 'Distance around the plot of land', answer: 'perimeter', explanation: '"Distance around" = perimeter' },
      { text: 'Rope needed to go around the playground', answer: 'perimeter', explanation: '"Go around" = perimeter' },
      { text: 'Total length of all sides of the field', answer: 'perimeter', explanation: 'Adding all sides = perimeter' },
      { text: 'Fencing along the boundary', answer: 'perimeter', explanation: '"Boundary" and "fencing" = perimeter' }
    ],
    area: [
      { text: 'How many packs of flooring to cover the room?', answer: 'area', explanation: '"Cover" and "flooring" = area' },
      { text: 'How much carpet needed for the bedroom', answer: 'area', explanation: 'Carpet covers surface = area' },
      { text: 'How many tiles for the bathroom floor?', answer: 'area', explanation: 'Tiles cover surface = area' },
      { text: 'Paint needed to cover the wall', answer: 'area', explanation: '"Cover" = area' },
      { text: 'Surface area of the ceiling', answer: 'area', explanation: '"Surface area" = area' },
      { text: 'How many square metres of laminate?', answer: 'area', explanation: '"Square metres" = area unit' },
      { text: 'Patio covered with paving slabs', answer: 'area', explanation: '"Covered" = area' },
      { text: 'Each pack covers 5m². How many packs?', answer: 'area', explanation: '"m²" and "covers" = area' }
    ],
    volume: [
      { text: 'Water tank filled to top. How much water?', answer: 'volume', explanation: '"Tank", "filled", "hold" = volume' },
      { text: 'Capacity of the storage box', answer: 'volume', explanation: '"Capacity" = volume' },
      { text: 'Cuboid container full. How much contains?', answer: 'volume', explanation: '"Cuboid" and "full" = volume' },
      { text: 'How many litres in the fish tank?', answer: 'volume', explanation: 'Liquid in tank = volume' },
      { text: 'Pool 25m × 10m × 2m. How much water?', answer: 'volume', explanation: 'Three dimensions + "hold" = volume' },
      { text: 'Tank has depth of 50cm. What is volume?', answer: 'volume', explanation: '"Depth" = third dimension = volume' },
      { text: 'How many cubic centimetres can box contain?', answer: 'volume', explanation: '"Cubic cm" = volume unit' },
      { text: 'Container filled with sand. How much holds?', answer: 'volume', explanation: '"Filled" and "hold" = volume' }
    ]
  };

  const practiceQuestions = {
    perimeter: {
      calculator: [
        { q: 'Garden 12.5m × 8.3m. Perimeter?', d: { type: 'rectangle', w: 125, h: 83, l: ['12.5m', '8.3m'] }, ans: '41.6', u: 'm', w: ['P = 2 × (12.5 + 8.3)', 'P = 2 × 20.8 = 41.6m'], c: '12.5+12.5+8.3+8.3=41.6m', h: 'Use: 2 × (length + width)' },
        { q: 'Pool 25.5m × 12.8m. Perimeter?', d: { type: 'rectangle', w: 204, h: 102, l: ['25.5m', '12.8m'] }, ans: '76.6', u: 'm', w: ['P = 2 × (25.5 + 12.8)', 'P = 2 × 38.3 = 76.6m'], c: '25.5+25.5+12.8+12.8=76.6m', h: 'Add length and width, then × 2' },
        { q: 'Frame 45.5cm × 32.5cm. Ribbon around?', d: { type: 'rectangle', w: 182, h: 130, l: ['45.5cm', '32.5cm'] }, ans: '156', u: 'cm', w: ['P = 2 × (45.5 + 32.5)', 'P = 2 × 78 = 156cm'], c: '45.5+32.5+45.5+32.5=156cm', h: '"Around" = perimeter' },
        { q: 'Field 67.8m × 43.2m. Fence around?', d: { type: 'rectangle', w: 204, h: 130, l: ['67.8m', '43.2m'] }, ans: '222', u: 'm', w: ['P = 2 × (67.8 + 43.2)', 'P = 2 × 111 = 222m'], c: '67.8+67.8+43.2+43.2=222m', h: '"Around" and "fence" = perimeter' },
        { q: 'Playground 38.6m × 29.4m. Distance around?', d: { type: 'rectangle', w: 193, h: 147, l: ['38.6m', '29.4m'] }, ans: '136', u: 'm', w: ['P = 2 × (38.6 + 29.4)', 'P = 2 × 68 = 136m'], c: '38.6×2=77.2, 29.4×2=58.8, 77.2+58.8=136m', h: '"Distance around" = perimeter' },
        { q: 'Table 1.8m × 0.9m. Edging £3.50/m. Cost?', d: { type: 'rectangle', w: 180, h: 90, l: ['1.8m', '0.9m'] }, ans: '18.9', u: '£', w: ['P = 2 × (1.8 + 0.9) = 5.4m', 'Cost = 5.4 × 3.50 = £18.90'], c: '18.90 ÷ 3.50 = 5.4m', h: 'Find perimeter, then × price' }
      ],
      nonCalculator: [
        { q: 'Field 45m × 30m. Perimeter?', d: { type: 'rectangle', w: 180, h: 120, l: ['45m', '30m'] }, ans: '150', u: 'm', w: ['P = 45 + 30 + 45 + 30 = 150m'], c: '2 × (45 + 30) = 2 × 75 = 150m', h: 'Add all four sides' },
        { q: 'Lawn 20m × 15m. Fence around?', d: { type: 'rectangle', w: 160, h: 120, l: ['20m', '15m'] }, ans: '70', u: 'm', w: ['P = 20 + 15 + 20 + 15 = 70m'], c: '2 × 35 = 70m', h: '"Around" = perimeter' },
        { q: 'Notice board 80cm × 60cm. Perimeter?', d: { type: 'rectangle', w: 160, h: 120, l: ['80cm', '60cm'] }, ans: '280', u: 'cm', w: ['P = 80 + 60 + 80 + 60 = 280cm'], c: '2 × (80 + 60) = 2 × 140 = 280cm', h: 'Add all sides' },
        { q: 'Carpet 6m × 4m. Perimeter?', d: { type: 'rectangle', w: 180, h: 120, l: ['6m', '4m'] }, ans: '20', u: 'm', w: ['P = 6 + 4 + 6 + 4 = 20m'], c: '2 × 10 = 20m', h: 'Perimeter = add all sides' },
        { q: 'Picture 50cm × 40cm. Frame around?', d: { type: 'rectangle', w: 150, h: 120, l: ['50cm', '40cm'] }, ans: '180', u: 'cm', w: ['P = 50 + 40 + 50 + 40 = 180cm'], c: '2 × (50 + 40) = 2 × 90 = 180cm', h: '"Around" = perimeter' },
        { q: 'Garden 25m × 18m. Distance around?', d: { type: 'rectangle', w: 200, h: 144, l: ['25m', '18m'] }, ans: '86', u: 'm', w: ['P = 25 + 18 + 25 + 18 = 86m'], c: '2 × (25 + 18) = 2 × 43 = 86m', h: '"Distance around" = perimeter' }
      ]
    },
    area: {
      calculator: [
        { q: 'Room 5.6m × 3.8m. Area?', d: { type: 'rectangle', w: 168, h: 114, l: ['5.6m', '3.8m'] }, ans: '21.28', u: 'm²', w: ['A = 5.6 × 3.8 = 21.28
