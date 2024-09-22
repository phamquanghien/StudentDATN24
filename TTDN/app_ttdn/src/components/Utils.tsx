import { Tag } from "primereact/tag";

interface CompanyData {
    status: string;
    manager: string;
    position: string;
    name: string;
    phone: string;
    represent: string;
}

export const statusTemplate = (rowData: CompanyData) => {
    switch (rowData?.status) {
        case "Bình thường":
            return (
                <Tag
                    value={rowData?.status}
                    severity="success"
                    style={{
                        width: "100px",
                        padding: "7px",
                        borderRadius: "25px",
                        backgroundColor: "rgba(46, 184, 76, 0.1)",
                        color: "rgba(46, 184, 76, 1)",
                    }}
                />
            );

        case "Hỏng":
            return (
                <Tag
                    value={rowData?.status}
                    severity="danger"
                    style={{
                        width: "100px",
                        padding: "7px",
                        backgroundColor: "#FFD9D9",
                        color: "red",
                        borderRadius: "25px",
                    }}
                />
            );
        case "Đang sửa chữa":
            return (
                <Tag
                    value={rowData?.status}
                    severity="danger"
                    style={{
                        width: "100px",
                        padding: "7px",
                        borderRadius: "25px",
                        backgroundColor: "#F3DFCD",
                        color: "orange",
                    }}
                />
            );
        default:
            return rowData?.status;
    }
};

export const managerTemplate = (rowData: CompanyData) => {
    return (
        <div>
            <div>{rowData.represent}</div>
            <div style={{ color: "gray", fontSize: "0.8em" }}>
                {rowData.position}
            </div>
        </div>
    );
};

export const managerTemplate2 = (rowData: CompanyData) => {
    return (
        <div>
            <div>{rowData.manager}</div>
            <div style={{ color: "gray", fontSize: "0.8em" }}>
                {rowData.phone}
            </div>
        </div>
    );
};

export function formatDate(dateString: string | undefined): string {
    if (!dateString) {
        return "Ngày không hợp lệ";
    }

    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.getMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0
    const year = date.getFullYear();

    return `ngày ${day < 10 ? "0" + day : day} tháng ${
        month < 10 ? "0" + month : month
    } năm ${year}`;
}

export function formatDate2(dateString: string | undefined): string {
    if (!dateString) {
        return "Ngày không hợp lệ";
    }

    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.getMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0
    const year = date.getFullYear();

    return `${day < 10 ? "0" + day : day}/${
        month < 10 ? "0" + month : month
    }/${year}`;
}
