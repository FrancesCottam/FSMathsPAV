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
    perimeter: { name: 'Perimeter', color: '#3b82f6', icon: '📏', formula: '2 × (length + width)' },
    area: { name: 'Area', color: '#22c55e', icon: '⬛', formula: 'Length × Width' },
    volume: { name: 'Volume', color: '#a855f7', icon: '📦', formula: 'Length × Width × Height' }
  };

  const keywordQuestions = {
    perimeter: [
      { text: 'Sarah wants to put a fence around her garden', answer: 'perimeter', explanation: '"Around" tells us this is perimeter' },
      { text: 'A picture frame needs ribbon going round the edge', answer: 'perimeter', explanation: '"Round" and "edge" are perimeter keywords' },
      { text: 'Calculate the border length needed', answer: 'perimeter', explanation: '"Border" means distance around' },
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
      { text: 'Pool 25m × 10m × 2m. How much water?', answer: 'volume', explanation: 'Three dimensions = volume' },
      { text: 'Tank has depth of 50cm. What is volume?', answer: 'volume', explanation: '"Depth" = third dimension = volume' },
      { text: 'How many cubic centimetres can box contain?', answer: 'volume', explanation: '"Cubic cm" = volume unit' },
      { text: 'Container filled with sand. How much holds?', answer: 'volume', explanation: '"Filled" and "hold" = volume' }
    ]
  };

  const practiceQuestions = {
    perimeter: {
      calculator: [
        { q: 'Garden 12.5m × 8.3m. Perimeter?', d: { type: 'rect', w: 125, h: 83, l: ['12.5m', '8.3m'] }, ans: '41.6', u: 'm', w: ['P = 2 × (12.5 + 8.3)', 'P = 2 × 20.8 = 41.6m'], c: '12.5+12.5+8.3+8.3=41.6m', h: 'Use: 2 × (length + width)' },
        { q: 'Pool 25.5m × 12.8m. Perimeter?', d: { type: 'rect', w: 204, h: 102, l: ['25.5m', '12.8m'] }, ans: '76.6', u: 'm', w: ['P = 2 × (25.5 + 12.8)', 'P = 76.6m'], c: '25.5+25.5+12.8+12.8=76.6m', h: 'Add length + width, × 2' },
        { q: 'Frame 45.5cm × 32.5cm. Ribbon?', d: { type: 'rect', w: 182, h: 130, l: ['45.5cm', '32.5cm'] }, ans: '156', u: 'cm', w: ['P = 2 × (45.5 + 32.5) = 156cm'], c: '45.5+32.5+45.5+32.5=156cm', h: '"Around" = perimeter' },
        { q: 'Field 67.8m × 43.2m. Fence?', d: { type: 'rect', w: 204, h: 130, l: ['67.8m', '43.2m'] }, ans: '222', u: 'm', w: ['P = 2 × (67.8 + 43.2) = 222m'], c: '67.8+67.8+43.2+43.2=222m', h: '"Fence" = perimeter' }
      ],
      nonCalculator: [
        { q: 'Field 45m × 30m. Perimeter?', d: { type: 'rect', w: 180, h: 120, l: ['45m', '30m'] }, ans: '150', u: 'm', w: ['P = 45 + 30 + 45 + 30 = 150m'], c: '2 × 75 = 150m', h: 'Add all four sides' },
        { q: 'Lawn 20m × 15m. Fence?', d: { type: 'rect', w: 160, h: 120, l: ['20m', '15m'] }, ans: '70', u: 'm', w: ['P = 20 + 15 + 20 + 15 = 70m'], c: '2 × 35 = 70m', h: '"Around" = perimeter' },
        { q: 'Board 80cm × 60cm. Perimeter?', d: { type: 'rect', w: 160, h: 120, l: ['80cm', '60cm'] }, ans: '280', u: 'cm', w: ['P = 80 + 60 + 80 + 60 = 280cm'], c: '2 × 140 = 280cm', h: 'Add all sides' }
      ]
    },
    area: {
      calculator: [
        { q: 'Room 5.6m × 3.8m. Area?', d: { type: 'rect', w: 168, h: 114, l: ['5.6m', '3.8m'] }, ans: '21.28', u: 'm²', w: ['A = 5.6 × 3.8 = 21.28m²'], c: '3.8 × 5.6 = 21.28m²', h: 'Length × width' },
        { q: 'Kitchen 4.2m × 3.5m. Tiles 0.5m²/pack. Packs?', d: { type: 'rect', w: 168, h: 140, l: ['4.2m', '3.5m'] }, ans: '30', u: 'packs', w: ['A = 4.2 × 3.5 = 14.7m²', 'Packs = 14.7 ÷ 0.5 = 29.4', 'Round UP to 30'], c: '30 × 0.5 = 15m²', h: 'Area ÷ pack, round UP' },
        { q: 'Wall 3.6m × 8.5m. Paint 12m²/tin. Tins?', d: { type: 'rect', w: 170, h: 72, l: ['8.5m', '3.6m'] }, ans: '3', u: 'tins', w: ['A = 3.6 × 8.5 = 30.6m²', 'Tins = 30.6 ÷ 12 = 2.55', 'Round UP to 3'], c: '3 × 12 = 36m²', h: 'Area ÷ coverage, round UP' }
      ],
      nonCalculator: [
        { q: 'Carpet 8m × 6m. Area?', d: { type: 'rect', w: 160, h: 120, l: ['8m', '6m'] }, ans: '48', u: 'm²', w: ['A = 8 × 6 = 48m²'], c: '6 × 8 = 48m²', h: 'Length × width' },
        { q: 'Patio 12m × 9m. Area?', d: { type: 'rect', w: 160, h: 120, l: ['12m', '9m'] }, ans: '108', u: 'm²', w: ['A = 12 × 9 = 108m²'], c: '9 × 12 = 108m²', h: 'Multiply sides' },
        { q: 'Wall 4m × 7m. Area?', d: { type: 'rect', w: 175, h: 100, l: ['7m', '4m'] }, ans: '28', u: 'm²', w: ['A = 7 × 4 = 28m²'], c: '4 × 7 = 28m²', h: 'Length × width' }
      ]
    },
    volume: {
      calculator: [
        { q: 'Box 80cm × 50cm × 40cm. Volume?', d: { type: 'cube', w: 160, h: 100, d: 80, l: ['80cm', '50cm', '40cm'] }, ans: '160000', u: 'cm³', w: ['V = 80 × 50 × 40 = 160,000cm³'], c: '40 × 50 × 80 = 160,000cm³', h: 'L × W × H' },
        { q: 'Tank 120×60×45cm, 2/3 full. Litres? (1000cm³=1L)', d: { type: 'cube', w: 160, h: 80, d: 60, l: ['120cm', '60cm', '45cm'] }, ans: '216', u: 'L', w: ['V = 120 × 60 × 45 = 324,000cm³', '2/3 = 216,000cm³', 'L = 216'], c: '216 × 1000 = 216,000cm³', h: 'Volume × 2/3, ÷ 1000' }
      ],
      nonCalculator: [
        { q: 'Box 20cm × 10cm × 5cm. Volume?', d: { type: 'cube', w: 160, h: 80, d: 40, l: ['20cm', '10cm', '5cm'] }, ans: '1000', u: 'cm³', w: ['V = 20 × 10 × 5 = 1000cm³'], c: '5 × 10 × 20 = 1000cm³', h: 'L × W × H' },
        { q: 'Tank 50cm × 40cm × 30cm. Volume?', d: { type: 'cube', w: 160, h: 120, d: 80, l: ['50cm', '40cm', '30cm'] }, ans: '60000', u: 'cm³', w: ['V = 50 × 40 × 30 = 60,000cm³'], c: '30 × 40 × 50 = 60,000cm³', h: 'Multiply all three' }
      ]
    }
  };

  const Diagram = ({ d }) => {
    if (d.type === 'rect') {
      return React.createElement('div', { className: "relative mx-auto", style: { width: d.w + 40, height: d.h + 40 } },
        React.createElement('div', { className: "absolute border-4 border-gray-700 bg-blue-50", style: { width: d.w, height: d.h, top: 20, left: 20 } }),
        React.createElement('div', { className: "absolute text-sm font-bold text-blue-700", style: { top: 5, left: '50%', transform: 'translateX(-50%)' } }, d.l[0]),
        React.createElement('div', { className: "absolute text-sm font-bold text-blue-700", style: { right: 5, top: '50%', transform: 'translateY(-50%) rotate(-90deg)' } }, d.l[1])
      );
    }
    
    if (d.type === 'cube') {
      return React.createElement('div', { className: "relative mx-auto", style: { width: 250, height: 180 } },
        React.createElement('svg', { width: "250", height: "180", viewBox: "0 0 250 180" },
          React.createElement('path', { d: "M 80 40 L 200 40 L 200 120 L 80 120 Z", fill: "#e0e7ff", stroke: "#4338ca", strokeWidth: "2" }),
          React.createElement('path', { d: "M 50 70 L 170 70 L 170 150 L 50 150 Z", fill: "#c7d2fe", stroke: "#4338ca", strokeWidth: "3" }),
          React.createElement('path', { d: "M 50 70 L 80 40 L 200 40 L 170 70 Z", fill: "#a5b4fc", stroke: "#4338ca", strokeWidth: "2" }),
          React.createElement('path', { d: "M 170 70 L 200 40 L 200 120 L 170 150 Z", fill: "#8b5cf6", stroke: "#4338ca", strokeWidth: "2" }),
          React.createElement('text', { x: "110", y: "165", fontSize: "14", fontWeight: "bold", fill: "#4338ca" }, d.l[0]),
          React.createElement('text', { x: "185", y: "90", fontSize: "14", fontWeight: "bold", fill: "#4338ca" }, d.l[2]),
          React.createElement('text', { x: "115", y: "30", fontSize: "14", fontWeight: "bold", fill: "#4338ca" }, d.l[1])
        )
      );
    }
    return null;
  };

  const reset = () => {
    setAnswer('');
    setCheckWork('');
    setShowHint(false);
    setShowFeedback(false);
  };

  if (screen === 'home') {
    return React.createElement('div', { className: "min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4" },
      React.createElement('div', { className: "max-w-4xl mx-auto" },
        React.createElement('div', { className: "bg-white rounded-2xl shadow-xl p-8 mb-6" },
          React.createElement('h1', { className: "text-4xl font-bold text-gray-800 mb-2" }, '📐 Maths Practice'),
          React.createElement('h2', { className: "text-2xl text-indigo-600 mb-4" }, 'Level 1: Area, Perimeter & Volume'),
          React.createElement('p', { className: "text-gray-600" }, 'Master calculations with step-by-step practice')
        ),
        React.createElement('div', { className: "grid md:grid-cols-3 gap-6" },
          Object.keys(topics).map(key =>
            React.createElement('button', {
              key: key,
              onClick: () => { setTopic(key); setScreen('mode'); },
              className: "text-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:scale-105",
              style: { backgroundColor: topics[key].color }
            },
              React.createElement('div', { className: "text-6xl mb-4" }, topics[key].icon),
              React.createElement('h3', { className: "text-2xl font-bold mb-2" }, topics[key].name),
              React.createElement('div', { className: "bg-white bg-opacity-20 rounded-lg p-3 mt-4 text-sm" },
                React.createElement('p', { className: "font-semibold mb-1" }, 'Formula:'),
                React.createElement('p', null, topics[key].formula)
              )
            )
          )
        )
      )
    );
  }

  if (screen === 'mode') {
    return React.createElement('div', { className: "min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4" },
      React.createElement('div', { className: "max-w-3xl mx-auto" },
        React.createElement('button', {
          onClick: () => setScreen('home'),
          className: "mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-800 bg-white px-4 py-2 rounded-lg"
        },
          React.createElement(Home, { size: 20 }),
          ' Back'
        ),
        React.createElement('div', { className: "bg-white rounded-2xl shadow-xl p-8 mb-6 text-center" },
          React.createElement('div', { className: "text-6xl mb-4" }, topics[topic].icon),
          React.createElement('h1', { className: "text-3xl font-bold mb-2" }, topics[topic].name),
          React.createElement('p', { className: "text-gray-600" }, 'Choose practice mode')
        ),
        React.createElement('div', { className: "grid md:grid-cols-2 gap-6" },
          React.createElement('button', {
            onClick: () => { setMode('nonCalculator'); setScreen('stage'); },
            className: "bg-orange-500 text-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all"
          },
            React.createElement('div', { className: "text-5xl mb-4" }, '✏️'),
            React.createElement('h3', { className: "text-2xl font-bold mb-3" }, 'Non-Calculator'),
            React.createElement('p', { className: "text-white text-opacity-90" }, 'Mental maths and written methods')
          ),
          React.createElement('button', {
            onClick: () => { setMode('calculator'); setScreen('stage'); },
            className: "bg-blue-500 text-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all"
          },
            React.createElement(Calculator, { className: "w-16 h-16 mx-auto mb-4" }),
            React.createElement('h3', { className: "text-2xl font-bold mb-3" }, 'Calculator'),
            React.createElement('p', { className: "text-white text-opacity-90" }, 'More complex numbers')
          )
        )
      )
    );
  }

  if (screen === 'stage') {
    return React.createElement('div', { className: "min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4" },
      React.createElement('div', { className: "max-w-3xl mx-auto" },
        React.createElement('button', {
          onClick: () => setScreen('mode'),
          className: "mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-800 bg-white px-4 py-2 rounded-lg"
        }, '← Back'),
        React.createElement('div', { className: "bg-white rounded-2xl shadow-xl p-8 mb-6" },
          React.createElement('h2', { className: "text-2xl font-bold mb-2" }, topics[topic].name + ' Practice'),
          React.createElement('p', { className: "text-gray-600" }, mode === 'calculator' ? 'Calculator Mode' : 'Non-Calculator Mode')
        ),
        React.createElement('div', { className: "space-y-4" },
          React.createElement('button', {
            onClick: () => { setStage('keywords'); setQuestionIndex(0); reset(); setScore({ correct: 0, total: 0 }); setScreen('practice'); },
            className: "w-full bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all text-left"
          },
            React.createElement('div', { className: "flex items-center gap-4" },
              React.createElement('div', { className: "text-4xl" }, '🔍'),
              React.createElement('div', { className: "flex-1" },
                React.createElement('h3', { className: "text-xl font-bold mb-1" }, 'Step 1: Keyword Recognition'),
                React.createElement('p', { className: "text-gray-600" }, 'Learn to identify when to use ' + topics[topic].name.toLowerCase())
              )
            )
          ),
          React.createElement('button', {
            onClick: () => { setStage('practice'); setQuestionIndex(0); reset(); setScore({ correct: 0, total: 0 }); setScreen('practice'); },
            className: "w-full bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all text-left"
          },
            React.createElement('div', { className: "flex items-center gap-4" },
              React.createElement('div', { className: "text-4xl" }, '📝'),
              React.createElement('div', { className: "flex-1" },
                React.createElement('h3', { className: "text-xl font-bold mb-1" }, 'Step 2: Calculation Practice'),
                React.createElement('p', { className: "text-gray-600" }, 'Solve ' + topics[topic].name.toLowerCase() + ' questions with hints')
              )
            )
          )
        )
      )
    );
  }

  if (screen === 'practice') {
    const questions = stage === 'keywords' ? keywordQuestions[topic] : practiceQuestions[topic][mode];
    
    if (questionIndex >= questions.length) {
      const pct = Math.round((score.correct / score.total) * 100);
      
      return React.createElement('div', { className: "min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4" },
        React.createElement('div', { className: "max-w-2xl mx-auto" },
          React.createElement('div', { className: "bg-white rounded-2xl shadow-xl p-8 text-center" },
            React.createElement(Award, { className: "w-24 h-24 mx-auto mb-4 text-yellow-500" }),
            React.createElement('h2', { className: "text-3xl font-bold mb-4" }, stage === 'keywords' ? 'Keywords Complete!' : 'Practice Complete!'),
            React.createElement('div', {
              className: "text-white rounded-xl p-6 mb-6",
              style: { backgroundColor: topics[topic].color }
            },
              React.createElement('p', { className: "text-xl mb-2" }, 'Your Score'),
              React.createElement('p', { className: "text-5xl font-bold" }, score.correct + '/' + score.total),
              React.createElement('p', { className: "text-2xl mt-2" }, pct + '%')
            ),
            pct >= 80 ?
              React.createElement('div', { className: "bg-green-50 border-2 border-green-300 rounded-lg p-4 mb-6" },
                React.createElement('p', { className: "text-green-900 font-semibold" }, 'Excellent! Ready for next challenge.')
              ) :
              React.createElement('div', { className: "bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4 mb-6" },
                React.createElement('p', { className: "text-yellow-900 font-semibold" }, 'Keep practicing! Review hints.')
              ),
            React.createElement('div', { className: "space-y-3" },
              React.createElement('button', {
                onClick: () => { setQuestionIndex(0); reset(); setScore({ correct: 0, total: 0 }); },
                className: "w-full text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2",
                style: { backgroundColor: topics[topic].color }
              },
                React.createElement(RotateCcw, { size: 20 }),
                ' Practice Again'
              ),
              React.createElement('button', {
                onClick: () => setScreen('stage'),
                className: "w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold"
              }, 'Choose Different Practice'),
              React.createElement('button', {
                onClick: () => setScreen('home'),
                className: "w-full bg-white border-2 border-gray-300 text-gray-800 py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
              },
                React.createElement(Home, { size: 20 }),
                ' Home'
              )
            )
          )
        )
      );
    }

    const q = questions[questionIndex];

    if (stage === 'keywords') {
      return React.createElement('div', { className: "min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4" },
        React.createElement('div', { className: "max-w-2xl mx-auto" },
          React.createElement('button', {
            onClick: () => setScreen('stage'),
            className: "mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-800 bg-white px-4 py-2 rounded-lg"
          }, '← Back'),
          React.createElement('div', { className: "bg-white rounded-2xl shadow-xl p-8" },
            React.createElement('div', { className: "flex justify-between items-center mb-6" },
              React.createElement('h2', { className: "text-2xl font-bold" }, 'Keyword Recognition'),
              React.createElement('div', { className: "flex gap-4" },
                React.createElement('span', { className: "text-gray-600" }, 'Q ' + (questionIndex + 1) + '/' + questions.length),
                React.createElement('span', { className: "bg-green-100 text-green-800 px-3 py-1 rounded-full font-semibold" }, score.correct + '/' + score.total)
              )
            ),
            React.createElement('div', { className: "bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-6" },
              React.createElement('p', { className: "text-lg text-gray-800" }, q.text)
            ),
            React.createElement('p', { className: "text-xl font-semibold text-center mb-6" }, 'Is this Area, Perimeter, or Volume?'),
            !showFeedback ?
              React.createElement('div', { className: "grid grid-cols-3 gap-4" },
                ['perimeter', 'area', 'volume'].map(type =>
                  React.createElement('button', {
                    key: type,
                    onClick: () => {
                      const correct = type === q.answer;
                      setScore(prev => ({ correct: prev.correct + (correct ? 1 : 0), total: prev.total + 1 }));
                      setShowFeedback(correct ? 'correct' : 'wrong');
                    },
                    className: "text-white py-6 rounded-xl font-bold text-lg hover:opacity-90 transition-all",
                    style: { backgroundColor: topics[type].color }
                  },
                    React.createElement('div', { className: "text-3xl mb-2" }, topics[type].icon),
                    topics[type].name
                  )
                )
              ) :
              React.createElement('div', null,
                React.createElement('div', {
                  className: showFeedback === 'correct' ?
                    'bg-green-50 border-2 border-green-300 rounded-lg p-6 mb-6' :
                    'bg-red-50 border-2 border-red-300 rounded-lg p-6 mb-6'
                },
                  React.createElement('div', { className: "flex items-center gap-3 mb-3" },
                    showFeedback === 'correct' ?
                      React.createElement(React.Fragment, null,
                        React.createElement(CheckCircle, { className: "text-green-600", size: 32 }),
                        React.createElement('h3', { className: "text-2xl font-bold text-green-900" }, 'Correct!')
                      ) :
                      React.createElement(React.Fragment, null,
                        React.createElement(XCircle, { className: "text-red-600", size: 32 }),
                        React.createElement('h3', { className: "text-2xl font-bold text-red-900" }, 'Not quite')
                      )
                  ),
                  React.createElement('p',
                                      { className: showFeedback === 'correct' ? 'text-green-800' : 'text-red-800' },
                    q.explanation
                  )
                ),
                React.createElement('button', {
                  onClick: () => { setQuestionIndex(questionIndex + 1); reset(); },
                  className: "w-full text-white py-4 rounded-lg font-bold text-lg",
                  style: { backgroundColor: topics[topic].color }
                }, 'Next Question →')
              )
          )
        )
      );
    }

    return React.createElement('div', { className: "min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4" },
      React.createElement('div', { className: "max-w-3xl mx-auto" },
        React.createElement('button', {
          onClick: () => setScreen('stage'),
          className: "mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-800 bg-white px-4 py-2 rounded-lg"
        }, '← Back'),
        React.createElement('div', { className: "bg-white rounded-2xl shadow-xl p-8" },
          React.createElement('div', { className: "flex justify-between items-center mb-6" },
            React.createElement('h2', { className: "text-2xl font-bold" }, topics[topic].name + ' Practice'),
            React.createElement('div', { className: "flex gap-4 items-center" },
              React.createElement('span', { className: "text-gray-600" }, 'Q ' + (questionIndex + 1) + '/' + questions.length),
              mode === 'calculator' ?
                React.createElement('div', { className: "flex items-center gap-2 text-blue-600 bg-blue-50 px-3 py-1 rounded-full" },
                  React.createElement(Calculator, { size: 18 }),
                  React.createElement('span', { className: "font-semibold text-sm" }, 'Calculator OK')
                ) :
                React.createElement('div', { className: "flex items-center gap-2 text-orange-600 bg-orange-50 px-3 py-1 rounded-full" },
                  React.createElement('span', { className: "text-lg" }, '✏️'),
                  React.createElement('span', { className: "font-semibold text-sm" }, 'No Calculator')
                ),
              React.createElement('span', { className: "bg-green-100 text-green-800 px-3 py-1 rounded-full font-semibold" }, score.correct + '/' + score.total)
            )
          ),
          React.createElement('div', { className: "bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-6" },
            React.createElement('p', { className: "text-lg text-gray-800" }, q.q)
          ),
          React.createElement('div', { className: "bg-gray-50 rounded-lg p-6 mb-6" },
            React.createElement('p', { className: "text-sm font-semibold text-gray-600 mb-3" }, 'DIAGRAM:'),
            React.createElement(Diagram, { d: q.d })
          ),
          !showFeedback ?
            React.createElement(React.Fragment, null,
              React.createElement('div', { className: "mb-4" },
                React.createElement('label', { className: "block text-gray-700 font-semibold mb-2" }, 'Your Answer:'),
                React.createElement('div', { className: "flex gap-2" },
                  React.createElement('input', {
                    type: "number",
                    step: "any",
                    value: answer,
                    onChange: (e) => setAnswer(e.target.value),
                    className: "flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg text-lg focus:border-indigo-500 focus:outline-none",
                    placeholder: "Enter your answer"
                  }),
                  React.createElement('span', { className: "px-4 py-3 bg-gray-100 rounded-lg font-semibold" }, q.u)
                )
              ),
              React.createElement('div', { className: "mb-6" },
                React.createElement('label', { className: "block text-gray-700 font-semibold mb-2" }, 'Show Your Working (Required for L1):'),
                React.createElement('textarea', {
                  value: checkWork,
                  onChange: (e) => setCheckWork(e.target.value),
                  className: "w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none",
                  placeholder: "Write your working and check...",
                  rows: "3"
                })
              ),
              showHint &&
                React.createElement('div', { className: "bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4 mb-4" },
                  React.createElement('div', { className: "flex items-start gap-3" },
                    React.createElement(Lightbulb, { className: "text-yellow-600 flex-shrink-0", size: 24 }),
                    React.createElement('div', null,
                      React.createElement('p', { className: "font-semibold text-yellow-900 mb-1" }, 'Hint:'),
                      React.createElement('p', { className: "text-yellow-800" }, q.h)
                    )
                  )
                ),
              React.createElement('div', { className: "flex gap-3" },
                React.createElement('button', {
                  onClick: () => setShowHint(true),
                  className: "flex-1 bg-yellow-500 text-white py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-all flex items-center justify-center gap-2"
                },
                  React.createElement(Lightbulb, { size: 20 }),
                  ' Show Hint'
                ),
                React.createElement('button', {
                  onClick: () => {
                    const correct = parseFloat(answer) === parseFloat(q.ans);
                    setScore(prev => ({ correct: prev.correct + (correct ? 1 : 0), total: prev.total + 1 }));
                    setShowFeedback(true);
                  },
                  disabled: !answer,
                  className: "flex-1 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-all disabled:opacity-50",
                  style: { backgroundColor: topics[topic].color }
                }, 'Check Answer')
              )
            ) :
            React.createElement('div', { className: "space-y-4" },
              parseFloat(answer) === parseFloat(q.ans) ?
                React.createElement('div', { className: "bg-green-50 border-2 border-green-300 rounded-lg p-6" },
                  React.createElement('div', { className: "flex items-center gap-3 mb-3" },
                    React.createElement(CheckCircle, { className: "text-green-600", size: 32 }),
                    React.createElement('h3', { className: "text-2xl font-bold text-green-900" }, 'Correct!')
                  ),
                  React.createElement('div', { className: "text-green-800 space-y-2" },
                    React.createElement('p', { className: "font-semibold" }, 'Working:'),
                    q.w.map((step, idx) =>
                      React.createElement('p', { key: idx }, '• ' + step)
                    ),
                    React.createElement('div', { className: "mt-4 p-3 bg-green-100 rounded" },
                      React.createElement('p', { className: "font-semibold" }, 'Check:'),
                      React.createElement('p', null, q.c)
                    )
                  )
                ) :
                React.createElement('div', { className: "bg-red-50 border-2 border-red-300 rounded-lg p-6" },
                  React.createElement('div', { className: "flex items-center gap-3 mb-3" },
                    React.createElement(XCircle, { className: "text-red-600", size: 32 }),
                    React.createElement('h3', { className: "text-2xl font-bold text-red-900" }, 'Not quite right')
                  ),
                  React.createElement('p', { className: "text-red-800 mb-3" }, 'Correct answer: ', React.createElement('strong', null, q.ans + q.u)),
                  React.createElement('div', { className: "text-red-800 space-y-2" },
                    React.createElement('p', { className: "font-semibold" }, 'How to solve:'),
                    q.w.map((step, idx) =>
                      React.createElement('p', { key: idx }, '• ' + step)
                    ),
                    React.createElement('div', { className: "mt-4 p-3 bg-red-100 rounded" },
                      React.createElement('p', { className: "font-semibold" }, 'Check:'),
                      React.createElement('p', null, q.c)
                    )
                  )
                ),
              React.createElement('button', {
                onClick: () => { setQuestionIndex(questionIndex + 1); reset(); },
                className: "w-full text-white py-4 rounded-lg font-semibold text-lg hover:opacity-90",
                style: { backgroundColor: topics[topic].color }
              }, questionIndex < questions.length - 1 ? 'Next Question →' : 'Finish →')
            )
        )
      )
    );
  }

  return null;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App));
