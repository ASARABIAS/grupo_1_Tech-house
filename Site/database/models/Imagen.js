module.exports = (sequelize, dataTypes) => {
    let alias = "Imagen";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        image: {
            type: dataTypes.STRING
        },
        id_product: {
            type: dataTypes.INTEGER
        }
    };
    let config = {
        tableName: "Images",
        timestamps: false
    };
    const Imagen = sequelize.define(alias, cols, config);

    
    Imagen.associate = function(models){
        Imagen.belongsTo(models.Producto, {
            as: "products" ,
            foreignKey: "id_product"
        })
    }

    return Imagen;

}
