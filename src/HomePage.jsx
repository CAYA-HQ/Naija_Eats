const HomePage = () => {
  const budgets = ["4000-5000", "5500-7000", ""];
  return (
    <div className="pt-51">
      <h1 className="text-[32px] text-left font-bold mb-8 px-5">
        What's your weekly food budget?
      </h1>
      <ul className="flex-col justify-start items-center gap-5">
        {budgets.map((budget) => (
          <li className="flex items-center gap-1 p-4" key={budget}>
            <input type="checkbox" />
            {budget}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
