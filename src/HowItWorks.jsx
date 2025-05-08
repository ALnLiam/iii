import React from 'react';

let steps = [
  { num: 1, title: 'List Your Ingredients', text: 'Enter whatever you have—pantry staples, leftovers, or that one lonely zucchini.' },
  { num: 2, title: 'Set Your Filters', text: 'Pick your preferred cuisine, meal type, or dietary needs. We’ll handle the matching.' },
  { num: 3, title: 'Get Recipes That Fit', text: 'Instantly explore dishes that actually work with what you’ve got.' }
];

let HowItWorks = () => (
  <section className="how-it-works">
    <h2>How It Works</h2>
    <div className="steps">
      {steps.map(step => (
        <div key={step.num} className="step">
          <span>{step.num}</span>
          <h3>{step.title}</h3>
          <p>{step.text}</p>
        </div>
      ))}
    </div>
  </section>
);

export default HowItWorks;

// import React from 'react';

// export default function HowItWorks() {
//   return (
//     <section className="how-it-works">
//       {/* steps content */}
//     </section>
//   );
// }
