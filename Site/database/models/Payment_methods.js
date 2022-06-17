module.exports = (sequelize, dataTypes) => {
    let alias = "Payment_methods";
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
        tableName: "payment_methods",
        timestamps: false
    };
    const Payment_methods = sequelize.define(alias, cols, config);


    Payment_methods.associate = function(models){
        Payment_methods.belongsToMany(models.Products, {
            as: "products" ,
            through: "products_payment_methods",
            foreignKey: "id_payment_method",
            otherKey: "id_product",
            timestamps: false
        });
    }

    return Payment_methods;

}
