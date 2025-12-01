import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RESTAURANTS, MENU_ITEMS } from '../constants';
import FoodItemCard from '../components/FoodItemCard';
import { Star, Clock, MapPin, ArrowLeft, Search, Heart, Share2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

const RestaurantDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { itemCount, cartTotal } = useCart();
  
  const restaurant = RESTAURANTS.find(r => r.id === id);
  const items = MENU_ITEMS.filter(i => i.restaurantId === id);

  // Group items by category
  const categories = Array.from(new Set(items.map(i => i.category)));

  useEffect(() => {
    window.scrollTo(0,0);
  }, [id]);

  if (!restaurant) return <div>Restaurant not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Navbar */}
      <div className="bg-white sticky top-0 z-40 px-4 h-16 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <ArrowLeft className="text-gray-700" />
            </button>
            <div className="hidden sm:block">
                 <h1 className="font-bold text-base text-gray-800 leading-tight">{restaurant.name}</h1>
                 <p className="text-xs text-gray-500">Delivery in {restaurant.deliveryTime}</p>
            </div>
        </div>
        <div className="flex gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-full text-gray-600"><Search size={20} /></button>
            <button className="p-2 hover:bg-gray-100 rounded-full text-gray-600"><Heart size={20} /></button>
            <button className="p-2 hover:bg-gray-100 rounded-full text-gray-600"><Share2 size={20} /></button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pt-6">
        {/* Restaurant Info Card */}
        <div className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-sm mb-8 relative overflow-hidden">
            <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between relative z-10">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">{restaurant.name}</h1>
                    <p className="text-gray-500 text-lg mb-1">{restaurant.cuisine.join(' • ')}</p>
                    <p className="text-gray-400 text-sm flex items-center gap-1"><MapPin size={14} /> {restaurant.address}</p>
                </div>

                <div className="flex gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 shadow-sm">
                     <div className="flex flex-col items-center px-4 border-r border-gray-200">
                        <div className="flex items-center gap-1 font-extrabold text-green-700 text-lg">
                            <span>{restaurant.rating}</span>
                            <Star size={16} fill="currentColor" />
                        </div>
                        <span className="text-xs text-gray-400 font-medium">1k+ Ratings</span>
                     </div>
                     <div className="flex flex-col items-center px-4">
                        <span className="font-extrabold text-gray-800 text-lg">{restaurant.deliveryTime}</span>
                        <span className="text-xs text-gray-400 font-medium">Delivery Time</span>
                     </div>
                </div>
            </div>
            
            {/* Dashed Decorator */}
            <div className="mt-6 pt-4 border-t border-dashed border-gray-200 flex items-center gap-2 text-gray-500 text-sm">
                <img src="https://cdn-icons-png.flaticon.com/512/3063/3063822.png" className="w-5 h-5 opacity-60" alt="cycling" />
                <span>{restaurant.priceForTwo} approx.</span>
            </div>
        </div>

        {/* Menu Section */}
        <div className="flex flex-col gap-10">
            {categories.map(cat => (
                <div key={cat} id={cat} className="scroll-mt-24">
                    <div className="flex items-center gap-4 mb-6">
                         <h3 className="text-xl font-bold text-gray-800">{cat}</h3>
                         <div className="h-0.5 bg-gray-200 flex-1 rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {items.filter(i => i.category === cat).map(item => (
                            <FoodItemCard key={item.id} item={item} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* Floating Cart Notification */}
      {itemCount > 0 && (
        <div className="fixed bottom-6 left-0 right-0 px-4 z-50 flex justify-center">
            <button 
                onClick={() => navigate('/cart')}
                className="bg-brand-600 text-white w-full max-w-2xl rounded-2xl p-4 shadow-float hover:shadow-xl hover:bg-brand-700 transition-all transform hover:-translate-y-1 flex items-center justify-between group"
            >
                <div className="flex flex-col items-start px-2">
                    <span className="text-xs font-semibold uppercase tracking-wider opacity-90">{itemCount} items added</span>
                    <span className="font-extrabold text-xl">₹{cartTotal.toFixed(0)}</span>
                </div>
                <div className="flex items-center gap-3 font-bold pr-2">
                    View Cart
                    <div className="bg-white/20 p-2 rounded-full group-hover:bg-white/30 transition-colors">
                         <ArrowLeft className="rotate-180" size={20} />
                    </div>
                </div>
            </button>
        </div>
      )}
    </div>
  );
};

export default RestaurantDetails;