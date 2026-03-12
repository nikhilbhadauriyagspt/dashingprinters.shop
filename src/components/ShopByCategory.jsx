import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const softColors = [
  "bg-emerald-50",
  "bg-blue-50",
  "bg-orange-50",
  "bg-purple-50",
  "bg-pink-50",
  "bg-indigo-50",
  "bg-sky-50",
  "bg-amber-50"
];

export default function ShopByCategory({ categories = [] }) {
  const printerParent = categories.find(
    (c) => c.slug === "printers" || c.id === 46
  );
  const displayCategories = printerParent?.children || [];

  const getImagePath = (image) => {
    if (!image) return "/logo/fabicon.png";
    const processedImage = image.replace(/\.jpg$/, '.png');
    return processedImage.startsWith("/") ? processedImage : `/${processedImage}`;
  };

  if (!displayCategories.length) return null;

  return (
    <section className="w-full bg-white py-20 font-['Heebo']">
      <div className="max-w-full mx-auto px-6 lg:px-12">
        
        {/* SOFT HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-[2.5px] bg-[#10b981] rounded-full"></span>
              <span className="text-[12px] font-black text-slate-400 uppercase tracking-[3px]">Explore department</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 capitalize tracking-tight">
              Featured categories
            </h2>
          </div>

          {/* CUSTOM NAVIGATION */}
          <div className="flex items-center gap-2">
            <button className="shop-cat-prev w-11 h-11 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white transition-all cursor-pointer">
              <ArrowLeft size={18} />
            </button>
            <button className="shop-cat-next w-11 h-11 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white transition-all cursor-pointer">
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* SOFT COLOR SLIDER */}
        <div className="relative">
          <Swiper
            modules={[Autoplay, Navigation]}
            navigation={{
              nextEl: ".shop-cat-next",
              prevEl: ".shop-cat-prev",
            }}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
            }}
            loop={displayCategories.length > 6}
            spaceBetween={30}
            slidesPerView={2}
            breakpoints={{
              480: { slidesPerView: 2.5, spaceBetween: 20 },
              640: { slidesPerView: 3.5, spaceBetween: 30 },
              768: { slidesPerView: 4.5, spaceBetween: 30 },
              1024: { slidesPerView: 5.5, spaceBetween: 40 },
              1280: { slidesPerView: 6.5, spaceBetween: 40 },
              1536: { slidesPerView: 8, spaceBetween: 40 },
            }}
            className="category-swiper"
          >
            {displayCategories.map((cat, index) => {
              const bgColor = softColors[index % softColors.length];
              return (
                <SwiperSlide key={cat.id}>
                  <Link
                    to={`/shop?category=${cat.slug}`}
                    className="group block"
                  >
                    <div className="flex flex-col items-center">
                      {/* Soft Color Wrapper */}
                      <div className={`relative w-full aspect-square ${bgColor} rounded-[2.5rem] overflow-hidden mb-6 flex items-center justify-center p-10 transition-all duration-700 group-hover:rounded-[3.5rem] group-hover:scale-105`}>
                        <img
                          src={getImagePath(cat.image)}
                          alt={cat.name}
                          className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110 mix-blend-multiply drop-shadow-sm"
                          onError={(e) => {
                            e.currentTarget.src = "/logo/fabicon.png";
                          }}
                        />
                        
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                      </div>

                      <div className="text-center">
                        <h3 className="text-[15px] font-bold text-slate-800 capitalize leading-tight group-hover:text-slate-900 transition-colors">
                          {cat.name}
                        </h3>
                        <div className="mt-2 w-0 group-hover:w-full h-[2px] bg-[#10b981] mx-auto transition-all duration-500"></div>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>

      <style>{`
        .category-swiper {
          padding: 10px 0 20px 0 !important;
        }
      `}</style>
    </section>
  );
}
