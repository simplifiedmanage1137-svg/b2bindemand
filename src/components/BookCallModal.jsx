import React, { useState } from 'react';
import { format } from 'date-fns';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const BookCallModal = ({ isOpen, onClose }) => {
  const [date, setDate] = useState(new Date());
  const [step, setStep] = useState(1);
  const [selectedTime, setSelectedTime] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    notes: ''
  });

  const timeSlots = [
    '8:00pm', '8:30pm', '8:45pm', '9:00pm',
    '9:15pm', '9:30pm', '9:45pm', '10:00pm',
    '10:15pm', '10:30pm'
  ];

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleNext = () => {
    if (selectedTime) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-3xl w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-500 hover:text-gray-700"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex items-center mb-8">
          <img
            src="https://api.dicebear.com/7.x/initials/svg?seed=MA&backgroundColor=005F73"
            alt="Profile"
            className="w-10 h-10 rounded-full mr-4"
          />
          <div>
            <h2 className="text-xl font-semibold mb-1">Chat with Manu (Demo)</h2>
            <p className="text-gray-600 text-sm">
              Chat with Manu, I don't like calls but Calcom is awesome so here we are.
            </p>
          </div>
        </div>

        {step === 1 ? (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <h3 className="text-lg font-medium mr-4">March 2025</h3>
                <div className="flex space-x-2">
                  <button className="px-4 py-1.5 rounded-lg bg-gray-100 text-sm font-medium">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <button className="px-4 py-1.5 rounded-lg bg-gray-100 text-sm font-medium">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1.5 rounded-lg bg-gray-100 text-sm font-medium">12h</button>
                <button className="px-3 py-1.5 rounded-lg bg-gray-200 text-sm font-medium">24h</button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="calendar-container">
                <Calendar
                  onChange={handleDateChange}
                  value={date}
                  minDate={new Date()}
                  className="rounded-lg border-0 shadow-sm"
                  tileClassName="rounded-lg"
                  navigationLabel={({ date }) => format(date, 'MMMM yyyy')}
                />
              </div>

              <div>
                <h4 className="font-medium mb-4 text-gray-900">
                  {format(date, 'EEEE, MMMM d, yyyy')}
                </h4>
                <div className="grid grid-cols-1 gap-2 max-h-[400px] overflow-y-auto pr-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => handleTimeSelect(time)}
                      className={`text-left px-4 py-3 rounded-lg border transition-all duration-200 ${
                        selectedTime === time
                          ? 'bg-[#005F73] text-white border-[#005F73]'
                          : 'hover:border-[#005F73] hover:bg-gray-50'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={handleNext}
                disabled={!selectedTime}
                className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                  selectedTime
                    ? 'bg-[#005F73] text-white hover:bg-[#004C5C]'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your name *
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005F73] focus:border-transparent transition-all duration-200"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email address *
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005F73] focus:border-transparent transition-all duration-200"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Please share anything that will help prepare for our meeting."
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005F73] focus:border-transparent transition-all duration-200 h-24 resize-none"
              />
            </div>

            <div className="flex justify-between items-center mt-8">
              <button
                type="button"
                onClick={handleBack}
                className="text-gray-600 hover:text-gray-800 font-medium"
              >
                Back
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#005F73] text-white rounded-lg hover:bg-[#004C5C] font-medium transition-all duration-200"
              >
                Confirm
              </button>
            </div>
          </form>
        )}

        <style jsx>{`
          .calendar-container .react-calendar {
            width: 100%;
            border: none;
            padding: 16px;
            border-radius: 12px;
            background: #fff;
          }
          .calendar-container .react-calendar__tile {
            padding: 12px;
            border-radius: 8px;
            font-size: 14px;
          }
          .calendar-container .react-calendar__tile:enabled:hover,
          .calendar-container .react-calendar__tile:enabled:focus {
            background-color: #e5e7eb;
          }
          .calendar-container .react-calendar__tile--active {
            background: #005F73 !important;
            color: white;
          }
          .calendar-container .react-calendar__tile--now {
            background: #f3f4f6;
          }
          .calendar-container .react-calendar__navigation {
            margin-bottom: 16px;
          }
          .calendar-container .react-calendar__navigation button:disabled {
            background-color: #f3f4f6;
          }
          .calendar-container .react-calendar__navigation button:enabled:hover,
          .calendar-container .react-calendar__navigation button:enabled:focus {
            background-color: #e5e7eb;
          }
          .calendar-container .react-calendar__month-view__weekdays {
            font-size: 14px;
            font-weight: 500;
          }
          .calendar-container .react-calendar__tile:disabled {
            background-color: #f3f4f6;
            color: #9ca3af;
          }
        `}</style>
      </div>
    </div>
  );
};

export default BookCallModal;
