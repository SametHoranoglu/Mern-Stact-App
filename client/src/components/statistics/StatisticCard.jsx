const StatisticCard = ({ title, amount, img }) => {
  return (
    <div className="cart-item bg-gray-800 p-8 rounded-lg">
      <div className="flex gap-x-4">
        <div className="rounded-full bg-white w-16 h-16 p-1">
          <img src={img} alt="" className="rounded-full" />
        </div>
        <div className="text-white">
          <p className="mb-2 text-lg font-medium text-gray-400">{title}</p>
          <p className="text-lg font-semibold text-gray-200">{amount}</p>
        </div>
      </div>
    </div>
  );
};

export default StatisticCard;
