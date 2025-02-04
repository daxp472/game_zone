import React from 'react';
import LandingNavbar from '../components/LandingNavbar';
import LandingFooter from '../components/LandingFooter';
import Ownner from '../assets/ownner.jpeg'
import Tournament from '../assets/tournament.jpeg'

function AboutUs() {
  return (
    <div className="flex overflow-hidden flex-col bg-white rounded-lg border-2 border-gray-300 border-solid">
      <div className="flex flex-col w-full bg-black bg-opacity-0 max-md:max-w-full">
        <LandingNavbar />
        <div className="flex flex-col justify-center bg-[#111827] self-center px-8 py-16 -mt-2 w-full max-w-screen-xl leading-none text-center bg-opacity-100 max-md:px-5 max-md:max-w-full">
  <div className="flex flex-col items-center px-20 pb-2 bg-[#111827] bg-opacity-100 max-md:px-5 max-md:max-w-full">
    <div className="flex z-10 flex-col max-w-full w-[307px]">
      <div className="text-4xl font-bold text-white">About GameZone</div>
      <div className="self-center mt-9 text-lg text-gray-400">
        Your Ultimate Gaming Destination
      </div>
    </div>
  </div>
</div>
        <div className="flex flex-col px-20 w-full bg-gray-800 max-md:px-5 max-md:max-w-full">
          <div className="flex flex-col px-8 pt-14 pb-5 w-full bg-black bg-opacity-0 max-md:pl-5 max-md:max-w-full">
            <div className="bg-black bg-opacity-0 max-md:max-w-full">
              <div className="flex gap-5 max-md:flex-col">
                <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                  <div className="flex flex-col self-stretch m-auto w-full leading-none bg-black bg-opacity-0 max-md:mt-10 max-md:max-w-full">
                    <div className="self-start text-3xl font-bold text-white">
                      Our Gaming Journey
                    </div>
                    <div className="mt-10 text-base leading-4 text-gray-400 max-md:mr-1.5 max-md:max-w-full">
                      GameZone was founded in 2025 with a simple mission: to create
                      an inclusive gaming community where players from all walks of
                      life can come together to share their passion for gaming.
                    </div>
                    <div className="mt-12 text-base leading-4 text-gray-400 max-md:mt-10 max-md:mr-2.5 max-md:max-w-full">
                      We've grown from a small gaming cafe to a full-fledged gaming
                      hub, offering the latest games, tournaments, and a space for
                      gamers to connect and compete.
                    </div>
                    <div className="flex flex-wrap gap-8 pr-20 mt-10 text-center bg-black bg-opacity-0 max-md:pr-5">
                      <div className="flex flex-col px-px pb-2 bg-black bg-opacity-0">
                        <div className="self-center text-3xl font-bold text-red-600">
                          10K+
                        </div>
                        <div className="mt-4 text-base text-gray-400">
                          Active Players
                        </div>
                      </div>
                      <div className="flex flex-col px-px pb-2.5 whitespace-nowrap bg-black bg-opacity-0">
                        <div className="self-center text-3xl font-bold text-red-600">
                          500+
                        </div>
                        <div className="mt-4 text-base text-gray-400">
                          Tournaments
                        </div>
                      </div>
                      <div className="flex flex-col px-0.5 pb-2 bg-black bg-opacity-0">
                        <div className="self-center text-3xl font-bold text-red-600">
                          50+
                        </div>
                        <div className="mt-4 text-base text-gray-400">
                          Gaming Stations
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                  <div className="flex flex-col px-6 pt-1.5 pb-11 w-full bg-black bg-opacity-0 max-md:px-5 max-md:mt-6 max-md:max-w-full">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/a1a2b128ed76445fbc89bb2309e3a04b/0ec3deb4a059ba152f8108e9febe0df1fb848394f8bb2d4ac0f009a48edebe56?apiKey=a1a2b128ed76445fbc89bb2309e3a04b&"
                      className="object-contain w-full rounded-lg aspect-square shadow-[0px_8px_10px_rgba(0,0,0,0.1)] max-md:max-w-full"
                      alt="Gaming setup"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center px-20 py-16 w-full bg-gray-900 max-md:px-5 max-md:max-w-full">
          <div className="flex flex-col px-8 w-full bg-black bg-opacity-0 max-md:px-5 max-md:max-w-full">
            <div className="bg-black bg-opacity-0 max-md:max-w-full">
              <div className="flex gap-5 max-md:flex-col">
                <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
                  <div className="flex flex-col grow px-8 pt-16 pb-8 w-full bg-gray-800 rounded-lg max-md:px-5 max-md:mt-8">
                    <div className="py-1 text-xl font-bold text-white bg-black bg-opacity-0 max-md:pr-5">
                      Competitive Gaming
                    </div>
                    <div className="flex flex-col items-start py-1.5 pr-6 mt-4 text-base text-gray-400 bg-black bg-opacity-0 max-md:pr-5">
                      <div>Regular tournaments and leagues for</div>
                      <div className="self-stretch mt-2">
                        various game titles with attractive prize
                      </div>
                      <div className="mt-2.5">pools.</div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                  <div className="flex flex-col grow px-8 py-16 w-full bg-gray-800 rounded-lg max-md:px-5 max-md:mt-8">
                    <div className="py-1.5 text-xl font-bold text-white bg-black bg-opacity-0 max-md:pr-5">
                      Community Events
                    </div>
                    <div className="flex flex-col py-1 pr-5 mt-4 text-base text-gray-400 bg-black bg-opacity-0">
                      <div>Regular meetups, workshops, and social</div>
                      <div className="self-start mt-2.5">
                        events for our gaming community.
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                  <div className="flex flex-col grow px-8 py-16 w-full bg-gray-800 rounded-lg max-md:px-5 max-md:mt-8">
                    <div className="py-1.5 text-xl font-bold text-white bg-black bg-opacity-0 max-md:pr-5">
                      Pro Equipment
                    </div>
                    <div className="flex flex-col py-1.5 pr-4 mt-4 text-base text-gray-400 bg-black bg-opacity-0">
                      <div>State-of-the-art gaming setups with the</div>
                      <div className="self-start mt-2">
                        latest hardware and peripherals.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center px-20 py-16 w-full bg-gray-800 max-md:px-5 max-md:max-w-full">
          <div className="flex flex-col px-8 w-full bg-black bg-opacity-0 max-md:px-5 max-md:max-w-full">
            <div className="self-center text-3xl font-bold leading-none text-center text-white">
              Meet Our Team
            </div>
            <div className="mt-16 bg-black bg-opacity-0 max-md:mt-10 max-md:max-w-full">
              <div className="flex gap-5 max-md:flex-col">
                <div className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full">
                  <div className="flex flex-col grow items-center px-14 pb-2.5 w-full text-base leading-none text-center bg-black bg-opacity-0 max-md:px-5 max-md:mt-8">
                    <img
                      loading="lazy"
                      src={Ownner}
                      className="object-contain w-32 max-w-full rounded-full aspect-square"
                      alt="Dax Patel"
                    />
                    <div className="mt-5 font-bold text-white">Dax Patel</div>
                    <div className="mt-3 text-gray-400">Founder & CEO</div>
                  </div>
                </div>
                <div className="flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full">
                  <div className="flex flex-col grow items-center px-14 pb-2.5 w-full text-base leading-none text-center bg-black bg-opacity-0 max-md:px-5 max-md:mt-8">
                    <img
                      loading="lazy"
                      src={Tournament}
                      className="object-contain w-32 max-w-full rounded-full aspect-square"
                      alt="Sarah Johnson"
                    />
                    <div className="mt-5 font-bold text-white">Kalpan Kaneria</div>
                    <div className="mt-3 text-gray-400">Tournament Director</div>
                  </div>
                </div>
                <div className="flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full">
                  <div className="flex flex-col grow items-center px-14 pb-2 w-full text-base leading-none text-center bg-black bg-opacity-0 max-md:px-5 max-md:mt-8">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/a1a2b128ed76445fbc89bb2309e3a04b/58922931c78fa77560f28122cf0a2d21a8564c52c86b500e824ffb1f53f9efdc?apiKey=a1a2b128ed76445fbc89bb2309e3a04b&"
                      className="object-contain w-32 max-w-full rounded-full aspect-square"
                      alt="Mike Rodriguez"
                    />
                    <div className="mt-5 font-bold text-white">Mike Rodriguez</div>
                    <div className="mt-2 text-gray-400">Technical Manager</div>
                  </div>
                </div>
                <div className="flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full">
                  <div className="flex flex-col grow items-center px-14 pb-2 w-full text-base leading-none text-center bg-black bg-opacity-0 max-md:px-5 max-md:mt-8">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/a1a2b128ed76445fbc89bb2309e3a04b/86b71105d8757558c82122f30ff3c59bb9631dd21aa94503e2063b85422a6aab?apiKey=a1a2b128ed76445fbc89bb2309e3a04b&"
                      className="object-contain w-32 max-w-full rounded-full aspect-square"
                      alt="Emma Wilson"
                    />
                    <div className="mt-5 font-bold text-white">Emma Wilson</div>
                    <div className="mt-3 text-gray-400">Community Manager</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <LandingFooter />
      </div>
    </div>
  );
}

export default AboutUs;