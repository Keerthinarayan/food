import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, CreditCard, Wallet, Truck, Recycle, CheckCircle2, ChevronRight, Leaf } from 'lucide-react';

const Checkout: React.FC = () => {
  const { cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
    const [isRecycleOptIn, setIsRecycleOptIn] = useState(false);
    const [isOrderPlaced, setIsOrderPlaced] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [isLoading, setIsLoading] = useState(false);
    const GREEN_PAY_URL = 'https://rebox-box.netlify.app/';

  const DELIVERY_FEE = 49;
  const TAX_RATE = 0.05;
  const tax = cartTotal * TAX_RATE;
  const finalTotal = cartTotal + tax + DELIVERY_FEE;

    const handlePlaceOrder = () => {
        if (paymentMethod === 'green-pay') {
            if (typeof window !== 'undefined') {
                window.location.href = GREEN_PAY_URL;
            }
            return;
        }

        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsOrderPlaced(true);
            setIsLoading(false);
            clearCart();
        }, 2000);
    };

  if (isOrderPlaced) {
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-700">
            <div className="w-24 h-24 bg-brand-100 rounded-full flex items-center justify-center mb-8 relative">
                <div className="absolute inset-0 border-4 border-brand-200 rounded-full animate-ping opacity-20"></div>
                <CheckCircle2 className="text-brand-600 w-12 h-12" strokeWidth={3} />
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-3">Payment Successful</h1>
            <p className="text-gray-500 mb-2 max-w-xs mx-auto">Your food is being prepared and will be with you shortly.</p>
            
            {isRecycleOptIn && (
                 <div className="mt-6 bg-green-50 border border-green-200 p-4 rounded-xl flex items-start gap-3 text-left max-w-sm mx-auto">
                    <Recycle className="text-green-600 shrink-0 mt-1" size={20} />
                    <div>
                        <p className="text-green-800 font-bold text-sm">You're an Eco Hero!</p>
                        <p className="text-green-700 text-xs mt-1">Thank you for opting to recycle. Please keep your cardboard boxes ready for the delivery partner.</p>
                    </div>
                 </div>
            )}
            
            <button 
                onClick={() => navigate('/')}
                className="mt-10 bg-brand-500 text-white px-10 py-3.5 rounded-full font-bold shadow-lg hover:bg-brand-600 transition-all"
            >
                Back to Home
            </button>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
        <div className="bg-white sticky top-0 z-40 px-4 py-4 flex items-center gap-4 shadow-sm">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <ArrowLeft className="text-gray-700" />
            </button>
            <h1 className="font-bold text-xl text-gray-800">Checkout</h1>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
            
            {/* Delivery Address */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-900 text-lg">Delivery Address</h3>
                    <button className="text-brand-600 font-bold text-sm hover:underline">Change</button>
                </div>
                <div className="flex items-start gap-4">
                    <div className="bg-white border border-gray-200 p-3 rounded-full shrink-0 shadow-sm">
                        <MapPin size={24} className="text-brand-500" />
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-800 text-base">Home</h4>
                        <p className="text-gray-500 text-sm mt-1 leading-relaxed">123, Green Street, Eco City, 90210<br/>Apartment 4B</p>
                    </div>
                </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4 text-lg">Payment Method</h3>
                <div className="space-y-3">
                    <label className={`flex items-center gap-4 p-4 border rounded-2xl cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-brand-500 bg-brand-50/50 ring-1 ring-brand-500' : 'border-gray-200 hover:border-gray-300'}`}>
                        <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="accent-brand-600 w-5 h-5" />
                        <div className="bg-gray-100 p-2 rounded-lg">
                             <CreditCard size={20} className="text-gray-700" />
                        </div>
                        <span className="font-medium text-gray-700 flex-1">Credit / Debit Card</span>
                    </label>
                    <label className={`flex items-center gap-4 p-4 border rounded-2xl cursor-pointer transition-all ${paymentMethod === 'upi' ? 'border-brand-500 bg-brand-50/50 ring-1 ring-brand-500' : 'border-gray-200 hover:border-gray-300'}`}>
                        <input type="radio" name="payment" value="upi" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} className="accent-brand-600 w-5 h-5" />
                         <div className="bg-gray-100 p-2 rounded-lg">
                             <Wallet size={20} className="text-gray-700" />
                        </div>
                        <span className="font-medium text-gray-700 flex-1">UPI</span>
                    </label>
                    <label className={`flex items-center gap-4 p-4 border rounded-2xl cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-brand-500 bg-brand-50/50 ring-1 ring-brand-500' : 'border-gray-200 hover:border-gray-300'}`}>
                        <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="accent-brand-600 w-5 h-5" />
                        <div className="bg-gray-100 p-2 rounded-lg">
                             <Truck size={20} className="text-gray-700" />
                        </div>
                        <span className="font-medium text-gray-700 flex-1">Cash on Delivery</span>
                    </label>
                    <label className={`flex items-center gap-4 p-4 border rounded-2xl cursor-pointer transition-all ${paymentMethod === 'green-pay' ? 'border-green-500 bg-green-50 ring-1 ring-green-500 shadow-sm' : 'border-gray-200 hover:border-gray-300'}`}>
                        <input type="radio" name="payment" value="green-pay" checked={paymentMethod === 'green-pay'} onChange={() => setPaymentMethod('green-pay')} className="accent-green-600 w-5 h-5" />
                        <div className="bg-green-100 p-2 rounded-lg">
                             <Leaf size={20} className="text-green-700" />
                        </div>
                        <div className="flex-1">
                            <span className="font-semibold text-gray-800">Green Pay</span>
                            <p className="text-xs text-gray-500 mt-0.5">Redirects you to our recycle rewards portal.</p>
                        </div>
                        <span className="text-[10px] font-bold text-green-700 uppercase">New</span>
                    </label>
                </div>
            </div>

            {/* RECYCLE OPTION - SPECIAL FEATURE */}
            <div className={`p-6 rounded-3xl border-2 transition-all duration-300 relative overflow-hidden ${isRecycleOptIn ? 'bg-gradient-to-br from-green-50 to-white border-green-500 shadow-md' : 'bg-white border-gray-200'}`}>
                <div className="flex items-start gap-4 relative z-10">
                    <div className={`p-3 rounded-full shrink-0 transition-colors ${isRecycleOptIn ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
                        <Recycle size={28} />
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-start">
                             <h3 className="font-bold text-gray-900 text-lg">Green Delivery</h3>
                             <label className="relative inline-flex items-center cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    checked={isRecycleOptIn} 
                                    onChange={(e) => setIsRecycleOptIn(e.target.checked)}
                                    className="sr-only peer" 
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                            </label>
                        </div>
                        <p className="text-gray-600 font-medium mt-1">Delivery agent will take cardboard or any other recyclable boxes.</p>
                        <p className={`text-sm mt-3 transition-colors leading-relaxed ${isRecycleOptIn ? 'text-green-700' : 'text-gray-500'}`}>
                            Help recycle! Hand over unused cardboard or boxes to the delivery agent.
                        </p>
                    </div>
                </div>
                {/* Background Decor */}
                {isRecycleOptIn && <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-green-200 rounded-full blur-3xl opacity-30"></div>}
            </div>
        </div>

        {/* Bottom Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <div className="max-w-2xl mx-auto flex items-center justify-between gap-6">
                 <div>
                    <span className="block text-[10px] text-gray-500 uppercase font-bold tracking-wide">Total to Pay</span>
                    <span className="text-2xl font-extrabold text-gray-900">₹{finalTotal.toFixed(0)}</span>
                 </div>
                 <button 
                    onClick={handlePlaceOrder}
                    disabled={isLoading}
                    className="flex-1 bg-brand-500 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-brand-600 hover:shadow-xl active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isLoading ? 'Processing...' : (
                        <>
                            Place Order <ChevronRight size={20} />
                        </>
                    )}
                </button>
            </div>
        </div>
    </div>
  );
};

export default Checkout;