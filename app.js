const { useState } = React;
const { Calculator, CheckCircle, XCircle, Lightbulb, RotateCcw, Home, Award } = lucide;

const App = () => {
  const [screen, setScreen] = useState('home');
  const [topic, setTopic] = useState('');
  const [mode, setMode] = useState('');
  const [stage, setStage] = useState('keywords');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState('');
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
      { text: 'Put a fence around the garden', answer: 'perimeter', explanation: '"Around" = perimeter' },
      { text: 'Ribbon going round the edge', answer: 'perimeter', explanation: '"Round" and "edge" = perimeter' },
      { text: 'Distance around the field', answer: 'perimeter', explanation: '"Distance around" = perimeter' }
    ],
    area: [
      { text: 'Flooring to cover the room', answer: 'area', explanation: '"Cover" = area' },
      { text: 'Carpet needed for bedroom', answer: 'area', explanation: 'Carpet covers = area' },
      { text: 'Tiles for the floor', answer: 'area', explanation: 'Tiles cover = area' }
    ],
    volume: [
      { text: 'Water tank filled to top', answer: 'volume', explanation: '"Tank" and "filled" = volume' },
      { text: 'Capacity of storage box', answer: 'volume', explanation: '"Capacity" = volume' },
      { text: 'Litres in the fish tank', answer: 'volume', explanation: 'Litres = volume' }
    ]
  };

  const practiceQuestions = {
    perimeter: {
      calculator: [
        { q: 'Garden 12.5m × 8.3m. Perimeter?', ans: '41.6', u: 'm', w: ['P = 2 × (12.5 + 8.3) = 41.6m'], h: '2 × (length + width)' },
        { q: 'Pool 25.5m × 12.8m. Perimeter?', ans: '76.6', u: 'm', w: ['P = 2 × (25.5 + 12.8) = 76.6m'], h: 'Add length + width, × 2' }
      ],
      nonCalculator: [
        { q: 'Field 45m × 30m. Perimeter?', ans: '150', u: 'm', w: ['P = 45+30+45+30 = 150m'], h: 'Add all four sides' },
        { q: 'Lawn 20m × 15m. Perimeter?', ans: '70', u: 'm', w: ['P = 20+15+20+15 = 70m'], h: 'Add all sides' }
      ]
    },
    area: {
      calculator: [
        { q: 'Room 5.6m × 3.8m. Area?', ans: '21.28', u: 'm²', w: ['A = 5.6 × 3.8 = 21.28m²'], h: 'Length × width' },
        { q: 'Kitchen 4.2m × 3.5m. Area?', ans: '14.7', u: 'm²', w: ['A = 4.2 × 3.5 = 14.7m²'], h: 'Length × width' }
      ],
      nonCalculator: [
        { q: 'Carpet 8m × 6m. Area?', ans: '48', u: 'm²', w: ['A = 8 × 6 = 48m²'], h: 'Length × width' },
        { q: 'Patio 12m × 9m. Area?', ans: '108', u: 'm²', w: ['A = 12 × 9 = 108m²'], h: 'Multiply' }
      ]
    },
    volume: {
      calculator: [
        { q: 'Box 80cm × 50cm × 40cm. Volume?', ans: '160000', u: 'cm³', w: ['V = 80 × 50 × 40 = 160,000cm³'], h: 'L × W × H' },
        { q: 'Tank 120cm × 60cm × 45cm. Volume?', ans: '324000', u: 'cm³', w: ['V = 120 × 60 × 45 = 324,000cm³'], h: 'L × W × H' }
      ],
      nonCalculator: [
        { q: 'Box 20cm × 10cm × 5cm. Volume?', ans: '1000', u: 'cm³', w: ['V = 20 × 10 × 5 = 1000cm³'], h: 'L × W × H' },
        { q: 'Tank 50cm × 40cm × 30cm. Volume?', ans: '60000', u: 'cm³', w: ['V = 50 × 40 × 30 = 60,000cm³'], h: 'L × W × H' }
      ]
    }
  };

  const reset = () => { setAnswer(''); setShowHint(false); setShowFeedback(false); };

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
        React.createElement('button', { onClick: () => setScreen('home'), className: "mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-800 bg-white px-4 py-2 rounded-lg" },
          React.createElement(Home, { size: 20 }), ' Back'
        ),
        React.createElement('div', { className: "bg-white rounded-2xl shadow-xl p-8 mb-6 text-center" },
          React.createElement('div', { className: "text-6xl mb-4" }, topics[topic].icon),
          React.createElement('h1', { className: "text-3xl font-bold mb-2" }, topics[topic].name)
        ),
        React.createElement('div', { className: "grid md:grid-cols-2 gap-6" },
          React.createElement('button', {
            onClick: () => { setMode('nonCalculator'); setScreen('stage'); },
            className: "bg-orange-500 text-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all"
          },
            React.createElement('div', { className: "text-5xl mb-4" }, '✏️'),
            React.createElement('h3', { className: "text-2xl font-bold mb-3" }, 'Non-Calculator')
          ),
          React.createElement('button', {
            onClick: () => { setMode('calculator'); setScreen('stage'); },
            className: "bg-blue-500 text-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all"
          },
            React.createElement(Calculator, { className: "w-16 h-16 mx-auto mb-4" }),
            React.createElement('h3', { className: "text-2xl font-bold mb-3" }, 'Calculator')
          )
        )
      )
    );
  }

  if (screen === 'stage') {
    return React.createElement('div', { className: "min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4" },
      React.createElement('div', { className: "max-w-3xl mx-auto" },
        React.createElement('button', { onClick: () => setScreen('mode'), className: "mb-4 text-gray-600 hover:text-gray-800 bg-white px-4 py-2 rounded-lg" }, '← Back'),
        React.createElement('div', { className: "bg-white rounded-2xl shadow-xl p-8 mb-6" },
          React.createElement('h2', { className: "text-2xl font-bold" }, topics[topic].name)
        ),
        React.createElement('div', { className: "space-y-4" },
          React.createElement('button', {
            onClick: () => { setStage('keywords'); setQuestionIndex(0); reset(); setScore({ correct: 0, total: 0 }); setScreen('practice'); },
            className: "w-full bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all text-left"
          },
            React.createElement('div', { className: "flex items-center gap-4" },
              React.createElement('div', { className: "text-4xl" }, '🔍'),
              React.createElement('h3', { className: "text-xl font-bold" }, 'Keyword Recognition')
            )
          ),
          React.createElement('button', {
            onClick: () => { setStage('practice'); setQuestionIndex(0); reset(); setScore({ correct: 0, total: 0 }); setScreen('practice'); },
            className: "w-full bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all text-left"
          },
            React.createElement('div', { className: "flex items-center gap-4" },
              React.createElement('div', { className: "text-4xl" }, '📝'),
              React.createElement('h3', { className: "text-xl font-bold" }, 'Calculation Practice')
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
            React.createElement('h2', { className: "text-3xl font-bold mb-4" }, 'Complete!'),
            React.createElement('div', { className: "text-white rounded-xl p-6 mb-6", style: { backgroundColor: topics[topic].color } },
              React.createElement('p', { className: "text-5xl font-bold" }, score.correct + '/' + score.total),
              React.createElement('p', { className: "text-2xl mt-2" }, pct + '%')
            ),
            React.createElement('div', { className: "space-y-3" },
              React.createElement('button', {
                onClick: () => { setQuestionIndex(0); reset(); setScore({ correct: 0, total: 0 }); },
                className: "w-full text-white py-3 rounded-lg font-semibold",
                style: { backgroundColor: topics[topic].color }
              }, 'Practice Again'),
              React.createElement('button', { onClick: () => setScreen('home'), className: "w-full bg-gray-200 py-3 rounded-lg font-semibold" }, 'Home')
            )
          )
        )
      );
    }

    const q = questions[questionIndex];

    if (stage === 'keywords') {
      return React.createElement('div', { className: "min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4" },
        React.createElement('div', { className: "max-w-2xl mx-auto" },
          React.createElement('div', { className: "bg-white rounded-2xl shadow-xl p-8" },
            React.createElement('div', { className: "bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-6" },
              React.createElement('p', { className: "text-lg" }, q.text)
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
                    className: "text-white py-6 rounded-xl font-bold",
                    style: { backgroundColor: topics[type].color }
                  }, topics[type].name)
                )
              ) :
              React.createElement('div', null,
                React.createElement('div', { className: showFeedback === 'correct' ? 'bg-green-50 p-6 rounded-lg mb-6' : 'bg-red-50 p-6 rounded-lg mb-6' },
                  React.createElement('p', { className: showFeedback === 'correct' ? 'text-green-800' : 'text-red-800' }, q.explanation)
                ),
                React.createElement('button', {
                  onClick: () => { setQuestionIndex(questionIndex + 1); reset(); },
                  className: "w-full text-white py-4 rounded-lg font-bold",
                  style: { backgroundColor: topics[topic].color }
                }, 'Next →')
              )
          )
        )
      );
    }

    return React.createElement('div', { className: "min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4" },
      React.createElement('div', { className: "max-w-3xl mx-auto" },
        React.createElement('div', { className: "bg-white rounded-2xl shadow-xl p-8" },
          React.createElement('div', { className: "bg-blue-50 p-6 rounded-lg mb-6" },
            React.createElement('p', { className: "text-lg font-bold" }, q.q)
          ),
          !showFeedback ?
            React.createElement('div', null,
              React.createElement('div', { className: "mb-4" },
                React.createElement('input', {
                  type: "number",
                  value: answer,
                  onChange: (e) => setAnswer(e.target.value),
                  className: "w-full px-4 py-3 border-2 rounded-lg text-lg",
                  placeholder: "Answer"
                })
              ),
              showHint && React.createElement('div', { className: "bg-yellow-50 p-4 rounded-lg mb-4" },
                React.createElement('p', { className: "text-yellow-900" }, 'Hint: ' + q.h)
              ),
              React.createElement('div', { className: "flex gap-3" },
                React.createElement('button', {
                  onClick: () => setShowHint(true),
                  className: "flex-1 bg-yellow-500 text-white py-3 rounded-lg font-semibold"
                }, 'Hint'),
                React.createElement('button', {
                  onClick: () => {
                    const correct = parseFloat(answer) === parseFloat(q.ans);
                    setScore(prev => ({ correct: prev.correct + (correct ? 1 : 0), total: prev.total + 1 }));
                    setShowFeedback(true);
                  },
                  disabled: !answer,
                  className: "flex-1 text-white py-3 rounded-lg font-semibold",
                  style: { backgroundColor: topics[topic].color }
                }, 'Check')
              )
            ) :
            React.createElement('div', null,
              React.createElement('div', { className: parseFloat(answer) === parseFloat(q.ans) ? 'bg-green-50 p-6 rounded-lg mb-6' : 'bg-red-50 p-6 rounded-lg mb-6' },
                parseFloat(answer) === parseFloat(q.ans) ?
                  React.createElement('div', null,
                    React.createElement('p', { className: "text-2xl font-bold text-green-900 mb-3" }, '✓ Correct!'),
                    React.createElement('p', { className: "text-green-800" }, q.w[0])
                  ) :
                  React.createElement('div', null,
                    React.createElement('p', { className: "text-2xl font-bold text-red-900 mb-3" }, '✗ Not quite'),
                    React.createElement('p', { className: "text-red-800 mb-2" }, 'Answer: ' + q.ans + q.u),
                    React.createElement('p', { className: "text-red-800" }, q.w[0])
                  )
              ),
              React.createElement('button', {
                onClick: () => { setQuestionIndex(questionIndex + 1); reset(); },
                className: "w-full text-white py-4 rounded-lg font-semibold",
                style: { backgroundColor: topics[topic].color }
              }, 'Next →')
            )
        )
      )
    );
  }

  return null;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App));
