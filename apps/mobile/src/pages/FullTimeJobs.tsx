import React from 'react';
import { Search, MapPin, Clock, DollarSign, Star, Bookmark, ChevronRight } from 'lucide-react';
import BottomNavigation from '../components/BottomNavigation';

const FullTimeJobs = () => {
  // Mock data for full-time jobs
  const fullTimeJobs = [
    {
      id: 1,
      title: 'นักพัฒนาซอฟต์แวร์',
      company: 'Tech Solutions Co.',
      location: 'กรุงเทพฯ',
      salary: '35,000 - 50,000',
      type: 'งานประจำ',
      experience: '2-5 ปี',
      category: 'เทคโนโลยี',
      rating: 4.5,
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center',
      description: 'พัฒนาและดูแลระบบซอฟต์แวร์ ทำงานร่วมกับทีมพัฒนา',
      benefits: ['ประกันสุขภาพ', 'โบนัสประจำปี', 'วันหยุดพักผ่อน'],
      isBookmarked: false
    },
    {
      id: 2,
      title: 'เจ้าหน้าที่การตลาด',
      company: 'Marketing Plus Ltd.',
      location: 'กรุงเทพฯ',
      salary: '25,000 - 35,000',
      type: 'งานประจำ',
      experience: '1-3 ปี',
      category: 'การตลาด',
      rating: 4.2,
      logo: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=100&h=100&fit=crop&crop=center',
      description: 'วางแผนและดำเนินกิจกรรมทางการตลาด บริหารโซเชียลมีเดีย',
      benefits: ['ค่าคอมมิชชั่น', 'ประกันสุขภาพ', 'อบรมพัฒนาทักษะ'],
      isBookmarked: true
    },
    {
      id: 3,
      title: 'นักบัญชี',
      company: 'Finance Expert Co.',
      location: 'นนทบุรี',
      salary: '28,000 - 40,000',
      type: 'งานประจำ',
      experience: '2-4 ปี',
      category: 'การเงิน',
      rating: 4.3,
      logo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=center',
      description: 'จัดทำบัญชี ตรวจสอบเอกสารทางการเงิน จัดทำรายงาน',
      benefits: ['ประกันสุขภาพ', 'โบนัสประจำปี', 'ลาพักร้อน'],
      isBookmarked: false
    },
    {
      id: 4,
      title: 'ผู้จัดการฝ่ายขาย',
      company: 'Sales Pro Company',
      location: 'กรุงเทพฯ',
      salary: '40,000 - 60,000',
      type: 'งานประจำ',
      experience: '3-7 ปี',
      category: 'ขาย',
      rating: 4.6,
      logo: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=100&h=100&fit=crop&crop=center',
      description: 'บริหารทีมขาย วางแผนกลยุทธ์การขาย ดูแลลูกค้า',
      benefits: ['ค่าคอมมิชชั่นสูง', 'รถประจำตำแหน่ง', 'ประกันสุขภาพ'],
      isBookmarked: false
    },
    {
      id: 5,
      title: 'นักออกแบบกราฟิก',
      company: 'Creative Studio',
      location: 'กรุงเทพฯ',
      salary: '22,000 - 32,000',
      type: 'งานประจำ',
      experience: '1-3 ปี',
      category: 'ออกแบบ',
      rating: 4.4,
      logo: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=100&h=100&fit=crop&crop=center',
      description: 'ออกแบบสื่อโฆษณา โบรชัวร์ และสื่อดิจิทัล',
      benefits: ['สภาพแวดล้อมสร้างสรรค์', 'อุปกรณ์ทันสมัย', 'ประกันสุขภาพ'],
      isBookmarked: true
    }
  ];

  return (
    <div className="min-h-screen pb-20">
      
      {/* Results Count */}
      <div className="px-4 py-3">
        <p className="text-sm text-gray-600">
          พบงานประจำ {fullTimeJobs.length} ตำแหน่ง
        </p>
      </div>

      {/* Job Listings */}
      <div className="px-4 py-2 space-y-4">
        {fullTimeJobs.map((job) => (
          <div key={job.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
            {/* Company Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center">
                <img
                  src={job.logo}
                  alt={job.company}
                  className="w-12 h-12 rounded-xl object-cover mr-3"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://placehold.co/100x100?text=Logo';
                  }}
                />
                <div>
                  <h3 className="font-bold text-lg text-gray-800">{job.title}</h3>
                  <p className="text-gray-600 text-sm">{job.company}</p>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Bookmark 
                  className={`w-5 h-5 ${job.isBookmarked ? 'fill-[#f5c518] text-[#f5c518]' : 'text-gray-400'}`} 
                />
              </button>
            </div>

            {/* Job Details */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="w-4 h-4 mr-2" />
                <span>{job.location}</span>
                <span className="mx-2">•</span>
                <Clock className="w-4 h-4 mr-2" />
                <span>{job.experience}</span>
              </div>
              
              <div className="flex items-center text-sm">
                <DollarSign className="w-4 h-4 mr-2 text-green-600" />
                <span className="font-semibold text-green-600">฿{job.salary}</span>
                <span className="mx-2 text-gray-400">•</span>
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                  <span className="text-gray-600">{job.rating}</span>
                </div>
              </div>
            </div>

            {/* Job Description */}
            <p className="text-gray-700 text-sm mb-3 line-clamp-2">
              {job.description}
            </p>

            {/* Benefits */}
            <div className="flex flex-wrap gap-2 mb-4">
              {job.benefits.slice(0, 3).map((benefit, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                >
                  {benefit}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button className="flex-1 bg-[#f5c518] text-white font-semibold py-3 rounded-xl hover:bg-[#e6b015] transition-colors">
                สมัครงาน
              </button>
              <button className="px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {fullTimeJobs.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 px-4">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Search className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">ไม่พบงานที่ตรงกับการค้นหา</h3>
          <p className="text-gray-600 text-center">
            ลองเปลี่ยนคำค้นหาหรือปรับเงื่อนไขการกรองใหม่
          </p>
        </div>
      )}

      <BottomNavigation />
    </div>
  );
};

export default FullTimeJobs;