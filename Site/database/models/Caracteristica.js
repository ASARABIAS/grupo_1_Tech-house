module.exports = (sequelize, dataTypes) => {
    let alias = "Caracteristica";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: dataTypes.STRING
        },
        id_product: {
            type: dataTypes.INTEGER
        }
    };
    let config = {
        tableName: "Characteristics",
        timestamps: false
    };
    const Caracteristica = sequelize.define(alias, cols, config);

    Caracteristica.associate = function(models){
        Caracteristica.belongTo(models.Producto, {
            as: "product" ,
            foreignKey: "id_product"
        })
    },

    Caracteristica.associate = function(models){
        Caracteristica.hasMany(models.Principal, {
            as: "Principal" ,
            foreignKey: "id_characteristic"
        })
    }

    return Caracteristica;

}
