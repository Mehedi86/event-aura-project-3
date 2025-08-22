'use client'

import React from 'react'
import NewsCard from '../shared/NewsCard';

const newsEvents = [
  {
    id: 1,
    eventName: "Tech Conference 2025",
    newsBody: "The Tech Conference 2025, held in Dhaka, brought together innovators, entrepreneurs, and developers from across the world. The event highlighted the rapid growth of artificial intelligence, machine learning, and cloud computing, showcasing how these technologies are reshaping industries. Keynote speakers emphasized the importance of collaboration, sustainable innovation, and responsible AI practices. Many startups demonstrated groundbreaking products, ranging from AI-powered healthcare diagnostics to blockchain-based financial systems. Attendees participated in workshops on cybersecurity, full-stack development, and data science, which provided practical skills and networking opportunities. A major highlight was the launch of a government-supported digital initiative designed to empower young developers and support tech-based startups in Bangladesh. Experts also discussed the ethical challenges of AI and the need for strong data privacy regulations. The conference attracted investors who expressed interest in funding local projects that could scale globally. With over 10,000 participants, it was one of the largest tech gatherings in South Asia. The overall atmosphere was filled with energy, optimism, and determination to push the boundaries of technology. Organizers believe that this conference marks a turning point in the region’s journey toward becoming a global tech hub.",
     thumbnail: '/img/recent/recent1.jpg',
     date: "Saturday, February 15, 2025",
     author: "Faisal Khan"
  },
  {
    id: 2,
    eventName: "International Sports Festival",
    newsBody: "The International Sports Festival 2025 concluded with a spectacular closing ceremony in Singapore. Athletes from more than 60 countries competed in various sports, including football, basketball, athletics, swimming, and traditional cultural games. The festival aimed to promote friendship and unity through sports, and it successfully created memorable experiences for both players and spectators. Several records were broken in track and field events, with rising stars gaining global recognition. The football final was one of the most exciting matches, attracting millions of viewers worldwide. Beyond the competition, the event also focused on promoting mental health, fair play, and inclusivity in sports. A special initiative encouraged the participation of athletes with disabilities, highlighting the importance of equal opportunities. Cultural exchange programs allowed visitors to experience diverse traditions, cuisines, and performances from around the world. Organizers also prioritized sustainability, ensuring eco-friendly stadiums, waste management, and green energy usage. Sponsors and sports brands showcased new products, while fans enjoyed interactive fan zones and virtual reality experiences. The event not only celebrated athletic excellence but also demonstrated how sports can bridge cultural and social gaps. It left a lasting impact on global sportsmanship.",
    thumbnail: '/img/recent/recent2.jpeg',
    date: "Monday, March 10, 2025",
    author: "Haris Khan"
  },
  {
    id: 3,
    eventName: "Global Climate Summit",
    newsBody: "The Global Climate Summit 2025, held in Geneva, gathered world leaders, scientists, and activists to address the urgent climate crisis. Discussions revolved around reducing carbon emissions, renewable energy adoption, and sustainable development. Governments pledged new commitments to achieve net-zero emissions by 2050, while private companies announced multi-billion-dollar investments in clean energy projects. Scientists presented alarming data on rising sea levels, extreme weather patterns, and biodiversity loss, emphasizing the need for immediate action. Activists voiced concerns about environmental justice, urging wealthier nations to support vulnerable communities disproportionately affected by climate change. One of the major outcomes was the signing of a global agreement on plastic reduction, which mandates stricter recycling practices and bans on single-use plastics in several regions. Educational campaigns were also launched to raise awareness among younger generations. The summit highlighted innovative solutions such as carbon capture technologies, solar-powered urban infrastructure, and smart farming methods. Nonprofit organizations called for stronger accountability to ensure promises translate into measurable progress. The event ended with a symbolic tree-planting ceremony involving representatives from all continents, symbolizing unity in the fight against climate change. Experts believe this summit has set a new benchmark for international cooperation toward a greener future.",
    thumbnail: '/img/recent/recent3.jfif',
    date: "Saturday, April 5, 2025",
    author: "Jabed Khan"
  }
];


const RecentNews = () => {
    console.log('hello')
  return (
    <div className="w-11/12 lg:w-4/5 mx-auto my-40">
          {/* Section Heading */}
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span className="w-1 h-5 bg-orange-500 inline-block"></span>
            RECENT NEWS
          </h2>
    
          {/* Video Cards Grid */}
          <div className="">
            {newsEvents.map(news=> <NewsCard
            key={news.id}
            news={news}
            />)}
          </div>
        </div>
  )
}

export default RecentNews
