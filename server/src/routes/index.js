import userRouter from './user'
import speciesRouter from './species'
import propertiesRouter from './properties'
import propertiesvalueRouter from './propertiesvalue'
import detailspeciesRouter from './detailspecies'

const initRoutes = (app) =>{
    app.use('/api/user',userRouter)
    app.use('/api/species',speciesRouter)
    app.use('/api/detailspecies', detailspeciesRouter)
    app.use('/api/propertiesvalue', propertiesvalueRouter)
    app.use('/api/properties', propertiesRouter)
    // app.use('/api/v1/menu', menuRouter)
    // app.use('/api/v1/book', bookRouter)
    return app.use('/', (req,res )=>{
        res.send('server on ..')
    })
}

export default initRoutes;