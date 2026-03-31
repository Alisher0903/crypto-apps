import Layout from './components/layout/layout'

const App = () => {
  return (
    <Layout>
      {(route) => {
        const PageComponent = route.component
        return <PageComponent />
      }}
    </Layout>
  )
}

export default App
