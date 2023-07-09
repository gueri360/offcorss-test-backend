import nodeFetch from "node-fetch";

export const getProductByname = async (req, res) => {
    console.log('entre product')

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


export const getAll = async (req, res) => {
    console.log('entre product')
    try {
        const apiResponse = await nodeFetch(
            'https://offcorss.myvtex.com/api/catalog_system/pub/products/search/'
        )
        const apiResponseJson = await apiResponse.json()
        console.log(apiResponse)
        res.send(apiResponseJson)
    } catch (err) {
        console.log(err)
        res.status(500).send('Something went wrong')
    }
}