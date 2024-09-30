export const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col p-4 max-w-xs mx-auto mt-5">
      <div className="text-2xl mb-2">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="font-semibold text-gray-600">{description}</p>
    </div>
  );
};
