export interface ViajeI {
    id?: string;
    conductorId: string;
    conductorNombre: string;
    destino: string;
    capacidad: number;
    costo: number;
    fechaHora: any;
    pasajeros?: string[]; 
  }
  