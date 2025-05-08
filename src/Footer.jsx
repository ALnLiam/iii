import React from 'react';
// import { Facebook, Instagram, Youtube, Twitter } from 'lucide-react';

let Footer = () => (
  <footer className="footer">
    <div className="row icons">
      {/* <Facebook size={24} />
      <Instagram size={24} />
      <Youtube size={24} />
      <Twitter size={24} /> */}
    </div>
    <div className="row links">
      <ul>
        <li><a href="#">Contact us</a></li>
        <li><a href="#">Our Services</a></li>
        <li><a href="#">Privacy Policy</a></li>
      </ul>
    </div>
    <div className="row">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    </div>
  </footer>
);

export default Footer;

// import React from 'react';

// export default function Footer() {
//   return (
//     <footer className="footer">
//       {/* footer links */}
//     </footer>
//   );
// }