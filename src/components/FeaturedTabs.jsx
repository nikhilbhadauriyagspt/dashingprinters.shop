import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  ArrowRight,
  Plus,
  Sparkles,
  ShoppingBag
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import API_BASE_URL from "../config";

export default function FeaturedTabs() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_BASE_URL}/products?limit=24&is_featured=1`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          setProducts(data.data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === "string" ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) {
        return `/${imgs[0].replace(/\\/g, '/')}`;
      }
      return "/logo/fabicon.png";
    } catch { return "/logo/fabicon.png"; }
  };

  return (
    <section className="w-full py-24 font-['Heebo'] bg-white">
      <div className="max-w-full mx-auto px-6 lg:px-12">
        
        {/* PREMIUM CREATIVE HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-4 py-1.5 bg-[#10b981]/10 text-[#10b981] text-[11px] font-black uppercase tracking-[3px] rounded-full flex items-center gap-2">
                <Sparkles size={12} /> Discover best sellers
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-slate-950 capitalize tracking-tight mb-6">
              Our featured <span className="text-[#10b981]">studio</span> collection
            </h2>
            
            <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed max-w-2xl">
              Elevate your workspace with our handpicked selection of high-performance printers and genuine supplies, engineered for precision and long-lasting quality.
            </p>
          </div>

          <div className="flex shrink-0">
            <Link to="/shop" className="group flex items-center gap-4 py-4 px-10 bg-slate-950 text-white rounded-2xl font-bold hover:bg-[#10b981] transition-all shadow-2xl shadow-slate-200">
              Explore catalog <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>

        {/* REFINED PRODUCT GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 md:gap-5">
          {loading ? (
            [1,2,3,4,5,6].map(i => <div key={i} className="aspect-[4/5] bg-slate-50 animate-pulse rounded-3xl"></div>)
          ) : (
            products.map((p, idx) => (
              <motion.div 
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="group flex flex-col"
              >
                {/* Image Area - Premium Glass/Studio Look */}
                <div className="relative aspect-[4/5] mb-6 bg-slate-50 border border-slate-100 rounded-[2rem] overflow-hidden flex items-center justify-center p-8 transition-all duration-500 group-hover:bg-white group-hover:border-[#10b981]/20 group-hover:shadow-2xl group-hover:shadow-slate-100">
                  <Link to={`/product/${p.slug}`} className="w-full h-full flex items-center justify-center">
                    <img 
                      src={getImagePath(p.images)} 
                      alt={p.name} 
                      className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
                    />
                  </Link>

                  {/* Top Right Wishlist */}
                  <button 
                    onClick={() => toggleWishlist(p)}
                    className={`absolute top-4 right-4 w-10 h-10 rounded-2xl bg-white/80 backdrop-blur-md shadow-sm flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 ${isInWishlist(p.id) ? 'text-red-500' : 'text-slate-400 hover:text-red-500'}`}
                  >
                    <Heart size={18} className={isInWishlist(p.id) ? 'fill-red-500' : ''} />
                  </button>

                  {/* Bottom Action Bar */}
                  <div className="absolute bottom-4 left-4 right-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <button 
                      onClick={() => addToCart(p)}
                      className="w-full py-3 bg-slate-950 text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-[#10b981] transition-all flex items-center justify-center gap-2"
                    >
                      <Plus size={16} /> Quick Add
                    </button>
                  </div>
                </div>

                {/* Refined Content Area */}
                <div className="px-2">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] block mb-2">{p.brand_name || 'HP SUPPLY'}</span>
                  <Link to={`/product/${p.slug}`}>
                    <h3 className="text-[15px] font-bold text-slate-800 leading-tight line-clamp-2 min-h-[40px] group-hover:text-[#10b981] transition-colors">
                      {p.name}
                    </h3>
                  </Link>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-lg font-black text-slate-950 tracking-tighter">${p.price}</span>
                    <div className="flex gap-0.5 text-[#10b981]">
                      {[1,2,3,4,5].map(s => <span key={s} className="w-1 h-1 bg-current rounded-full"></span>)}
                    </div>
                  </div>
                </div>

              </motion.div>
            ))
          )}
        </div>

      </div>
    </section>
  );
}
