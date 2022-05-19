module.exports = (sequelize, dataTypes) => {
    let alias = "Principal";
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
        tableName: "characteristics_main",
        timestamps: false
    };
    const Principal = sequelize.define(alias, cols, config);

        Principal.associate = function(models){
        Principal.belongsTo(models.Caracteristica, {
            as: "characteristic" ,
            foreignKey: "id_characteristic"
        })
    }


    return Principal;

}
