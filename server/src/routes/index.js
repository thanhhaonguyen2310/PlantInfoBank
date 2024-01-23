import userRouter from './user'
import speciesRouter from './species'
import propertiesRouter from './properties'
import propertiesvalueRouter from './propertiesvalue'
import detailspeciesRouter from './detailspecies'
import distributionRouter from "./distribution";

const initRoutes = (app) =>{
    app.use('/api/user',userRouter)
    app.use('/api/species',speciesRouter)
    app.use('/api/detailspecies', detailspeciesRouter)
    app.use('/api/propertiesvalue', propertiesvalueRouter)
    app.use('/api/properties', propertiesRouter)
    app.use("/api/distribution", distributionRouter);
    // app.use('/api/v1/book', bookRouter)
    return app.use('/', (req,res )=>{
        res.send('server on ..')
    })
}

export default initRoutes;