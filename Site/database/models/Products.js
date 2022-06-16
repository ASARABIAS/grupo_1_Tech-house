module.exports = (sequelize, dataTypes) => {
    let alias = "Products";
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
        warranty_text: {
            type: dataTypes.STRING(450)
        },
        price: {
            type: dataTypes.INTEGER
        },
        discount: {
            type: dataTypes.INTEGER
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
        timestamps: false,
        deletedAt: false,
        paranoid: true
    };
    const Products = sequelize.define(alias, cols, config);

    Products.associate = function(models) {
        Products.hasMany(models.Images, {
            as: "images",
            foreignKey: "id_product"
        });

        Products.belongsToMany(models.Subcharacteristics, {
            as: "subcharacteristics" ,
            through: "Products_subcharacteristics",
            foreignKey: "id_product",
            otherKey: "id_characteristic",
            timestamps: false
        });

        Products.belongsTo(models.Categories, {
            as: "categories",
            foreignKey: "id_category"
        });
        Products.belongsToMany(models.Payment_methods, {
            as: "payment_methods",
            through: "products_payment_methods",
            foreignKey: "id_product",
            otherKey: "id_payment_method",
            timestamps: false
        });
    }

    return Products;

}