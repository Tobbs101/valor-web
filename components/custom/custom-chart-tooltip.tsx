import React from "react";

const CustomChartToolTip = (props: {
  active?: boolean;
  payload?: Array<Record<string, unknown>>;
  label?: string;
}) => {
  return (
    <div className="bg-black text-white p-2 rounded-md h-[60px]">
      <div className="list px-2">
        {props?.payload?.map((item, idx) => (
          <div className="flex flex-col gap-1" key={idx}>
            <p className="text-[13px] text-center font-extrabold">
              {item.value as string}
            </p>
            <div className="flex items-center gap-2">
              <div className="bg-emerald-500 w-1 h-1 rounded-full"></div>
              <span className={`text-[11px] capitalize text-[${item?.color}]`}>
                {item.name as string}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomChartToolTip;
