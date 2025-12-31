const { useState } = React;

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
        { q: 'Pool 25.5m × 12.8m. Perimeter?', ans: '76.6', u: 'm', w: ['P = 2 × (25.5 + 12.8) = 76.6m'], h: 'Add L + W, × 2' }
      ],
      nonCalculator: [
        { q: 'Field 45m × 30m. Perimeter?', ans: '150', u: 'm', w: ['P = 45+30+45+30 = 150m'], h: 'Add all sides' },
        { q: 'Lawn 20m × 15m. Perimeter?', ans: '70', u: 'm', w: ['P = 20+15+20+15 = 70m'], h: 'Add all sides' }
      ]
    },
    area: {
      calculator: [
        { q: 'Room 5.6m × 3.8m. Area?', ans: '21.28', u: 'm²', w: ['A = 5.6 × 3.8 = 21.28m²'], h: 'L × W' },
        { q: 'Kitchen 4.2m × 3.5m. Area?', ans: '14.7', u: 'm²', w: ['A = 4.2 × 3.5 = 14.7m²'], h: 'L × W' }
      ],
      nonCalculator: [
        { q: 'Carpet 8m × 6m. Area?', ans: '48', u: 'm²', w: ['A = 8 × 6 = 48m²'], h: 'L × W' },
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
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #eff6ff, #e0e7ff)', padding: '1rem' }}>
        <div style={{ maxWidth: '64rem', margin: '0 auto' }}>
          <div style={{ background: 'white', borderRadius: '1rem', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', padding: '2rem', marginBottom: '1.5rem' }}>
            <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem' }}>📐 Maths Practice</h1>
            <h2 style={{ fontSize: '1.5rem', color: '#4f46e5', marginBottom: '1rem' }}>Level 1: Area, Perimeter & Volume</h2>
            <p style={{ color: '#6b7280' }}>Master calculations with step-by-step practice</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            {Object.keys(topics).map(key => (
              <button
                key={key}
                onClick={() => { setTopic(key); setScreen('mode'); }}
                style={{
                  backgroundColor: topics[key].color,
                  color: 'white',
                  borderRadius: '0.75rem',
                  padding: '1.5rem',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  textAlign: 'center'
                }}
              >
                <div style={{ fontSize: '3.75rem', marginBottom: '1rem' }}>{topics[key].icon}</div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{topics[key].name}</h3>
                <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '0.5rem', padding: '0.75rem', marginTop: '1rem', fontSize: '0.875rem' }}>
                  <p style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Formula:</p>
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
      <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #eff6ff, #e0e7ff)', padding: '1rem' }}>
        <div style={{ maxWidth: '48rem', margin: '0 auto' }}>
          <button onClick={() => setScreen('home')} style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4b5563', background: 'white', padding: '0.5rem 1rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer' }}>
            🏠 Back
          </button>

          <div style={{ background: 'white', borderRadius: '1rem', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', padding: '2rem', marginBottom: '1.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '3.75rem', marginBottom: '1rem' }}>{topics[topic].icon}</div>
            <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{topics[topic].name}</h1>
            <p style={{ color: '#6b7280' }}>Choose practice mode</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            <button
              onClick={() => { setMode('nonCalculator'); setScreen('stage'); }}
              style={{ backgroundColor: '#f97316', color: 'white', borderRadius: '0.75rem', padding: '2rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', border: 'none', cursor: 'pointer' }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✏️</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.75rem' }}>Non-Calculator</h3>
            </button>

            <button
              onClick={() => { setMode('calculator'); setScreen('stage'); }}
              style={{ backgroundColor: '#3b82f6', color: 'white', borderRadius: '0.75rem', padding: '2rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', border: 'none', cursor: 'pointer' }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔢</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.75rem' }}>Calculator</h3>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 'stage') {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #eff6ff, #e0e7ff)', padding: '1rem' }}>
        <div style={{ maxWidth: '48rem', margin: '0 auto' }}>
          <button onClick={() => setScreen('mode')} style={{ marginBottom: '1rem', color: '#4b5563', background: 'white', padding: '0.5rem 1rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer' }}>
            ← Back
          </button>

          <div style={{ background: 'white', borderRadius: '1rem', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', padding: '2rem', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{topics[topic].name} Practice</h2>
            <p style={{ color: '#6b7280' }}>{mode === 'calculator' ? 'Calculator' : 'Non-Calculator'} Mode</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <button
              onClick={() => { setStage('keywords'); setQuestionIndex(0); reset(); setScore({ correct: 0, total: 0 }); setScreen('practice'); }}
              style={{ background: 'white', borderRadius: '0.75rem', padding: '1.5rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', border: 'none', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '1rem' }}
            >
              <div style={{ fontSize: '2.5rem' }}>🔍</div>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>Keyword Recognition</h3>
                <p style={{ color: '#6b7280' }}>Learn to identify when to use {topics[topic].name.toLowerCase()}</p>
              </div>
            </button>

            <button
              onClick={() => { setStage('practice'); setQuestionIndex(0); reset(); setScore({ correct: 0, total: 0 }); setScreen('practice'); }}
              style={{ background: 'white', borderRadius: '0.75rem', padding: '1.5rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', border: 'none', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '1rem' }}
            >
              <div style={{ fontSize: '2.5rem' }}>📝</div>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>Calculation Practice</h3>
                <p style={{ color: '#6b7280' }}>Solve {topics[topic].name.toLowerCase()} questions</p>
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
      const pct = Math.round((score.correct / score.total) * 100);
      return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #eff6ff, #e0e7ff)', padding: '1rem' }}>
          <div style={{ maxWidth: '32rem', margin: '0 auto' }}>
            <div style={{ background: 'white', borderRadius: '1rem', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', padding: '2rem', textAlign: 'center' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🏆</div>
              <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '1rem' }}>Complete!</h2>
              <div style={{ backgroundColor: topics[topic].color, color: 'white', borderRadius: '0.75rem', padding: '1.5rem', marginBottom: '1.5rem' }}>
                <p style={{ fontSize: '3rem', fontWeight: 'bold' }}>{score.correct}/{score.total}</p>
                <p style={{ fontSize: '1.5rem', marginTop: '0.5rem' }}>{pct}%</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <button onClick={() => { setQuestionIndex(0); reset(); setScore({ correct: 0, total: 0 }); }} style={{ backgroundColor: topics[topic].color, color: 'white', padding: '0.75rem', borderRadius: '0.5rem', fontWeight: '600', border: 'none', cursor: 'pointer' }}>
                  🔄 Practice Again
                </button>
                <button onClick={() => setScreen('home')} style={{ backgroundColor: '#e5e7eb', color: '#1f2937', padding: '0.75rem', borderRadius: '0.5rem', fontWeight: '600', border: 'none', cursor: 'pointer' }}>
                  🏠 Home
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
        <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #eff6ff, #e0e7ff)', padding: '1rem' }}>
          <div style={{ maxWidth: '32rem', margin: '0 auto' }}>
            <div style={{ background: 'white', borderRadius: '1rem', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', padding: '2rem' }}>
              <div style={{ background: '#eff6ff', border: '2px solid #bfdbfe', borderRadius: '0.5rem', padding: '1.5rem', marginBottom: '1.5rem' }}>
                <p style={{ fontSize: '1.125rem' }}>{q.text}</p>
              </div>

              <p style={{ fontSize: '1.25rem', fontWeight: '600', textAlign: 'center', marginBottom: '1.5rem' }}>
                Is this Area, Perimeter, or Volume?
              </p>

              {!showFeedback ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                  {['perimeter', 'area', 'volume'].map(type => (
                    <button
                      key={type}
                      onClick={() => {
                        const correct = type === q.answer;
                        setScore(prev => ({ correct: prev.correct + (correct ? 1 : 0), total: prev.total + 1 }));
                        setShowFeedback(correct ? 'correct' : 'wrong');
                      }}
                      style={{ backgroundColor: topics[type].color, color: 'white', padding: '1.5rem 0.5rem', borderRadius: '0.75rem', fontWeight: 'bold', border: 'none', cursor: 'pointer', fontSize: '0.9rem' }}
                    >
                      {topics[type].name}
                    </button>
                  ))}
                </div>
              ) : (
                <div>
                  <div style={{ background: showFeedback === 'correct' ? '#f0fdf4' : '#fef2f2', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '1.5rem' }}>
                    <p style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                      {showFeedback === 'correct' ? '✓ Correct!' : '✗ Not quite'}
                    </p>
                    <p style={{ color: showFeedback === 'correct' ? '#166534' : '#991b1b' }}>{q.explanation}</p>
                  </div>
                  <button onClick={() => { setQuestionIndex(questionIndex + 1); reset(); }} style={{ backgroundColor: topics[topic].color, color: 'white', width: '100%', padding: '1rem', borderRadius: '0.5rem', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>
                    Next →
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #eff6ff, #e0e7ff)', padding: '1rem' }}>
        <div style={{ maxWidth: '48rem', margin: '0 auto' }}>
          <div style={{ background: 'white', borderRadius: '1rem', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', padding: '2rem' }}>
            <div style={{ background: '#eff6ff', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '1.5rem' }}>
              <p style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>{q.q}</p>
            </div>

            {!showFeedback ? (
              <div>
                <div style={{ marginBottom: '1rem' }}>
                  <input
                    type="number"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem 1rem', border: '2px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1.125rem' }}
                    placeholder="Your answer"
                  />
                </div>

                {showHint && (
                  <div style={{ background: '#fefce8', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1rem' }}>
                    <p style={{ color: '#854d0e' }}>💡 Hint: {q.h}</p>
                  </div>
                )}

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button onClick={() => setShowHint(true)} style={{ flex: 1, backgroundColor: '#eab308', color: 'white', padding: '0.75rem', borderRadius: '0.5rem', fontWeight: '600', border: 'none', cursor: 'pointer' }}>
                    💡 Hint
                  </button>
                  <button
                    onClick={() => {
                      const correct = parseFloat(answer) === parseFloat(q.ans);
                      setScore(prev => ({ correct: prev.correct + (correct ? 1 : 0), total: prev.total + 1 }));
                      setShowFeedback(true);
                    }}
                    disabled={!answer}
                    style={{ flex: 1, backgroundColor: topics[topic].color, color: 'white', padding: '0.75rem', borderRadius: '0.5rem', fontWeight: '600', border: 'none', cursor: answer ? 'pointer' : 'not-allowed', opacity: answer ? 1 : 0.5 }}
                  >
                    ✓ Check
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div style={{ background: parseFloat(answer) === parseFloat(q.ans) ? '#f0fdf4' : '#fef2f2', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '1.5rem' }}>
                  {parseFloat(answer) === parseFloat(q.ans) ? (
                    <div>
                      <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#166534', marginBottom: '0.75rem' }}>✓ Correct!</p>
                      <p style={{ color: '#166534' }}>{q.w[0]}</p>
                    </div>
                  ) : (
                    <div>
                      <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#991b1b', marginBottom: '0.75rem' }}>✗ Not quite</p>
                      <p style={{ color: '#991b1b', marginBottom: '0.5rem' }}>Answer: {q.ans}{q.u}</p>
                      <p style={{ color: '#991b1b' }}>{q.w[0]}</p>
                    </div>
                  )}
                </div>
                <button onClick={() => { setQuestionIndex(questionIndex + 1); reset(); }} style={{ backgroundColor: topics[topic].color, color: 'white', width: '100%', padding: '1rem', borderRadius: '0.5rem', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>
                  Next →
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
