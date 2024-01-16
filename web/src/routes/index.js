import { HomePage } from '../containers/Homepage/HomePage' 
import { About } from '../containers/About/About'

export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true
    },
    {
        path: '/about',
        page: About,
        isShowHeader: true
    },
]