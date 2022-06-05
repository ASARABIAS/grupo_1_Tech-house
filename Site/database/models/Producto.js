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
    const Producto = sequelize.define(alias, cols, config);

    Producto.associate = function(models) {
        Producto.hasMany(models.Producto_pago, {
            as: "Payment",
            foreignKey: "id_product"
        });
        Producto.hasMany(models.Imagen, {
            as: "images",
            foreignKey: "id_product"
        });
        /*
        Producto.hasMany(models.Color, {
            as: "colors" ,
            foreignKey: "id_product"
        });
        Producto.hasMany(models.Caracteristica, {
            as: "characteristics" ,
            foreignKey: "id_product"
        });
        */
        Producto.belongsTo(models.Categoria, {
            as: "categories",
            foreignKey: "id_category"
        });
        Producto.belongsToMany(models.Metodo_pago, {
            as: "metodo_pago",
            through: "products_payment_methods",
            foreignKey: "id_product",
            otherKey: "id_payment_method",
            timestamps: false
        });
    }

    return Producto;

}