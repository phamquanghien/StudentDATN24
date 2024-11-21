import React from "react";
import { notification } from "antd";
import Category from "@/pages/Council/Category.tsx";
import { useDispatch } from "react-redux";
import { ICouncil } from "@/models/Council.ts";
import CouncilDetail from "@/pages/Council/CouncilDetail.tsx";

const Council = () => {
  const [api, contextHolder] = notification.useNotification();
  const [selectedCouncil, setSelectedCouncil] = React.useState<
    ICouncil | undefined
  >(undefined);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col md:flex-row gap-4 rounded-normal h-full">
      {contextHolder}
      <Category
        selectedCouncil={selectedCouncil}
        setSelectedCouncil={setSelectedCouncil}
        api={api}
      />
      <CouncilDetail council={selectedCouncil} />
    </div>
  );
};

export default Council;
