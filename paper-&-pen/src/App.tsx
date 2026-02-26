import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, X, Plus, Minus, Menu, Search, ArrowRight, Instagram, Twitter, Facebook } from 'lucide-react';
import { PRODUCTS, Product, CartItem } from './types';

const Navbar = ({ cartCount, onCartOpen }: { cartCount: number; onCartOpen: () => void }) => (
  <nav className="fixed top-0 left-0 right-0 z-40 bg-brand-cream/80 backdrop-blur-md border-b border-brand-ink/5">
    <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <button className="lg:hidden p-2 -ml-2">
          <Menu className="w-5 h-5" />
        </button>
        <div className="hidden lg:flex items-center gap-8 text-sm uppercase tracking-widest font-medium">
          <a href="#" className="hover:text-brand-olive transition-colors">Shop</a>
          <a href="#" className="hover:text-brand-olive transition-colors">Journal</a>
          <a href="#" className="hover:text-brand-olive transition-colors">About</a>
        </div>
      </div>
      
      <div className="absolute left-1/2 -translate-x-1/2">
        <h1 className="text-3xl font-serif italic tracking-tighter">Paper & Pen</h1>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 hover:text-brand-olive transition-colors">
          <Search className="w-5 h-5" />
        </button>
        <button 
          onClick={onCartOpen}
          className="p-2 relative hover:text-brand-olive transition-colors"
        >
          <ShoppingBag className="w-5 h-5" />
          {cartCount > 0 && (
            <span className="absolute top-1 right-1 bg-brand-olive text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </div>
  </nav>
);

const Hero = () => (
  <section className="pt-32 pb-20 px-6">
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="text-sm uppercase tracking-[0.2em] text-brand-olive font-semibold mb-6 block">
          The Art of Writing
        </span>
        <h2 className="text-6xl lg:text-8xl font-serif leading-[0.9] mb-8">
          Curated tools for <br />
          <span className="italic">thoughtful</span> minds.
        </h2>
        <p className="text-lg text-brand-ink/70 max-w-md mb-10 leading-relaxed">
          We believe that the tools you use should be as intentional as the words you write. Explore our collection of hand-picked stationery.
        </p>
        <button className="bg-brand-olive text-white px-8 py-4 rounded-full flex items-center gap-3 hover:bg-brand-ink transition-colors group">
          Explore Collection
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl"
      >
        <img 
          src="https://picsum.photos/seed/stationery-hero/1200/1500" 
          alt="Artisanal Stationery"
          className="object-cover w-full h-full"
          referrerPolicy="no-referrer"
        />
      </motion.div>
    </div>
  </section>
);

const ProductCard = ({ product, onAddToCart }: { product: Product; onAddToCart: (p: Product) => void }) => (
  <motion.div 
    layout
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    className="group"
  >
    <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-white mb-6">
      <img 
        src={product.image} 
        alt={product.name}
        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
        referrerPolicy="no-referrer"
      />
      <button 
        onClick={() => onAddToCart(product)}
        className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm py-3 rounded-2xl opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 font-medium text-sm"
      >
        Add to Cart
      </button>
    </div>
    <div className="flex justify-between items-start">
      <div>
        <span className="text-[10px] uppercase tracking-widest text-brand-ink/40 font-bold mb-1 block">
          {product.category}
        </span>
        <h3 className="text-xl font-serif group-hover:text-brand-olive transition-colors">
          {product.name}
        </h3>
      </div>
      <span className="font-serif text-lg">${product.price.toFixed(2)}</span>
    </div>
  </motion.div>
);

const CartDrawer = ({ 
  isOpen, 
  onClose, 
  items, 
  onUpdateQuantity, 
  onRemove 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-ink/20 backdrop-blur-sm z-50"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-brand-cream z-50 shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-brand-ink/5 flex items-center justify-between">
              <h2 className="text-2xl font-serif italic">Your Bag</h2>
              <button onClick={onClose} className="p-2 hover:bg-brand-ink/5 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-brand-ink/40 space-y-4">
                  <ShoppingBag className="w-12 h-12 stroke-[1px]" />
                  <p className="font-serif italic text-lg">Your bag is empty</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-24 h-32 rounded-2xl overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-serif text-lg leading-tight">{item.name}</h3>
                          <button onClick={() => onRemove(item.id)} className="text-brand-ink/40 hover:text-brand-ink">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-sm text-brand-ink/60 mt-1">${item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-brand-ink/10 rounded-full px-2 py-1">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="p-1 hover:text-brand-olive transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="p-1 hover:text-brand-olive transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-brand-ink/5 bg-white/50 space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-sm uppercase tracking-widest font-semibold text-brand-ink/40">Subtotal</span>
                  <span className="text-2xl font-serif">${total.toFixed(2)}</span>
                </div>
                <button className="w-full bg-brand-olive text-white py-4 rounded-full font-medium hover:bg-brand-ink transition-colors">
                  Checkout
                </button>
                <p className="text-[10px] text-center text-brand-ink/40 uppercase tracking-widest">
                  Shipping and taxes calculated at checkout
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const Footer = () => (
  <footer className="bg-brand-ink text-brand-cream pt-20 pb-10 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
        <div className="space-y-6">
          <h2 className="text-3xl font-serif italic">Paper & Pen</h2>
          <p className="text-brand-cream/60 leading-relaxed">
            Crafting the future of writing through timeless tools and artisanal craftsmanship.
          </p>
          <div className="flex gap-4">
            <Instagram className="w-5 h-5 cursor-pointer hover:text-brand-olive transition-colors" />
            <Twitter className="w-5 h-5 cursor-pointer hover:text-brand-olive transition-colors" />
            <Facebook className="w-5 h-5 cursor-pointer hover:text-brand-olive transition-colors" />
          </div>
        </div>
        
        <div>
          <h4 className="font-serif text-xl mb-6">Shop</h4>
          <ul className="space-y-4 text-brand-cream/60">
            <li><a href="#" className="hover:text-brand-cream transition-colors">All Products</a></li>
            <li><a href="#" className="hover:text-brand-cream transition-colors">Notebooks</a></li>
            <li><a href="#" className="hover:text-brand-cream transition-colors">Writing Tools</a></li>
            <li><a href="#" className="hover:text-brand-cream transition-colors">Accessories</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-xl mb-6">Support</h4>
          <ul className="space-y-4 text-brand-cream/60">
            <li><a href="#" className="hover:text-brand-cream transition-colors">Shipping Policy</a></li>
            <li><a href="#" className="hover:text-brand-cream transition-colors">Returns & Exchanges</a></li>
            <li><a href="#" className="hover:text-brand-cream transition-colors">Contact Us</a></li>
            <li><a href="#" className="hover:text-brand-cream transition-colors">FAQ</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-xl mb-6">Newsletter</h4>
          <p className="text-brand-cream/60 mb-6">Join our community for exclusive releases and stories.</p>
          <div className="flex border-b border-brand-cream/20 pb-2">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="bg-transparent flex-1 outline-none text-sm"
            />
            <ArrowRight className="w-4 h-4 text-brand-cream/40" />
          </div>
        </div>
      </div>
      
      <div className="pt-10 border-t border-brand-cream/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-brand-cream/40">
        <p>© 2024 Paper & Pen. All rights reserved.</p>
        <div className="flex gap-8">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const filteredProducts = activeCategory === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  const categories = ['All', 'Notebooks', 'Pens', 'Inks', 'Accessories'];

  return (
    <div className="min-h-screen selection:bg-brand-olive/20">
      <Navbar 
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} 
        onCartOpen={() => setIsCartOpen(true)} 
      />
      
      <main>
        <Hero />

        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div>
              <h2 className="text-4xl lg:text-5xl font-serif mb-4">Our Collection</h2>
              <p className="text-brand-ink/60 max-w-md">
                Each piece in our collection is selected for its quality, durability, and aesthetic appeal.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === cat 
                      ? 'bg-brand-ink text-brand-cream' 
                      : 'bg-white border border-brand-ink/5 hover:border-brand-ink/20'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={addToCart} 
              />
            ))}
          </div>
        </section>

        <section className="bg-brand-olive/5 py-32 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl lg:text-6xl font-serif mb-8 italic">
              "The pen is the tongue of the mind."
            </h2>
            <p className="text-brand-ink/60 text-lg mb-12">
              — Miguel de Cervantes
            </p>
            <div className="w-px h-24 bg-brand-olive/20 mx-auto" />
          </div>
        </section>
      </main>

      <Footer />

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
      />
    </div>
  );
}
