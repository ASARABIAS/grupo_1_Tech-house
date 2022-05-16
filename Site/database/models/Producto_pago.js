module.exports = (sequelize, dataTypes) => {
    let alias = "Producto_pago";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_product: {
            type: dataTypes.INTEGER
        },
        id_payment_method: {
            type: dataTypes.INTEGER
        }
    };
    let config = {
        tableName: "Products_payment_methods",
        timestamps: false
    };
    const Producto_pago = sequelize.define(alias, cols, config);

    return Producto_pago;

}
