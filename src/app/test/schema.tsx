export interface DataRecord {
    empresa: string;
    material: string;
    volumen: string;
    fecha: string;
    placa: string;
    idCamion: string;
    operador: string;
    checador: string;
}

export interface QueryViewRequest {
    filterName: string;
    filters: string;
    userName: string;
}

