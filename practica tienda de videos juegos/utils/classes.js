
export class Videojuego {
    constructor(titulo, desarrollador, genero, sku, stock, precioUnitario) {
        this.titulo = titulo;
        this.desarrollador = desarrollador;
        this.genero = genero;
        this.sku = sku;
        this.stock = stock;
        this.precioUnitario = precioUnitario;
        this.valorTotal = this.calcularValorTotal(); 
    }

    calcularValorTotal() {
        return this.stock * this.precioUnitario;
    }

    
    getDetails() {
        return {
            titulo: this.titulo,
            desarrollador: this.desarrollador,
            genero: this.genero,
            sku: this.sku,
            stock: this.stock,
            precioUnitario: this.precioUnitario.toFixed(2),
            valorTotal: this.valorTotal.toFixed(2),
            plataforma: null, 
            tipoDeEmbalaje: null, 
            contenidoExtra: null, 
            edicionLimitada: null, 
            tamanoDescarga: null, 
            plataformasSoportadas: null 
        };
    }
}


export class VideojuegoFisico extends Videojuego {
    constructor(titulo, desarrollador, genero, sku, stock, precioUnitario, plataforma, tipoDeEmbalaje) {
        super(titulo, desarrollador, genero, sku, stock, precioUnitario);
        this.plataforma = plataforma;
        this.tipoDeEmbalaje = tipoDeEmbalaje;
    }

    getDetails() {
        const baseDetails = super.getDetails();
        return {
            ...baseDetails,
            plataforma: this.plataforma,
            tipoDeEmbalaje: this.tipoDeEmbalaje
        };
    }
}


export class VideojuegoDigital extends Videojuego {
    constructor(titulo, desarrollador, genero, sku, stock, precioUnitario, tamanoDescarga, plataformasSoportadas) {
        super(titulo, desarrollador, genero, sku, stock, precioUnitario);
        this.tamanoDescarga = tamanoDescarga;
        this.plataformasSoportadas = plataformasSoportadas; 
    }

    getDetails() {
        const baseDetails = super.getDetails();
        return {
            ...baseDetails,
            tamanoDescarga: this.tamanoDescarga,
            plataformasSoportadas: this.plataformasSoportadas.join(', ')
        };
    }
}


export class EdicionEspecial extends VideojuegoFisico {
    constructor(titulo, desarrollador, genero, sku, stock, precioUnitario, plataforma, tipoDeEmbalaje, contenidoExtra, edicionLimitada) {
        super(titulo, desarrollador, genero, sku, stock, precioUnitario, plataforma, tipoDeEmbalaje);
        this.contenidoExtra = contenidoExtra;
        this.edicionLimitada = edicionLimitada;
    }

    getDetails() {
        const baseDetails = super.getDetails();
        return {
            ...baseDetails,
            contenidoExtra: this.contenidoExtra,
            edicionLimitada: this.edicionLimitada ? 'Sí' : 'No'
        };
    }
}