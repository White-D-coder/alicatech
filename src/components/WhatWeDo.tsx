import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ServiceCardProps {
  id: number;
  iconSrc: string;
  line1: string;
  line2: string;
  title: string;
  pageKey: string;
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}

const ServiceCard = ({
  iconSrc,
  line1,
  line2,
  title,
  isActive,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: ServiceCardProps) => {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className={`rounded-[10px] p-4 sm:p-7 flex flex-col items-center justify-between text-center min-h-[200px] sm:min-h-[260px] transition-all duration-300 cursor-pointer ${
        isActive
          ? 'bg-[#184441] text-white shadow-xl scale-[1.02]'
          : 'bg-[#f8faf9] text-[#0d3b2e] hover:bg-[#184441] hover:text-white group'
      }`}
    >
      <div className="flex-1 flex flex-col items-center justify-center space-y-3 sm:space-y-5">
        <div className="p-1 sm:p-2 transition-colors flex items-center justify-center">
          <img
            src={iconSrc}
            alt={title}
            className={`w-9 h-9 sm:w-11 sm:h-11 object-contain transition-all ${
              isActive ? 'brightness-0 invert' : 'group-hover:brightness-0 group-hover:invert'
            }`}
          />
        </div>
        <h3
          className={`text-xs sm:text-lg font-semibold leading-snug px-0.5 font-montserrat ${
            isActive ? 'text-white' : 'text-[#0d3b2e] group-hover:text-[#ffc82e]'
          }`}
        >
          <span className="block">{line1}</span>
          <span className="block mt-0.5">{line2}</span>
        </h3>
      </div>

      {/* Learn more arrow link */}
      <div
        className={`pt-2 sm:pt-3 flex items-center justify-center gap-1.5 text-[11px] sm:text-xs font-semibold transition-opacity duration-200 ${
          isActive ? 'opacity-100 text-white' : 'opacity-0 group-hover:opacity-100 text-[#ffc82e]'
        }`}
      >
        <span>Learn more</span>
        <span className="text-xs sm:text-sm">→</span>
      </div>
    </div>
  );
};

export const WhatWeDo = () => {
  const navigate = useNavigate();
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const services = [
    {
      id: 1,
      title: 'End-to-End Electronic Manufacturing',
      line1: 'End-to-End Electronic',
      line2: 'Manufacturing',
      iconSrc: '/icon-1.svg',
      pageKey: 'end-to-end-electronic-manufacturing',
    },
    {
      id: 2,
      title: 'SMT & THT PCB Assembly',
      line1: 'SMT & THT PCB',
      line2: 'Assembly',
      iconSrc: '/icon-2_1.svg',
      pageKey: 'smt-tht-pcb-assembly',
    },
    {
      id: 3,
      title: 'Testing & Inspection (AOI, X-Ray)',
      line1: 'Testing & Inspection',
      line2: '(AOI, X-Ray)',
      iconSrc: '/icon-3_1.svg',
      pageKey: 'testing-inspection',
    },
    {
      id: 4,
      title: 'Turnkey Project Delivery',
      line1: 'Turnkey Project',
      line2: 'Delivery',
      iconSrc: '/icon-4.svg',
      pageKey: 'turnkey-project-delivery',
    },
  ];

  return (
    <section id="services" className="pt-16 pb-0 lg:pt-20 lg:pb-0 bg-white bg-grid-lines">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto mb-8 sm:mb-12 space-y-4 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0d3b2e] tracking-tight font-montserrat">
            What We Do
          </h2>
          <p className="text-gray-600 text-base sm:text-lg font-normal">
            Reliable electronic manufacturing services tailored to your product needs
          </p>
        </div>

        {/* 4 Cards Grid - 2x2 on phone view matching img2 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              id={service.id}
              title={service.title}
              line1={service.line1}
              line2={service.line2}
              iconSrc={service.iconSrc}
              pageKey={service.pageKey}
              isActive={activeCard === service.id}
              onMouseEnter={() => setActiveCard(service.id)}
              onMouseLeave={() => setActiveCard(null)}
              onClick={() => navigate(`/${service.pageKey}`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
