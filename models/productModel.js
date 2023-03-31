const mongoose=require('mongoose')
const productSchema= mongoose.Schema(
    {
        brand_name:{
            type: String,
            required : true
        },
        link:{
            type: String,
            required:false,
        },
        img:{
            type:String,
            required: true,

        },
        title:{
            type: String,
            required: true,
        },
        price:{
            type : Number,
            required:true
        },
    },
    {timestamps: true}
)

const Product =mongoose.model('Product',productSchema);

module.exports = Product;