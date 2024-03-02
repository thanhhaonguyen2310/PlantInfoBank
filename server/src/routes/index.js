import userRouter from './user'
import speciesRouter from './species'
import propertiesRouter from './properties'
import propertiesvalueRouter from './propertiesvalue'
import detailspeciesRouter from './detailspecies'
import distributionRouter from "./distribution";
import publicRouter from "./public";

const initRoutes = (app) =>{
    app.use('/api/user',userRouter)
    app.use('/api/species',speciesRouter)
    app.use('/api/detailspecies', detailspeciesRouter)
    app.use('/api/propertiesvalue', propertiesvalueRouter)
    app.use('/api/properties', propertiesRouter)
    app.use("/api/distribution", distributionRouter);
    app.use('/api/public', publicRouter)
    return app.use('/', (req,res )=>{
        res.send('server on ..')
    })
}

export default initRoutes;