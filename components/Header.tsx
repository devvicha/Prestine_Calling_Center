/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export default function Header() {
  return (
    <header>
      <div className="header-left">
        <h1>Prestine Mobile Car Wash AI Assistant</h1>
        <p>Your premium car wash assistant, ready to serve 24/7.</p>
      </div>
      <div className="header-right">
        <img
          src="/images/image_Brand.png"
          alt="Prestine Mobile Car Wash"
          className="brand-logo"
        />
      </div>
    </header>
  );
}
