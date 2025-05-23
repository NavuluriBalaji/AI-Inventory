import React, { useState, useEffect } from 'react';
// import { Brain } from 'lucide-react';
import CategoryCard from '../components/CategoryCard';
import ModelCard from '../components/ModelCard';
import Footer from '../components/footer';
import AnimatedBackground from '../components/AnimatedBackground';
import { categories, models } from '../data/models';
import CompareModels from '../components/CompareModels';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home: React.FC = () => {
  const [search, setSearch] = useState('');
  const [aiSummaries, setAiSummaries] = useState<{id: number, title: string, summary: string, link: string, image?: string}[]>([]);
  const [loadingNews, setLoadingNews] = useState(false);

  const filteredModels = models.filter(model =>
    model.name.toLowerCase().includes(search.toLowerCase()) ||
    model.features.some(feature =>
      feature.toLowerCase().includes(search.toLowerCase())
    )
  );

  useEffect(() => {
    setLoadingNews(true);
    fetch('https://fetchnews-ejz5.onrender.com/api/ai-news-rss')
      .then(res => res.json())
      .then(data => setAiSummaries(data))
      .catch(() => setAiSummaries([]))
      .finally(() => setLoadingNews(false));
  }, []);

  // Helper to split news into two rows
  const splitNewsRows = (news: typeof aiSummaries) => {
    const half = Math.ceil(news.length / 2);
    return [news.slice(0, half), news.slice(half)];
  };

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: aiSummaries.length > 5,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    adaptiveHeight: true,
    autoplay: true, // enable auto sliding
    autoplaySpeed: 5000, // slide every 5 seconds (5000 ms)
  };

  return (
    <div className="min-h-screen w-full bg-black text-gray-100 font-rethink flex flex-col">
      <AnimatedBackground />
      <div className="flex-1 flex flex-col justify-center items-center py-12">
        <div className="text-center mb-12 w-full">
          <div className="flex justify-center mb-6">
            {/* <Brain className="w-40 h-40 text-green-500" /> */}
          </div>
          <h1 className="text-8xl font-semibold mb-1 pt-20 text-green-1000 font-rethink">
            LLM Models Explorer
          </h1>
          <p className="text-gray-400 pt-4 font-rethink">
            Discover and explore the world's most advanced language models
          </p>
        </div>

        {/* Search Bar */}
        <div className="w-full flex justify-center mb-8 px-4">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search models..."
            className="w-full max-w-md px-4 py-2 rounded-lg bg-gray-800 text-gray-100 border border-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          />
        </div>
        

        <div className="mb-12 w-full px-4">
          <h2 className="text-xl font-semibold mb-6 border-b border-green-900 pb-2 text-green-500 font-rethink">Featured Models</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 font-semibold font-rethink">
            {filteredModels.length > 0 ? (
              filteredModels.map((model) => (
                <ModelCard key={model.id} model={model} />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-400 py-8">
                <div className="text-2xl font-bold text-green-400 mb-2">Oops! We can't find your search.</div>
                <div className="mb-2">You can drop us what you are looking for and we'll update it soon.</div>
                <a
                  href="balajinbtt@gmail.com"
                  className="inline-block mt-2 px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition"
                >
                  Contact Us
                </a>
              </div>
            )}
          </div>
        </div>

        <div className="mb-12 w-full px-4 font-rethink">
          <h1 className="text-xl font-medium mb-6 border-b border-green-900 pb-2 text-green-500 font-rethink">Search Models by categories</h1>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 font-rethink">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>

        {/* Latest AI Inventions Section */}
        <div className="mb-12 w-full px-4 font-rethink">
          <h2 className="text-xl font-semibold mb-6 border-b border-green-900 pb-2 text-green-500 font-rethink">
            Latest AI Inventions
          </h2>
          {loadingNews ? (
            <div className="text-white-400">Loading latest AI news...</div>
          ) : aiSummaries.length > 0 ? (
            <Slider {...sliderSettings}>
              {splitNewsRows(aiSummaries).map((row, idx) => (
                <div key={idx}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
                    {row.map(summary => (
                      <div
                        key={summary.id}
                        className="bg-gray-900/80 rounded-xl p-4 shadow border border-green-900 flex flex-col justify-between hover:shadow-lg transition"
                      >
                        {summary.image && (
                          <img
                            src={summary.image}
                            alt={summary.title}
                            className="w-full h-32 object-cover rounded mb-3"
                            style={{ background: "#222" }}
                          />
                        )}
                        <div>
                          <h3 className="text-lg font-bold text-green-400 mb-2 line-clamp-2">{summary.title}</h3>
                          <p className="text-gray-200 mb-4 line-clamp-4">{summary.summary}</p>
                        </div>
                        <a
                          href={summary.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-auto text-green-400 underline hover:text-green-300 font-medium"
                        >
                          Read more
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </Slider>
          ) : (
            <div className="text-gray-400">No news found.</div>
          )}
        </div>

        <div className="mb-16">
          <CompareModels />
        </div>
        
        <div className="mb-12 w-full px-4">
          {/* ...existing code... */}
        </div>
        {/* ...existing code... */}
      </div>
      <Footer />
    </div>
  );
};

export default Home;