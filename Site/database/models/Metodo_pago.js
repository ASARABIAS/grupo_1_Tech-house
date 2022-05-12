module.exports = (sequelize, dataTypes) => {
    let alias = "Metodo_pago";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING
        },
        image: {
            type: dataTypes.STRING
        }
    };
    let config = {
        tableName: "Paymen_methods",
        timestamps: false
    };
    const Metodo_pago = sequelize.define(alias, cols, config);

    return Metodo_pago;

}
