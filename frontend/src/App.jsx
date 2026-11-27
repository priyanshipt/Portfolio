import { Routes, Route } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  return (
    // Respect the visitor's "reduce motion" setting across every animation.
    <MotionConfig reducedMotion="user">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MotionConfig>
  );
}
