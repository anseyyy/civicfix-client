import React from 'react';
import PremiumCard from '../components/common/PremiumCard';

function Testimonials() {
  const testimonials = [
    {
      img: '/images/anjali.jpg',
      icon: 'fa-solid fa-thumbs-up',
      color: 'text-success',
      title: 'Empowering Citizens',
      quote: '“Reporting issues is now effortless. CivicFix actually gets things done!”',
      author: '— Anjali R., Kochi',
    },
    {
      img: '/images/muncipleofficer.png',
      icon: 'fa-solid fa-bolt',
      color: 'text-warning',
      title: 'Fast Response',
      quote: '“AI-based prioritization helped us fix urgent issues faster than ever.”',
      author: '— Officer, Kozhikode',
    },
    {
      img: '/images/admin.png',
      icon: 'fa-solid fa-users',
      color: 'text-primary',
      title: 'Community Engagement',
      quote: '“Badges and sharing tools made civic action fun and social.”',
      author: '— CivicFix Admin',
    },
    {
      img: '/images/men.jpg',
      icon: 'fa-solid fa-mobile-screen',
      color: 'text-info',
      title: 'Smart & Intuitive',
      quote: '“Even my grandparents can use it. That’s real accessibility.”',
      author: '— Rahul M., Thrissur',
    }
  ];

  return (
    <div className="py-5" style={{ background: 'var(--secondary-green)' }}>
      <div className="container">
        <h2 className="text-center fw-bold mb-5 text-success">What People Are Saying</h2>
        <div className="row g-4 justify-content-center">
          {testimonials.map((t, i) => (
            <div className="col-md-6 col-lg-3" key={i}>
              <PremiumCard className="h-100 text-center bg-white border-0">
                <div className="mb-3">
                  <img
                    src={t.img}
                    alt={t.author}
                    className="rounded-circle shadow-sm object-fit-cover"
                    width={80}
                    height={80}
                    onError={(e) => e.target.src = 'https://via.placeholder.com/80'}
                  />
                </div>
                <h5 className="fw-bold mb-2 icon-link d-flex align-items-center justify-content-center gap-2">
                  <i className={`${t.icon} ${t.color}`}></i>
                  {t.title}
                </h5>
                <p className="fst-italic text-muted mb-3 small">{t.quote}</p>
                <footer className="fw-bold text-success small">{t.author}</footer>
              </PremiumCard>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
