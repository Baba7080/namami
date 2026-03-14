import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ContentProvider } from './context/ContentContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Machinery from './pages/Machinery';
import EcoPaints from './pages/EcoPaints';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Installations from './pages/Installations';
import Franchise from './pages/Franchise';
import WorkOrders from './pages/WorkOrders';
import Media from './pages/Media';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import InfluencerRegistration from './pages/InfluencerRegistration';

// Admin Pages
import AdminLogin from './pages/Admin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard';

// Layout wrapper to hide Navbar/Footer on Admin screens
const Layout = ({ children }) => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  return (
    <div className="app-container">
      {!isAdmin && <Navbar />}
      <main className="main-content">
        {children}
      </main>
      {!isAdmin && <Footer />}
    </div>
  );
};

function App() {
  return (
    <ContentProvider>
      <CartProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/machinery" element={<Machinery />} />
              <Route path="/eco-paints" element={<EcoPaints />} />

              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />

              <Route path="/installations" element={<Installations />} />
              <Route path="/franchise" element={<Franchise />} />
              <Route path="/work-orders" element={<WorkOrders />} />
              <Route path="/media" element={<Media />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/influencer-program" element={<InfluencerRegistration />} />

              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </CartProvider>
    </ContentProvider>
  );
}

export default App;
