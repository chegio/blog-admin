import * as React from 'react'
import {
    Route,
    Link,
    Redirect,
    withRouter,
    RouteComponentProps,
    Switch,
    match
} from 'react-router-dom'
import { connect } from 'react-redux'
import { StoreState } from '../../store'
import { Layout, Menu, Icon, Spin } from 'antd'
import { view as Home } from './home'
import { view as Edit } from './edit'
import { view as Create } from './create'
import { fetchAuth } from './actions'
import { fetchStatus } from '../../utils/fetch'
import Loadable from 'react-loadable'

const { Header, Content, Footer, Sider } = Layout

const AsyncHome = Loadable({
    // tslint:disable-next-line: space-in-parens
    loader: () => import(/* webpackChunkName: "admin-home" */'./home/views/index'),
    loading() {
        return <div>Loading...</div>
    }
})

const AsyncEdit = Loadable({
    // tslint:disable-next-line: space-in-parens
    loader: () => import(/* webpackChunkName: "admin-edit" */'./edit/views/index'),
    loading() {
        return <div>Loading...</div>
    }
})

const AsyncCreate = Loadable({
    // tslint:disable-next-line: space-in-parens
    loader: () => import(/* webpackChunkName: "admin-create" */'./create/views/index'),
    loading() {
        return <div>Loading...</div>
    }
})

const routerMap = [
    {
        path: '/',
        component: AsyncHome
    },
    {
        path: '/edit/:id',
        component: AsyncEdit
    },
    {
        path: '/create',
        component: AsyncCreate
    }
]

interface Props extends RouteComponentProps {
    authenticate: boolean
    status: fetchStatus
    fetchAuth: () => void
}

const ProtectedComponent = (match: match): JSX.Element => (
    <Layout>
        <Sider theme="light" width={ 240 } >
            <Menu
                mode="inline"
                theme="light"
                defaultSelectedKeys={ ['1'] }
                style={ { height: '100%', borderRight: 0 } }
            >
                <Menu.Item key="1">
                    <Link to="/"><Icon type="user" />文章列表</Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to="/about"><Icon type="video-camera" />作者列表</Link>
                </Menu.Item>
            </Menu>
        </Sider>
        <Layout>
            <Content style={ { margin: '24px 16px 0', overflow: 'initial' } }>
                <Switch>
                {
                    routerMap.map(el => (
                        <Route key={ el.path } path={ `${match.url}${el.path}` } exact component={ el.component } />
                    ))
                }
                </Switch>
            </Content>
        </Layout>
    </Layout>
)

const RedirectRoute = (match: match, path: string): React.ReactNode => {

    const RedirectComponent = (props: RouteComponentProps): React.ReactNode => (
        <div>
            <Redirect to={ { pathname: path, state: { from: props.location.pathname } } }/>
        </div>
    )

    return (
        <Switch>
            {
                routerMap.map(el => (
                    <Route key={ el.path } path={ `${match.url}${el.path}` } exact render={ RedirectComponent } />
                ))
            }
        </Switch>
    )
}

const LoadingRoute = (match: match): React.ReactNode => {
    const SpinComponent = (props: RouteComponentProps): React.ReactNode => (
        <Spin />
    )

    return (
        <Switch>
            {
                routerMap.map(el => (
                    <Route key={ el.path } path={ `${match.url}${el.path}` } exact render={ SpinComponent } />
                ))
            }
        </Switch>
    )
}

class AdminLayout extends React.Component<Props> {
    render() {
        const { match, authenticate, status } = this.props

        return (
            status === fetchStatus.LOADING
            ? LoadingRoute(match)
            : authenticate
                ? ProtectedComponent(match)
                : RedirectRoute(match, '/login')
        )
    }

    componentWillMount() {
        this.props.fetchAuth()
    }
}

const mapStateToProps = (state: StoreState) => ({
    authenticate: state.admin.authenticate,
    status: state.admin.status
})

const mapDispatchToProps = (dispatch: any) => ({
    fetchAuth: () => {
        dispatch(fetchAuth())
    }
})

export default  withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminLayout))
