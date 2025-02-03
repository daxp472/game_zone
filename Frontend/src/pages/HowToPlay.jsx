import React from 'react';
import LandingNavbar from '../components/LandingNavbar';
import LandingFooter from '../components/LandingFooter';

function HowToPlay() {
  return (
    <div>
      <LandingNavbar />

    <div className="flex flex-col w-full bg-black bg-opacity-0 max-md:max-w-full">
      <div className="flex relative flex-col px-20 w-full min-h-[600px] max-md:px-5 max-md:max-w-full">
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/a1a2b128ed76445fbc89bb2309e3a04b/9add4428ce0617d877d024c4d295e7ec12761d036880a99e7e5b5787d632596c?apiKey=a1a2b128ed76445fbc89bb2309e3a04b&" className="object-cover absolute inset-0 size-full" alt="Game background" />
        <div className="flex relative flex-col justify-center items-start px-4 py-56 bg-black bg-opacity-0 max-md:py-24 max-md:pr-5 max-md:max-w-full">
          <div className="flex flex-col pr-7 pb-11 -mb-11 max-w-full bg-black bg-opacity-0 w-[672px] max-md:pr-5 max-md:mb-2.5">
            <div className="z-10 self-start -mt-1.5 text-5xl font-bold leading-none text-white max-md:text-4xl">
              Master the Game
            </div>
            <div className="mt-12 text-xl leading-5 text-gray-300 max-md:mt-10 max-md:max-w-full">
              Learn the rules, strategies, and mechanics to become a pro player in our gaming community.
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center p-20 w-full bg-black bg-opacity-0 max-md:px-5 max-md:max-w-full">
        <div className="flex flex-col px-4 w-full bg-black bg-opacity-0 max-md:max-w-full">
          <div className="bg-black bg-opacity-0 max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col">
              <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
                <div className="flex flex-col grow p-8 w-full bg-gray-800 rounded-xl max-md:px-5 max-md:mt-8">
                  <div className="flex flex-col items-start w-full bg-black bg-opacity-0 max-md:pr-5">
                    <div className="flex overflow-hidden justify-center items-center min-h-[36px]">
                      <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/a1a2b128ed76445fbc89bb2309e3a04b/c598464253451dcea255213e1849af23c7cbcb971ceb6afd46ad477aba443bd4?apiKey=a1a2b128ed76445fbc89bb2309e3a04b&" className="object-contain self-stretch my-auto aspect-[1.25] w-[45px]" alt="Controls icon" />
                    </div>
                  </div>
                  <div className="pt-px pb-3 mt-6 text-2xl font-bold text-white bg-black bg-opacity-0 max-md:pr-5">
                    Basic Controls
                  </div>
                  <div className="flex flex-col mt-4 w-full bg-black bg-opacity-0">
                    <div className="flex gap-3 py-1 w-full bg-black bg-opacity-0">
                      <div className="flex overflow-hidden justify-center items-center self-start min-h-[16px]">
                        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/a1a2b128ed76445fbc89bb2309e3a04b/50265ad4e4e75cd3e1efeda9f342970c805f97eeae7a06d23128a2c3f2830324?apiKey=a1a2b128ed76445fbc89bb2309e3a04b&" className="object-contain self-stretch my-auto aspect-[1.12] w-[18px]" alt="Movement controls" />
                      </div>
                      <div className="flex-auto text-base text-gray-300 w-[297px]">
                        Use WASD or Arrow keys to move
                      </div>
                    </div>
                    <div className="flex gap-3 py-1 mt-3 w-full bg-black bg-opacity-0">
                      <div className="flex overflow-hidden justify-center items-center self-start min-h-[16px]">
                        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/a1a2b128ed76445fbc89bb2309e3a04b/e4227766cf9d89817ef6f6431498b072d214ef85a1ad1f4db8a878146e3067c1?apiKey=a1a2b128ed76445fbc89bb2309e3a04b&" className="object-contain self-stretch my-auto w-3 aspect-[0.75]" alt="Shoot control" />
                      </div>
                      <div className="flex-auto text-base text-gray-300 w-[305px]">
                        Left click to shoot
                      </div>
                    </div>
                    <div className="flex gap-3 py-1 mt-3 w-full bg-black bg-opacity-0">
                      <div className="flex overflow-hidden justify-center items-center self-start min-h-[16px]">
                        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/a1a2b128ed76445fbc89bb2309e3a04b/406a91e029edecef919787f1e86884768523c41301b21169d3b78f38f11f31d0?apiKey=a1a2b128ed76445fbc89bb2309e3a04b&" className="object-contain self-stretch my-auto w-4 aspect-square" alt="Jump control" />
                      </div>
                      <div className="flex-auto text-base text-gray-300 w-[300px]">
                        Space bar to jump
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                <div className="flex flex-col grow p-8 w-full bg-gray-800 rounded-xl max-md:px-5 max-md:mt-8">
                  <div className="flex flex-col items-start w-full bg-black bg-opacity-0 max-md:pr-5">
                    <div className="flex overflow-hidden justify-center items-center min-h-[36px]">
                      <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/a1a2b128ed76445fbc89bb2309e3a04b/cb482095479e0d2417ae8ce7fe1907a3883a26e065e476f003e271096c44d4a2?apiKey=a1a2b128ed76445fbc89bb2309e3a04b&" className="object-contain self-stretch my-auto w-10 aspect-[1.11]" alt="Scoring system icon" />
                    </div>
                  </div>
                  <div className="pt-px pb-2 mt-6 text-2xl font-bold text-white bg-black bg-opacity-0 max-md:pr-5">
                    Scoring System
                  </div>
                  <div className="flex flex-col mt-4 w-full bg-black bg-opacity-0">
                    <div className="flex gap-3 py-1 w-full bg-black bg-opacity-0">
                      <div className="flex overflow-hidden justify-center items-center self-start min-h-[16px]">
                        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/a1a2b128ed76445fbc89bb2309e3a04b/657941bd2b2201f0466710a952c5b9a89d754306d853aa671e685790afa90966?apiKey=a1a2b128ed76445fbc89bb2309e3a04b&" className="object-contain self-stretch my-auto aspect-[1.12] w-[18px]" alt="Coins icon" />
                      </div>
                      <div className="flex-auto text-base text-gray-300 w-[296px]">
                        Collect coins: 10 points
                      </div>
                    </div>
                    <div className="flex gap-3 py-1 mt-3 w-full bg-black bg-opacity-0">
                      <div className="flex overflow-hidden justify-center items-center self-start min-h-[16px]">
                        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/a1a2b128ed76445fbc89bb2309e3a04b/43a07c036c43ed1fe99588b10f3fa714791c992a05ddbbf15d80fd9aed08718d?apiKey=a1a2b128ed76445fbc89bb2309e3a04b&" className="object-contain self-stretch my-auto w-4 aspect-square" alt="Enemies icon" />
                      </div>
                      <div className="flex-auto text-base text-gray-300 w-[299px]">
                        Defeat enemies: 50 points
                      </div>
                    </div>
                    <div className="flex gap-3 py-1 mt-3 w-full bg-black bg-opacity-0">
                      <div className="flex overflow-hidden justify-center items-center self-start min-h-[16px]">
                        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/a1a2b128ed76445fbc89bb2309e3a04b/46ffdc6e60f36b2ee01767baa3d55023b60179f93b726890c0871a0a7fd9a390?apiKey=a1a2b128ed76445fbc89bb2309e3a04b&" className="object-contain self-stretch my-auto w-4 aspect-square" alt="Special items icon" />
                      </div>
                      <div className="flex-auto text-base text-gray-300 w-[299px]">
                        Special items: 100 points
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                <div className="flex flex-col grow p-8 w-full bg-gray-800 rounded-xl max-md:px-5 max-md:mt-8">
                  <div className="flex flex-col items-start w-full bg-black bg-opacity-0 max-md:pr-5">
                    <div className="flex overflow-hidden justify-center items-center min-h-[36px]">
                      <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/a1a2b128ed76445fbc89bb2309e3a04b/ac102bbfce41d5d33d96ab25fc2f5b31b2c34bab556308f004c877cf07f60af9?apiKey=a1a2b128ed76445fbc89bb2309e3a04b&" className="object-contain self-stretch my-auto w-9 aspect-square" alt="Power-ups icon" />
                    </div>
                  </div>
                  <div className="pt-px pb-2.5 mt-6 text-2xl font-bold text-white whitespace-nowrap bg-black bg-opacity-0 max-md:pr-5">
                    Power-ups
                  </div>
                  <div className="flex flex-col mt-4 w-full bg-black bg-opacity-0">
                    <div className="flex gap-3 py-1 w-full bg-black bg-opacity-0">
                      <div className="flex overflow-hidden justify-center items-center self-start min-h-[16px]">
                        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/a1a2b128ed76445fbc89bb2309e3a04b/28fc9bdea6af783eb877de1c5be96b359734cf009b78de4911de2a62f2e0fdae?apiKey=a1a2b128ed76445fbc89bb2309e3a04b&" className="object-contain self-stretch my-auto w-3.5 aspect-[0.87]" alt="Speed boost icon" />
                      </div>
                      <div className="flex-auto text-base text-gray-300 w-[302px]">
                        Speed boost
                      </div>
                    </div>
                    <div className="flex gap-3 py-1 mt-3 w-full bg-black bg-opacity-0">
                      <div className="flex overflow-hidden justify-center items-center self-start min-h-[16px]">
                        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/a1a2b128ed76445fbc89bb2309e3a04b/f5da11a0b0383ef0ad06e51321a89a57989e659cd069757051ec8c0497eae109?apiKey=a1a2b128ed76445fbc89bb2309e3a04b&" className="object-contain self-stretch my-auto w-4 aspect-square" alt="Health restore icon" />
                      </div>
                      <div className="flex-auto text-base text-gray-300 w-[300px]">
                        Health restore
                      </div>
                    </div>
                    <div className="flex gap-3 py-1 mt-3 w-full bg-black bg-opacity-0">
                      <div className="flex overflow-hidden justify-center items-center self-start min-h-[16px]">
                        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/a1a2b128ed76445fbc89bb2309e3a04b/470b3458e49e9786e12bc54e85503ce6f425a4cc34a5f4b6169b30f56acd7fdc?apiKey=a1a2b128ed76445fbc89bb2309e3a04b&" className="object-contain self-stretch my-auto w-3.5 aspect-[0.87]" alt="Double damage icon" />
                      </div>
                      <div className="flex-auto text-base text-gray-300 w-[302px]">
                        Double damage
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
      <LandingFooter />
    </div>
  );
}

export default HowToPlay;