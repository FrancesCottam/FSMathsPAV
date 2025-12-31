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
        { q: 'Room 5.6m × 3.8m. Area?', d: { type: 'rectangle', w: 168, h: 114, l: ['5.6m', '3.8m'] }, ans: '21.28', u: 'm²', w: ['A = 5.6 × 3.8 = 21.28m²'], c: '3.8 × 5.6 = 21.28m²', h: 'Length × width' },
        { q: 'Kitchen 4.2m × 3.5m. Tiles 0.5m² pack. Packs?', d: { type: 'rectangle', w: 168, h: 140, l: ['4.2m', '3.5m'] }, ans: '30', u: 'packs', w: ['A = 4.2 × 3.5 = 14.7m²', 'Packs = 14.7 ÷ 0.5 = 29.4', 'Round UP to 30'], c: '30 × 0.5 = 15m² (covers 14.7m²)', h: 'Area ÷ pack size, round UP' },
        { q: 'Wall 3.6m × 8.5m. Paint 12m²/tin. Tins?', d: { type: 'rectangle', w: 170, h: 72, l: ['8.5m', '3.6m'] }, ans: '3', u: 'tins', w: ['A = 3.6 × 8.5 = 30.6m²', 'Tins = 30.6 ÷ 12 = 2.55', 'Round UP to 3'], c: '3 × 12 = 36m² (covers 30.6m²)', h: 'Area ÷ coverage, round UP' },
        { q: 'Bedroom 4.8m × 3.6m. Carpet £24.50/m². Cost?', d: { type: 'rectangle', w: 192, h: 144, l: ['4.8m', '3.6m'] }, ans: '423.36', u: '£', w: ['A = 4.8 × 3.6 = 17.28m²', 'Cost = 17.28 × 24.50 = £423.36'], c: '423.36 ÷ 24.50 = 17.28m²', h: 'Area × price per m²' },
        { q: 'Living room 6.4m × 5.2m. Packs 2.5m². Packs?', d: { type: 'rectangle', w: 192, h: 156, l: ['6.4m', '5.2m'] }, ans: '14', u: 'packs', w: ['A = 6.4 × 5.2 = 33.28m²', 'Packs = 33.28 ÷ 2.5 = 13.3', 'Round UP to 14'], c: '14 × 2.5 = 35m²', h: 'Find area, ÷ pack size, round UP' },
        { q: 'Lawn 15.6m × 9.8m. Seed £2.80/m². Cost?', d: { type: 'rectangle', w: 195, h: 123, l: ['15.6m', '9.8m'] }, ans: '427.78', u: '£', w: ['A = 15.6 × 9.8 = 152.88m²', 'Cost = 152.88 × 2.80 = £427.78'], c: '427.78 ÷ 2.80 ≈ 152.78m²', h: 'Area × price' }
      ],
      nonCalculator: [
        { q: 'Carpet 8m × 6m. Area?', d: { type: 'rectangle', w: 160, h: 120, l: ['8m', '6m'] }, ans: '48', u: 'm²', w: ['A = 8 × 6 = 48m²'], c: '6 × 8 = 48m²', h: 'Length × width' },
        { q: 'Patio 12m × 9m. Area?', d: { type: 'rectangle', w: 160, h: 120, l: ['12m', '9m'] }, ans: '108', u: 'm²', w: ['A = 12 × 9 = 108m²'], c: '9 × 12 = 108m²', h: 'Multiply sides' },
        { q: 'Wall 4m × 7m. Area?', d: { type: 'rectangle', w: 175, h: 100, l: ['7m', '4m'] }, ans: '28', u: 'm²', w: ['A = 7 × 4 = 28m²'], c: '4 × 7 = 28m²', h: 'Length × width' },
        { q: 'Kitchen 5m × 4m. Tiles £20/m². Cost?', d: { type: 'rectangle', w: 150, h: 120, l: ['5m', '4m'] }, ans: '400', u: '£', w: ['A = 5 × 4 = 20m²', 'Cost = 20 × £20 = £400'], c: '400 ÷ 20 = 20m²', h: 'Find area, × price' },
        { q: 'Lawn 15m × 10m. Area?', d: { type: 'rectangle', w: 180, h: 120, l: ['15m', '10m'] }, ans: '150', u: 'm²', w: ['A = 15 × 10 = 150m²'], c: '10 × 15 = 150m²', h: 'Length × width' },
        { q: 'Board 80cm × 60cm. Area?', d: { type: 'rectangle', w: 160, h: 120, l: ['80cm', '60cm'] }, ans: '4800', u: 'cm²', w: ['A = 80 × 60 = 4800cm²'], c: '60 × 80 = 4800cm²', h: 'Length × width' }
      ]
    },
    volume: {
      calculator: [
        { q: 'Box 80cm × 50cm × 40cm. Volume?', d: { type: 'cuboid', w: 160, h: 100, d: 80, l: ['80cm', '50cm', '40cm'] }, ans: '160000', u: 'cm³', w: ['V = 80 × 50 × 40 = 160,000cm³'], c: '40 × 50 × 80 = 160,000cm³', h: 'Length × width × height' },
        { q: 'Tank 120cm × 60cm × 45cm, 2/3 full. Litres? (1000cm³=1L)', d: { type: 'cuboid', w: 160, h: 80, d: 60, l: ['120cm', '60cm', '45cm'] }, ans: '216', u: 'litres', w: ['V = 120 × 60 × 45 = 324,000cm³', '2/3 = 324,000 × 2 ÷ 3 = 216,000cm³', 'L = 216,000 ÷ 1000 = 216L'], c: '216 × 1000 = 216,000cm³', h: 'Total volume × 2/3, then ÷ 1000' },
        { q: 'Fish tank 75cm × 35cm × 40cm. Litres? (1000cm³=1L)', d: { type: 'cuboid', w: 150, h: 80, d: 70, l: ['75cm', '35cm', '40cm'] }, ans: '105', u: 'litres', w: ['V = 75 × 35 × 40 = 105,000cm³', 'L = 105,000 ÷ 1000 = 105L'], c: '105 × 1000 = 105,000cm³', h: 'Volume in cm³ ÷ 1000' },
        { q: 'Pool 25m × 10m × 1.5m. Litres? (1m³=1000L)', d: { type: 'cuboid', w: 200, h: 80, d: 60, l: ['25m', '10m', '1.5m'] }, ans: '375000', u: 'litres', w: ['V = 25 × 10 × 1.5 = 375m³', 'L = 375 × 1000 = 375,000L'], c: '375,000 ÷ 1000 = 375m³', h: 'Volume in m³ × 1000' },
        { q: 'Container 2.5m × 1.8m × 2m. Volume?', d: { type: 'cuboid', w: 175, h: 140, d: 126, l: ['2.5m', '1.8m', '2m'] }, ans: '9', u: 'm³', w: ['V = 2.5 × 1.8 × 2 = 9m³'], c: '2 × 1.8 × 2.5 = 9m³', h: 'Length × width × height' },
        { q: 'Box 65cm × 45cm × 38cm, 3/4 full rice. cm³?', d: { type: 'cuboid', w: 162, h: 95, d: 112, l: ['65cm', '45cm', '38cm'] }, ans: '83362.5', u: 'cm³', w: ['V = 65 × 45 × 38 = 111,150cm³', '3/4 = 111,150 × 3 ÷ 4 = 83,362.5cm³'], c: '83,362.5 × 4 ÷ 3 = 111,150cm³', h: 'Total volume × 3/4' }
      ],
      nonCalculator: [
        { q: 'Box 20cm × 10cm × 5cm. Volume?', d: { type: 'cuboid', w: 160, h: 80, d: 40, l: ['20cm', '10cm', '5cm'] }, ans: '1000', u: 'cm³', w: ['V = 20 × 10 × 5 = 1000cm³'], c: '5 × 10 × 20 = 1000cm³', h: 'Length × width × height' },
        { q: 'Tank 50cm × 40cm × 30cm. Volume?', d: { type: 'cuboid', w: 160, h: 120, d: 80, l: ['50cm', '40cm', '30cm'] }, ans: '60000', u: 'cm³', w: ['V = 50 × 40 × 30 = 60,000cm³'], c: '30 × 40 × 50 = 60,000cm³', h: 'Multiply all three' },
        { q: 'Cube 10cm × 10cm × 10cm. Volume?', d: { type: 'cuboid', w: 140, h: 140, d: 140, l: ['10cm', '10cm', '10cm'] }, ans: '1000', u: 'cm³', w: ['V = 10 × 10 × 10 = 1000cm³'], c: '10³ = 1000cm³', h: 'All sides same = cube' },
        { q: 'Box 25cm × 20cm × 15cm. Volume?', d: { type: 'cuboid', w: 166, h: 100, d: 133, l: ['25cm', '20cm', '15cm'] }, ans: '7500', u: 'cm³', w: ['V = 25 × 20 × 15 = 7500cm³'], c: '15 × 20 × 25 = 7500cm³', h: 'Length × width × height' },
        { q: 'Cuboid 30cm × 20cm × 10cm. Volume?', d: { type: 'cuboid', w: 180, h: 100, d: 120, l: ['30cm', '20cm', '10cm'] }, ans: '6000', u: 'cm³', w: ['V = 30 × 20 × 10 = 6000cm³'], c: '10 × 20 × 30 = 6000cm³', h: 'Length × width × height' },
        { q: 'Fish tank 40cm × 25cm × 30cm. Volume?', d: { type: 'cuboid', w: 160, h: 120, d: 100, l: ['40cm', '25cm', '30cm'] }, ans: '30000', u: 'cm³', w: ['V = 40 × 25 × 30 = 30,000cm³'], c: '30 × 25 × 40 = 30,000cm³', h: 'Multiply all dimensions' }
      ]
    }
  };

  const ShapeDiagram = ({ diagram }) => {
    if (diagram.type === 'rectangle') {
      return (
        <div className="relative mx-auto" style={{ width: diagram.w + 40, height: diagram.h + 40 }}>
          <div className="absolute border-4 border-gray-700 bg-blue-50" style={{ width: diagram.w, height: diagram.h, top: 20, left: 20 }} />
          <div className="absolute text-sm font-bold text-blue-700" style={{ top: 5, left: '50%', transform: 'translateX(-50%)' }}>{diagram.l[0]}</div>
          <div className="absolute text-sm font-bold text-blue-700" style={{ right: 5, top: '50%', transform: 'translateY(-50%) rotate(-90deg)' }}>{diagram.l[1]}</div>
        </div>
      );
    }
    
    if (diagram.type === 'cuboid') {
      return (
        <div className="relative mx-auto" style={{ width: 250, height: 180 }}>
          <svg width="250" height="180" viewBox="0 0 250 180">
            <path d="M 80 40 L 200 40 L 200 120 L 80 120 Z" fill="#e0e7ff" stroke="#4338ca" strokeWidth="2"/>
            <path d="M 50 70 L 170 70 L 170 150 L 50 150 Z" fill="#c7d2fe" stroke="#4338ca" strokeWidth="3"/>
            <path d="M 50 70 L 80 40 L 200 40 L 170 70 Z" fill="#a5b4fc" stroke="#4338ca" strokeWidth="2"/>
            <path d="M 170 70 L 200 40 L 200 120 L 170 150 Z" fill="#8b5cf6" stroke="#4338ca" strokeWidth="2"/>
            <text x="110" y="165" fontSize="14" fontWeight="bold" fill="#4338ca">{diagram.l[0]}</text>
            <text x="185" y="90" fontSize="14" fontWeight="bold" fill="#4338ca">{diagram.l[2]}</text>
            <text x="115" y="30" fontSize="14" fontWeight="bold" fill="#4338ca">{diagram.l[1]}</text>
          </svg>
        </div>
      );
    }
    return null;
  };

  const resetQuestion = () => {
    setAnswer('');
    setCheckWork('');
    setShowHint(false);
    setShowFeedback(false);
  };

  if (screen === 'home') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">📐 Maths Practice</h1>
            <h2 className="text-2xl text-indigo-600 mb-4">Level 1: Area, Perimeter & Volume</h2>
            <p className="text-gray-600">Master calculations with step-by-step practice</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {Object.keys(topics).map(key => (
              <button key={key} onClick={() => { setTopic(key); setScreen('mode'); }}
                className={`bg-${topics[key].color}-500 text-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:scale-105`}>
                <div className="text-6xl mb-4">{topics[key].icon}</div>
                <h3 className="text-2xl font-bold mb-2">{topics[key].name}</h3>
                <div className="bg-white/20 rounded-lg p-3 mt-4 text-sm">
                  <p className="font-semibold mb-1">Formula:</p>
                  <p>{topics[key].formula}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (screen === 'mode') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-3xl mx-auto">
          <button onClick={() => setScreen('home')} className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-800 bg-white px-4 py-2 rounded-lg">
            <Home size={20} /> Back
          </button>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 text-center">
            <div className="text-6xl mb-4">{topics[topic].icon}</div>
            <h1 className="text-3xl font-bold mb-2">{topics[topic].name}</h1>
            <p className="text-gray-600">Choose your practice mode</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <button onClick={() => { setMode('nonCalculator'); setScreen('stage'); }}
              className="bg-orange-500 text-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all">
              <div className="text-5xl mb-4">✏️</div>
              <h3 className="text-2xl font-bold mb-3">Non-Calculator</h3>
              <p className="text-white/90">Mental maths and written methods</p>
            </button>

            <button onClick={() => { setMode('calculator'); setScreen('stage'); }}
              className="bg-blue-500 text-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all">
              <Calculator className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-3">Calculator</h3>
              <p className="text-white/90">More complex numbers</p>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 'stage') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-3xl mx-auto">
          <button onClick={() => setScreen('mode')} className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-800 bg-white px-4 py-2 rounded-lg">
            ← Back
          </button>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <h2 className="text-2xl font-bold mb-2">{topics[topic].name} Practice</h2>
            <p className="text-gray-600">{mode === 'calculator' ? 'Calculator' : 'Non-Calculator'} Mode</p>
          </div>

          <div className="space-y-4">
            <button onClick={() => { setStage('keywords'); setQuestionIndex(0); resetQuestion(); setScore({ correct: 0, total: 0 }); setScreen('practice'); }}
              className="w-full bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all text-left">
              <div className="flex items-center gap-4">
                <div className="text-4xl">🔍</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1">Step 1: Keyword Recognition</h3>
                  <p className="text-gray-600">Learn to identify when to use {topics[topic].name.toLowerCase()}</p>
                </div>
              </div>
            </button>

            <button onClick={() => { setStage('practice'); setQuestionIndex(0); resetQuestion(); setScore({ correct: 0, total: 0 }); setScreen('practice'); }}
              className="w-full bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all text-left">
              <div className="flex items-center gap-4">
                <div className="text-4xl">📝</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1">Step 2: Calculation Practice</h3>
                  <p className="text-gray-600">Solve {topics[topic].name.toLowerCase()} questions with hints</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 'practice') {
    const questions = stage === 'keywords' ? keywordQuestions[topic] : practiceQuestions[topic][mode];
    
    if (questionIndex >= questions.length) {
      const percentage = Math.round((score.correct / score.total) * 100);
      
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <Award className="w-24 h-24 mx-auto mb-4 text-yellow-500" />
              <h2 className="text-3xl font-bold mb-4">{stage === 'keywords' ? 'Keywords Complete!' : 'Practice Complete!'}</h2>
             className={
  key === 'perimeter' ? 'bg-blue-500 text-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:scale-105' :
  key === 'area' ? 'bg-green-500 text-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:scale-105' :
  'bg-purple-500 text-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:scale-105'
}
                <p className="text-xl mb-2">Your Score</p>
                <p className="text-5xl font-bold">{score.correct}/{score.total}</p>
                <p className="text-2xl mt-2">{percentage}%</p>
              </div>
              
              {percentage >= 80 ? (
                <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4 mb-6">
                  <p className="text-green-900 font-semibold">Excellent! Ready for next challenge.</p>
                </div>
              ) : (
                <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4 mb-6">
                  <p className="text-yellow-900 font-semibold">Keep practicing! Review hints and try again.</p>
                </div>
              )}
              
              <div className="space-y-3">
                <button onClick={() => { setQuestionIndex(0); resetQuestion(); setScore({ correct: 0, total: 0 }); }}
                  className={`w-full bg-${topics[topic].color}-500 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2`}>
                  <RotateCcw size={20} /> Practice Again
                </button>
                <button onClick={() => setScreen('stage')} className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold">
                  Choose Different Practice
                </button>
                <button onClick={() => setScreen('home')} className="w-full bg-white border-2 border-gray-300 text-gray-800 py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
                  <Home size={20} /> Home
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    const q = questions[questionIndex];

    if (stage === 'keywords') {
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
          <div className="max-w-2xl mx-auto">
            <button onClick={() => setScreen('stage')} className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-800 bg-white px-4 py-2 rounded-lg">
              ← Back
            </button>

            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Keyword Recognition</h2>
                <div className="flex gap-4">
                  <span className="text-gray-600">Q {questionIndex + 1}/{questions.length}</span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-semibold">{score.correct}/{score.total}</span>
                </div>
              </div>

              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-6">
                <p className="text-lg text-gray-800">{q.text}</p>
              </div>

              <p className="text-xl font-semibold text-center mb-6">Is this Area, Perimeter, or Volume?</p>

              {!showFeedback ? (
                <div className="grid grid-cols-3 gap-4">
                  {['perimeter', 'area', 'volume'].map(type => (
                    <button key={type} onClick={() => {
                        const correct = type === q.answer;
                        setScore(prev => ({ correct: prev.correct + (correct ? 1 : 0), total: prev.total + 1 }));
                        setShowFeedback(correct ? 'correct' : 'wrong');
                      }}
                      className={`bg-${topics[type].color}-500 text-white py-6 rounded-xl font-bold text-lg hover:opacity-90 transition-all`}>
                      <div className="text-3xl mb-2">{topics[type].icon}</div>
                      {topics[type].name}
                    </button>
                  ))}
                </div>
              ) : (
                <div>
                  <div className={`${showFeedback === 'correct' ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'} border-2 rounded-lg p-6 mb-6`}>
                    <div className="flex items-center gap-3 mb-3">
                      {showFeedback === 'correct' ? (
                        <><CheckCircle className="text-green-600" size={32} /><h3 className="text-2xl font-bold text-green-900">Correct!</h3></>
                      ) : (
                        <><XCircle className="text-red-600" size={32} /><h3 className="text-2xl font-bold text-red-900">Not quite</h3></>
                      )}
                    </div>
                    <p className={showFeedback === 'correct' ? 'text-green-800' : 'text-red-800'}>{q.explanation}</p>
                  </div>
                  
                  <button onClick={() => { setQuestionIndex(questionIndex + 1); resetQuestion(); }}
                    className={`w-full bg-${topics[topic].color}-500 text-white py-4 rounded-lg font-bold text-lg`}>
                    Next Question →
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-3xl mx-auto">
          <button onClick={() => setScreen('stage')} className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-800 bg-white px-4 py-2 rounded-lg">
            ← Back
          </button>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">{topics[topic].name} Practice</h2>
              <div className="flex gap-4 items-center">
                <span className="text-gray-600">Q {questionIndex + 1}/{questions.length}</span>
                {mode === 'calculator' ? (
                  <div className="flex items-center gap-2 text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    <Calculator size={18} />
                    <span className="font-semibold text-sm">Calculator OK</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                    <span className="text-lg">✏️</span>
                    <span className="font-semibold text-sm">No Calculator</span>
                  </div>
                )}
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-semibold">{score.correct}/{score.total}</span>
              </div>
            </div>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-6">
              <p className="text-lg text-gray-800">{q.q}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <p className="text-sm font-semibold text-gray-600 mb-3">DIAGRAM:</p>
              <ShapeDiagram diagram={q.d} />
            </div>

            {!showFeedback ? (
              <>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Your Answer:</label>
                  <div className="flex gap-2">
                    <input type="number" step="any" value={answer} onChange={(e) => setAnswer(e.target.value)}
                      className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg text-lg focus:border-indigo-500 focus:outline-none"
                      placeholder="Enter your answer" />
                    <span className="px-4 py-3 bg-gray-100 rounded-lg font-semibold">{q.u}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 font-semibold mb-2">Show Your Working (Required for L1):</label>
                  <textarea value={checkWork} onChange={(e) => setCheckWork(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                    placeholder="Write your working and check..." rows="3" />
                </div>

                {showHint && (
                  <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4 mb-4">
                    <div className="flex items-start gap-3">
                      <Lightbulb className="text-yellow-600 flex-shrink-0" size={24} />
                      <div>
                        <p className="font-semibold text-yellow-900 mb-1">Hint:</p>
                        <p className="text-yellow-800">{q.h}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  <button onClick={() => setShowHint(true)}
                    className="flex-1 bg-yellow-500 text-white py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-all flex items-center justify-center gap-2">
                    <Lightbulb size={20} /> Show Hint
                  </button>
                  <button onClick={() => {
                      const correct = parseFloat(answer) === parseFloat(q.ans);
                      setScore(prev => ({ correct: prev.correct + (correct ? 1 : 0), total: prev.total + 1 }));
                      setShowFeedback(true);
                    }}
                    disabled={!answer}
                    className={`flex-1 bg-${topics[topic].color}-500 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-all disabled:opacity-50`}>
                    Check Answer
                  </button>
                </div>
              </>
            ) : (
              <div className="space-y-4">
                {parseFloat(answer) === parseFloat(q.ans) ? (
                  <div className="bg-green-50 border-2 border-green-300 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <CheckCircle className="text-green-600" size={32} />
                      <h3 className="text-2xl font-bold text-green-900">Correct!</h3>
                    </div>
                    <div className="text-green-800 space-y-2">
                      <p className="font-semibold">Working:</p>
                      {q.w.map((step, idx) => (<p key={idx}>• {step}</p>))}
                      <div className="mt-4 p-3 bg-green-100 rounded">
                        <p className="font-semibold">Check:</p>
                        <p>{q.c}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <XCircle className="text-red-600" size={32} />
                      <h3 className="text-2xl font-bold text-red-900">Not quite right</h3>
                    </div>
                    <p className="text-red-800 mb-3">Correct answer: <strong>{q.ans}{q.u}</strong></p>
                    <div className="text-red-800 space-y-2">
                      <p className="font-semibold">How to solve:</p>
                      {q.w.map((step, idx) => (<p key={idx}>• {step}</p>))}
                      <div className="mt-4 p-3 bg-red-100 rounded">
                        <p className="font-semibold">Check:</p>
                        <p>{q.c}</p>
                      </div>
                    </div>
                  </div>
                )}

                <button onClick={() => { setQuestionIndex(questionIndex + 1); resetQuestion(); }}
                  className={`w-full bg-${topics[topic].color}-500 text-white py-4 rounded-lg font-semibold text-lg hover:opacity-90`}>
                  {questionIndex < questions.length - 1 ? 'Next Question →' : 'Finish →'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App));
