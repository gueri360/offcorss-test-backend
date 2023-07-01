import nodeFetch from "node-fetch";

export const getAll = async (req, res) => {

    try {
        const {productName} = req.params;
        const apiResponse = await nodeFetch(
            'https://offcorss.myvtex.com/api/catalog_system/pub/products/search/' + productName
        )
        const apiResponseJson = await apiResponse.json()
        res.send(apiResponseJson)
    } catch (err) {
        console.log(err)
        res.status(500).send('Something went wrong')
    }
}


export const getProductByname = async (req, res) => {

    try {
        const apiResponse = await nodeFetch(
            'https://offcorss.myvtex.com/api/catalog_system/pub/products/search/'
        )
        const apiResponseJson = await apiResponse.json()
        res.send(apiResponseJson)
    } catch (err) {
        console.log(err)
        res.status(500).send('Something went wrong')
    }
}