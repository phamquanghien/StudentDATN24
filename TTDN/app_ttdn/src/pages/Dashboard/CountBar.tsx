import { Image } from "antd";
import React, { useEffect } from "react";
import logo from "@/assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getCountsRequest } from "@/store/Dashboard/slice.ts";
import { RootState } from "@/store";

const CountBar = () => {
  const dispatch = useDispatch();

  const { counts } = useSelector(
    (state: RootState) => ({
      counts: state.Dashboard.counts.data,
    }),
    shallowEqual,
  );

  useEffect(() => {
    dispatch(getCountsRequest());
  }, [dispatch]);

  return (
    <div className="flex justify-between gap-5">
      <div className="flex bg-white rounded-xl p-5 flex-1 relative items-center cursor-pointer drop-shadow-md">
        <Image
          src={logo}
          alt="total-projects"
          width={50}
          preview={false}
        />
        <div className="ml-5">
          <h2 className="text-gray-500">Tổng sinh viên</h2>
          <p className="">{counts?.all}</p>
        </div>
        <div className="absolute right-2">
          <FontAwesomeIcon icon={faAngleRight} />
        </div>
      </div>
      <div className="flex bg-white rounded-xl p-5 flex-1 relative items-center cursor-pointer drop-shadow-md">
        <Image
          src={logo}
          alt="total-projects"
          width={50}
          preview={false}
        />
        <div className="ml-5">
          <h2 className="text-gray-500">Hoàn thành thực tập</h2>
          <p className="">{counts?.done}</p>
        </div>
        <div className="absolute right-2">
          <FontAwesomeIcon icon={faAngleRight} />
        </div>
      </div>
      <div className="flex bg-white rounded-xl p-5 flex-1 relative items-center cursor-pointer drop-shadow-md">
        <Image
          src={logo}
          alt="total-projects"
          width={50}
          preview={false}
        />
        <div className="ml-5">
          <h2 className="text-gray-500">Đang thực tập</h2>
          <p className="">{counts?.during + counts?.waiting}</p>
        </div>
        <div className="absolute right-2">
          <FontAwesomeIcon icon={faAngleRight} />
        </div>
      </div>
      <div className="flex bg-white rounded-xl p-5 flex-1 relative items-center cursor-pointer drop-shadow-md">
        <Image
          src={logo}
          alt="total-projects"
          width={50}
          preview={false}
        />
        <div className="ml-5">
          <h2 className="text-gray-500">Không đạt</h2>
          <p className="">{counts?.failed}</p>
        </div>
        <div className="absolute right-2">
          <FontAwesomeIcon icon={faAngleRight} />
        </div>
      </div>
    </div>
  );
};

export default CountBar;
