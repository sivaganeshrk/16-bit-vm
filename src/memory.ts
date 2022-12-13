export const createMemory = (sizeInBytes: number) => {
  const arrayBuffer = new ArrayBuffer(sizeInBytes);
  const dataView = new DataView(arrayBuffer);
  return dataView;
};
