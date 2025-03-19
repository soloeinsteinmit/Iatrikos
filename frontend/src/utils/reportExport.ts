import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";

interface ExportOptions {
  title: string;
  data: any[];
  format: "pdf" | "csv" | "excel";
}

export const exportReport = ({ title, data, format }: ExportOptions) => {
  switch (format) {
    case "pdf":
      exportToPDF(title, data);
      break;
    case "excel":
      exportToExcel(title, data);
      break;
    case "csv":
      exportToCSV(title, data);
      break;
  }
};

const exportToPDF = (title: string, data: any[]) => {
  const doc = new jsPDF();
  doc.text(title, 20, 10);
  // Add more PDF formatting logic here
  doc.save(`${title}.pdf`);
};

const exportToExcel = (title: string, data: any[]) => {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Report");
  XLSX.writeFile(wb, `${title}.xlsx`);
};

const exportToCSV = (title: string, data: any[]) => {
  const ws = XLSX.utils.json_to_sheet(data);
  const csv = XLSX.utils.sheet_to_csv(ws);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${title}.csv`;
  link.click();
};
