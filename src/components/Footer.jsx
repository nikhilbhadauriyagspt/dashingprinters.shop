import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  MapPin,
  ChevronRight,
  Send,
  ShieldCheck,
  FileText,
  Truck,
  RotateCcw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';

export default function Footer() {
  const [categories, setCategories] = useState([]);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE_URL}/categories`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          const printerParent = data.data.find(cat => cat.slug === 'printers' || cat.id === 46);
          if (printerParent && printerParent.children) {
            setCategories(printerParent.children.slice(0, 6));
          }
        }
      })
      .catch(err => console.error(err));
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      // Simulate API call for newsletter subscription
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStatus('success');
      setEmail('');
    } catch (err) {
      setStatus('error');
    } finally {
      setLoading(false);
      setTimeout(() => setStatus(null), 3000);
    }
  };

  return (
    <footer className="w-full bg-slate-950 font-['Heebo']">

      {/* 1. NEWSLETTER STRIP */}
      <div className="w-full border-b border-white/5 bg-slate-900/50">
        <div className="max-w-full mx-auto px-6 lg:px-12 py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="max-w-xl text-center lg:text-left">
              <h3 className="text-2xl md:text-3xl font-black text-white capitalize mb-2">Subscribe to our newsletter</h3>
              <p className="text-slate-400 font-medium">Receive the latest updates on new arrivals and exclusive technical solutions.</p>
            </div>
            <form onSubmit={handleSubscribe} className="w-full lg:w-[450px] relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full h-[56px] bg-white/5 border border-white/10 rounded-2xl px-6 text-white outline-none focus:border-[#10b981] transition-all"
              />
              <button disabled={loading} type="submit" className="absolute right-2 top-2 h-[40px] px-6 bg-[#10b981] text-white rounded-xl font-bold flex items-center gap-2 hover:bg-[#059669] transition-all disabled:opacity-50">
                <span>{loading ? 'Joining...' : 'Join'}</span> {!loading && <Send size={16} />}
              </button>
              <AnimatePresence>
                {status === 'success' && (
                  <motion.p initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute -bottom-6 left-2 text-[11px] font-bold text-[#10b981]">
                    Successfully subscribed!
                  </motion.p>
                )}
                {status === 'error' && (
                  <motion.p initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute -bottom-6 left-2 text-[11px] font-bold text-red-500">
                    Subscription failed. Please try again.
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>
      </div>

      {/* 2. MAIN FOOTER CONTENT */}
      <div className="w-full px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-20">

          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-8">
            <Link to="/">
              <img src="/logo/logo.png" alt="Optimum Prints" className="h-10 invert brightness-0 invert" />
            </Link>
            <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-sm">
              Providing enterprise-grade printing solutions and high-quality supplies for modern workspaces. Your trusted partner for genuine hardware and expert support.
            </p>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10">

              {/* Category Links */}
              <div>
                <h4 className="text-white font-black text-sm uppercase tracking-[2px] mb-8">Categories</h4>
                <ul className="space-y-4">
                  {categories.map(cat => (
                    <li key={cat.id}>
                      <Link to={`/shop?category=${cat.slug}`} className="text-slate-400 hover:text-[#10b981] font-bold text-[14px] transition-colors flex items-center gap-2 group">
                        <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        <span className="capitalize">{cat.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company Links */}
              <div>
                <h4 className="text-white font-black text-sm uppercase tracking-[2px] mb-8">Company</h4>
                <ul className="space-y-4">
                  {['Shop all', 'About us', 'FAQs', 'Contact us', 'Track order'].map(item => (
                    <li key={item}>
                      <Link to={`/${item.toLowerCase().replace(' ', '-')}`} className="text-slate-400 hover:text-[#10b981] font-bold text-[14px] transition-colors flex items-center gap-2 group">
                        <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        <span>{item}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal Links (MOVED TO TOP) */}
              <div>
                <h4 className="text-white font-black text-sm uppercase tracking-[2px] mb-8">Legal policy</h4>
                <ul className="space-y-4">
                  {[
                    { name: 'Privacy Policy', path: '/privacy-policy' },
                    { name: 'Terms of Service', path: '/terms' },
                    { name: 'Shipping Policy', path: '/shipping-policy' },
                    { name: 'Return Policy', path: '/return-policy' }
                  ].map(link => (
                    <li key={link.name}>
                      <Link to={link.path} className="text-slate-400 hover:text-[#10b981] font-bold text-[14px] transition-colors flex items-center gap-2 group">
                        <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        <span>{link.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h4 className="text-white font-black text-sm uppercase tracking-[2px] mb-8">Support</h4>
                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <Mail size={18} className="text-[#10b981] mt-1 shrink-0" />
                    <div>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Email address</p>
                      <p className="text-white font-bold text-sm">info@optimumprints.shop</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="text-[#10b981] mt-1 shrink-0" />
                    <div>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Headquarters</p>
                      <p className="text-white font-bold text-sm leading-snug">437 N Illinois St, Indianapolis, IN 46204, United States</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* 3. BOTTOM BAR (CLEANED) */}
      <div className="w-full border-t border-white/5 py-10">
        <div className="max-w-full mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-slate-500 text-sm font-medium">
            &copy; {new Date().getFullYear()} <span className="text-white">Optimum Prints.</span> All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <img src="/logo/PayPal.svg.webp" alt="PayPal" className="h-5 opacity-40 grayscale" />
            <div className="flex items-center gap-2 text-slate-600 text-[10px] font-black uppercase tracking-[2px]">
              <ShieldCheck size={14} /> Secured by SSL Encryption
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
}
