export const BookOfficeHours = () => {
  const appointmentUrl =
    "https://calendar.google.com/calendar/appointments/schedules/AcZssZ3CMLgDECh21NpasAuQLdP4dmNNKtQESzJz8nfd7ILMXpFFRecBxhKb8Nej1DDTRC-DTcY9VWXk";

  return (
    <div>
      <div className="mb-8">
        <hr className="border-2 border-[#D00D2D] w-24 mb-4" />
        <h2 className="mb-3 text-3xl font-light tracking-wide text-gray-900">
          Book <span className="text-[#891326]">Office Hours</span> Here
        </h2>
        <p className="text-sm font-light tracking-wide text-gray-600 mb-6">
          Schedule a consultation with our library staff for research
          assistance, resource guidance, or any questions you may have.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <iframe
          src={appointmentUrl}
          style={{ border: 0 }}
          width="100%"
          height="600"
          
          title="Book Office Hours"
        />
      </div>
    </div>
  );
};
