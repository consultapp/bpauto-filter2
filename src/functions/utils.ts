export function getIdByCode(data: CarApiItem[], code: string) {
  return (
    (data as CarApiItem[]).filter((item) => item.code === code)[0]?.id || ""
  );
}

export function getItemById(data: CarApiItem[], id: string) {
  if (!id) return { name: "" };

  return (data as CarApiItem[]).filter((item) => item.id === id)[0] || "";
}
