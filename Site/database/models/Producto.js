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
        warranty_time: {
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

    Producto.associate = function(models){
        Producto.hasMany(models.Producto_pago, {
            as: "Payment" ,
            foreignKey: "id_product"
        });
    },

    Producto.associate = function(models){
        Producto.hasMany(models.Imagen, {
            as: "images" ,
            foreignKey: "id_product"
        });
    },

        Producto.associate = function(models){
        Producto.hasMany(models.Color, {
            as: "Color" ,
            foreignKey: "id_product"
        });
    },

    Producto.associate = function(models){
        Producto.hasMany(models.Caracteristica, {
            as: "Characteristics" ,
            foreignKey: "id_product"
        });
    },

    Producto.associate = function(models){
        Producto.belongsTo(models.Categoria, {
            as: "categories" ,
            foreignKey: "id_category"
        });
    },

    Producto.associate = function(models){
        Producto.belongsToMany(models.Producto_pago, {
            as: "producto_pago" ,
            through: "products_payment_methods",
            foreignKey: "id_product",
            otherKey: "id_payment_method",
            timestamps: false
        });
    }


    return Producto;

}
