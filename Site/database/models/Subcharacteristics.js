module.exports = (sequelize, dataTypes) => {
    let alias = "Subcharacteristics";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        subtitle: {
            type: dataTypes.STRING
        },
        description: {
            type: dataTypes.STRING
        },
        id_characteristic: {
            type: dataTypes.INTEGER
        }
    };
    let config = {
        tableName: "subcharacteristics",
        timestamps: false,
        hooks: {
            afterDestroy: async(instance) => {
                await instance.setPrincipals([])
            }
        }
    };
    const Subcharacteristics = sequelize.define(alias, cols, config);

    Subcharacteristics.associate = function(models){
    Subcharacteristics.belongsToMany(models.Products, {
        as: "products" ,
        through: "products_subcharacteristics",
        foreignKey: "id_product",
        otherKey: "id_characteristics",
        timestamps: false
    });
    
    Subcharacteristics.belongsTo(models.Characteristics, {
        as: "characteristics",
        foreignKey: "id_characteristics"
    });
    }

    return Subcharacteristics;

}
