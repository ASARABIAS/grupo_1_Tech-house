module.exports = (sequelize, dataTypes) => {
    let alias = "Products_subcharacteristics";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_products: {
            type: dataTypes.INTEGER
        },
        id_subcharacteristics: {
            type: dataTypes.INTEGER
        }
    };
    let config = {
        tableName: "products_characteristics",
        timestamps: false,
        hooks: {
            afterDestroy: async(instance) => {
                await instance.setPrincipals([])
            }
        }
    };
    const Products_subcharacteristics = sequelize.define(alias, cols, config);

    return Products_subcharacteristics;

}
