module.exports = (sequelize, dataTypes) => {
    let alias = "Characteristics";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: dataTypes.STRING
        }
    };
    let config = {
        tableName: "characteristics",
        timestamps: false,
        hooks: {
            afterDestroy: async(instance) => {
                await instance.setPrincipals([])
            }
        }
    };
    const Characteristics = sequelize.define(alias, cols, config);
    
    Characteristics.associate = function(models){
    Characteristics.hasMany(models.Subcharacteristics, {
        as: "products_subcharacteristics" ,
        foreignKey: "id_characteristics"
    });

    }
    return Characteristics;
    
}
