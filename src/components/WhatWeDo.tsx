import { useState } from 'react';
import { GenieWrapper } from './GenieWrapper';

interface ServiceCardProps {
  id: number;
  iconSrc: string;
  line1: string;
  line2: string;
  title: string;
  pageKey: string;
  isActive: boolean;
  onMouseEnter: () => void;
  onClick: () => void;
}

const ServiceCard = ({
  iconSrc,
  line1,
  line2,
  title,
  isActive,
  onMouseEnter,
  onClick,
}: ServiceCardProps) => {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      className={`rounded-[10px] p-7 flex flex-col items-center justify-between text-center min-h-[260px] transition-all duration-300 cursor-pointer ${
        isActive
          ? 'bg-[#184441] text-white shadow-xl scale-[1.02]'
          : 'bg-[#f8faf9] text-[#0d3b2e] hover:bg-[#184441] hover:text-white group'
      }`}
    >
      <div className="flex-1 flex flex-col items-center justify-center space-y-5">
        <div className="p-2 transition-colors flex items-center justify-center">
          <img
            src={iconSrc}
            alt={title}
            className={`w-11 h-11 object-contain transition-all ${
              isActive ? 'brightness-0 invert' : 'group-hover:brightness-0 group-hover:invert'
            }`}
          />
        </div>
        <h3
          className={`text-base sm:text-lg font-semibold leading-snug px-1 font-montserrat ${
            isActive ? 'text-white' : 'text-[#0d3b2e] group-hover:text-[#ffc82e]'
          }`}
        >
          <span className="block">{line1}</span>
          <span className="block mt-0.5">{line2}</span>
        </h3>
      </div>

      {/* Learn more arrow link */}
      <div
        className={`pt-3 flex items-center justify-center gap-1.5 text-xs font-semibold transition-opacity duration-200 ${
          isActive ? 'opacity-100 text-white' : 'opacity-0 group-hover:opacity-100 text-[#ffc82e]'
        }`}
      >
        <span>Learn more</span>
        <span className="text-sm">→</span>
      </div>
    </div>
  );
};

interface WhatWeDoProps {
  onNavigate?: (page: string) => void;
}

export const WhatWeDo = ({ onNavigate }: WhatWeDoProps) => {
  const [activeCard, setActiveCard] = useState<number>(3);

  const services = [
    {
      id: 1,
      title: 'End-to-End Electronic Manufacturing',
      line1: 'End-to-End Electronic',
      line2: 'Manufacturing',
      iconSrc: '/icon-1.svg',
      pageKey: 'service-end-to-end',
    },
    {
      id: 2,
      title: 'SMT & THT PCB Assembly',
      line1: 'SMT & THT PCB',
      line2: 'Assembly',
      iconSrc: '/icon-2_1.svg',
      pageKey: 'service-smt',
    },
    {
      id: 3,
      title: 'Testing & Inspection (AOI, X-Ray)',
      line1: 'Testing & Inspection',
      line2: '(AOI, X-Ray)',
      iconSrc: '/icon-3_1.svg',
      pageKey: 'service-testing',
    },
    {
      id: 4,
      title: 'Turnkey Project Delivery',
      line1: 'Turnkey Project',
      line2: 'Delivery',
      iconSrc: '/icon-4.svg',
      pageKey: 'service-turnkey',
    },
  ];

  return (
    <section id="services" className="py-20 lg:py-28 bg-white bg-grid-lines">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Vanishing Genie Effect */}
        <GenieWrapper direction="up" className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0d3b2e] tracking-tight font-montserrat">
            What We Do
          </h2>
          <p className="text-gray-600 text-base sm:text-lg font-normal">
            Reliable electronic manufacturing services tailored to your product needs
          </p>
        </GenieWrapper>

        {/* 4 Cards Grid - Framer Motion Vanishing Genie Effect */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <GenieWrapper key={service.id} delay={index * 0.12} direction="up">
              <ServiceCard
                id={service.id}
                title={service.title}
                line1={service.line1}
                line2={service.line2}
                iconSrc={service.iconSrc}
                pageKey={service.pageKey}
                isActive={activeCard === service.id}
                onMouseEnter={() => setActiveCard(service.id)}
                onClick={() => onNavigate?.(service.pageKey)}
              />
            </GenieWrapper>
          ))}
        </div>
      </div>
    </section>
  );
};
