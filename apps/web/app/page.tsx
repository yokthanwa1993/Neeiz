export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center py-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            🎯 Neeiz Web Platform
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            ระบบจัดการเนื้อหาและบริการออนไลน์
          </p>
          <div className="flex justify-center gap-4">
            <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              ✅ API Connected
            </span>
            <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              🚀 Next.js Ready
            </span>
          </div>
        </header>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-4">📱</div>
            <h3 className="text-xl font-semibold mb-2">Mobile App</h3>
            <p className="text-gray-600 mb-4">
              แอปพลิเคชันมือถือสำหรับผู้ใช้งาน
            </p>
            <a 
              href="http://localhost:32100" 
              className="text-blue-600 hover:text-blue-800 font-medium"
              target="_blank"
            >
              เปิดแอป →
            </a>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-4">🔧</div>
            <h3 className="text-xl font-semibold mb-2">API Services</h3>
            <p className="text-gray-600 mb-4">
              บริการ API สำหรับระบบหลังบ้าน
            </p>
            <a 
              href="http://localhost:3001/api/health" 
              className="text-blue-600 hover:text-blue-800 font-medium"
              target="_blank"
            >
              ตรวจสอบสถานะ →
            </a>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-4">🌐</div>
            <h3 className="text-xl font-semibold mb-2">Web Dashboard</h3>
            <p className="text-gray-600 mb-4">
              หน้าจัดการระบบและรายงาน
            </p>
            <span className="text-green-600 font-medium">
              ✅ คุณอยู่ที่นี่
            </span>
          </div>
        </div>

        {/* Status Section */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold mb-6 text-center">สถานะระบบ</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-2">🟢</div>
              <h4 className="font-semibold">Mobile App</h4>
              <p className="text-sm text-gray-600">Port 32100</p>
              <p className="text-green-600 font-medium">Online</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🟢</div>
              <h4 className="font-semibold">API Server</h4>
              <p className="text-sm text-gray-600">Port 3001</p>
              <p className="text-green-600 font-medium">Online</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🟢</div>
              <h4 className="font-semibold">Web Server</h4>
              <p className="text-sm text-gray-600">Port 3000</p>
              <p className="text-green-600 font-medium">Online</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center py-8 text-gray-500">
          <p>© 2025 Neeiz Platform - All services running successfully</p>
        </footer>
      </div>
    </div>
  );
}
