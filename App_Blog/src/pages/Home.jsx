import {Link} from 'react-router-dom'
import CallToAction from '../components/CallToAction.jsx'
import { useEffect, useState } from 'react'
import PostCard from '../components/PostCard.jsx'

const Home = () => {
  const [posts, setPosts] = useState([])
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getposts?limit=9')
      const data = await res.json();
      if(res.ok){
        setPosts(data.posts)
        console.log(data.lastMonthPosts)
      }
    }
    fetchPosts();
  }, [])

  const features = [
    {
      title: "🚀 Modern Development",
      description: "Cutting-edge tutorials on React, Node.js, and the latest web technologies"
    },
    {
      title: "💡 Best Practices",
      description: "Industry-standard coding practices and design patterns explained simply"
    },
    {
      title: "🎯 Real-World Projects",
      description: "Build actual applications with step-by-step guidance and code examples"
    },
    {
      title: "🔥 Weekly Updates",
      description: "Fresh content every week covering trending topics and new frameworks"
    }
  ]

  const stats = [
    { number: "500+", label: "Articles" },
    { number: "50K+", label: "Readers" },
    { number: "100+", label: "Tutorials" },
    { number: "24/7", label: "Available" }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className={`relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="flex flex-col gap-8 p-12 px-4 sm:px-8 max-w-7xl mx-auto py-20 sm:py-32 relative z-10">
          <div className={`transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full text-white text-sm font-semibold shadow-lg">
              ✨ Your Dev Journey Starts Here
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 dark:from-white dark:via-blue-200 dark:to-indigo-200 bg-clip-text text-transparent leading-tight">
              Welcome To My Blog
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mt-6 max-w-3xl font-medium">
              Your ultimate destination for mastering web development
            </p>
          </div>
          
          <div className={`transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">
              Dive deep into comprehensive articles, hands-on tutorials, and expert insights on 
              <span className="font-semibold text-blue-600 dark:text-blue-400"> web development</span>, 
              <span className="font-semibold text-indigo-600 dark:text-indigo-400"> software engineering</span>, and 
              <span className="font-semibold text-teal-600 dark:text-teal-400"> programming languages</span>. 
              Whether you're a beginner taking your first steps or an experienced developer leveling up your skills, 
              you'll find content tailored to your journey.
            </p>
          </div>

          <div className={`flex flex-wrap gap-4 transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <Link 
              to='/search' 
              className='group px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-500 text-white font-bold rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 text-sm sm:text-base'
            >
              Explore All Posts →
            </Link>
            <a 
              href='#recent' 
              className='px-8 py-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-white font-bold rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-gray-200 dark:border-gray-700 text-sm sm:text-base'
            >
              Latest Articles
            </a>
          </div>
        </div>

        {/* Animated background elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-blue-300 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-indigo-300 dark:bg-indigo-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-teal-300 dark:bg-teal-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Stats Section */}
      <div className="py-16 px-4 bg-white dark:bg-gray-900 border-y border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="text-center transform hover:scale-110 transition-transform duration-300"
            >
              <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent">
                {stat.number}
              </div>
              <div className="text-gray-600 dark:text-gray-400 mt-2 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-20 px-4 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
            Why Choose This Blog?
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            Everything you need to accelerate your development career in one place
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-teal-500 dark:hover:border-teal-500 hover:-translate-y-2"
              >
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-teal-500 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="p-6 sm:p-8 bg-gradient-to-r from-yellow-100 via-yellow-200 to-orange-200 dark:from-slate-800 dark:via-slate-700 dark:to-slate-600">
        <CallToAction/>
      </div>

      {/* Recent Posts Section */}
      <div id="recent" className='max-w-7xl mx-auto p-4 sm:p-8 py-16 sm:py-20'>
        {posts && posts.length > 0 && (
          <div className='flex flex-col gap-10'>
            <div className="text-center">
              <h2 className='text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-white'>
                🔥 Latest Posts
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Fresh insights, tutorials, and articles published recently. Stay updated with the latest in web development.
              </p>
            </div>
            <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'>
              {posts.map((post, index) => (
                <div 
                  key={post._id}
                  className={`transform transition-all duration-500 hover:scale-105`}
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                  }}
                >
                  <PostCard post={post}/>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {posts && posts.length > 0 && (
          <div className="text-center mt-16">
            <Link 
              to={'/search'} 
              className='inline-flex items-center gap-2 text-lg font-bold text-teal-500 hover:text-teal-600 dark:hover:text-teal-400 group transition-all'
            >
              View All Posts 
              <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
            </Link>
          </div>
        )}
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, #80808012 1px, transparent 1px),
            linear-gradient(to bottom, #80808012 1px, transparent 1px);
          background-size: 24px 24px;
        }
      `}</style>
    </div>
  )
}

export default Home