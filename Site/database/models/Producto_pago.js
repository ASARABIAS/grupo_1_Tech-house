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

    Producto_pago.associate = function(models){
        Producto_pago.hasMany(models.Producto, {
            as: "Product" ,
            foreignKey: "id_product"
        });
    },

    
    Producto_pago.associate = function(models){
        Producto_pago.belongsTo(models.Metodo_pago, {
            as: "Payment_methods" ,
            foreignKey: "id_payment_method"
        });
    },

    Producto_pago.associate = function(models){
        Producto_pago.belongsToMany(models.Producto, {
            as: "producto" ,
            through: "products",
            foreignKey: "id_product",
            otherKey: "id_payment_method",
            timestamps: false
        });
    }

    return Producto_pago;

}
