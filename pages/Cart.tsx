import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ArrowLeft, ShieldCheck } from 'lucide-react';

const Cart: React.FC = () => {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, itemCount } = useCart();
  const navigate = useNavigate();

  const DELIVERY_FEE = 49;
  const TAX_RATE = 0.05;
  const tax = cartTotal * TAX_RATE;
  const finalTotal = cartTotal + tax + DELIVERY_FEE;

  if (cartItems.length === 0) {
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
            <div className="w-64 h-64 bg-gray-50 rounded-full flex items-center justify-center mb-8 relative">
                 <div className="absolute inset-0 bg-brand-50 rounded-full animate-pulse"></div>
                 <img src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png" alt="Empty Cart" className="w-32 opacity-80 relative z-10" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-8 text-center max-w-xs">Good food is always cooking! Go ahead, order some yummy items from the menu.</p>
            <button 
                onClick={() => navigate('/')}
                className="bg-brand-600 text-white px-8 py-3.5 rounded-xl font-bold shadow-lg hover:bg-brand-700 hover:shadow-xl transition-all"
            >
                See Restaurants Near You
            </button>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-28">
      <div className="bg-white sticky top-0 z-40 px-4 py-4 flex items-center gap-4 shadow-sm border-b border-gray-100">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft className="text-gray-700" />
        </button>
        <h1 className="font-bold text-xl text-gray-800">Your Cart</h1>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        
        {/* Cart Items Card */}
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100">
            {cartItems.map((item, idx) => (
                <div key={item.id} className={`p-5 flex items-start gap-4 ${idx !== cartItems.length - 1 ? 'border-b border-gray-100' : ''}`}>
                    <div className="w-4 h-4 mt-1 border-[1.5px] flex items-center justify-center rounded-[4px] shrink-0 self-start border-gray-400">
                         <div className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-green-600' : 'bg-red-600'}`}></div>
                    </div>
                    <div className="flex-1">
                        <h3 className="font-medium text-gray-800 text-base">{item.name}</h3>
                        <p className="text-gray-500 text-sm mt-0.5">₹{item.price}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                        <div className="flex items-center border border-gray-200 rounded-lg bg-white h-9 shadow-sm">
                            <button onClick={() => quantityControl(item, -1)} className="w-8 h-full text-gray-500 hover:text-brand-600 flex items-center justify-center hover:bg-gray-50 rounded-l-lg transition-colors">
                                <Minus size={14} />
                            </button>
                            <span className="w-8 text-center text-sm font-bold text-brand-700">{item.quantity}</span>
                            <button onClick={() => quantityControl(item, 1)} className="w-8 h-full text-brand-600 hover:text-brand-700 flex items-center justify-center hover:bg-gray-50 rounded-r-lg transition-colors">
                                <Plus size={14} />
                            </button>
                        </div>
                        <span className="text-sm font-bold text-gray-900">₹{(item.price * item.quantity).toFixed(0)}</span>
                    </div>
                </div>
            ))}
            <div className="bg-gray-50 p-4 flex items-center gap-3 text-sm text-gray-500 border-t border-gray-100">
                <ShieldCheck size={18} className="text-green-600" />
                Wait time: <span className="font-bold text-gray-700">30-40 mins</span> | Free delivery applied
            </div>
        </div>

        {/* Bill Details */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wider">Bill Details</h3>
            <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                    <span>Item Total</span>
                    <span>₹{cartTotal.toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                    <span className="flex items-center gap-1">Delivery Fee <span className="bg-brand-100 text-brand-600 text-[10px] px-1 rounded font-bold">INFO</span></span>
                    <span>₹{DELIVERY_FEE}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                    <span>Taxes and Charges</span>
                    <span>₹{tax.toFixed(0)}</span>
                </div>
                <div className="border-t border-dashed border-gray-300 pt-4 mt-2 flex justify-between items-center">
                    <span className="font-bold text-gray-900 text-lg">To Pay</span>
                    <span className="font-bold text-gray-900 text-lg">₹{finalTotal.toFixed(0)}</span>
                </div>
            </div>
        </div>

        {/* Policy Note */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm">
            <h4 className="font-bold text-gray-800 text-sm mb-1">Cancellation Policy</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
                Review your order and address details to avoid cancellations. 
                <span className="text-brand-500 font-medium"> Note: </span> 
                Cancellations after the restaurant has started preparing your order may incur a cancellation fee.
            </p>
        </div>
      </div>

      {/* Checkout Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="max-w-2xl mx-auto flex gap-4">
             <div className="flex-1">
                 <button 
                    onClick={() => navigate('/checkout')}
                    className="w-full bg-brand-500 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-brand-600 active:scale-[0.99] transition-all flex justify-between px-6 items-center"
                >
                    <div className="flex flex-col items-start text-left">
                        <span className="text-white text-lg">₹{finalTotal.toFixed(0)}</span>
                        <span className="text-[10px] text-white/80 font-medium uppercase tracking-wide">Total</span>
                    </div>
                    <div className="flex items-center gap-2">
                        Proceed to Pay
                        <ArrowLeft className="rotate-180" size={18} />
                    </div>
                </button>
             </div>
        </div>
      </div>
    </div>
  );
  
  function quantityControl(item: any, delta: number) {
      if (item.quantity === 1 && delta === -1) {
          removeFromCart(item.id);
      } else {
          updateQuantity(item.id, delta);
      }
  }
};

export default Cart;