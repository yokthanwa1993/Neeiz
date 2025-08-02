import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import BottomNavigation from './BottomNavigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel';
import { MessageSquare, Bell, Settings, Briefcase, CheckSquare, Bookmark } from 'lucide-react';

const HomeScreen = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  const displayName = user ? user.name : 'Guest';
  const displayPicture = user ? user.picture : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face';
  const fallbackChar = user ? user.name.charAt(0).toUpperCase() : 'G';

  const stats = [
    { title: 'งานใหม่', value: '25', description: '7 วันล่าสุด', icon: Briefcase },
    { title: 'สมัครแล้ว', value: '5', description: '+2 ในสัปดาห์นี้', icon: CheckSquare },
    { title: 'บันทึกแล้ว', value: '12', description: 'ดูรายการ', icon: Bookmark },
  ];

  const aiMatchedJobs = [
    {
      id: 1,
      title: 'วิศวกรซอฟต์แวร์',
      company: 'อินโนเวทค - กรุงเทพ, ประเทศไทย',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14694dd?w=400&h=500&fit=crop&crop=center',
    },
    {
      id: 2,
      title: 'การตลาดดิจิทัล',
      company: 'มาร์เก็ตบูสต์ - เชียงใหม่',
      image: 'https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?w=400&h=500&fit=crop&crop=center',
    },
    {
      id: 3,
      title: 'นักออกแบบ UI/UX',
      company: 'ครีเอทีฟ สตูดิโอ - กรุงเทพ',
      image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&h=500&fit=crop&crop=center',
    },
     {
      id: 4,
      title: 'ผู้จัดการโครงการ',
      company: 'บิวด์อิท - ภูเก็ต',
      image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=500&fit=crop&crop=center',
    },
  ];

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <>
      {/* Background from BgPage */}
      <div className="fixed top-0 left-0 w-full h-screen bg-cover bg-center -z-20" style={{ backgroundImage: "url('/home-background.jpeg')" }}></div>
      <div className="fixed top-0 left-0 w-full h-screen bg-white/20 backdrop-blur-xl -z-10"></div>

      <div className="h-screen overflow-y-hidden">
        <div className="px-6 pt-6 pb-4">
          {/* Header */}
          <header className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12 border-2 border-white/80 shadow-md">
                <AvatarImage src={displayPicture} alt={displayName} />
                <AvatarFallback className="bg-yellow-100 text-yellow-600 font-bold">{fallbackChar}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="font-bold text-lg text-slate-800 drop-shadow-md">ค้นหางาน</h1>
                <p className="text-sm text-slate-700 drop-shadow-md">หางานในฝันของคุณ</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="bg-white/30 border border-white/30 rounded-full backdrop-blur-md" onClick={() => navigate('/chat-history')}>
                <MessageSquare className="h-5 w-5 text-slate-700" />
              </Button>
              <Button variant="ghost" size="icon" className="bg-white/30 border border-white/30 rounded-full backdrop-blur-md relative" onClick={() => navigate('/notifications')}>
                <Bell className="h-5 w-5 text-slate-700" />
                <span className="absolute top-0 right-0 block h-4 w-4 text-[10px] flex items-center justify-center rounded-full bg-red-500 text-white border-2 border-white">5</span>
              </Button>
              <Button variant="ghost" size="icon" className="bg-white/30 border border-white/30 rounded-full backdrop-blur-md" onClick={() => navigate('/settings')}>
                <Settings className="h-5 w-5 text-slate-700" />
              </Button>
            </div>
          </header>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-3">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="bg-white/30 border-white/30 border text-slate-800 p-2 rounded-2xl shadow-lg backdrop-blur-sm">
                  <CardContent className="p-2">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-semibold">{stat.title}</p>
                      <Icon className="h-4 w-4 text-slate-500" />
                    </div>
                    <p className="text-xl font-bold">{stat.value}</p>
                    <p className="text-xs text-slate-600">{stat.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        <main className="px-6 py-4 pb-20">
          {/* AI Matching Section */}
          <section>
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold text-slate-800 drop-shadow-md">งานที่ AI Matching มา</h2>
              <Button variant="link" className="text-slate-700 hover:text-black px-0">ดูทั้งหมด</Button>
            </div>
            <Carousel setApi={setApi} opts={{ loop: false, align: "start" }} className="w-full">
              <CarouselContent className="-ml-4">
                {aiMatchedJobs.map((job) => (
                  <CarouselItem key={job.id} className="basis-2/3 md:basis-1/3 pl-4">
                    <Card className="relative aspect-[3/4] rounded-2xl overflow-hidden border-none shadow-lg">
                      <img src={job.image} alt={job.title} className="w-full h-full object-cover" />
                      <div className="absolute bottom-0 left-0 right-0 h-3/4 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 p-4 text-white">
                        <h3 className="font-bold text-lg drop-shadow-sm">{job.title}</h3>
                        <p className="text-sm text-gray-300 drop-shadow-sm">{job.company}</p>
                      </div>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center items-center gap-2 mt-2">
                {aiMatchedJobs.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === current ? 'w-6 bg-yellow-400' : 'w-2 bg-gray-400/50'
                    }`}
                  />
                ))}
              </div>
            </Carousel>
          </section>
        </main>

        <BottomNavigation />
      </div>
    </>
  );
};

export default HomeScreen;