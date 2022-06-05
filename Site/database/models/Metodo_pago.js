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
        tableName: "Payment_methods",
        timestamps: false
    };
    const Metodo_pago = sequelize.define(alias, cols, config);


    Metodo_pago.associate = function(models){
        Metodo_pago.belongsToMany(models.Producto, {
            as: "producto" ,
            through: "products_payment_methods",
            foreignKey: "id_payment_method",
            otherKey: "id_product",
            timestamps: false
        });
    }

    return Metodo_pago;

}
