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
import { Link } from 'react-router-dom';

// Add icons (use any icon library or SVGs, here using Heroicons SVGs for demo)
const HamburgerIcon = () => (
  <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const UpArrowIcon = () => (
  <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
  </svg>
);

const Home: React.FC = () => {
  const [search, setSearch] = useState('');
  const [aiSummaries, setAiSummaries] = useState<{id: number, title: string, summary: string, link: string, image?: string}[]>([]);
  const [loadingNews, setLoadingNews] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showScroll, setShowScroll] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [subscribeError, setSubscribeError] = useState('');

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

  useEffect(() => {
    const handleScroll = () => setShowScroll(window.scrollY > 200);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

  const terminology = [
    {
      id: 1,
      term: "Mixture of Experts",
      image: "https://media.licdn.com/dms/image/v2/D4D12AQGAElCH8gD08g/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1709821617807?e=2147483647&v=beta&t=n9R9d_Z8367uJJvfdiHiYvX4rQ_Hd6bZrkzve4YO3qk",
      description:
        "A Mixture of Experts (MoE) is a neural network architecture that routes inputs to different 'expert' subnetworks, allowing for more efficient and specialized processing. This technique enables large models to scale efficiently by activating only a subset of parameters for each input.",
      source: "https://medium.com/@bijit211987/mixture-of-experts-moe-scaling-ai-horizons-44de79ba2e89"
    },
    {
      id: 2,
      term: "State-of-the-Art Models",
      image: "https://miro.medium.com/v2/resize:fit:720/format:webp/1*A7G739cVw4C9lSzwApxuvw.png",
      description:
        "State-of-the-art (SOTA) models are the most advanced and effective models available for a specific task, often achieving the best performance on benchmark datasets. Examples include GPT-4, PaLM, and Llama 2.",
      source: "https://medium.com/@balajinbtt/decoding-state-of-the-art-sota-models-49352087e871"
    },
    {
      id: 3,
      term: "Vectorization",
      image: "https://cdn.prod.website-files.com/64b3ee21cac9398c75e5d3ac/66e9918c2dfe77807c0a492c_65d4734f284089e516b145fe_arya_vector_databases_important_llms_3.png",
      description:
        "Vectorization is the process of converting data (such as text or images) into numerical vectors so that machine learning models can process them. In NLP, this often involves embedding words or sentences into high-dimensional spaces.",
      source: "https://www.geeksforgeeks.org/vectorization-techniques-in-nlp/"
    },
    {
      id: 4,
      term: "Fine-tuning",
      image: "https://miro.medium.com/v2/resize:fit:720/format:webp/1*M7BlWvqu5UPCNLw8yhV9IQ.png",
      description:
        "Fine-tuning is the process of taking a pre-trained model and training it further on a specific dataset to adapt it for a particular task, improving its performance on domain-specific data.",
      source: "https://rahulrajpvr7d.medium.com/what-is-fine-tuning-language-models-a-simple-explanation-8054685a4218"
    },
    {
      id: 5,
      term: "Prompt Engineering",
      image: "https://miro.medium.com/v2/resize:fit:720/format:webp/1*8w1kLTlaX2UjsFvdcGaVbA.png",
      description:
        "Prompt engineering involves designing and optimizing input prompts to elicit the best possible responses from language models. It's a key technique for leveraging the capabilities of large language models.",
      source: "https://medium.com/@promptengineering/prompt-engineering-101-1c1f5a7e3b2"
    }
  ];

  const scrollToSection = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleSubscribe = async () => {
    setSubscribeError('');
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setSubscribeError('Please enter a valid email address.');
      return;
    }
    try {
      const res = await fetch('https://nodemailer-z81g.onrender.com/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      if (res.ok) {
        setSubscribed(true);
        setEmail('');
      } else {
        const data = await res.json();
        setSubscribeError(data.details || 'Subscription failed. Try again.');
      }
    } catch {
      setSubscribeError('Server error. Try again later.');
    }
  };

  return (
    <div className="min-h-screen w-full bg-black text-gray-100 font-rethink flex flex-col relative">
      {/* Hamburger Menu */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <button
          aria-label="Open menu"
          onClick={() => setMenuOpen(!menuOpen)}
          className="focus:outline-none"
        >
          <HamburgerIcon />
        </button>
        {menuOpen && (
          <div className="absolute mt-2 left-0 bg-gray-900 border border-green-900 rounded-lg shadow-lg w-56 p-4 flex flex-col space-y-4 z-50">
            <button onClick={() => scrollToSection('featured-models')} className="text-green-400 text-lg text-left">Featured Models</button>
            <button onClick={() => scrollToSection('categories')} className="text-green-400 text-lg text-left">Categories</button>
            <button onClick={() => scrollToSection('ai-inventions')} className="text-green-400 text-lg text-left">Latest AI Inventions</button>
            <button onClick={() => scrollToSection('compare-models')} className="text-green-400 text-lg text-left">Compare Models</button>
            <button onClick={() => scrollToSection('terminology')} className="text-green-400 text-lg text-left">AI Terminology</button>
          </div>
        )}
      </div>

      {/* Scroll Up Button */}
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 bg-gray-900 border border-green-700 rounded-full p-2 shadow-lg hover:bg-green-800 transition"
          aria-label="Scroll to top"
        >
          <UpArrowIcon />
        </button>
      )}

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
        

        <div id="featured-models" className="mb-12 w-full px-4">
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

        <div id="categories" className="mb-12 w-full px-4 font-rethink">
          <h1 className="text-xl font-medium mb-6 border-b border-green-900 pb-2 text-green-500 font-rethink">Search Models by categories</h1>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 font-rethink">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>

        {/* Latest AI Inventions Section */}
        <div id="ai-inventions" className="mb-12 w-full px-4 font-rethink">
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

        <div id="terminology" className="mb-12 w-full px-4 font-rethink">
          <div className="flex items-center justify-between mb-6 border-b border-green-900 pb-2">
            <h2 className="text-xl font-semibold text-green-500 font-rethink">
              AI Terminology Explained
            </h2>
            <Link
              to="/terminology"
              className="px-6 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition font-semibold"
            >
              Explore More
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {terminology.slice(0, 4).map(term => (
              <div
                key={term.id}
                className="bg-gray-900/80 rounded-xl p-6 shadow border border-green-900 flex flex-col hover:shadow-lg transition"
              >
                <img
                  src={term.image}
                  alt={term.term}
                  className="w-full h-56 object-cover rounded mb-4"
                  style={{ background: "#222" }}
                />
                <h3 className="text-lg font-bold text-green-400 mb-2">{term.term}</h3>
                <p className="text-gray-200 mb-4">{term.description}</p>
                <a
                  href={term.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto text-green-400 underline hover:text-green-300 font-medium"
                >
                  Learn more
                </a>
              </div>
            ))}
          </div>
        </div>

        <div id="compare-models" className="mb-16">
          <CompareModels />
        </div>
        
        <div className="mb-12 w-full px-4">
          {/* Empty div for spacing */}
        </div>
        {/* Funky Subscribe Section */}
        <div className="w-full flex flex-col items-center">
          <div className="relative flex flex-col items-center mb-8">
            <span className="text-3xl md:text-4xl font-extrabold text-green-400 font-handwritten mb-2 tracking-tight drop-shadow-lg">
              Subscribe for LLM Updates!
            </span>
          </div>
          <div className="w-full bg-gray-900/80 rounded-2xl shadow-lg border border-green-900 p-8 flex flex-col items-center">
            {subscribed ? (
              <div className="text-green-400 font-bold text-lg mt-2 text-center">
                Thank you for subscribing!
              </div>
            ) : (
              <>
                <div className="w-full max-w-xl flex flex-col items-center md:flex-row md:justify-center gap-4">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="mb-3 md:mb-0 px-4 py-2 rounded-lg border-2 border-green-500 bg-gray-800 text-white w-full focus:ring-2 focus:ring-green-400 transition text-lg"
                  />
                  <button
                    className="relative group px-8 py-3 bg-gradient-to-r from-green-600 via-green-500 to-green-400 text-white rounded-xl font-extrabold text-lg shadow-lg hover:from-green-500 hover:to-green-700 transition-all duration-200 w-full md:w-auto flex items-center justify-center overflow-hidden"
                    onClick={handleSubscribe}
                  >
                    <span className="mr-2">🚀</span>
                    Subscribe
                    <span className="ml-2 group-hover:translate-x-1 transition-transform duration-200">→</span>
                    <span className="absolute left-0 top-0 w-full h-full rounded-xl border-2 border-green-300 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"></span>
                  </button>
                </div>
                {subscribeError && (
                  <div className="text-red-400 mt-2 text-sm text-center">{subscribeError}</div>
                )}
              </>
            )}
            <div className="mt-4 text-green-300 text-sm text-center opacity-80">
              Get the latest LLM news, models, and features delivered to your inbox every week.
            </div>
          </div>
        </div>
        {/* Thank you message */}
        {/* <div className="w-full flex justify-center mb-8">
          <span className="text-xl md:text-2xl font-bold text-green-300 font-handwritten text-center">
            {"Thank you for visiting the website! 🚀"}
          </span>
        </div> */}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
