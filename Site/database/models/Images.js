module.exports = (sequelize, dataTypes) => {
    let alias = "Images";
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
    const Images = sequelize.define(alias, cols, config);

    
    Images.associate = function(models){
        Images.belongsTo(models.Products, {
            as: "products" ,
            foreignKey: "id_product"
        })
    }

    return Images;

}
