import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { Suspense } from "react";

function App() {
  return (
    <Router>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Suspense fallback={<div className="text-center">Đang tải...</div>}>
            <Routes>
              <Route path="/" element={<div className="bg-white shadow rounded-lg p-6">Trang chủ (mock)</div>} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </main>
    </Router>
  );
}

export default App;

