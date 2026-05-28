const { useMemo, useState } = React;
const MotionSource = window.Motion || window.FramerMotion || {};
const motion = MotionSource.motion || new Proxy({}, {
  get: (_, tag) => React.forwardRef(({ children, ...props }, ref) => React.createElement(tag, { ...props, ref }, children))
});
const AnimatePresence = MotionSource.AnimatePresence || (({ children }) => children);

const currency = new Intl.NumberFormat("en-US");

const features = [
  {
    title: "Macro clarity",
    copy: "Plan calories, protein, carbs, and fats with a calm dashboard built for daily decisions.",
    stat: "4 signals"
  },
  {
    title: "Food intelligence",
    copy: "Use curated breakfast, lunch, and dinner data without cluttering your workflow.",
    stat: "58 foods"
  },
  {
    title: "Adaptive targets",
    copy: "See where you are on track and where your plan needs a small correction.",
    stat: "+/- smart bands"
  }
];

const defaultMeals = {
  breakfast: [{ food: foods.breakfast[0].name, grams: 100 }],
  lunch: [{ food: foods.lunch[0].name, grams: 100 }],
  dinner: [{ food: foods.dinner[0].name, grams: 100 }]
};

function Reveal({ children, className = "", delay = 0, ...props }) {
  return (
    <motion.div
      {...props}
      className={className}
      initial={{ opacity: 0, y: 28, filter: "blur(14px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function MagneticButton({ children, href = "#planner", variant = "primary", className = "" }) {
  const [style, setStyle] = useState({});

  function handleMove(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * 0.18;
    const y = (event.clientY - rect.top - rect.height / 2) * 0.18;
    setStyle({ transform: `translate(${x}px, ${y}px)` });
  }

  return (
    <a
      href={href}
      className={`magnetic-button ${variant === "secondary" ? "button-secondary" : "button-primary"} ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={() => setStyle({})}
      style={style}
    >
      {children}
    </a>
  );
}

function Navbar() {
  return (
    <header className="nav-shell">
      <a href="#top" className="brand-lockup" aria-label="FITALYTICS home">
        <span className="brand-mark">F</span>
        <span>FITALYTICS</span>
      </a>
      <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
        {["Features", "Demo"].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} className="nav-link">{item}</a>
        ))}
        <a href="mealguide.html" className="nav-link">Theory</a>
        <a href="wellness.html" className="nav-link">Wellness</a>
      </nav>
      <MagneticButton href="#planner" className="hidden sm:inline-flex">Open Planner</MagneticButton>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="hero-section">
      <div className="hero-copy">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          Nutrition intelligence for modern routines
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 28, filter: "blur(16px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          Plan the day your body deserves.
        </motion.h1>
        <motion.p
          className="hero-lede"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18 }}
        >
          Build balanced meals, track your macros, and understand your nutrition day with a clean visual planner.
        </motion.p>
        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.28 }}
        >
          <MagneticButton href="#planner">Try the planner</MagneticButton>
          <MagneticButton href="#features" variant="secondary">Explore features</MagneticButton>
        </motion.div>
        <motion.dl
          className="hero-metrics"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.38 }}
        >
          <div><dt>92%</dt><dd>target adherence in guided routines</dd></div>
          <div><dt>3x</dt><dd>faster meal decisions</dd></div>
          <div><dt>24/7</dt><dd>clean macro visibility</dd></div>
        </motion.dl>
      </div>
      <motion.div
        className="hero-visual"
        initial={{ opacity: 0, scale: 0.94, y: 32 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
        aria-label="FITALYTICS nutrition dashboard preview"
      >
        <DashboardMockup />
      </motion.div>
    </section>
  );
}

function DashboardMockup() {
  return (
    <div className="phone-frame">
      <div className="phone-top">
        <span></span>
        <strong>Today</strong>
        <i></i>
      </div>
      <div className="score-ring">
        <span>Daily score</span>
        <strong>86</strong>
      </div>
      <div className="macro-stack">
        {[
          ["Protein", "142g", 82],
          ["Carbs", "210g", 68],
          ["Fat", "54g", 61]
        ].map(([label, value, width]) => (
          <div className="macro-row" key={label}>
            <div>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
            <div className="progress-track"><i style={{ width: `${width}%` }}></i></div>
          </div>
        ))}
      </div>
      <motion.div
        className="float-card float-one"
        animate={{ y: [0, -10, 0], rotate: [0, -1, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      >
        <span>Calories</span>
        <strong>1,842 / 2,200</strong>
      </motion.div>
      <motion.div
        className="float-card float-two"
        animate={{ y: [0, 12, 0], rotate: [0, 1.5, 0] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
      >
        <span>Next meal</span>
        <strong>Grilled Chicken</strong>
      </motion.div>
    </div>
  );
}

function Features() {
  return (
    <section id="features" className="section-wrap">
      <div className="bento-grid">
        {features.map((feature, index) => (
          <Reveal key={feature.title} delay={index * 0.06} className={`feature-card ${index === 0 ? "feature-card-wide" : ""}`}>
            <span>{feature.stat}</span>
            <h3>{feature.title}</h3>
            <p>{feature.copy}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function PlannerShowcase() {
  const [targets, setTargets] = useState({ calories: 2200, protein: 180, carbs: 250, fat: 70 });
  const [meals, setMeals] = useState(defaultMeals);

  const totals = useMemo(() => {
    const next = { calories: 0, protein: 0, carbs: 0, fat: 0 };
    Object.entries(meals).forEach(([mealType, rows]) => {
      rows.forEach((row) => {
        const item = foods[mealType].find((food) => food.name === row.food);
        const grams = Number(row.grams) || 0;
        if (!item) return;
        next.calories += (item.calories * grams) / 100;
        next.protein += (item.protein * grams) / 100;
        next.carbs += (item.carbs * grams) / 100;
        next.fat += (item.fat * grams) / 100;
      });
    });
    return next;
  }, [meals]);

  function updateTarget(key, value) {
    setTargets((current) => ({ ...current, [key]: Number(value) || 0 }));
  }

  function addMealRow(mealType) {
    setMeals((current) => ({
      ...current,
      [mealType]: [...current[mealType], { food: foods[mealType][0].name, grams: 100 }]
    }));
  }

  function updateMealRow(mealType, index, key, value) {
    setMeals((current) => ({
      ...current,
      [mealType]: current[mealType].map((row, rowIndex) => rowIndex === index ? { ...row, [key]: value } : row)
    }));
  }

  function removeMealRow(mealType, index) {
    setMeals((current) => ({
      ...current,
      [mealType]: current[mealType].filter((_, rowIndex) => rowIndex !== index)
    }));
  }

  return (
    <section id="demo" className="section-wrap planner-section">
      <SectionHeading eyebrow="Interactive demo" title="Plan breakfast, lunch, and dinner inside the showcase." copy="Set your targets, tune grams, and watch the summary cards respond instantly with premium motion and clear status states." />
      <Reveal className="planner-shell" id="planner">
        <div className="target-panel">
          {[
            ["calories", "Calories", ""],
            ["protein", "Protein", "g"],
            ["carbs", "Carbs", "g"],
            ["fat", "Fat", "g"]
          ].map(([key, label, unit]) => (
            <label key={key} className="target-input">
              <span>{label}</span>
              <input
                type="number"
                min="0"
                value={targets[key]}
                onChange={(event) => updateTarget(key, event.target.value)}
                aria-label={`${label} target`}
              />
              <small>{unit}</small>
            </label>
          ))}
        </div>
        <div className="meal-grid">
          {Object.keys(meals).map((mealType) => (
            <MealCard
              key={mealType}
              mealType={mealType}
              rows={meals[mealType]}
              onAdd={() => addMealRow(mealType)}
              onUpdate={(index, key, value) => updateMealRow(mealType, index, key, value)}
              onRemove={(index) => removeMealRow(mealType, index)}
            />
          ))}
        </div>
        <Summary totals={totals} targets={targets} />
      </Reveal>
    </section>
  );
}

function MealCard({ mealType, rows, onAdd, onUpdate, onRemove }) {
  return (
    <article className="meal-card">
      <div className="meal-card-head">
        <h3>{mealType}</h3>
        <button type="button" onClick={onAdd} aria-label={`Add ${mealType} item`}>+</button>
      </div>
      <AnimatePresence initial={false}>
        {rows.map((row, index) => (
          <motion.div
            className="food-row"
            key={`${mealType}-${index}`}
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.22 }}
          >
            <select value={row.food} onChange={(event) => onUpdate(index, "food", event.target.value)} aria-label={`${mealType} food`}>
              {foods[mealType].map((food) => <option key={food.name} value={food.name}>{food.name}</option>)}
            </select>
            <input
              type="number"
              min="0"
              value={row.grams}
              onChange={(event) => onUpdate(index, "grams", event.target.value)}
              aria-label={`${row.food} grams`}
            />
            <button type="button" onClick={() => onRemove(index)} aria-label={`Remove ${row.food}`}>x</button>
          </motion.div>
        ))}
      </AnimatePresence>
    </article>
  );
}

function Summary({ totals, targets }) {
  const items = [
    ["calories", "Calories", "", 100],
    ["protein", "Protein", "g", 10],
    ["carbs", "Carbs", "g", 10],
    ["fat", "Fat", "g", 10]
  ];

  return (
    <div className="summary-grid">
      {items.map(([key, label, unit, band]) => {
        const target = targets[key] || 0;
        const total = totals[key] || 0;
        const progress = target ? Math.min((total / target) * 100, 125) : 0;
        const onTrack = target > 0 && Math.abs(total - target) <= band;
        return (
          <article className="summary-card" key={key}>
            <span>{label}</span>
            <strong>{currency.format(total.toFixed(key === "calories" ? 0 : 1))}{unit}</strong>
            <p>{target ? `${currency.format(target)}${unit} target` : "No target set"}</p>
            <div className="progress-track"><i style={{ width: `${progress}%` }}></i></div>
            <em className={onTrack ? "status-good" : "status-watch"}>{onTrack ? "Within target" : "Off target"}</em>
          </article>
        );
      })}
    </div>
  );
}

function SectionHeading({ eyebrow, title, copy }) {
  return (
    <Reveal className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p>{copy}</p>
    </Reveal>
  );
}

function App() {
  return (
    <>
      <div className="page-aurora" aria-hidden="true"></div>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <PlannerShowcase />
      </main>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
