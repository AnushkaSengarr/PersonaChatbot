import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ChatPage from './pages/ChatPage';

const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-transparent">
      {/* Responsive Navigation */}
      <nav className='bg-white/80 backdrop-blur-xl text-[#24150f] flex justify-center items-center px-3 sm:px-4 lg:px-6 py-4 sm:py-5 border-b border-[#e9c7ac] shadow-[0_8px_30px_rgba(120,55,20,0.06)] shrink-0'>
        <h1 className='display-font text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-center leading-tight tracking-[-0.03em]'>
          <span className="block sm:hidden">Chat With Personalities</span>
          <span className="hidden sm:block md:hidden">Chat With Famous People</span>
          <span className="hidden md:block">Chat With <span className="text-[#d9571b]">Famous Personalities</span></span>
        </h1>
      </nav>
      
      {/* Main Content Area */}
      <div className='flex-1 flex flex-col overflow-hidden'>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/chat/:id" element={<ChatPage/>} />
        </Routes>
      </div>
    </div>
  )
};

export default App;