export const renderOptions = (list: any) => {
  return list.map((item: any) => ({
    value: item.id,
    label: item.name,
  }));
};
