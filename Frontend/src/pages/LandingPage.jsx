import LandingNavbar from '../components/LandingNavbar';
import LandingFooter from '../components/LandingFooter';

function LandingPage() {
  const features = [
    {
      title: 'Competitive Tournaments',
      description: 'Join daily tournaments and compete for amazing prizes'
    },
    {
      title: 'Global Community',
      description: 'Connect with millions of players worldwide'
    },
    {
      title: 'Secure Gaming',
      description: 'Safe and secure platform for all your gaming needs'
    }
  ];

  const games = [
    {
      title: 'Fantasy Quest',
      category: 'RPG Adventure',
      image: 'https://cdn.builder.io/api/v1/image/assets/a1a2b128ed76445fbc89bb2309e3a04b/7a988fe01477da8a953337d32f07924c8839caab3b8ebb5274a347a1454bd708?apiKey=a1a2b128ed76445fbc89bb2309e3a04b&'
    },
    {
      title: 'Speed Masters',
      category: 'Racing',
      image: 'https://cdn.builder.io/api/v1/image/assets/a1a2b128ed76445fbc89bb2309e3a04b/f008fed0d7e866ca045328de760c76f522113f59e6a4a2de1e5b7c599e51a6c3?apiKey=a1a2b128ed76445fbc89bb2309e3a04b&'
    },
    {
      title: 'Tactical Force',
      category: 'Action',
      image: 'https://cdn.builder.io/api/v1/image/assets/a1a2b128ed76445fbc89bb2309e3a04b/1cccaba6ae3fd0fd151d0dd6fab14c82602a5844023e1a5a6a7a3dfd571c750f?apiKey=a1a2b128ed76445fbc89bb2309e3a04b&'
    },
    {
      title: 'Mind Maze',
      category: 'Puzzle',
      image: 'https://cdn.builder.io/api/v1/image/assets/a1a2b128ed76445fbc89bb2309e3a04b/791271705599c91ee8c0999df8bebeacf954875493af25e5693290ada153a536?apiKey=a1a2b128ed76445fbc89bb2309e3a04b&'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <LandingNavbar />

      <main className="flex-grow">
        <section className="relative px-20 py-32 max-md:px-5">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/a1a2b128ed76445fbc89bb2309e3a04b/b514ab657358fc78ed39c431de981593f5ca302de869b8d69899d3721e5726f8?apiKey=a1a2b128ed76445fbc89bb2309e3a04b&"
            alt="Gaming Experience"
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
          <div className="relative container mx-auto flex flex-wrap items-center">
            <div className="w-1/2 pr-12 max-md:w-full max-md:pr-0">
              <h1 className="text-5xl font-extrabold text-white leading-tight">
                Enter the Ultimate <span className="text-purple-400">Gaming</span> Experience
              </h1>
              <p className="mt-6 text-xl text-gray-200">
                Join millions of players worldwide in the most immersive gaming platform. Play, compete, and win!
              </p>
              <div className="flex gap-4 mt-8">
                <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full hover:scale-105 transition-transform duration-200" onClick={() => window.location.href = '/login'}>
                  Play Now
                </button>
                <button className="px-8 py-4 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-full hover:scale-105 transition-transform duration-200" onClick={() => window.location.href = '/download'}>
                  Download Mobile App
                </button>
              </div>
            </div>
            <div className="w-1/2 max-md:w-full max-md:mt-12">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/a1a2b128ed76445fbc89bb2309e3a04b/b514ab657358fc78ed39c431de981593f5ca302de869b8d69899d3721e5726f8?apiKey=a1a2b128ed76445fbc89bb2309e3a04b&"
                alt="Gaming Experience"
                className="w-full rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </section>

        <section className="px-20 py-24 bg-gradient-to-b from-gray-900 to-[#1a1b26] max-md:px-5">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-white">Why Choose GameZone?</h2>
            <p className="mt-4 text-gray-300">Experience gaming like never before</p>
          </div>
          <div className="grid grid-cols-3 gap-8 max-md:grid-cols-1">
            {features.map((feature, index) => (
              <div key={index} className="p-8 bg-gray-800 rounded-xl hover:scale-105 transition-transform duration-200 shadow-lg">
                <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                <p className="mt-4 text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="px-20 py-24 max-md:px-5">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-white">Popular Games</h2>
            <p className="mt-4 text-gray-300">Choose from our wide selection of games</p>
          </div>
          <div className="grid grid-cols-4 gap-8 max-md:grid-cols-1">
            {games.map((game, index) => (
              <div key={index} className="relative overflow-hidden rounded-xl group hover:scale-105 transition-transform duration-200 shadow-lg">
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full aspect-[1.148] object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
                  <h3 className="text-xl font-bold text-white">{game.title}</h3>
                  <p className="mt-2 text-gray-300">{game.category}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="px-20 py-24 text-center max-md:px-5">
          <h2 className="text-4xl font-extrabold text-white">Ready to Start Your Gaming Journey?</h2>
          <p className="mt-6 text-xl text-gray-300">
            Join GameZone today and experience gaming at its finest
          </p>
          <div className="flex justify-center gap-4 mt-8">
            <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full hover:scale-105 transition-transform duration-200" onClick={() => window.location.href = '/register'}>
              Create Account
            </button>
            <button className="px-8 py-4 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-full hover:scale-105 transition-transform duration-200" onClick={() => window.location.href = '/download'}>
              Download Mobile App
            </button>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}

export default LandingPage;