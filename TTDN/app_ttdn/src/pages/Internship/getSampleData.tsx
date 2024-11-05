const generateSampleData = () => {
    const firstNames = ['Nguyễn', 'Trần', 'Lê', 'Phạm', 'Hoàng', 'Phan', 'Vũ', 'Đặng', 'Bùi', 'Đỗ'];
    const middleNames = ['Văn', 'Thị', 'Đức', 'Hoàng', 'Minh', 'Thành', 'Hồng', 'Quang', 'Thúy', 'Thanh'];
    const lastNames = ['An', 'Bình', 'Cường', 'Dũng', 'Em', 'Phương', 'Giang', 'Hải', 'Hùng', 'Khang'];

    const courses = ['K64', 'K65', 'K66'];
    const classes = ['DCCTKT65A', 'DCCTKT65B', 'DCCTKT65C', 'DCCTKT64A', 'DCCTKT64B', 'DCCTKT66A'];
    const majors = ['Tin học kinh tế', 'Công nghệ phần mềm', 'Hệ thống thông tin', 'Khoa học máy tính'];
    const advisors = [
        'Phạm Quang Hiển',
        'Dương Thị Hiền Thanh',
        'Nguyễn Thế Bình',
        'Phạm Thị Nguyệt',
        'Nguyễn Văn Nam',
        'Trần Thị Mai',
        'Lê Văn Thành',
        'Hoàng Minh Đức'
    ];
    const companies = [
        'Công ty TNHH XYZ',
        'Công ty TNHH MTV ABC',
        'FPT Software',
        'Viettel Solutions',
        'MISA JSC',
        'VNG Corporation',
        'Tập đoàn VNPT',
        'Nash Tech',
        'CMC Global',
        'NTT Data Vietnam'
    ];
    const councils = ['', 'Hội đồng 1', 'Hội đồng 2', 'Hội đồng 3', 'Hội đồng 4', 'Hội đồng 5'];
    const statuses = ['Mới', 'Đang thực tập', 'Chờ bảo vệ', 'Hoàn thành', 'Không đạt'];

    const sampleData = [];

    for (let i = 0; i < 100; i++) {
        const studentIdNum = 2021050000 + i;
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const middleName = middleNames[Math.floor(Math.random() * middleNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        const status = statuses[Math.floor(Math.random() * statuses.length)];

        const record = {
            studentId: studentIdNum.toString(),
            name: `${firstName} ${middleName} ${lastName}`,
            course: courses[Math.floor(Math.random() * courses.length)],
            class: classes[Math.floor(Math.random() * classes.length)],
            major: majors[Math.floor(Math.random() * majors.length)],
            advisor: status === 'Mới' ? '' : advisors[Math.floor(Math.random() * advisors.length)],
            company: status === 'Mới' ? '' : companies[Math.floor(Math.random() * companies.length)],
            timeStart: '05/08/2024',
            timeEnd: '15/10/2024',
            council: ['Mới', 'Đang thực tập'].includes(status) ? '' : councils[Math.floor(Math.random() * councils.length)],
            status: status
        };

        sampleData.push(record);
    }

    return sampleData;
};

export const dataInternship = generateSampleData();