export interface ExcelUploadSummary {
  processedRows: number;
  createdCategories: number;
  createdBooks: number;
  updatedBooks: number;
  skippedRows: number;
  errors: { row: number; message: string }[];
}
