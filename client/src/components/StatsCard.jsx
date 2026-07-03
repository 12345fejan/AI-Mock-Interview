const colors = {
  blue: "bg-blue-500",
  green: "bg-green-500",
  orange: "bg-orange-500",
  purple: "bg-purple-500",
};

const StatsCard = ({ title, value, color }) => {
  return (
    <div className={`${colors[color]} text-white rounded-xl p-6 shadow-lg`}>
      <h3 className="text-lg">{title}</h3>
      <h1 className="text-4xl font-bold mt-4">{value}</h1>
    </div>
  );
};

export default StatsCard;