import React, { useState } from 'react';
import { CreditCard, Wallet, Building } from 'lucide-react';
import type { Plan } from '../types';

interface PaymentFormProps {
  plan: Plan;
  onClose: () => void;
}

export function PaymentForm({ plan, onClose }: PaymentFormProps) {
  const [paymentMethod, setPaymentMethod] = useState<string>('card');

  const paymentMethods = [
    { id: 'card', name: 'Credit Card', icon: CreditCard },
    { id: 'crypto', name: 'Cryptocurrency', icon: Wallet },
    { id: 'bank', name: 'Bank Transfer', icon: Building },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <h2 className="text-2xl font-bold text-gray-900">Complete Your Purchase</h2>
        <p className="mt-2 text-gray-600">
          {plan.name} Plan - ${plan.price}/month
        </p>

        <div className="mt-6">
          <label className="text-sm font-medium text-gray-700">Payment Method</label>
          <div className="mt-2 space-y-3">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setPaymentMethod(method.id)}
                className={`w-full flex items-center p-3 border rounded-lg ${
                  paymentMethod === method.id
                    ? 'border-indigo-600 bg-indigo-50'
                    : 'border-gray-300 hover:border-indigo-300'
                }`}
              >
                <method.icon className="h-5 w-5 text-gray-700" />
                <span className="ml-3 font-medium text-gray-900">{method.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {paymentMethod === 'card' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Card Number
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="4242 4242 4242 4242"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="MM/YY"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    CVC
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="123"
                  />
                </div>
              </div>
            </>
          )}

          {paymentMethod === 'crypto' && (
            <div className="text-center p-4 border rounded-lg">
              <p className="text-gray-600">
                Cryptocurrency payment integration will be handled securely through a third-party provider.
              </p>
            </div>
          )}

          {paymentMethod === 'bank' && (
            <div className="text-center p-4 border rounded-lg">
              <p className="text-gray-600">
                Bank transfer details will be provided after confirmation.
              </p>
            </div>
          )}
        </div>

        <div className="mt-6 flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            className="flex-1 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Pay ${plan.price}
          </button>
        </div>
      </div>
    </div>
  );
}