import React from "react";
import { ICouncil } from "@/models/Council.ts";
import { Divider, Table } from "antd";
import dayjs from "dayjs";

interface CouncilDetailProps {
  council?: ICouncil;
}

const CouncilDetail: React.FC<CouncilDetailProps> = ({ council }) => {
  const columns: any = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      align: "center",
      render: (text: string, record: any, index: number) => index + 1,
    },
    {
      title: "Tên sinh viên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "MSSV",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Lớp",
      dataIndex: "class",
      key: "class",
    },
    {
      title: "GVHD",
      dataIndex: "advisorName",
      key: "advisorName",
    },
  ];

  return (
    <div className="md:w-2/3 bg-white h-full rounded-normal p-4">
      {council && (
        <>
          <div className="font-bold text-xl">{council?.name}</div>
          <div className="text-gray-500 pb-3 flex justify-between">
            <span>Bộ môn: {council?.department.name}</span>
            <span>
              Thời gian nghiệm thu:{" "}
              {dayjs(council?.reviewTime).format("DD/MM/YYYY HH:mm")}
            </span>
            <span>Địa điểm nghiệm thu: {council?.location}</span>
          </div>
          <Divider className="mt-0 mb-5" />
          <table className="w-full border-collapse mb-5">
            <tbody>
              <tr>
                <th className="text-left border border-gray-300 p-2 w-1/3">
                  Thành viên hội đồng
                </th>
                <td className="text-left border border-gray-300 p-2 w-2/3">
                  {council?.advisors.map((advisor) => (
                    <div key={advisor.id}>
                      {advisor.name} - {advisor.code}
                    </div>
                  ))}
                </td>
              </tr>
            </tbody>
          </table>
          <Table
            columns={columns}
            dataSource={council?.students}
            pagination={false}
            rowKey={(record) => record.id}
          />
        </>
      )}
    </div>
  );
};

export default CouncilDetail;
