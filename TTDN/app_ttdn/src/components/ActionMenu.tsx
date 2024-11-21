import React from "react";
import { Button, Dropdown } from "antd";
import {
  EllipsisVerticalIcon,
  PaintBrushIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/16/solid";

interface ActionMenuProps {
  onEdit?: () => void;
  onDelete?: () => void;
  type?: string;
  onApproveCompany?: () => void;
  onApproveTopic?: () => void;
  onImportScore?: () => void;
  approveStatus?: string;
}

const ActionMenu: React.FC<ActionMenuProps> = ({
  onEdit,
  onDelete,
  type,
  approveStatus,
  onApproveCompany,
  onApproveTopic,
  onImportScore,
}) => {
  const items = [
    {
      label: "Chỉnh sửa",
      key: "1",
      icon: <PencilSquareIcon className="w-5 h-5" />,
      onClick: onEdit,
    },
    {
      label: "Xóa",
      key: "2",
      icon: <TrashIcon className="text-red-500 w-5 h-5" />,
      onClick: onDelete,
    },
  ];

  if (type === "student" && approveStatus === "Chờ duyệt địa điểm") {
    items.unshift({
      label: "Duyệt ĐĐTT",
      key: "3",
      icon: <CheckCircleIcon className="w-5 h-5 text-primary" />,
      onClick: onApproveCompany,
    });
  }

  if (type === "student" && approveStatus === "Chờ duyệt đề tài") {
    items.unshift({
      label: "Duyệt đề tài",
      key: "4",
      icon: <CheckCircleIcon className="w-5 h-5 text-primary" />,
      onClick: onApproveTopic,
    });
  }

  if (type === "student" && approveStatus === "Chờ bảo vệ") {
    items.unshift({
      label: "Nhập điểm",
      key: "5",
      icon: <PaintBrushIcon className="w-5 h-5 text-primary" />,
      onClick: onImportScore,
    });
  }

  return (
    <Dropdown
      menu={{ items }}
      placement="bottomRight"
      arrow
      overlayClassName="custom-dropdown"
      trigger={["click"]}
    >
      <Button
        type="text"
        className="no-hover-button"
      >
        <EllipsisVerticalIcon className="w-5 h-5" />
      </Button>
    </Dropdown>
  );
};

export default ActionMenu;
