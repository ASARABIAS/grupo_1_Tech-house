module.exports = (sequelize, dataTypes) => {
    let alias = "Producto";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING
        },
        specifications: {
            type: dataTypes.STRING
        },
        warranty: {
            type: dataTypes.STRING(450)
        },
        price: {
            type: dataTypes.INTEGER
        },
        discount: {
            type: dataTypes.INTEGER
        },
        quota: {
            type: dataTypes.STRING
        },
        shipping: {
            type: dataTypes.INTEGER
        },
        return_value: {
            type: dataTypes.INTEGER
        },
        id_category: {
            type: dataTypes.INTEGER
        }
    };
    let config = {
        tableName: "Products",
        timestamps: false
    };
    const Producto = sequelize.define(alias, cols, config);

    return Producto;

}
