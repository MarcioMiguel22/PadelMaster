// types.ts
export interface Jogador {
  id: number;
  nome: string;
  vitorias: number;
  pontos: number;
}

export interface Time {
  jogadores: Jogador[];
  resultado: number;
}

export interface Campo {
  id: number;
  times: Time[];
}

interface AutoTableStyles {
  [key: string]: string | number | boolean;
}

interface AutoTableMargin {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

interface CellHookData {
  cell: {
    raw: string | number | boolean;
    styles: AutoTableStyles;
    [key: string]: any;
  };
  column: {
    index: number;
  };
  row: {
    index: number;
    raw: Array<string | number | boolean>;
  };
  settings: {
    theme: 'striped' | 'grid' | 'plain';
  };
  table: {
    id: string;
    settings: {
      margin: AutoTableMargin;
    };
    columns: Array<{ index: number }>;
    rows: Array<{ index: number; raw: Array<string | number | boolean> }>;
  };
  doc: jsPDF;
}

interface AutoTableOptions {
  head: Array<Array<string | number>>;
  body: Array<Array<string | number>>;
  startY?: number;
  margin?: AutoTableMargin;
  theme?: 'striped' | 'grid' | 'plain';
  styles?: AutoTableStyles;
  headStyles?: AutoTableStyles;
  bodyStyles?: AutoTableStyles;
  footStyles?: AutoTableStyles;
  alternateRowStyles?: AutoTableStyles;
  tableLineColor?: number | [number, number, number];
  tableLineWidth?: number;
  didParseCell?: (data: CellHookData) => void;
  willDrawCell?: (data: CellHookData) => void;
  didDrawCell?: (data: CellHookData) => void;
  didDrawPage?: (data: { pageNumber: number; totalPages: number; table: any }) => void;
}

declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: AutoTableOptions) => jsPDF;
  }
}
