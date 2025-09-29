/*import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Home from './Home';
import MyAccount from './MyAccount';
import OurServices from './OurServices';
import Notifications from './Notifications';
import Portfolio from './Portfolio';
import Pricing from './Pricing';
import Contacts from './Contacts';

export default function Dashboard() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="myaccount" element={<MyAccount />} />
        <Route path="services" element={<OurServices />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="contacts" element={<Contacts />} />
      </Routes>
    </div>
  );
}
*/

import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Home from './Home';
import MyAccount from './MyAccount';
import OurServices from './OurServices';
import Notifications from './Notifications';
import Portfolio from './Portfolio';
import Pricing from './Pricing';
import Contacts from './Contacts';

export default function Dashboard() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="myaccount" element={<MyAccount />} />
        <Route path="services" element={<OurServices />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="contacts" element={<Contacts />} />
      </Routes>
    </div>
  );
}
