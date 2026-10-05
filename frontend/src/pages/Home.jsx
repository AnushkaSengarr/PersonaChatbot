import { personas as personaData } from '../constants/constants';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen py-8 sm:py-14 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <div className="w-full max-w-7xl">
                <div className="mb-8 sm:mb-12 max-w-2xl">
                    <p className="text-xs sm:text-sm uppercase tracking-[0.24em] font-bold text-[#d9571b] mb-3">The conversation starts here</p>
                    <h2 className="display-font text-3xl sm:text-5xl font-bold tracking-[-0.05em] text-[#24150f] leading-[0.98]">Choose a voice worth hearing.</h2>
                    <p className="mt-4 text-[#765d50] text-sm sm:text-base max-w-xl">Step into a conversation shaped by a distinct mind, story, and point of view.</p>
                </div>
                {/* Grid layout with responsive columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 justify-items-center">
                    {personaData.map((persona) => (
                        <button
                            key={persona.id}
                            onClick={() => { navigate(`/chat/${persona.id}`) }}
                            className="w-full max-w-sm text-left rounded-[1.25rem]"
                        >
                            <div
                                className="group relative bg-white rounded-[1.25rem] overflow-hidden border border-[#ead6c8] hover:border-[#d9571b] transition-all duration-500 transform hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(126,62,25,0.16)] w-full"
                            >
                                {/* Image Container - Responsive height */}
                                <div className="relative overflow-hidden bg-[#f2dfd2] h-36 sm:h-48 flex items-center justify-center">
                                    <img
                                        src={persona.image}
                                        alt={persona.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    {/* Dark overlay */}
                                    <div className="absolute inset-0 bg-[#5c240f]/10"></div>
                                    {/* Gradient Overlay on hover */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#5c240f]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>

                                {/* Content Container - Responsive padding */}
                                <div className="p-4 sm:p-6 bg-white">
                                    {/* Name - Responsive text size */}
                                    <h3 className="display-font text-lg sm:text-xl lg:text-2xl font-bold text-[#24150f] mb-2 sm:mb-3 group-hover:text-[#d9571b] transition-colors duration-300 leading-tight">
                                        {persona.name}
                                    </h3>
                                    
                                    {/* Description - Responsive text and spacing */}
                                    <p className="text-sm sm:text-base text-[#765d50] group-hover:text-[#51372b] leading-relaxed mb-3 sm:mb-4 transition-colors duration-300 line-clamp-3">
                                        {persona.description}
                                    </p>
                                    
                                    {/* Bottom Section - Responsive spacing */}
                                    <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-[#f0dfd3] group-hover:border-[#edb898] transition-colors duration-300">
                                        <span className="text-xs sm:text-sm text-[#a38472] group-hover:text-[#d9571b] transition-colors duration-300">
                                            Persona #{persona.id}
                                        </span>
                                        
                                        {/* Arrow Icon - Responsive size */}
                                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#fff0e5] group-hover:bg-[#d9571b] flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                                            <svg 
                                                className="w-4 h-4 sm:w-5 sm:h-5 text-[#d9571b] group-hover:text-white transition-colors duration-300 transform group-hover:translate-x-1" 
                                                fill="none" 
                                                stroke="currentColor" 
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;