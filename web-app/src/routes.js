import Dashboard from './views/Dashboard/Dashboard';
import Bookings from './views/Bookings/';
const routes = [
  { path: '/booking-request', name: 'Booking Request', component: Bookings },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },

];

export default routes;
