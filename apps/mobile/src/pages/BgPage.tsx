import React, { useEffect } from 'react';
import { User, ChevronDown, Video, Code, Presentation, ExternalLink, Sparkles, CalendarPlus, ChevronRight, Mic } from 'lucide-react';

const BgPage = () => {
  useEffect(() => {
    const modeToggle = document.getElementById('modeToggle');
    if (modeToggle) {
      const buttons = modeToggle.querySelectorAll('button');
      const handleClick = (event: MouseEvent) => {
        buttons.forEach(b => {
          b.classList.remove('bg-white/60', 'shadow-sm', 'text-slate-700');
          b.classList.add('text-slate-600');
        });
        const target = event.currentTarget as HTMLButtonElement;
        target.classList.add('bg-white/60', 'shadow-sm', 'text-slate-700');
        target.classList.remove('text-slate-600');
      };

      buttons.forEach(btn => {
        btn.addEventListener('click', handleClick);
      });

      // Cleanup function
      return () => {
        buttons.forEach(btn => {
          btn.removeEventListener('click', handleClick);
        });
      };
    }
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center lg:py-10 lg:px-6 bg-transparent pt-6 pr-4 pb-6 pl-4 font-sans">
      <div className="fixed top-0 left-0 w-full h-screen bg-cover bg-center -z-20" style={{ backgroundImage: "url('https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/44dea03b-7cbb-41b6-934f-6482f1fdf2e3_3840w.jpg')" }}></div>
      <div className="fixed top-0 left-0 w-full h-screen bg-white/20 backdrop-blur-xl -z-10"></div>
      
      <div className="relative w-full max-w-[1440px] lg:rounded-3xl overflow-hidden lg:mx-8 shadow-black/10 bg-white/20 border-white/30 border rounded-2xl mr-4 ml-4 shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] backdrop-blur-xl">
        {/* Header */}
        <header className="flex sm:px-6 lg:px-12 lg:py-5 pt-4 pr-4 pb-4 pl-4 items-center justify-between border-b border-white/20">
          <div className="flex items-center gap-3">
            <span className="text-xl lg:text-2xl font-bricolage font-semibold">✱</span>
            <span className="text-lg lg:text-xl font-semibold tracking-tight text-slate-800">nexus</span>
          </div>
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
            <a href="#" className="text-slate-800 hover:text-blue-600 transition">Overview</a>
            <a href="#" className="text-slate-600 hover:text-blue-600 transition">Projects</a>
            <a href="#" className="text-slate-600 hover:text-blue-600 transition">Analytics</a>
            <a href="#" className="text-slate-600 hover:text-blue-600 transition">AI Assistant</a>
          </nav>
          <div className="flex items-center gap-3 lg:gap-4">
            <div id="modeToggle" className="inline-flex bg-white/30 border-white/40 border rounded-full pt-1 pr-1 pb-1 pl-1 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] backdrop-blur-sm">
              <button data-mode="private" className="px-3 lg:px-4 py-1 text-xs font-medium rounded-full text-slate-700 bg-white/60 backdrop-blur-sm shadow-sm">Personal</button>
              <button data-mode="team" className="px-3 lg:px-4 py-1 text-xs font-medium rounded-full text-slate-600">Workspace</button>
            </div>
            <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-full bg-slate-800/80 backdrop-blur-sm flex items-center justify-center border border-white/20">
              <User className="w-4 h-4 text-white" strokeWidth={1.5} />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="relative sm:px-6 lg:px-12 pr-4 pb-32 pl-4">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 pt-6 lg:pt-8">
            {/* Left column */}
            <div className="flex flex-col gap-4 lg:gap-6">
              <h1 className="font-bricolage text-3xl sm:text-4xl lg:text-5xl text-slate-800 tracking-tight font-semibold">Good morning, Sarah!</h1>
              <div className="flex lg:px-5 lg:py-4 bg-white/30 border-white/30 border rounded-xl pt-3 pr-4 pb-3 pl-4 shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] backdrop-blur-sm items-center justify-between">
                <div className="flex items-center gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-800">CloudSync Platform</p>
                    <p className="text-xs text-slate-600">Full-Stack Development</p>
                  </div>
                </div>
                <ChevronDown className="w-5 h-5 text-slate-500" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-6xl sm:text-7xl lg:text-[90px] leading-none text-slate-800 font-bricolage font-semibold">92%</span>
                <p className="text-base lg:text-lg text-slate-600 -mt-2 lg:-mt-4">Weekly productivity score</p>
              </div>
              <div className="relative lg:p-6 bg-white/20 border-white/30 border rounded-2xl pt-4 pr-4 pb-4 pl-4 shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] backdrop-blur-sm">
                <h3 className="text-base lg:text-lg font-semibold mb-3 lg:mb-4 text-slate-800">Work Distribution</h3>
                <div className="grid grid-cols-3 gap-3 lg:gap-4">
                  <div>
                    <p className="text-2xl lg:text-3xl text-slate-800 font-bricolage font-semibold">34h</p>
                    <p className="text-xs text-slate-600">Development</p>
                  </div>
                  <div>
                    <p className="text-2xl lg:text-3xl text-slate-800 font-bricolage font-semibold">18h</p>
                    <p className="text-xs text-slate-600">Meetings</p>
                  </div>
                  <div>
                    <p className="text-2xl lg:text-3xl text-slate-800 font-bricolage font-semibold">9h</p>
                    <p className="text-xs text-slate-600">Planning</p>
                  </div>
                </div>
              </div>
              <div className="relative lg:p-6 bg-white/20 border-white/30 border rounded-2xl mt-6 pt-4 pr-4 pb-4 pl-4 shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] backdrop-blur-sm">
                <h3 className="text-base lg:text-lg font-semibold mb-3 lg:mb-4 text-slate-800">Time Allocation</h3>
                <div className="grid grid-cols-3 gap-3 lg:gap-4">
                  <div>
                    <p className="text-2xl lg:text-3xl text-slate-800 font-bricolage font-semibold">45%</p>
                    <p className="text-xs text-slate-600">Coding</p>
                  </div>
                  <div>
                    <p className="text-2xl lg:text-3xl text-slate-800 font-bricolage font-semibold">30%</p>
                    <p className="text-xs text-slate-600">Collaboration</p>
                  </div>
                  <div>
                    <p className="text-2xl lg:text-3xl text-slate-800 font-bricolage font-semibold">25%</p>
                    <p className="text-xs text-slate-600">Research</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="flex flex-col gap-4 lg:gap-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <h2 className="text-lg lg:text-xl font-semibold text-slate-800">Today's Schedule</h2>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-slate-600">Active team:</span>
                  <div className="flex -space-x-2">
                    <img src="https://randomuser.me/api/portraits/women/32.jpg" alt="" className="w-6 h-6 lg:w-7 lg:h-7 rounded-full border-2 border-white/50" />
                    <img src="https://randomuser.me/api/portraits/men/44.jpg" alt="" className="w-6 h-6 lg:w-7 lg:h-7 rounded-full border-2 border-white/50" />
                    <img src="https://randomuser.me/api/portraits/women/28.jpg" alt="" className="w-6 h-6 lg:w-7 lg:h-7 rounded-full border-2 border-white/50" />
                    <div className="w-6 h-6 lg:w-7 lg:h-7 rounded-full bg-white/40 backdrop-blur-sm flex items-center justify-center text-[10px] font-semibold border-2 border-white/50 text-slate-700">+5</div>
                  </div>
                </div>
              </div>

              <div className="grid xl:grid-cols-3 gap-4 lg:gap-6">
                <div className="xl:col-span-2 flex flex-col gap-4 lg:gap-6">
                  <div className="relative lg:p-6 bg-white/40 border-white/30 border rounded-xl pt-4 pr-4 pb-4 pl-4 shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] backdrop-blur-md">
                    <span className="absolute top-3 lg:top-4 right-3 lg:right-4 text-xs bg-green-500/20 text-green-700 px-2 lg:px-3 py-1 rounded-full backdrop-blur-sm border border-green-200/30">Standup</span>
                    <h3 className="flex items-center gap-2 text-sm lg:text-base font-semibold mb-3 lg:mb-4 text-slate-800">
                      <Video className="w-4 h-4" strokeWidth={1.5} /> Daily Team Standup
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600 mb-4 lg:mb-6">
                      <div>
                        <p className="font-medium text-slate-800">Time:</p>
                        <p>Today, 9:30 AM</p>
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">Duration:</p>
                        <p>15 minutes</p>
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">Platform:</p>
                        <p>Zoom</p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex -space-x-2">
                        <img src="https://randomuser.me/api/portraits/men/21.jpg" className="w-6 h-6 rounded-full border-2 border-white/50" alt="" />
                        <img src="https://randomuser.me/api/portraits/women/33.jpg" className="w-6 h-6 rounded-full border-2 border-white/50" alt="" />
                        <img src="https://randomuser.me/api/portraits/men/19.jpg" className="w-6 h-6 rounded-full border-2 border-white/50" alt="" />
                        <div className="w-6 h-6 rounded-full bg-white/40 backdrop-blur-sm flex items-center justify-center text-[9px] font-semibold border-2 border-white/50 text-slate-700">+4</div>
                      </div>
                      <button className="text-sm font-medium bg-slate-800/80 backdrop-blur-sm text-white px-3 lg:px-4 py-2 rounded-full flex items-center justify-center gap-2 hover:bg-slate-700/80 transition border border-white/20">
                        Join meeting <ExternalLink className="w-4 h-4" strokeWidth={1.5} />
                      </button>
                    </div>
                  </div>
                  <div className="relative lg:p-6 bg-white/40 border-white/30 border rounded-xl pt-4 pr-4 pb-4 pl-4 shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] backdrop-blur-md">
                    <div className="absolute top-3 lg:top-4 right-3 lg:right-4 flex flex-wrap gap-1 lg:gap-2">
                      <span className="text-xs bg-blue-500/20 text-blue-700 px-2 lg:px-3 py-1 rounded-full backdrop-blur-sm border border-blue-200/30">Code Review</span>
                    </div>
                    <h3 className="flex items-center gap-2 text-sm lg:text-base font-semibold mb-3 lg:mb-4 text-slate-800">
                      <Code className="w-4 h-4" strokeWidth={1.5} /> API Integration Review
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600 mb-4 lg:mb-6">
                      <div>
                        <p className="font-medium text-slate-800">Repository:</p>
                        <p>CloudSync API</p>
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">Branch:</p>
                        <p>feature/auth-service</p>
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">Due:</p>
                        <p>Today, 6:00 PM</p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex -space-x-2">
                        <img src="https://randomuser.me/api/portraits/men/25.jpg" className="w-6 h-6 rounded-full border-2 border-white/50" alt="" />
                        <img src="https://randomuser.me/api/portraits/women/41.jpg" className="w-6 h-6 rounded-full border-2 border-white/50" alt="" />
                      </div>
                      <button className="text-sm font-medium bg-slate-800/80 backdrop-blur-sm text-white px-3 lg:px-4 py-2 rounded-full flex items-center justify-center gap-2 hover:bg-slate-700/80 transition border border-white/20">
                        AI code analysis <Sparkles className="w-4 h-4" strokeWidth={1.5} />
                      </button>
                    </div>
                  </div>
                  <div className="relative lg:p-6 bg-white/40 border-white/30 border rounded-xl pt-4 pr-4 pb-4 pl-4 shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] backdrop-blur-md">
                    <span className="absolute top-3 lg:top-4 right-3 lg:right-4 text-xs bg-purple-500/20 text-purple-700 px-2 lg:px-3 py-1 rounded-full backdrop-blur-sm border border-purple-200/30">Workshop</span>
                    <h3 className="flex items-center gap-2 text-sm lg:text-base font-semibold mb-3 lg:mb-4 text-slate-800">
                      <Presentation className="w-4 h-4" strokeWidth={1.5} /> Architecture Planning Session
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600 mb-4 lg:mb-6">
                      <div>
                        <p className="font-medium text-slate-800">Time:</p>
                        <p>Tomorrow, 2:00 PM</p>
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">Focus:</p>
                        <p>Microservices Design</p>
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">Location:</p>
                        <p>Conference Room A</p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex -space-x-2">
                        <img src="https://randomuser.me/api/portraits/men/38.jpg" className="w-6 h-6 rounded-full border-2 border-white/50" alt="" />
                        <img src="https://randomuser.me/api/portraits/women/47.jpg" className="w-6 h-6 rounded-full border-2 border-white/50" alt="" />
                        <img src="https://randomuser.me/api/portraits/men/52.jpg" className="w-6 h-6 rounded-full border-2 border-white/50" alt="" />
                      </div>
                      <button className="text-sm font-medium bg-slate-800/80 backdrop-blur-sm text-white px-3 lg:px-4 py-2 rounded-full flex items-center justify-center gap-2 hover:bg-slate-700/80 transition border border-white/20">
                        Add to calendar <CalendarPlus className="w-4 h-4" strokeWidth={1.5} />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-4 lg:gap-6">
                  <div className="lg:p-6 flex flex-col gap-4 bg-white/40 border-white/30 border rounded-xl pt-4 pr-4 pb-4 pl-4 shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] backdrop-blur-md">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h4 className="lg:text-base text-sm font-semibold text-slate-800">Shortcuts</h4>
                      </div>
                      <button className="text-xs font-medium text-slate-600 flex items-center gap-1 hover:text-blue-600 transition">
                        Create
                      </button>
                    </div>
                    <ul className="text-sm text-slate-700 flex flex-col gap-3">
                      <li className="flex items-start justify-between hover:bg-white/30 p-2 rounded-lg cursor-pointer transition">
                        <span>Generate sprint summary from completed tickets</span>
                        <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0 ml-2" strokeWidth={1.5} />
                      </li>
                      <li className="flex items-start justify-between hover:bg-white/30 p-2 rounded-lg cursor-pointer transition">
                        <span>Create documentation from code comments</span>
                        <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0 ml-2" strokeWidth={1.5} />
                      </li>
                      <li className="flex items-start justify-between hover:bg-white/30 p-2 rounded-lg cursor-pointer transition">
                        <span>Optimize database queries in current branch</span>
                        <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0 ml-2" strokeWidth={1.5} />
                      </li>
                    </ul>
                  </div>
                  <div className="lg:p-6 flex flex-col gap-4 bg-white/30 border-white/30 border rounded-xl pt-4 pr-4 pb-4 pl-4 shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] backdrop-blur-md">
                    <span className="text-xs bg-blue-500/20 text-blue-700 px-3 py-1 rounded-full w-max backdrop-blur-sm border border-blue-200/30">Voice Assistant</span>
                    <h3 className="text-lg lg:text-xl font-semibold text-slate-800">Ask Nexus anything!</h3>
                    <svg viewBox="0 0 120 20" xmlns="http://www.w3.org/2000/svg" className="w-full h-6 text-blue-500">
                      <path d="M0 10 L5 10 M10 10 L15 10 M20 10 L25 10 M30 10 L35 10 M40 10 L45 10 M50 10 L55 10 M60 10 L65 10 M70 10 L75 10 M80 10 L85 10 M90 10 L95 10 M100 10 L105 10 M110 10 L115 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
                    </svg>
                    <button className="mx-auto w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white/50 backdrop-blur-sm border border-white/40 flex items-center justify-center hover:bg-white/60 transition shadow-lg">
                      <Mic className="w-5 h-5 text-slate-700" strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BgPage;