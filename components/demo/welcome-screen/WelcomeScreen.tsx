/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import './WelcomeScreen.css';

const WelcomeScreen: React.FC = () => {
  const title = 'Prestine car wash AI සහායක';
  const description = 'මයික්‍රෆෝනය කෙලිකරන්න, කාවිෂ් පැකේජ් සේවා, සහ මිල පිළිබඳ තොරතුරු ලබාගන්න.';
  const prompts = [
    'මගේ Car එකට Wash කරන්න කීයද?',
    'AutoGlym package එක ගැන කියන්න.',
    'SUV එකක් සඳහා premium wash වලට කීයද?',
  ];

  return (
    <div className="welcome-screen">
      <div className="welcome-content">
        <div className="title-container">
          <span className="welcome-icon">mic</span>
          <h2 className="welcome-title">{title}</h2>
        </div>
        <p>{description}</p>
        <div className="example-prompts">
          {prompts.map((prompt, index) => (
            <div key={index} className="prompt">{prompt}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;