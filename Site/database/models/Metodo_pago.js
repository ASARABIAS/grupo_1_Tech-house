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


    Metodo_pago.associate = function(models){
        Metodo_pago.hasMany(models.Producto_pago, {
            as: "Products_payment" ,
            foreignKey: "id_payment_method"
        })
    }

    return Metodo_pago;

}
