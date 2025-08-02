import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Edit, FileText, Briefcase, GraduationCap, LogOut } from 'lucide-react';
import PageLayout from './PageLayout';
import BottomNavigation from './BottomNavigation';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '../contexts/AuthContext';

const StatItem = ({ value, label }: { value: string | number; label: string }) => (
  <div className="text-center">
    <p className="font-bold text-lg text-gray-800">{value}</p>
    <p className="text-xs text-gray-500">{label}</p>
  </div>
);

const ProfilePage: React.FC = () => {
  const { user: authUser, logout } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!authUser) {
      navigate('/');
    }
  }, [authUser, navigate]);

  const [user, setUser] = useState({
    name: authUser?.name || 'กรุณาเข้าสู่ระบบ',
    title: 'พนักงานบริการ',
    location: 'กรุงเทพฯ',
    stats: { applied: 42, saved: 12, views: 128 },
    about: 'พนักงานบริการที่มีประสบการณ์ 5+ ปี มีความเชี่ยวชาญในการให้บริการลูกค้าอย่างมีประสิทธิภาพ และสามารถทำงานในหลากหลายสภาพแวดล้อมได้ดี',
    experience: [
      { title: 'พนักงานเสิร์ฟ', company: 'ร้านอาหารสยาม', period: 'ม.ค. 2022 - ปัจจุบัน' },
      { title: 'พนักงานเก็บเงิน', company: '7-Eleven', period: 'มิ.ย. 2020 - ธ.ค. 2021' },
    ],
    education: [
      { degree: 'ปวช. สาขาอาหารและโรงแรม', university: 'วิทยาลัยเทคนิคกรุงเทพ', period: '2018 - 2020' },
    ],
  });

  const [editedInfo, setEditedInfo] = useState({ name: '', title: '', location: '' });
  const [avatarUrl, setAvatarUrl] = useState(authUser?.picture || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face');

  useEffect(() => {
    if (authUser) {
      setUser(prev => ({ ...prev, name: authUser.name }));
      setAvatarUrl(authUser.picture || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face');
    }
  }, [authUser]);

  const handleUploadClick = () => fileInputRef.current?.click();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatarUrl(URL.createObjectURL(file));
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      setEditedInfo({ name: user.name, title: user.title, location: user.location });
    }
  };

  const handleInfoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditedInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = () => {
    setUser(prev => ({ ...prev, ...editedInfo }));
  };

  const handleLogout = async () => {
    if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการออกจากระบบ?')) {
      await logout();
      navigate('/');
    }
  };

  if (!authUser) {
    return null;
  }

  return (
    <PageLayout backgroundClass="bg-gradient-to-b from-yellow-100 to-gray-50">
      <header className="relative z-20">
        <div className="relative flex flex-col items-center pt-8">
          <div className="relative">
            <Avatar className="w-28 h-28 border-4 border-white/80 shadow-lg">
              <AvatarImage src={avatarUrl} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <button
              onClick={handleUploadClick}
              className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-md cursor-pointer hover:bg-gray-100 transition-transform transform hover:scale-110"
              aria-label="Change profile picture"
            >
              <Camera size={18} className="text-yellow-600" />
            </button>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
          />
          <h1 className="text-2xl font-bold mt-4 text-gray-900">{user.name}</h1>
          <p className="text-sm text-gray-700">{user.title}</p>
          <p className="text-xs text-gray-600/80 mt-1">{user.location}</p>
          
          <Dialog onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
              <Button 
                variant="secondary" 
                className="mt-4 rounded-full bg-white/90 text-yellow-600 font-semibold hover:bg-white shadow"
              >
                <Edit size={16} className="mr-2" />
                แก้ไขโปรไฟล์
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white">
              <DialogHeader>
                <DialogTitle>แก้ไขโปรไฟล์</DialogTitle>
                <DialogDescription>
                  ทำการเปลี่ยนแปลงข้อมูลโปรไฟล์ของคุณที่นี่ คลิกบันทึกเมื่อคุณทำเสร็จแล้ว
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    ชื่อ
                  </Label>
                  <Input id="name" name="name" value={editedInfo.name} onChange={handleInfoChange} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    ตำแหน่ง
                  </Label>
                  <Input id="title" name="title" value={editedInfo.title} onChange={handleInfoChange} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="location" className="text-right">
                    ที่อยู่
                  </Label>
                  <Input id="location" name="location" value={editedInfo.location} onChange={handleInfoChange} className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" onClick={handleSaveChanges}>บันทึกการเปลี่ยนแปลง</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <main className="flex-grow bg-transparent z-10 p-4 pb-28 overflow-y-auto mt-6">
        <Card className="shadow-md mb-6 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4 flex justify-around items-center">
            <StatItem value={user.stats.applied} label="งานที่สมัคร" />
            <div className="h-8 border-r border-gray-200"></div>
            <StatItem value={user.stats.saved} label="บันทึกไว้" />
            <div className="h-8 border-r border-gray-200"></div>
            <StatItem value={user.stats.views} label="คนดูโปรไฟล์" />
          </CardContent>
        </Card>

        <Card className="mb-6 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-800">เกี่ยวกับฉัน</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 text-sm leading-relaxed">{user.about}</p>
          </CardContent>
        </Card>

        <Card className="mb-6 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-bold text-gray-800">
              <FileText size={20} />
              เรซูเม่และประวัติ
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2"><Briefcase size={18} /> ประสบการณ์ทำงาน</h3>
              <div className="border-l-2 border-yellow-400 pl-4 space-y-4">
                {user.experience.map((exp, index) => (
                  <div key={index}>
                    <p className="font-bold text-gray-800">{exp.title}</p>
                    <p className="text-sm text-gray-600">{exp.company}</p>
                    <p className="text-xs text-gray-400">{exp.period}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2"><GraduationCap size={18} /> การศึกษา</h3>
              <div className="border-l-2 border-yellow-400 pl-4">
                  {user.education.map((edu, index) => (
                    <div key={index}>
                      <p className="font-bold text-gray-800">{edu.degree}</p>
                      <p className="text-sm text-gray-600">{edu.university}</p>
                      <p className="text-xs text-gray-400">{edu.period}</p>
                    </div>
                  ))}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Button onClick={handleLogout} variant="destructive" className="w-full bg-red-500 hover:bg-red-600 text-white">
          <LogOut size={16} className="mr-2" />
          ออกจากระบบ
        </Button>
      </main>

      <BottomNavigation />
    </PageLayout>
  );
};

export default ProfilePage;