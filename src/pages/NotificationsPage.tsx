import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Star, Calendar, MapPin, Clock, X, Check, BellRing, Wallet } from 'lucide-react';
import { selectedJobsNotifications, generalNotifications } from '@/data/notifications';
import { cn } from '@/lib/utils';
import PageLayout from '@/components/PageLayout';

const NotificationsPage = () => {
  const navigate = useNavigate();

  return (
    <PageLayout backgroundClass="bg-gray-50">
      <header className="sticky top-0 bg-white z-10 p-4 border-b">
        <div className="flex items-center gap-4">
          <Button onClick={() => navigate(-1)} size="icon" variant="ghost" className="rounded-full text-gray-800">
            <ArrowLeft size={24} />
          </Button>
          <h1 className="text-xl font-bold text-gray-900">แจ้งเตือน</h1>
        </div>
      </header>

      <main className="flex-grow overflow-y-auto">
        <Tabs defaultValue="selected-jobs" className="w-full">
          <div className="p-4 sticky top-0 bg-gray-50 z-10">
            <TabsList className="grid w-full grid-cols-2 gap-2 h-auto bg-gray-200 p-1 rounded-xl">
              <TabsTrigger value="selected-jobs" className="py-2 text-gray-600 rounded-lg data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm font-semibold">
                งานที่ได้รับเลือก ({selectedJobsNotifications.length})
              </TabsTrigger>
              <TabsTrigger value="general" className="py-2 text-gray-600 rounded-lg data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm font-semibold">
                การแจ้งเตือน ({generalNotifications.length})
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="selected-jobs" className="px-4 space-y-4 pb-4">
            {selectedJobsNotifications.map((job) => (
              <Card key={job.id} className="rounded-2xl shadow-md overflow-hidden border bg-white">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">{job.jobTitle}</h3>
                      <p className="text-gray-600">{job.companyName}</p>
                    </div>
                    <p className="font-bold text-yellow-500 text-lg">฿{job.rate}/ชม.</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 my-3">
                    <Star className="text-yellow-400" fill="currentColor" size={16} />
                    <span>{job.rating}</span>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3 space-y-2 text-gray-800">
                    <div className="flex items-center gap-3">
                      <Calendar size={18} />
                      <span>{job.date} {job.time}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin size={18} />
                      <span>{job.location}</span>
                    </div>
                  </div>
                  <div className="bg-blue-100 border-l-4 border-blue-400 text-blue-800 p-3 my-4 rounded-r-lg">
                    <p>"{job.message}"</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock size={16} />
                      <span>หมดเขตใน {job.expiresInDays} วัน</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-full px-4">
                        <X size={16} className="mr-1" />
                        ปฏิเสธ
                      </Button>
                      <Button className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold rounded-full px-4">
                        <Check size={16} className="mr-1" />
                        รับงาน
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="general" className="p-0">
            <div className="divide-y divide-gray-200">
              {generalNotifications.map((notif) => (
                <div key={notif.id} className={cn("flex items-start gap-4 p-4", !notif.read && "bg-yellow-50")}>
                  <div className={cn("mt-1 p-2 rounded-full", !notif.read ? "bg-yellow-100" : "bg-gray-100")}>
                    {notif.title.includes("ชำระเงิน") ? <Wallet size={20} className="text-yellow-600" /> : <BellRing size={20} className="text-gray-500" />}
                  </div>
                  <div className="flex-grow">
                    <p className="font-semibold text-gray-800">{notif.title}</p>
                    <p className="text-sm text-gray-600">{notif.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                  </div>
                  {!notif.read && <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full mt-2 self-center"></div>}
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </PageLayout>
  );
};

export default NotificationsPage;