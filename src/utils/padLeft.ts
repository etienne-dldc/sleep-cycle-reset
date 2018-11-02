export default function padLeft(data: string | number, size: number, paddingChar?: string) {
  return (new Array(size + 1).join(paddingChar || '0') + String(data)).slice(-size);
}
